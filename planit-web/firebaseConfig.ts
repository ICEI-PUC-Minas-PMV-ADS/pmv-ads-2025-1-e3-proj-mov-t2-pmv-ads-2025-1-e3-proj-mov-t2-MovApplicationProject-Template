import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel, /*doc, getDoc,*/ query, collection, getDocs, where, addDoc, updateDoc, doc, getDoc, /*addDoc, updateDoc, serverTimestamp, QuerySnapshot*/ } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Agendamento, Horario, Profissional, Servico, /*Agendamento*/ } from './types'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
setLogLevel('info')
const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth, cancelarAgendamentoEHorarios };

// FUNÇÃO QUE RESGATA O ID DO PROFISSIONAL
export async function getProfissional(profId: string): Promise<Profissional> {
  try {
    const q = query(collection(db, "Profissional"),
      where("uid", "==", profId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Nenhum profissional encontrado com uid:", profId);
      throw new Error("Profissional não encontrado");
    }

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      nome: data.nomeCompleto || "Profissional",
      profissao: data.profissao || "Autônomo",
      fotoPerfil: data.fotoPerfil || undefined,
      ...data
    } as Profissional;
  } catch (error) {
    console.error("Erro detalhado:", error);
    throw new Error("Falha ao buscar profissional");
  }
}

// FUNÇÃO QUE RESGATA OS SERVIÇOS 
export async function getServicos(profId: string): Promise<Servico[]> {
  const q = query(
    collection(db, "Servicos"),
    where("uid", "==", profId),
    where("ativo", "==", true)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      nome: data.nome,
      descricao: data.descricao,
      duracao: data.duracao,
      valor: parseFloat(data.valor) || 0,
      uid: data.uid
    } as Servico;
  });
}

//FUNÇÃO QUE RESGATA OS HORARIOS
export async function getHorarios(profissionalId: string, dataSelecionada: string): Promise<Horario[]> {
  try {
    const docRef = collection(db, "Agenda", profissionalId, "Horarios");
    const snapshot = await getDocs(query(docRef));

    let horariosDisponiveis: Horario[] = [];

    snapshot.forEach((doc) => {
      if (doc.id === dataSelecionada) {
        const data = doc.data();
        if (Array.isArray(data.horarios)) {
          horariosDisponiveis = data.horarios
            .filter((h: any) => h.status === 1) // apenas status 1: disponível
            .map((h: any, index: number) => ({
              id: `${doc.id}_${index}`, // id fictício
              data: data.data,
              hora: h.name,
              status: h.status,
              uid: profissionalId,
              value: h.value
            }));
        }
      }
    });

    return horariosDisponiveis;
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis:", error);
    return [];
  }
}


// FUNÇÕES QUE COMPOEM O AGENDAMENTO 
function formatarData(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Data inválida passada para formatarData:", date);
    throw new RangeError("Invalid time value em formatarData");
  }

  return date.toISOString().split('T')[0];
}

