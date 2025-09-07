import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  Timestamp,
  Query,
  QueryDocumentSnapshot,
  FirestoreError,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

interface Servico {
  id: string;
  nome: string;
  duracao: string;
  valor: string;
  ativo: boolean;
  criadoEm: Timestamp;
}

type Filtro = "Todos" | "Ativos" | "Inativos" | "Recentes";

const PAGE_SIZE = 10;

export default function Servicos() {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [debouncedFiltro, setDebouncedFiltro] = useState<Filtro>(filtro);
  const [switches, setSwitches] = useState<Record<string, boolean>>({});
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedFiltro(filtro), 500);
    return () => clearTimeout(timeout);
  }, [filtro]);

  const buildBaseQuery = useCallback((): Query => {
    const user = auth.currentUser;
    if (!user) throw new Error("no-user");
    let base = query(collection(db, "Servicos"), where("uid", "==", user.uid));
    if (debouncedFiltro === "Recentes")
      base = query(base, orderBy("criadoEm", "desc"));
    if (debouncedFiltro === "Ativos")
      base = query(base, where("ativo", "==", true));
    if (debouncedFiltro === "Inativos")
      base = query(base, where("ativo", "==", false));
    return query(base, limit(PAGE_SIZE));
  }, [debouncedFiltro]);

  useEffect(() => {
    setLoading(true);
    setServicos([]);
    setLastDoc(null);
    setHasMore(true);
    const user = auth.currentUser;
    if (!user) return router.replace("/Login");

    const q = buildBaseQuery();
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const items: Servico[] = [];
        const switchStates: Record<string, boolean> = {};
        snap.forEach((d: QueryDocumentSnapshot) => {
          const data = d.data() as any;
          items.push({
            id: d.id,
            nome: data.nome,
            duracao: data.duracao,
            valor: data.valor,
            ativo: data.ativo,
            criadoEm: data.criadoEm,
          });
          switchStates[d.id] = data.ativo;
        });
        setServicos(items);
        setSwitches(switchStates);
        setLastDoc(snap.docs[snap.docs.length - 1] || null);
        setHasMore(snap.docs.length === PAGE_SIZE);
        setLoading(false);
      },
      (err: FirestoreError) => {
        console.error(err);
        Alert.alert("Erro", "Não foi possível carregar serviços.");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [buildBaseQuery, router]);

  const carregarMais = useCallback(async () => {
    if (!lastDoc || !hasMore) return;
    setLoading(true);
    const user = auth.currentUser;
    if (!user) return router.replace("/Login");

    try {
      let paged = query(
        collection(db, "Servicos"),
        where("uid", "==", user.uid)
      );
      if (debouncedFiltro === "Recentes")
        paged = query(paged, orderBy("criadoEm", "desc"));
      if (debouncedFiltro === "Ativos")
        paged = query(paged, where("ativo", "==", true));
      if (debouncedFiltro === "Inativos")
        paged = query(paged, where("ativo", "==", false));
      paged = query(paged, startAfter(lastDoc), limit(PAGE_SIZE));

      const snap = await getDocs(paged);
      const items = [...servicos];
      const switchStates = { ...switches };
      snap.forEach((d: QueryDocumentSnapshot) => {
        const data = d.data() as any;
        items.push({
          id: d.id,
          nome: data.nome,
          duracao: data.duracao,
          valor: data.valor,
          ativo: data.ativo,
          criadoEm: data.criadoEm,
        });
        switchStates[d.id] = data.ativo;
      });
      setServicos(items);
      setSwitches(switchStates);
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar mais serviços.");
    } finally {
      setLoading(false);
    }
  }, [debouncedFiltro, hasMore, lastDoc, router, servicos, switches]);

  const toggleAtivo = useCallback(
    async (id: string) => {
      try {
        await updateDoc(doc(db, "Servicos", id), { ativo: !switches[id] });
      } catch {
        Alert.alert("Erro", "Não foi possível alterar status.");
      }
    },
    [switches]
  );

  const countAtivos = servicos.filter((s) => s.ativo).length;
  const countInativos = servicos.length - countAtivos;

  const renderItem: ListRenderItem<Servico> = ({ item }) => (
    <View style={styles.card}>
      <View>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(tabs)/Servicos/EditarServicos",
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="create-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDetails}>
          {item.duracao} • R$ {item.valor}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleAtivo(item.id)}
        style={[
          styles.switchOuter,
          { backgroundColor: switches[item.id] ? "#FF007F" : "#D1D5DB" },
        ]}
      >
        <View
          style={[
            styles.switchInner,
            { alignSelf: switches[item.id] ? "flex-end" : "flex-start" },
          ]}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading && servicos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF006F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.cardEstatisticaAmarelo}>
          <Text style={styles.statsTitle}>Serviços Ativos</Text>
          <Text style={styles.statsValue}>{countAtivos}</Text>
        </View>
        <View style={styles.cardEstatisticaRosa}>
          <Text style={styles.statsTitle}>Serviços Inativos</Text>
          <Text style={styles.statsValue}>{countInativos}</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {(["Todos", "Ativos", "Inativos", "Recentes"] as Filtro[]).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltro(f)}
            style={filtro === f ? styles.filterActive : styles.filterInactive}
          >
            <Text
              style={
                filtro === f
                  ? styles.filterTextActive
                  : styles.filterTextInactive
              }
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <>
            {hasMore && !loading && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={carregarMais}
              >
                <Text style={styles.loadMoreButtonText}>Carregar Mais</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/(tabs)/Servicos/CadastroServicos")}
            >
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator style={{ marginTop: 16 }} color="#FF006F" />
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    paddingTop: 10,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardEstatisticaAmarelo: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#E1FF00",
    borderRadius: 12,
    marginRight: 8,
    alignItems: "flex-start",
    paddingVertical: 16,
  },
  cardEstatisticaRosa: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#FFE5EF",
    borderRadius: 12,
    alignItems: "flex-start",
    paddingVertical: 16,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 16,
    color: "#FF006F",
  },
  statsValue: {
    fontSize: 32,
    marginLeft: 16,
    fontWeight: "600",
    color: "#FF006F",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  filterActive: {
    backgroundColor: "#FF006F",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  filterInactive: {
    backgroundColor: "#f1f5f9", // slate-100 do tailwind
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  filterTextActive: {
    color: "#FFF",
  },
  filterTextInactive: {
    color: "#333",
  },
  list: {
    paddingBottom: 32,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 9,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 6,
  },
  cardDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  switchOuter: {
    width: 50,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    padding: 3,
  },
  switchInner: {
    width: 24,
    height: 24,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  addButton: {
    marginTop: 24,
    alignSelf: "center",
    backgroundColor: "#FF007F",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadMoreButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#FF007F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  loadMoreButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
