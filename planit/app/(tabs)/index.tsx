import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

interface HeaderProps {
  userName?: string;
  consultasHoje?: number;
  consultasSemana?: number;
}

const Home = ({
  userName = "Iriana Darua",
  consultasHoje = 12,
  consultasSemana = 48
}: HeaderProps) => {
  const [saudacao, setGreeting] = useState('Bom dia');
  const router = useRouter();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        setGreeting('Bom dia!');
      } else if (hours >= 12 && hours < 18) {
        setGreeting('Boa tarde!');
      } else {
        setGreeting('Boa noite!');
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  // Componente de Calendário
  const renderCalendarioSemana = () => {
    const hoje = new Date();
    const atualDiaDaSemana = hoje.getDay();
    const AtualDia = hoje.getDate();
    const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const obterDiasDaSemanaComDatas = () => {
      const resultado = [];
      const comecoDaSemana = new Date(hoje);
      comecoDaSemana.setDate(AtualDia - atualDiaDaSemana);

      for (let i = 0; i < 7; i++) {
        const dataDoDia = new Date(comecoDaSemana);
        dataDoDia.setDate(comecoDaSemana.getDate() + i);

        resultado.push({
          letter: diasDaSemana[i],
          number: dataDoDia.getDate().toString(),
          isToday: dataDoDia.getDate() === AtualDia
        });
      }
      return resultado;
    };

    const dias = obterDiasDaSemanaComDatas();

    return (
      <View className="flex flex-row justify-between mt-4 px-1">
        {dias.map((dia, index) => (
          <View key={index} className="items-center">
            <View
              className={`w-14 h-12 rounded-full justify-center items-center mb-2
                ${dia.isToday ? 'bg-pink-500' : 'bg-secundaria'}`}
            >
              <Text className={`text-lg font-bold
                ${dia.isToday ? 'text-secundaria' : 'text-gray-600'}`}
              >
                {dia.letter}
              </Text>
            </View>
            <Text className={`text-lg
              ${dia.isToday ? 'font-bold text-gray-500' : 'text-gray-300'}`}
            >
              {dia.number}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderResumoConsultas = () => {
    return (
      <View className="flex-row mx-4 my-3 rounded-lg shadow-s py-4">
        <View className="flex-1 bg-secundaria p-5 rounded-xl mr-2 ">
          <Text className="text-1xl text-pink-500 mb-1">Hoje</Text>
          <Text className="text-4xl font-bold  text-pink-500 mb-1 p-1 ">
            {consultasHoje}
          </Text>
          <Text className="text-1xl text-pink-500">Consultas</Text>
        </View>

        <View className="flex-1 bg-pink-100 p-5 rounded-xl ml-2">
          <Text className="text-1x1 text-pink-500 mb-1">Esta semana</Text>
          <Text className="text-4xl font-bold text-pink-500 mb-1 p-1">
            {consultasSemana}
          </Text>
          <Text className="text-1x1 text-pink-500">Consultas</Text>
        </View>
      </View>

    )
  }

  const renderAgendaHoje = () => {
    const consultas = [
      {
        nome: "Ana Paula",
        horario: "09:30",
        tipo: "Consulta de rotina",
        valor: "150,00",
        foto: "https://randomuser.me/api/portraits/women/44.jpg" // Foto estática exemplo
      },
      {
        nome: "Sérgio",
        horario: "10:20",
        tipo: "Primeira Consulta",
        valor: "95,00",
        foto: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        nome: "Mauricio",
        horario: "11:00",
        tipo: "Retorno",
        valor: "100,00",
        foto: "https://randomuser.me/api/portraits/men/75.jpg"
      }
    ];

    return (
      <View className="bg-white rounded-xl mx-4 my-3 p-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-10">Agenda de Hoje</Text>

        {consultas.map((consulta, index) => (
          <View key={index} className="mb-10">
            <View className="flex-row items-center ">
              <Image
                source={{ uri: consulta.foto }}
                className="w-14 h-14 rounded-full mr-2"
              />

              <View className="flex-1 ">
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
                  <Text className="text-base font-bold text-pink-500">
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
    )
  }

  return (
    <View className="bg-white">
      <View className="flex justify-between flex-row items-center px-6 py-4">
        <View>
          <TouchableOpacity onPress={() => router.push("/Notificacao")}>
            <Feather name="bell" size={20} color={Colors.preto} />
          </TouchableOpacity>
        </View>
        <View className='flex items-end flex-row'>
          <View className="flex-col items-start mr-2">
            <Text className="text-sm text-gray-300">
              {saudacao}
            </Text>
            <Text className="text-lg font-bold text-gray-600">
              {userName}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/Perfil")}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/280x280_RS/53/3e/03/533e031c488dd2ec98c186e90a89d1c0.jpg",
                }}
                className="w-[55px] h-[55px] rounded-full"
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>
      {renderCalendarioSemana()}
      {renderResumoConsultas()}
      {renderAgendaHoje()}

    </View>

  );
};

export default Home;