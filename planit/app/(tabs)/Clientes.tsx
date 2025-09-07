import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { Menu, Provider, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { debounce } from "lodash";
import { Colors } from "@/constants/Colors";

enum StatusCliente {
  Finalizados = "Finalizados",
  Cancelados = "Cancelados",
  Antigos = "Antigos",
  Rejeitados = "Rejeitados",
  EmAndamento = "Em andamento",
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

const clientes: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    ultimaVisita: "10 Mar 2024",
    imagem: "https://randomuser.me/api/portraits/men/40.jpg",
    status: StatusCliente.Finalizados,
    consultas: [
      { titulo: "Consulta de Emergência", data: "10 Mar 2024" },
      { titulo: "Consulta de Rotina", data: "20 Nov 2023" },
      { titulo: "Primeira Consulta", data: "01 Jun 2023" },
    ],
  },
  {
    id: "2",
    nome: "Ana Paula",
    ultimaVisita: "06 Mar 2024",
    imagem: "https://randomuser.me/api/portraits/women/44.jpg",
    status: StatusCliente.Cancelados,
    consultas: [
      { titulo: "Avaliação Inicial", data: "06 Mar 2024" },
      { titulo: "Retorno", data: "15 Jan 2024" },
    ],
  },
  {
    id: "3",
    nome: "Maria Lopes",
    ultimaVisita: "28 Fev 2024",
    imagem: "https://randomuser.me/api/portraits/women/32.jpg",
    status: StatusCliente.Antigos,
    consultas: [
      { titulo: "Check‑up Geral", data: "28 Fev 2024" },
      { titulo: "Consulta Nutrição", data: "10 Jan 2024" },
    ],
  },
  {
    id: "4",
    nome: "Junior Oliveira",
    ultimaVisita: "23 Fev 2024",
    imagem: "https://randomuser.me/api/portraits/men/4.jpg",
    status: StatusCliente.Finalizados,
    consultas: [{ titulo: "Avaliação Psicológica", data: "23 Fev 2024" }],
  },
  {
    id: "5",
    nome: "Marco Antônio",
    ultimaVisita: "15 Fev 2024",
    imagem: "https://randomuser.me/api/portraits/men/10.jpg",
    status: StatusCliente.Rejeitados,
    consultas: [{ titulo: "Sessão Cancelada", data: "15 Fev 2024" }],
  },
  {
    id: "6",
    nome: "Beatriz Souza",
    ultimaVisita: "12 Fev 2024",
    imagem: "https://randomuser.me/api/portraits/women/8.jpg",
    status: StatusCliente.Finalizados,
    consultas: [{ titulo: "Terapia Ocupacional", data: "12 Fev 2024" }],
  },
  {
    id: "7",
    nome: "Carlos Mendes",
    ultimaVisita: "08 Fev 2024",
    imagem: "https://randomuser.me/api/portraits/men/80.jpg",
    status: StatusCliente.Cancelados,
    consultas: [{ titulo: "Consulta Cancelada", data: "08 Fev 2024" }],
  },
  {
    id: "8",
    nome: "Fernanda Costa",
    ultimaVisita: "03 Fev 2024",
    imagem: "https://randomuser.me/api/portraits/women/60.jpg",
    status: StatusCliente.Antigos,
    consultas: [{ titulo: "Retorno Antigo", data: "03 Fev 2024" }],
  },
];

