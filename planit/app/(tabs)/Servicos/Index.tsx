import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Servicos = () => {
  const router = useRouter();

  const [switches, setSwitches] = React.useState({
    1: true,
    2: true,
    3: false
  });

  const [filtroSelecionado, setFiltroSelecionado] = React.useState('Todos');

  const toggleSwitch = (id: number) => {
    setSwitches({ ...switches, [id]: !switches[id] });
  };

  const listaServicos = [
    { id: 1, nome: 'Brand Guide', duracao: '45 min', preco: 'R$ 50,00' },
    { id: 2, nome: 'Mockup', duracao: '2h', preco: 'R$ 250,00' },
    { id: 3, nome: 'Edição de Foto', duracao: '1 sem', preco: 'R$ 50,00' }
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho com título centralizado */}
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cabecalhoBotao}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={styles.cabecalhoCentro}>
          <Text style={styles.titulo}>Meus Serviços</Text>
        </View>

       
      </View>

      {/* Estatísticas */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
        <View style={styles.cardEstatisticaAmarelo}>
          <Text style={styles.cardEstatisticaTitulo}>Serviços Ativos</Text>
          <Text style={styles.cardEstatisticaValor}>7</Text>
        </View>
        <View style={styles.cardEstatisticaRosa}>
          <Text style={styles.cardEstatisticaTitulo}>Em Andamento</Text>
          <Text style={styles.cardEstatisticaValor}>9</Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtros}>
        {['Todos', 'Ativos', 'Inativos', 'Recentes'].map((filtro) => (
          <TouchableOpacity
            key={filtro}
            onPress={() => setFiltroSelecionado(filtro)}
            style={filtroSelecionado === filtro ? styles.botaoSelecionado : styles.botaoNaoSelecionado}
          >
            <Text style={{ color: filtroSelecionado === filtro ? '#FFF' : '#333', fontWeight: '600' }}>
              {filtro}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de serviços + botão adicionar */}
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {listaServicos.map((item) => (
          <View key={item.id} style={styles.cardServico}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.nomeServico}>{item.nome}</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/Servicos/EditarServicos')}>
                  <Ionicons name="create-outline" size={16} color="#000" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>
              <Text style={styles.detalhesServico}>{item.duracao} • {item.preco}</Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleSwitch(item.id)}
              style={{
                width: 50,
                height: 30,
                borderRadius: 20,
                backgroundColor: switches[item.id] ? '#FF007F' : '#D1D5DB',
                justifyContent: 'center',
                padding: 3
              }}
            >
              <View style={{
                width: 24,
                height: 24,
                backgroundColor: '#FFF',
                borderRadius: 12,
                alignSelf: switches[item.id] ? 'flex-end' : 'flex-start'
              }} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Botão de adicionar - posicionado após a lista */}
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => router.push('/(tabs)/Servicos/CadastroServicos')}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    paddingTop: 10,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    height: 48,
  },
  cabecalhoBotao: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabecalhoCentro: {
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardEstatisticaAmarelo: {
    backgroundColor: '#E1FF00',
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#FFD600'
  },
  cardEstatisticaRosa: {
    backgroundColor: '#FFE5EF',
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#F48FB1'
  },
  cardEstatisticaTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF006F'
  },
  cardEstatisticaValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF006F'
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24
  },
  botaoSelecionado: {
    backgroundColor: '#FF006F',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 2,
  },
  botaoNaoSelecionado: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    elevation: 1,
  },
  cardServico: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  nomeServico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  detalhesServico: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  botaoAdicionar: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#FF007F',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  textoBotaoAdicionar: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default Servicos;
