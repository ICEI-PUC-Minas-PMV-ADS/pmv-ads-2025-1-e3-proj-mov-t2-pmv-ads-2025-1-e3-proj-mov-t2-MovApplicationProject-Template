import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel, /*doc, getDoc,*/ query, collection, getDocs, where, addDoc, updateDoc, /*addDoc, updateDoc, serverTimestamp, QuerySnapshot*/ } from "firebase/firestore";
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

export { app, db, auth };

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
  const q = query(
    collection(db, "Agenda"),
    where("uid", "==", profissionalId),
    where("data", "==", dataSelecionada),
    where("status", "==", 'disponivel')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      data: data.data,
      hora: data.hora,
      status: data.status,
      uid: data.uid
    } as Horario;
  });
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

    for (const hora of horariosAAtualizar) {
      const agendaRef = collection(db, "Agenda");
      const q = query(
        agendaRef,
        where("data", "==", data),
        where("hora", "==", hora),
        where("uid", "==", uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { status: "agendado" });
        console.log(`Horário ${hora} atualizado com sucesso!`);
      });
    }
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
