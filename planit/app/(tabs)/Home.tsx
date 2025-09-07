import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { countConsultasSemana } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

interface HeaderProps {
  consultasHoje?: number;
  consultasSemana?: number;
}

interface Agendamento {
  id: string;
  clienteId: string;
  dataInicio: string;
  horaInicio: string;
  duracao: string;
  profissionalId: string;
  servicoId: string;
  status: string;
  // Dados expandidos
  clienteNome?: string;
  servicoNome?: string;
  servicoPreco?: number;
}

interface Cliente {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  photoURL?: string;
}

interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: string;
}

const diasDaSemanaCompleto = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
const diasDaSemanaCurto = ["D", "S", "T", "Q", "Q", "S", "S"];

const Home = () => {
  const [saudacao, setGreeting] = useState("Bom dia");
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [consultasDiaSelecionado, setConsultasDiaSelecionado] = useState(0); // ← Renomeado
  const [consultasSemana, setConsultasSemana] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const profileImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Função para contar consultas de uma data específica
  const countConsultasData = async (profId: string, data: string): Promise<number> => {
    try {
      const agendamentosRef = collection(db, 'Agendamento');
      const q = query(
        agendamentosRef,
        where('profissionalId', '==', profId),
        where('dataInicio', '==', data)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error("Erro ao contar consultas da data:", error);
      return 0;
    }
  };

  // Função para buscar dados do cliente
  const buscarCliente = async (clienteUid: string): Promise<Cliente | null> => {
    try {
      const clientesRef = collection(db, 'Cliente'); 
      const q = query(clientesRef, where('uid', '==', clienteUid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        console.log("Cliente encontrado pelo UID:", clienteUid);
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as Cliente;
      } else {
        console.warn(" Nenhum cliente encontrado com UID:", clienteUid);
        return null;
      }
    } catch (error) {
      console.error(" Erro ao buscar cliente por UID:", error);
      return null;
    }
  };

  // Função para buscar dados do serviço
  const buscarServico = async (servicoId: string): Promise<Servico | null> => {
    try {
      const servicoRef = doc(db, 'Servicos', servicoId); 
      const servicoSnap = await getDoc(servicoRef);

      if (servicoSnap.exists()) {
        return {
          id: servicoSnap.id,
          ...servicoSnap.data()
        } as Servico;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar serviço:", error);
      return null;
    }
  };

  // Função para buscar agendamentos do Firebase com dados expandidos
  const buscarAgendamentos = useCallback(async () => {
    setLoading(true);
    try {
      const profId = user?.uid;
      if (!profId) return;

      const dataFormatada = formatDate(diaSelecionado);

      // Busca os agendamentos para o profissional logado na data selecionada
      const agendamentosRef = collection(db, 'Agendamento');
      const q = query(
        agendamentosRef,
        where('profissionalId', '==', profId),
        where('dataInicio', '==', dataFormatada)
      );

      const querySnapshot = await getDocs(q);
      const agendamentosData: Agendamento[] = [];

      // Busca os dados básicos dos agendamentos
      querySnapshot.forEach((doc) => {
        agendamentosData.push({
          id: doc.id,
          ...doc.data()
        } as Agendamento);
      });

      // Busca os dados expandidos (cliente e serviço) para cada agendamento
      const agendamentosComDados = await Promise.all(
        agendamentosData.map(async (agendamento) => {
          try {
            const [cliente, servico] = await Promise.all([
              buscarCliente(agendamento.clienteId),
              buscarServico(agendamento.servicoId),
            ]);

            return {
              ...agendamento,
              clienteNome: cliente?.nome || 'Cliente não encontrado',
              servicoNome: servico?.nome || 'Serviço não encontrado',
              servicoPreco: servico?.preco || 0,
            };
          } catch (err) {
            console.error("❌ Erro ao processar agendamento:", agendamento.id, err);
            return {
              ...agendamento,
              clienteNome: 'Erro ao buscar cliente',
              servicoNome: 'Erro ao buscar serviço',
              servicoPreco: 0,
            };
          }
        })
      );

      setAgendamentos(agendamentosComDados);
      
      // ← CORREÇÃO: Atualiza o contador com base no dia selecionado
      const consultasCount = await countConsultasData(profId, dataFormatada);
      setConsultasDiaSelecionado(consultasCount);

    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid, diaSelecionado]);

  // Atualiza sempre que muda o dia selecionado ou o usuário
  useEffect(() => {
    buscarAgendamentos();
  }, [buscarAgendamentos]);

  const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`; 
};

  // Carrega as consultas da semana (mantém a lógica original)
  const carregarConsultasSemana = useCallback(async () => {
    try {
      const profId = user?.uid;
      if (!profId) return;

      const semana = await countConsultasSemana(profId);
      setConsultasSemana(semana);
    } catch (error) {
      console.error("Erro ao carregar consultas da semana:", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    carregarConsultasSemana();
  }, [carregarConsultasSemana]);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        setGreeting("Bom dia!");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Boa tarde!");
      } else {
        setGreeting("Boa noite!");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([carregarConsultasSemana(), buscarAgendamentos()])
      .finally(() => setRefreshing(false));
  }, [carregarConsultasSemana, buscarAgendamentos]);

  const renderCalendarioSemana = () => {
    const hoje = new Date();
    const atualDiaDaSemana = hoje.getDay();
    const AtualDia = hoje.getDate();

    const obterDiasDaSemanaComDatas = () => {
      const resultado = [];
      const comecoDaSemana = new Date(hoje);
      comecoDaSemana.setDate(AtualDia - atualDiaDaSemana);

      for (let i = 0; i < 7; i++) {
        const dataDoDia = new Date(comecoDaSemana);
        dataDoDia.setDate(comecoDaSemana.getDate() + i);

        resultado.push({
          letter: diasDaSemanaCurto[i],
          number: dataDoDia.getDate(),
          date: dataDoDia,
          isToday:
            dataDoDia.getDate() === hoje.getDate() &&
            dataDoDia.getMonth() === hoje.getMonth() &&
            dataDoDia.getFullYear() === hoje.getFullYear(),
          isSelected:
            dataDoDia.getDate() === diaSelecionado.getDate() &&
            dataDoDia.getMonth() === diaSelecionado.getMonth() &&
            dataDoDia.getFullYear() === diaSelecionado.getFullYear(),
        });
      }
      return resultado;
    };

    const dias = obterDiasDaSemanaComDatas();

    return (
      <View className="flex flex-row justify-between mt-4 px-1">
        {dias.map((dia, index) => (
          <TouchableOpacity
            key={index}
            className="items-center"
            onPress={() => setDiaSelecionado(dia.date)}
          >
            <View
              className={`w-14 h-12 rounded-full justify-center items-center mb-2 ${dia.isSelected
                ? "bg-principal"
                : dia.isToday
                  ? "bg-secundaria"
                  : "bg-secundaria"
                }`}
            >
              <Text
                className={`text-lg font-bold ${dia.isSelected
                  ? "text-white"
                  : dia.isToday
                    ? "text-principal"
                    : "text-gray-600"
                  }`}
              >
                {dia.letter}
              </Text>
            </View>
            <Text
              className={`text-lg ${dia.isSelected
                ? "font-bold text-principal"
                : dia.isToday
                  ? "text-gray-500"
                  : "text-gray-300"
                }`}
            >
              {dia.number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderResumoConsultas = () => {
    // ← CORREÇÃO: Verifica se o dia selecionado é hoje para mostrar o texto correto
    const hoje = new Date();
    const isHoje = diaSelecionado.getDate() === hoje.getDate() &&
                   diaSelecionado.getMonth() === hoje.getMonth() &&
                   diaSelecionado.getFullYear() === hoje.getFullYear();

    return (
      <View className="flex-row mx-4 my-3 rounded-lg shadow-s py-4">
        <View className="flex-1 bg-secundaria p-5 rounded-xl mr-2 ">
          <Text className="text-1xl text-principal mb-1">
            {isHoje ? "Hoje" : "Dia Selecionado"}
          </Text>
          <Text className="text-4xl font-bold text-principal mb-1 p-1">
            {consultasDiaSelecionado}
          </Text>
          <Text className="text-1xl text-principal">Consultas</Text>
        </View>

        <View className="flex-1 bg-pink-100 p-5 rounded-xl ml-2">
          <Text className="text-1x1 text-principal mb-1">Esta semana</Text>
          <Text className="text-4xl font-bold text-principal mb-1 p-1">
            {consultasSemana}
          </Text>
          <Text className="text-1x1 text-principal">Consultas</Text>
        </View>
      </View>
    );
  };

  const renderAgenda = () => {
    const diaDaSemana = diasDaSemanaCompleto[diaSelecionado.getDay()];
    const diaNumero = diaSelecionado.getDate();

    // Ordena os agendamentos por horário
    const agendamentosOrdenados = [...agendamentos].sort((a, b) =>
      a.horaInicio.localeCompare(b.horaInicio)
    );

    return (
      <View className="bg-white rounded-xl mx-4 my-3 p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-10">
          Agenda de {diaDaSemana}, {diaNumero}
        </Text>

        {loading ? (
          <Text className="text-gray-500 text-center py-4">
            Carregando agendamentos...
          </Text>
        ) : agendamentosOrdenados.length > 0 ? (
          agendamentosOrdenados.map((agendamento, index) => (
            <View key={agendamento.id} className="mb-10">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: profileImage }}
                  className="w-14 h-14 rounded-full mr-2"
                />

                <View className="flex-1">
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-semibold text-gray-700">
                      {agendamento.clienteNome}
                    </Text>
                    <Text className="text-base text-gray-500">
                      {formatarHora(agendamento.horaInicio)}
                    </Text>
                  </View>

                  <View className="flex-row justify-between mt-1">
                    <Text className="text-base text-gray-600">
                      {agendamento.duracao} • {agendamento.status}
                    </Text>
                    <View className="items-end">
                      <Text className="text-base font-bold text-principal">
                        {agendamento.servicoNome}
                      </Text>
                      {/* {agendamento.servicoPreco > 0 && (
                        <Text className="text-sm text-gray-500">
                          R$ {agendamento.servicoPreco.toFixed(2)}
                        </Text>
                      )} */}
                    </View>
                  </View>
                </View>
              </View>

              {index < agendamentosOrdenados.length - 1 && (
                <View className="border-b border-gray-100 my-3" />
              )}
            </View>
          ))
        ) : (
          <Text className="text-gray-500 text-center py-4">
            Nenhum agendamento para este dia
          </Text>
        )}
      </View>
    );
  };

  // Função auxiliar para formatar hora
  const formatarHora = (hora: string) => {
    if (hora.length === 4) {
      return `${hora.substring(0, 2)}:${hora.substring(2)}`;
    }
    return hora;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="bg-white">
        <View className="flex justify-between flex-row items-center px-6 py-4">
          <TouchableOpacity onPress={() => router.push("/Notificacao")}>
            <Ionicons name="notifications" size={20} color={Colors.preto} />
          </TouchableOpacity>

          <View className="flex items-end flex-row">
            <View className="flex-col mr-3">
              <Text className="text-sm text-gray-300">{saudacao}</Text>
              <Text className="text-lg text-right font-bold text-gray-600">
                {user?.displayName || "Usuário"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/Perfil")}>
              <Image
                source={{ uri: user?.photoURL || profileImage }}
                className="w-[55px] h-[55px] rounded-full"
              />
            </TouchableOpacity>
          </View>
        </View>

        {renderCalendarioSemana()}
        {renderResumoConsultas()}
        {renderAgenda()}
      </View>
    </ScrollView>
  );
};

export default Home;