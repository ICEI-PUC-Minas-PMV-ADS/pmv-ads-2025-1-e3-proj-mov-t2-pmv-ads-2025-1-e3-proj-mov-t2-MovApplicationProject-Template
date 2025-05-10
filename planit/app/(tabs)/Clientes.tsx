// app/tabs/Clientes.tsx
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { Menu, Provider, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { debounce } from 'lodash';

// --- tipo Cliente ---
enum StatusCliente {
  Finalizados = 'Finalizados',
  Cancelados = 'Cancelados',
  Antigos = 'Antigos',
  Rejeitados = 'Rejeitados',
  EmAndamento = 'Em andamento',
}
type Consulta = { titulo: string; data: string };
type Cliente = {
  id: string;
  nome: string;
  ultimaVisita: string;
  imagem: any;
  status: StatusCliente;
  consultas: Consulta[];
};

// --- dados ---
const clientes: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    ultimaVisita: '10 Mar 2024',
    imagem: require('../../assets/images/rosto11.png'),
    status: StatusCliente.Finalizados,
    consultas: [
      { titulo: 'Consulta de Emergência', data: '10 Mar 2024' },
      { titulo: 'Consulta de Rotina', data: '20 Nov 2023' },
      { titulo: 'Primeira Consulta', data: '01 Jun 2023' },
    ],
  },
  {
    id: '2',
    nome: 'Ana Paula',
    ultimaVisita: '06 Mar 2024',
    imagem: require('../../assets/images/rosto4.png'),
    status: StatusCliente.Cancelados,
    consultas: [
      { titulo: 'Avaliação Inicial', data: '06 Mar 2024' },
      { titulo: 'Retorno', data: '15 Jan 2024' },
    ],
  },
  {
    id: '3',
    nome: 'Maria Lopes',
    ultimaVisita: '28 Fev 2024',
    imagem: require('../../assets/images/rosto5.png'),
    status: StatusCliente.Antigos,
    consultas: [
      { titulo: 'Check‑up Geral', data: '28 Fev 2024' },
      { titulo: 'Consulta Nutrição', data: '10 Jan 2024' },
    ],
  },
  {
    id: '4',
    nome: 'Junior Oliveira',
    ultimaVisita: '23 Fev 2024',
    imagem: require('../../assets/images/rostodois.png'),
    status: StatusCliente.Finalizados,
    consultas: [{ titulo: 'Avaliação Psicológica', data: '23 Fev 2024' }],
  },
  {
    id: '5',
    nome: 'Marco Antônio',
    ultimaVisita: '15 Fev 2024',
    imagem: require('../../assets/images/rosto3.png'),
    status: StatusCliente.Rejeitados,
    consultas: [{ titulo: 'Sessão Cancelada', data: '15 Fev 2024' }],
  },
  {
    id: '6',
    nome: 'Beatriz Souza',
    ultimaVisita: '12 Fev 2024',
    imagem: require('../../assets/images/rosto12.png'),
    status: StatusCliente.Finalizados,
    consultas: [{ titulo: 'Terapia Ocupacional', data: '12 Fev 2024' }],
  },
  {
    id: '7',
    nome: 'Carlos Mendes',
    ultimaVisita: '08 Fev 2024',
    imagem: require('../../assets/images/rosto6.png'),
    status: StatusCliente.Cancelados,
    consultas: [{ titulo: 'Consulta Cancelada', data: '08 Fev 2024' }],
  },
  {
    id: '8',
    nome: 'Fernanda Costa',
    ultimaVisita: '03 Fev 2024',
    imagem: require('../../assets/images/rosto9.png'),
    status: StatusCliente.Antigos,
    consultas: [{ titulo: 'Retorno Antigo', data: '03 Fev 2024' }],
  },
  {
    id: '9',
    nome: 'Ricardo Lima',
    ultimaVisita: '01 Fev 2024',
    imagem: require('../../assets/images/rosto10.png'),
    status: StatusCliente.Rejeitados,
    consultas: [{ titulo: 'Não Compareceu', data: '01 Fev 2024' }],
  },
  {
    id: '10',
    nome: 'Patrícia Xavier',
    ultimaVisita: '20 Abr 2024',
    imagem: require('../../assets/images/rosto7.png'),
    status: StatusCliente.EmAndamento,
    consultas: [{ titulo: 'Sessão em Andamento', data: '20 Abr 2024' }],
  },
  {
    id: '11',
    nome: 'Eduardo Tavares',
    ultimaVisita: '18 Abr 2024',
    imagem: require('../../assets/images/rosto5.png'),
    status: StatusCliente.EmAndamento,
    consultas: [{ titulo: 'Sessão em Andamento', data: '18 Abr 2024' }],
  },
];

// ——— Componentes extraídos ———
const CardCliente = React.memo(
  ({
    cliente,
    onPress,
    scaleAnim,
    rotateAnim,
  }: {
    cliente: Cliente;
    onPress: () => void;
    scaleAnim: Animated.Value;
    rotateAnim: Animated.Value;
  }) => (
    <View style={styles.card} accessible accessibilityLabel={`Cliente ${cliente.nome}`}>
      <View style={styles.cardInfo}>
        <Image
          source={cliente.imagem}
          style={styles.avatar}
          defaultSource={require('../../assets/images/icon.png')}
        />
        <View>
          <Text style={styles.nome}>{cliente.nome}</Text>
          <Text style={styles.ultima}>Última visita: {cliente.ultimaVisita}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.iconBtn} accessibilityLabel="Abrir perfil">
        <Animated.View
          style={{
            transform: [
              { scale: scaleAnim },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '90deg'],
                }),
              },
            ],
          }}>
          <Icon name="chevron-right" size={24} color="#757575" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
);