const CardCliente = React.memo(
  ({
    cliente,
    onPress,
    isSelected,
  }: {
    cliente: Cliente;
    onPress: (c: Cliente) => void;
    isSelected: boolean;
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });

    useEffect(() => {
      Animated.timing(rotateAnim, {
        toValue: isSelected ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [isSelected, rotateAnim]);

    const handlePress = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      onPress(cliente);
    };

    return (
      <View
        style={styles.card}
        accessible
        accessibilityLabel={`Cliente ${cliente.nome}`}
      >
        <View style={styles.cardInfo}>
          <Image
            source={{ uri: cliente.imagem }}
            style={styles.avatar}
            defaultSource={require("../../assets/images/icon.png")}
          />
          <View>
            <Text style={styles.nome}>{cliente.nome}</Text>
            <Text style={styles.ultima}>
              Última visita: {cliente.ultimaVisita}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.iconBtn}
          accessibilityLabel="Abrir perfil"
        >
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
            }}
          >
            <Icon name="chevron-right" size={24} color="#757575" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
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
    style={styles.modal}
  >
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      {cliente && (
        <>
          <Image source={{ uri: cliente.imagem }} style={styles.modalAvatar} />
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

export default function ClienteScreen() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"Todos" | "Em andamento" | "Concluídos">(
    "Todos"
  );
  const [menuFiltroVisivel, setMenuFiltroVisivel] = useState(false);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<
    StatusCliente[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null
  );

  const [debouncedBusca, setDebouncedBusca] = useState("");
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
      const passaBusca = c.nome
        .toLowerCase()
        .includes(debouncedBusca.toLowerCase());
      const passaFiltro =
        filtro === "Todos" ||
        (filtro === "Em andamento" && c.status === StatusCliente.EmAndamento) ||
        (filtro === "Concluídos" && c.status === StatusCliente.Finalizados);
      if (filtrosSelecionados.length === 0) return passaBusca && passaFiltro;
      return (
        passaBusca && passaFiltro && filtrosSelecionados.includes(c.status)
      );
    });
  }, [debouncedBusca, filtro, filtrosSelecionados]);

  const abrirPerfil = (c: Cliente) => {
    setClienteSelecionado(c);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteSelecionado(null);
  };

  return (
    <Provider>
      <View className="bg-white flex-1">
        <View style={styles.container}>
          <View style={styles.filtroRapido}>
            {(["Todos", "Em andamento", "Concluídos"] as const).map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setFiltro(item)}
                style={[
                  styles.botaoFiltro,
                  filtro === item && styles.botaoFiltroAtivo,
                ]}
              >
                <Text
                  style={
                    filtro === item ? styles.txtFiltroAtivo : styles.txtFiltro
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buscaRow}>
            <Menu
              visible={menuFiltroVisivel}
              onDismiss={() => setMenuFiltroVisivel(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setMenuFiltroVisivel(true)}
                  style={styles.iconBtn}
                >
                  <Icon name="sliders" size={24} color="#333" />
                </TouchableOpacity>
              }
              contentStyle={styles.menuContent}
            >
              <Text style={styles.menuTitle}>Selecione o filtro</Text>
              {Object.values(StatusCliente).map((f, i) => (
                <View key={i} style={styles.menuItem}>
                  <Checkbox
                    status={
                      filtrosSelecionados.includes(f) ? "checked" : "unchecked"
                    }
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
                  onPress={abrirPerfil}
                  isSelected={clienteSelecionado?.id === item.id}
                />
              )}
            />
          )}
        </View>

        <ModalCliente
          cliente={clienteSelecionado}
          isVisible={modalAberto}
          onClose={fecharModal}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  filtroRapido: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  botaoFiltro: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  botaoFiltroAtivo: { backgroundColor: Colors.principal },
  txtFiltro: { color: "#333" },
  txtFiltroAtivo: { color: "#fff" },

  buscaRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconBtn: { marginRight: 12, padding: 8 },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  menuTitle: { fontWeight: "700", fontSize: 16, marginBottom: 12 },
  menuItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  menuTxt: { fontSize: 14, color: "#374151" },
  inputBusca: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  separador: { height: 1, backgroundColor: "#e0e0e0", marginBottom: 16 },

  lista: { flex: 1 },
  vazioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  vazioTexto: { fontSize: 16, color: "#999" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  cardInfo: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  nome: { fontWeight: "600", fontSize: 16 },
  ultima: { color: "#757575", fontSize: 12 },

  modal: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeBtn: { position: "absolute", top: 16, left: 16, zIndex: 10 },
  modalAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalNome: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  consultaCard: {
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  consultaTitulo: { fontWeight: "600", fontSize: 16 },
  consultaData: { color: "#757575", fontSize: 12, marginTop: 4 },
});
