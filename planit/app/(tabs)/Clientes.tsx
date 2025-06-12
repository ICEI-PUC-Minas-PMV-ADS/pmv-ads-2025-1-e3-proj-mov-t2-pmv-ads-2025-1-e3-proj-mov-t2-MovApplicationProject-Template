import React, {useState,useRef,useCallback,useMemo,useEffect,} from "react";
import {View,Text,TextInput,TouchableOpacity,Image,FlatList,Animated,StyleSheet,ActivityIndicator,} from "react-native";
import Modal from "react-native-modal";
import { Menu, Provider, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { debounce } from "lodash";
import { Colors } from "@/constants/Colors";
import { db, auth } from "../../firebaseConfig"; 
import {collection,query,where,onSnapshot,doc, getDoc,getDocs, QuerySnapshot,DocumentData,limit, } from "firebase/firestore";

enum StatusCliente {
  Finalizados = "Finalizados",
  Cancelados = "Cancelados",
  Antigos = "Antigos",
  Rejeitados = "Rejeitados",
  EmAndamento = "Em andamento",
}
type Consulta = { 
  titulo: string; 
  data: string 
};
type Cliente = {
  id: string; 
  nome: string;
  ultimaVisita: string;
  imagem: string | null;
  status: StatusCliente;
  consultas: Consulta[];
};

interface AgendamentoDoc {
  firestoreId: string;
  clienteId: string; 
  dataInicio: string;
  horaInicio: string;
  profissionalId: string;
  servicoId: string;
  status: string;
  dataFim?: string;
  horaFim?: string;
  duracao?: string;
}

interface ClienteDoc {
  id: string; 
  nome: string;
  uid?: string; 
  fotoPerfil?: string | null; // Depois que as fotos estiverem sido salvas, pode ser usado para exibir a foto do cliente, por enquanto é null mesmo
}

interface ServicoDoc {
  id: string;
  nome: string;
}


const parseAgendamentoDateTime = (dataStr: string, horaStr: string): Date => {
  return new Date(`${dataStr}T${horaStr}:00`);
};

const formatDateString = (dateStr: string | undefined): string => {
  if (!dateStr) return "Data desconhecida";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const dayFormatted = date.getDate();
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const monthFormatted = monthNames[date.getMonth()];
    return `${dayFormatted} ${monthFormatted} ${year}`;
  } catch (e) {
    console.error("Error formatting date string:", dateStr, e);
    return dateStr;
  }
};

