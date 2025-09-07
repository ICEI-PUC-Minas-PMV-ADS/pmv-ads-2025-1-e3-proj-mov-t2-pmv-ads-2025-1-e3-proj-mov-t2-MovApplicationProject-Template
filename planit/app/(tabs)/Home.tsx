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
import { countConsultasHoje, countConsultasSemana } from "@/firebaseConfig";

interface HeaderProps {
  consultasHoje?: number;
  consultasSemana?: number;
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
  const [consultasHoje, setConsultasHoje] = useState(0);
  const [consultasSemana, setConsultasSemana] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const profileImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Carrega as consultas ao montar o componente e ao atualizar
  const carregarConsultas = useCallback(async () => {
    try {
      const profId = user?.uid; // Assumindo que o usuário é o profissional
      if (!profId) return;
      
      const [hoje, semana] = await Promise.all([
        countConsultasHoje(profId),
        countConsultasSemana(profId)
      ]);
      
      setConsultasHoje(hoje);
      setConsultasSemana(semana);
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    carregarConsultas();
  }, [carregarConsultas]);

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
    carregarConsultas().finally(() => setRefreshing(false));
  }, [carregarConsultas]);

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
              className={`w-14 h-12 rounded-full justify-center items-center mb-2 ${
                dia.isSelected
                  ? "bg-principal"
                  : dia.isToday
                  ? "bg-secundaria"
                  : "bg-secundaria"
              }`}
            >
              <Text
                className={`text-lg font-bold ${
                  dia.isSelected
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
              className={`text-lg ${
                dia.isSelected
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
    return (
      <View className="flex-row mx-4 my-3 rounded-lg shadow-s py-4">
        <View className="flex-1 bg-secundaria p-5 rounded-xl mr-2 ">
          <Text className="text-1xl text-principal mb-1">Hoje</Text>
          <Text className="text-4xl font-bold text-principal mb-1 p-1">
            {consultasHoje}
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
    const consultas = [
      {
        nome: "Ana Paula",
        horario: "09:30",
        tipo: "Consulta de rotina",
        valor: "150,00",
        foto: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        nome: "Sérgio",
        horario: "10:20",
        tipo: "Primeira Consulta",
        valor: "95,00",
        foto: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        nome: "Mauricio",
        horario: "11:00",
        tipo: "Retorno",
        valor: "100,00",
        foto: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        nome: "Marcela",
        horario: "18:00",
        tipo: "Retorno",
        valor: "100,00",
        foto: "https://randomuser.me/api/portraits/women/75.jpg",
      },
    ];

    const diaDaSemana = diasDaSemanaCompleto[diaSelecionado.getDay()];
    const diaNumero = diaSelecionado.getDate();

    return (
      <View className="bg-white rounded-xl mx-4 my-3 p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-10">
          Agenda de {diaDaSemana}, {diaNumero}
        </Text>

        {consultas.map((consulta, index) => (
          <View key={index} className="mb-10">
            <View className="flex-row items-center">
              <Image
                source={{ uri: consulta.foto }}
                className="w-14 h-14 rounded-full mr-2"
              />

              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="text-xl font-semibold text-gray-700">
                    {consulta.nome}
                  </Text>
                  <Text className="text-base text-gray-500">
                    {consulta.horario}
                  </Text>
                </View>

                <View className="flex-row justify-between mt-1">
                  <Text className="text-base text-gray-600">
                    {consulta.tipo}
                  </Text>
                  <Text className="text-base font-bold text-principal">
                    R$ {consulta.valor}
                  </Text>
                </View>
              </View>
            </View>

            {index < consultas.length - 1 && (
              <View className="border-b border-gray-100 my-3" />
            )}
          </View>
        ))}
      </View>
    );
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
            <View className="flex-col items-start mr-2">
              <Text className="text-sm text-gray-300">{saudacao}</Text>
              <Text className="text-lg font-bold text-gray-600">
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