function formatarHora(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function parseDuracao(duracao: string): number {
  if (typeof duracao !== "string") return NaN;

  const regex = /^(\d+)(h|m|min)$/; 
  const match = duracao.match(regex);

  if (!match) return NaN;

  const valor = parseInt(match[1]);
  const unidade = match[2];

  if (unidade === "h") return valor * 60 * 60 * 1000;
  if (unidade === "m" || unidade === "min") return valor * 60 * 1000;

  return NaN;
}



const updateHorarios = async (
  data: string,
  horaInicial: string,
  duracaoEmMilissegundos: number,
  uid: string
) => {
  try {
    const duracaoMinutos = duracaoEmMilissegundos / 60000;

    const horarioBase = new Date(`1970-01-01T${horaInicial}:00`);
    const horariosAAtualizar: string[] = [];

    for (let i = 0; i < duracaoMinutos; i += 30) {
      const novoHorario = new Date(horarioBase.getTime() + i * 60000);
      const horas = String(novoHorario.getHours()).padStart(2, "0");
      const minutos = String(novoHorario.getMinutes()).padStart(2, "0");
      horariosAAtualizar.push(`${horas}:${minutos}`);
    }

    const horarioDocRef = doc(db, "Agenda", uid, "Horarios", data);
    const horarioDocSnap = await getDoc(horarioDocRef);

    if (!horarioDocSnap.exists()) {
      console.error("Documento de horário não encontrado:", data);
      return;
    }

    const horarioData = horarioDocSnap.data();
    const horarios = horarioData.horarios || [];

    const horariosAtualizados = horarios.map((horario: any) => {
      if (horariosAAtualizar.includes(horario.name)) {
        return { ...horario, status: 2 }; // 2 = agendado
      }
      return horario;
    });

    await updateDoc(horarioDocRef, { horarios: horariosAtualizados });

    console.log("Horários atualizados com sucesso:", horariosAAtualizar);

  } catch (error) {
    console.error("Erro ao atualizar horários:", error);
  }
};



// FUNÇÃO QUE CRIA O AGENDAMENTO 
export async function createAgendamento(dataSelecionada: Date, horaSelecionada: string, servico: Servico, clienteId: string): Promise<string> {
  try {
    const [hora, minutos] = horaSelecionada.split(':').map(Number);
    const inicio = new Date(dataSelecionada);
    inicio.setHours(hora, minutos);

    const duracaoMs = typeof servico.duracao === "string"
      ? parseDuracao(servico.duracao)
      : Number(servico.duracao);

    if (isNaN(duracaoMs)) {
      console.error("Erro: duração do serviço inválida", servico.duracao);
      throw new Error("Duração do serviço inválida");
    }

    const fim = new Date(inicio.getTime() + duracaoMs);

    console.log("Duração do serviço (ms):", servico.duracao);

    console.log("dataSelecionada recebida:", dataSelecionada);
    console.log("horaSelecionada recebida:", horaSelecionada);
    console.log("data + hora:", inicio);


    const agendamento: Agendamento = {
      dataInicio: formatarData(inicio),
      horaInicio: horaSelecionada,
      dataFim: formatarData(fim),
      horaFim: formatarHora(fim),
      servicoId: servico.id,
      profissionalId: servico.uid,
      clienteId,
      status: 'agendado',
      duracao: servico.duracao
    };

    const docRef = await addDoc(collection(db, "Agendamento"), agendamento);

    const dataFormatada = dataSelecionada.toISOString().split("T")[0]; // "2025-06-02"

    await updateHorarios(
      dataFormatada,
      horaSelecionada,
      typeof servico.duracao === "string" ? parseDuracao(servico.duracao) : servico.duracao,
      servico.uid
    );

    return docRef.id;

  } catch (error) {
    window.alert("Falha ao criar agendamento");
    console.error("Erro ao criar agendamento:", error);
    throw new Error("Falha ao criar agendamento");
  }
}

async function cancelarAgendamentoEHorarios(
  agendamentoId: string,
  profissionalId: string,
  data: string,
  horaInicio: string,
  duracao: number | string 
) {
  try {
    console.log("Iniciando cancelamento do agendamento:", agendamentoId);
    console.log("Duração recebida (antes de parse):", duracao);

    let duracaoEmMilissegundos: number;
    if (typeof duracao === "string") {
      duracaoEmMilissegundos = parseDuracao(duracao);
      if (isNaN(duracaoEmMilissegundos)) {
        throw new Error("Duração inválida: " + duracao);
      }
    } else {
      duracaoEmMilissegundos = duracao;
    }

    console.log("Duração em milissegundos convertida:", duracaoEmMilissegundos);

    await updateDoc(doc(db, "Agendamento", agendamentoId), {
      status: "cancelado"
    });
    console.log("Status do agendamento atualizado para 'cancelado'");

    const docRef = doc(db, "Agenda", profissionalId, "Horarios", data);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Documento de horários não encontrado");
      return;
    }

    const horariosData = docSnap.data();
    console.log("Documento de horários encontrado.");
    console.log("Horários carregados:", horariosData.horarios || horariosData);

    const horarios = horariosData.horarios || [];

    const duracaoMinutos = duracaoEmMilissegundos / 60000;
    console.log("Duração em minutos:", duracaoMinutos);

    const horaInicioObj = horarios.find((h: any) => h.name === horaInicio);
    if (!horaInicioObj) {
      console.error("Horário inicial não encontrado:", horaInicio);
      return;
    }
    const horaInicioValor = horaInicioObj.value;
    console.log("Valor do horário inicial:", horaInicioValor);

    const horariosLiberar = horarios
      .filter((h: any) => h.value >= horaInicioValor && h.value < horaInicioValor + duracaoMinutos)
      .map((h: any) => h.name);

    console.log("Horários a liberar:", horariosLiberar);

    const horariosAtualizados = horarios.map((h: any) => {
      if (horariosLiberar.includes(h.name)) {
        return { ...h, status: 1 }; 
      }
      return h;
    });

    await updateDoc(docRef, { horarios: horariosAtualizados });
    console.log("Horários atualizados no Firestore com sucesso.");

  } catch (error) {
    console.error("Erro ao cancelar agendamento e liberar horários:", error);
  }
}