const mapFirestoreStatusToClienteStatus = (firestoreStatus: string | undefined): StatusCliente => {
  if (!firestoreStatus) return StatusCliente.EmAndamento;
  switch (firestoreStatus.toLowerCase()) {
    case "agendado":
    case "confirmado":
      return StatusCliente.EmAndamento;
    case "concluído":
    case "concluido":
    case "finalizado":
      return StatusCliente.Finalizados;
    case "cancelado pelo cliente":
    case "cancelado pelo profissional":
    case "cancelado":
      return StatusCliente.Cancelados;
    case "rejeitado":
      return StatusCliente.Rejeitados;
    default:
      if (Object.values(StatusCliente).includes(firestoreStatus as StatusCliente)) {
        return firestoreStatus as StatusCliente;
      }
      console.warn(`Status do Firestore não mapeado: "${firestoreStatus}", usando "Em Andamento".`);
      return StatusCliente.EmAndamento;
  }
};

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
            source={cliente.imagem ? { uri: cliente.imagem } : require("../../assets/images/perfilPadrao.jpg")} // Depois que foto estiver pegando, mudar aqui e o debaixo
            style={styles.avatar}
            defaultSource={require("../../assets/images/perfilPadrao.jpg")} //aqui é o padrão que vai aparecer enquanto a foto não carrega, visto que nao esta salvando
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
          <Image
            source={cliente.imagem ? { uri: cliente.imagem } : require("../../assets/images/perfilPadrao.jpg")} //depois que foto estiver pegando , mudar aqui e o debaixo
            style={styles.modalAvatar}
            defaultSource={require("../../assets/images/perfilPadrao.jpg")} // aqui é o padrão que vai aparecer enquanto a foto não carrega, visto que nao esta salvando
            />  
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
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<StatusCliente[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [debouncedBusca, setDebouncedBusca] = useState("");
  const debounced = useRef(debounce((text: string) => setDebouncedBusca(text), 300)).current;

  const [allClientesData, setAllClientesData] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentProfissionalId, setCurrentProfissionalId] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentProfissionalId(user.uid);
    } else {
      const unsubscribeAuth = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          setCurrentProfissionalId(authUser.uid);
        } else {
          setCurrentProfissionalId(null);
          setAllClientesData([]);
          setLoading(false); 
          setError("Profissional não autenticado.");
        }
      });
      return () => {
        unsubscribeAuth();
      }
    }
  }, []);


  useEffect(() => {

    if (!currentProfissionalId) {
      if(loading && !auth.currentUser) setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const agendamentosRef = collection(db, "Agendamento");
    const q = query(agendamentosRef, where("profissionalId", "==", currentProfissionalId));


    const unsubscribeSnapshots = onSnapshot(q, async (agendamentosSnapshot: QuerySnapshot<DocumentData>) => {

      if (agendamentosSnapshot.empty) {
        setAllClientesData([]);
        setLoading(false);
        return;
      }

      const fetchedAgendamentos: AgendamentoDoc[] = agendamentosSnapshot.docs.map(d => ({
        firestoreId: d.id,
        ...(d.data() as Omit<AgendamentoDoc, 'firestoreId'>),
      }));

      const uniqueClienteUidsFromAgendamento = Array.from(new Set(fetchedAgendamentos.map(ag => ag.clienteId).filter(id => !!id)));
      const uniqueServicoIds = Array.from(new Set(fetchedAgendamentos.map(ag => ag.servicoId).filter(id => !!id)));

      if (uniqueClienteUidsFromAgendamento.length === 0) {
          setAllClientesData([]);
          setLoading(false);
          return;
      }


      const clienteDetailsPromises = uniqueClienteUidsFromAgendamento.map(async (uidParaBuscar) => {
        const clienteQuery = query(collection(db, "Cliente"), where("uid", "==", uidParaBuscar), limit(1));
        const clienteQuerySnapshot = await getDocs(clienteQuery);
        if (!clienteQuerySnapshot.empty) {
          return clienteQuerySnapshot.docs[0]; 
        }
        return null; 
      });

      const servicoDetailsPromises = uniqueServicoIds.map(id => getDoc(doc(db, "Servicos", id)));

      try {
        const [clienteDocSnapshots, servicoDocsSnap] = await Promise.all([ // Renomeado para clienteDocSnapshots
          Promise.all(clienteDetailsPromises),
          Promise.all(servicoDetailsPromises),
        ]);

        const clientesMap = new Map<string, ClienteDoc>();
        clienteDocSnapshots.forEach(snap => { 
          if (snap && snap.exists()) { 
            const data = snap.data();
            clientesMap.set(data.uid, { id: snap.id, nome: data.nome || "Nome não informado no DB", uid: data.uid }); // Armazenando por data.uid
          } else {
          }
        });

        const servicosMap = new Map<string, ServicoDoc>();
        servicoDocsSnap.forEach(snap => {
          if (snap.exists()) {
            servicosMap.set(snap.id, { id: snap.id, ...snap.data() } as ServicoDoc);
          }
        });

        const agendamentosPorClienteUid: Record<string, AgendamentoDoc[]> = {};
        fetchedAgendamentos.forEach(ag => {
          if (!ag.clienteId) return; 
          if (!agendamentosPorClienteUid[ag.clienteId]) {
            agendamentosPorClienteUid[ag.clienteId] = [];
          }
          agendamentosPorClienteUid[ag.clienteId].push(ag);
        });

        const finalClientesArray: Cliente[] = Object.keys(agendamentosPorClienteUid)
          .map(clienteUidNoAgendamento => { 
            const clienteInfo = clientesMap.get(clienteUidNoAgendamento); 

            const seusAgendamentos = agendamentosPorClienteUid[clienteUidNoAgendamento]
              .filter(ag => ag.dataInicio && ag.horaInicio && ag.servicoId)
              .sort((a, b) => parseAgendamentoDateTime(b.dataInicio, b.horaInicio).getTime() - parseAgendamentoDateTime(a.dataInicio, a.horaInicio).getTime());

            if (seusAgendamentos.length === 0) return null;
            const ultimoAgendamento = seusAgendamentos[0];

            return {
              id: clienteInfo?.id || clienteUidNoAgendamento, 
              nome: clienteInfo?.nome || "Cliente Desconhecido",
              ultimaVisita: formatDateString(ultimoAgendamento.dataInicio),
              imagem: null,
              status: mapFirestoreStatusToClienteStatus(ultimoAgendamento.status),
              consultas: seusAgendamentos.map(ag => {
                const servicoInfo = servicosMap.get(ag.servicoId);
                return {
                  titulo: servicoInfo?.nome || "Serviço Removido",
                  data: formatDateString(ag.dataInicio),
                };
              }),
            };
          })
          .filter(cliente => cliente !== null) as Cliente[];

        setAllClientesData(finalClientesArray);

      } catch (fetchError) {
        setError("Falha ao carregar detalhes dos clientes/serviços.");
      } finally {
        setLoading(false);
      }
    }, (err) => {
      setError("Falha ao carregar agendamentos.");
      setLoading(false);
    });

    return () => {
      unsubscribeSnapshots();
    }
  }, [currentProfissionalId]);

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
    return allClientesData.filter((c) => {
      const passaBusca = c.nome?.toLowerCase().includes(debouncedBusca.toLowerCase());
      const passaFiltroRapido =
        filtro === "Todos" ||
        (filtro === "Em andamento" && c.status === StatusCliente.EmAndamento) ||
        (filtro === "Concluídos" && c.status === StatusCliente.Finalizados);

      if (filtrosSelecionados.length === 0) return passaBusca && passaFiltroRapido;
      return passaBusca && passaFiltroRapido && filtrosSelecionados.includes(c.status);
    });
  }, [allClientesData, debouncedBusca, filtro, filtrosSelecionados]);

  const abrirPerfil = (c: Cliente) => {
    setClienteSelecionado(c);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteSelecionado(null);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.principal} />
        <Text style={{ marginTop: 10 }}>Carregando clientes...</Text>
      </View>
    );
  }

  if (error && !loading) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error}</Text>
        <TouchableOpacity onPress={() => {
            setError(null);
            setLoading(true);
            const uid = auth.currentUser?.uid;
            if (uid) {
                setCurrentProfissionalId(uid + "_retry" + Math.random().toString(36).substring(7)); 
                setTimeout(() => setCurrentProfissionalId(uid), 50); 
            } else {
                setCurrentProfissionalId(null); 
            }
        }} style={{marginTop: 10, padding: 10, backgroundColor: Colors.principal}}>
            <Text style={{color: Colors.branco}}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
                  style={styles.iconBtnMenu}
                >
                  <Icon name="sliders" size={24} color="#333" />
                </TouchableOpacity>
              }
              contentStyle={styles.menuContent}
            >
              <Text style={styles.menuTitle}>Selecione o filtro</Text>
              {Object.values(StatusCliente).map((f, i) => (
                <View key={String(f) + i} style={styles.menuItem}>
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
              <Text style={styles.vazioTexto}>
                {allClientesData.length === 0 && !loading ? "Nenhum cliente encontrado." : "Nenhum cliente corresponde aos filtros."}
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.lista}
              data={clientesFiltrados}
              keyExtractor={(item) => item.id}
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


// fiz algumas mudanças no estilo para arrumar alguns erros de layout e melhorar a responsividade, se quiser pode voltar ao normal depois , ja fiz os ajustes.
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
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
  iconBtn: {
    padding: 8,
  },
  iconBtnMenu: {
    marginRight: 12,
    padding: 8,
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  menuTitle: { fontWeight: "700", fontSize: 16, marginBottom: 12 },
  menuItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  menuTxt: { fontSize: 14, color: "#374151", marginLeft: 8 },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardInfo: { flexDirection: "row", alignItems: "center", flex: 1, marginRight: 8 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  nome: { fontWeight: "600", fontSize: 16, color: "#333" },
  ultima: { color: "#757575", fontSize: 12, marginTop: 2 },

  modal: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "50%",
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
    color: "#333",
  },
  consultaCard: {
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  consultaTitulo: { fontWeight: "600", fontSize: 16, color: "#444" },
  consultaData: { color: "#757575", fontSize: 12, marginTop: 4 },
});

