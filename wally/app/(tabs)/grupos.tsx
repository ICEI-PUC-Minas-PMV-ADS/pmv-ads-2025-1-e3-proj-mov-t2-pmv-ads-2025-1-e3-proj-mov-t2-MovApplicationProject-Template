import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  FlatList,
  Text,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabTwoScreen() {

  const router = useRouter();

  const items = [
    { id: '1', title: 'Apartamento 106' },
    { id: '2', title: 'Viagem Europa' },
    { id: '3', title: 'Empresa X' },
    { id: '4', title: 'Escritório' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#9ACBD0"
        barStyle={'dark-content'} />

      <View style={styles.header} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain" />
      </View>

      <View style={styles.mainContent}>

        <Text style={styles.titulo}>GRUPOS</Text>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTexto}>{item.title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.containerBotao}>
        <Pressable
          style={styles.botaoCriarGrupo}
          onPress={() => router.push('/criar-grupo')}
          accessible={true}
          accessibilityLabel="Criar grupo"
          accessibilityHint="Toque para criar um novo grupo"
          accessibilityRole="button">
          <MaterialIcons name="group-add" size={28} color="#fff" />
          <Text style={styles.textoBotao}>CRIAR GRUPO</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  logoContainer: {
    alignSelf: 'center',
    top: 80,
    zIndex: 2,
  },
  logo: {
    width: 96,
    height: 96,
  },
  mainContent: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    paddingHorizontal: 30,
  },
  titulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    borderWidth: 1,
    borderColor: '#9ACBD0',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemTexto: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#000',
  },
  containerBotao: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 3,
  },
  botaoCriarGrupo: {
    top: 60,
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
});