const ModalCliente = ({
  cliente,
  isVisible,
  onClose,
}: {
  cliente: Cliente | null;
  isVisible: boolean;
  onClose: () => void;
}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    style={styles.modal}>
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      {cliente && (
        <>
          <Image source={cliente.imagem} style={styles.modalAvatar} />
          <Text style={styles.modalNome}>{cliente.nome}</Text>
          {cliente.consultas.map((c, i) => (
            <View key={i} style={styles.consultaCard}>
              <Text style={styles.consultaTitulo}>{c.titulo}</Text>
              <Text style={styles.consultaData}>{c.data}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  </Modal>
);

// ——— Tela principal ———
export default function ClienteScreen() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'Todos' | 'Em andamento' | 'Concluídos'>('Todos');
  const [menuFiltroVisivel, setMenuFiltroVisivel] = useState(false);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<StatusCliente[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Debounce na busca
  const [debouncedBusca, setDebouncedBusca] = useState('');
  const debounced = useRef(
    debounce((text: string) => setDebouncedBusca(text), 300)
  ).current;
  const onChangeBusca = (text: string) => {
    setBusca(text);
    debounced(text);
  };

  const toggleFiltro = useCallback((item: StatusCliente) => {
    setFiltrosSelecionados((s) =>
      s.includes(item) ? s.filter((f) => f !== item) : [...s, item]
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const passaBusca = c.nome.toLowerCase().includes(debouncedBusca.toLowerCase());
      const passaFiltro =
        filtro === 'Todos' ||
        (filtro === 'Em andamento' && c.status === StatusCliente.EmAndamento) ||
        (filtro === 'Concluídos' && c.status === StatusCliente.Finalizados);
      if (filtrosSelecionados.length === 0) return passaBusca && passaFiltro;
      return passaBusca && passaFiltro && filtrosSelecionados.includes(c.status);
    });
  }, [debouncedBusca, filtro, filtrosSelecionados]);

  const abrirPerfil = (c: Cliente) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setClienteSelecionado(c);
    setModalAberto(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.titulo}>Histórico de clientes</Text>

        {/* filtro rápido */}
        <View style={styles.filtroRapido}>
          {(['Todos', 'Em andamento', 'Concluídos'] as const).map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFiltro(item)}
              style={[styles.botaoFiltro, filtro === item && styles.botaoFiltroAtivo]}>
              <Text style={filtro === item ? styles.txtFiltroAtivo : styles.txtFiltro}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* busca + avançado */}
        <View style={styles.buscaRow}>
          <Menu
            visible={menuFiltroVisivel}
            onDismiss={() => setMenuFiltroVisivel(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setMenuFiltroVisivel(true)}
                style={styles.iconBtn}>
                <Icon name="sliders" size={24} color="#333" />
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent}>
            <Text style={styles.menuTitle}>Selecione o filtro</Text>
            {Object.values(StatusCliente).map((f, i) => (
              <View key={i} style={styles.menuItem}>
                <Checkbox
                  status={filtrosSelecionados.includes(f) ? 'checked' : 'unchecked'}
                  onPress={() => toggleFiltro(f)}
                />
                <Text style={styles.menuTxt}>{f}</Text>
              </View>
            ))}
          </Menu>

          <TextInput
            placeholder="Buscar cliente..."
            value={busca}
            onChangeText={onChangeBusca}
            style={styles.inputBusca}
            accessibilityLabel="Campo de busca de cliente"
          />
        </View>

        <View style={styles.separador} />

        {/* lista ou vazio */}
        {clientesFiltrados.length === 0 ? (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Nenhum cliente encontrado</Text>
          </View>
        ) : (
          <FlatList
            style={styles.lista}
            data={clientesFiltrados}
            keyExtractor={(i) => i.id}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
              <CardCliente
                cliente={item}
                onPress={() => abrirPerfil(item)}
                scaleAnim={scaleAnim}
                rotateAnim={rotateAnim}
              />
            )}
          />
        )}

        {/* Modal de Perfil */}
        <ModalCliente
          cliente={clienteSelecionado}
          isVisible={modalAberto}
          onClose={() => {
            setModalAberto(false);
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 20 },
  titulo: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 20 },

  filtroRapido: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  botaoFiltro: { backgroundColor: '#e0e0e0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, marginHorizontal: 6 },
  botaoFiltroAtivo: { backgroundColor: '#ff4081' },
  txtFiltro: { color: '#333' },
  txtFiltroAtivo: { color: '#fff' },

  buscaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconBtn: { marginRight: 12, padding: 8 },
  menuContent: { backgroundColor: '#fff', borderRadius: 12, padding: 12, elevation: 2 },
  menuTitle: { fontWeight: '700', fontSize: 16, marginBottom: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  menuTxt: { fontSize: 14, color: '#374151' },
  inputBusca: { flex: 1, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 },

  separador: { height: 1, backgroundColor: '#e0e0e0', marginBottom: 16 },

  lista: { flex: 1 },
  vazioContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  vazioTexto: { fontSize: 16, color: '#999' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 16, borderWidth: 1, borderColor: '#eee' },
  nome: { fontWeight: '600', fontSize: 16 },
  ultima: { color: '#757575', fontSize: 12 },

  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  closeBtn: { position: 'absolute', top: 16, left: 16, zIndex: 10 },
  modalAvatar: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 20 },
  modalNome: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  consultaCard: { backgroundColor: '#f3f3f3', padding: 16, borderRadius: 12, marginBottom: 12 },
  consultaTitulo: { fontWeight: '600', fontSize: 16 },
  consultaData: { color: '#757575', fontSize: 12, marginTop: 4 },
});
