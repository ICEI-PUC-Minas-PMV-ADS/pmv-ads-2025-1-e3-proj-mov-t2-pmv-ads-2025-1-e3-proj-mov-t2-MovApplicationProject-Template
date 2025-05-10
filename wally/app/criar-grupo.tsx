import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Pressable
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CriarGrupoScreen() {
  const router = useRouter();
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);

  const tiposGrupo = [
    { id: 'viagem', icon: 'airplane-outline', label: 'Viagem', component: Ionicons },
    { id: 'casa', icon: 'home-outline', label: 'Casa', component: Ionicons },
    { id: 'trabalho', icon: 'briefcase-outline', label: 'Trabalho', component: Ionicons },
    { id: 'outro', icon: 'list-outline', label: 'Outro', component: Ionicons },
  ];

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: 'Criar Grupo',
        headerBackVisible: true,
        headerBackTitle: 'Voltar',
        headerTintColor: '#006A71',
        headerStyle: { backgroundColor: '#F4F2F2' },
      }} />
      
      <SafeAreaView style={styles.container}>

        <View style={styles.mainContent}>

          <Text style={styles.labelNome}>Nome do Grupo</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do Grupo"
            value={nomeGrupo}
            onChangeText={setNomeGrupo} />

          <Text style={styles.labelTipo}>Tipo</Text>

          <View style={styles.tiposContainer}>
            {tiposGrupo.map((tipo) => {
              const IconComponent = tipo.component;
              return (
                <Pressable
                  key={tipo.id}
                  style={[
                    styles.tipoItem,
                    tipoSelecionado === tipo.id && styles.tipoItemSelecionado,
                  ]}
                  onPress={() => setTipoSelecionado(tipo.id)}
                >
                  <IconComponent name={tipo.icon as any} size={28} color="#48A6A7" />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.containerBotao}>

          <Pressable
            style={styles.botaoAddmebro}
            accessible={true}
            accessibilityLabel="Adicionar membro"
            accessibilityHint="Toque para adicionar um novo membro ao grupo"
            accessibilityRole="button">
            <MaterialIcons name="group-add" size={28} color="#fff" />
            <Text style={styles.textoBotaoAddmebro}>ADICIONAR MEMBROS</Text>
          </Pressable>

          <Pressable
            style={styles.botaoCriar}
            accessible={true}
            accessibilityLabel="Criar grupo"
            accessibilityHint="Toque para criar um novo grupo"
            accessibilityRole="button">
            <Text style={styles.textoBotao}>CRIAR</Text>
          </Pressable>
        </View>

      </SafeAreaView></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    margin: 8,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  labelNome: {
    fontFamily: 'Inter',
    padding: 8,
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    marginTop: 56,
  },
  labelTipo: {
    fontFamily: 'Inter',
    padding: 8,
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    marginTop: 40,
  },
  tiposContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipoItem: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  tipoItemSelecionado: {
    borderColor: '#48A6A7',
    borderWidth: 2,
  },
  containerBotao: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 60,
    zIndex: 3,
  },
  botaoAddmebro: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCriar: {
    width: 330,
    height: 52,
    marginTop: 20,
    backgroundColor: '#006A71',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoAddmebro: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});