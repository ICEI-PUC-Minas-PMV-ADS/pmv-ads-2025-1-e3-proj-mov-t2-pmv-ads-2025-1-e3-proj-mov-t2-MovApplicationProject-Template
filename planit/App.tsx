import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Defina o tipo da navegação aqui mesmo:
type RootStackParamList = {
  ClientHistory: undefined;
  ClientDetail: {
    client: {
      id: string;
      name: string;
      lastVisit: string;
      image: any;
    };
  };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ClientHistory'>;

const clients = [
  {
    id: '1',
    name: 'João Silva',
    lastVisit: '10 Mar 2024',
    image: require('../assets/joao.png'),
  },
  {
    id: '2',
    name: 'Ana Paula',
    lastVisit: '06 Mar 2024',
    image: require('../assets/ana.png'),
  },
];

export default function ClientHistory() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<NavigationProps>();

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <Text className="text-xl font-semibold text-center mb-4">Histórico de clientes</Text>

      {/* Filtros */}
      <View className="flex-row justify-center space-x-2 mb-4">
        <TouchableOpacity className="bg-pink-500 px-4 py-2 rounded-full">
          <Text className="text-white">Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
          <Text>Em andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
          <Text>Concluídos</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de busca */}
      <View className="flex-row items-center mb-4 space-x-2">
        <TextInput
          placeholder="Buscar cliente..."
          value={search}
          onChangeText={setSearch}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-full"
        />
        <TouchableOpacity>
          <Text className="text-xl">⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de clientes */}
      <FlatList
        data={clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ClientDetail', { client: item })}
            className="flex-row items-center bg-gray-100 p-3 mb-2 rounded-xl"
          >
            <Image source={item.image} className="w-12 h-12 rounded-full mr-4" />
            <View>
              <Text className="font-semibold">{item.name}</Text>
              <Text className="text-gray-500 text-sm">Última visita: {item.lastVisit}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
