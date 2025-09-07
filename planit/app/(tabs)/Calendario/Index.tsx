import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../firebaseConfig";
import PinkBtn from "../../../components/button/pinkBtn";

interface CalendarDay {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const statusMap: Record<number, "disponivel" | "agendado" | "bloqueado"> = {
  1: "disponivel",
  2: "agendado",
  3: "bloqueado",
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface Horario {
  hora: string;
  status: "disponivel" | "agendado" | "bloqueado";
}

const Calendario = () => {
  const [dataSelecionada, setDataSelecionada] = useState(formatDate(new Date()));
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!dataSelecionada || !userId) return;

    setLoading(true);
    setMensagem(null);

    const refAgenda = doc(db, "Agenda", userId, "Horarios", dataSelecionada);
    const refAgendamento = doc(db, "Agendamento", userId, "Dias", dataSelecionada);

    const unsubAgenda = onSnapshot(
      refAgenda,
      (docSnap) => {
        let listaAgenda: Horario[] = [];

        if (docSnap.exists()) {
          const data = docSnap.data();
          listaAgenda = (data.horarios || []).map((h: any) => ({
            hora: h.name,
            status: statusMap[h.status] || "disponivel",
          }));
        }

        getDoc(refAgendamento)
          .then((agendamentoSnap) => {
            let listaAgendados: Horario[] = [];

            if (agendamentoSnap.exists()) {
              const data = agendamentoSnap.data();
              listaAgendados = (data.horarios || []).map((h: any) => ({
                hora: h.hora || h.name,
                status: "agendado" as const,
              }));
            }

            const horariosFiltrados = listaAgenda.filter(
              (h) => !listaAgendados.find((a) => a.hora === h.hora)
            );

            const final = [...horariosFiltrados, ...listaAgendados];

            setHorarios(final);
            setMensagem(
              final.length === 0
                ? "Nenhum horário cadastrado para essa data."
                : null
            );
            setLoading(false);
          })
          .catch((error) => {
            console.error("Erro ao buscar agendamentos:", error);
            setMensagem("Erro ao buscar horários.");
            setHorarios([]);
            setLoading(false);
          });
      },
      (error) => {
        console.error("Erro ao escutar documento:", error);
        setMensagem("Erro ao buscar horários.");
        setHorarios([]);
        setLoading(false);
      }
    );

    setMarkedDates({
      [dataSelecionada]: {
        selected: true,
        selectedColor: "#FF69B4",
      },
    });

    return () => unsubAgenda();
  }, [dataSelecionada, userId]);

  const renderHorarios = (status: Horario["status"], cor: string) => {
    const filtrados = horarios.filter((h) => h.status === status);
    if (filtrados.length === 0) return null;

    const titulo = `Horários ${status}`;

    return (
      <View
        key={status}
        style={{
          margin: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 16,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 16,
            textTransform: "capitalize",
          }}
        >
          {titulo}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filtrados.map((h, i) => (
            <View
              key={`${status}-${i}`}
              style={{
                borderWidth: 2,
                padding: 12,
                borderRadius: 50,
                borderColor: cor,
                margin: 4,
              }}
            >
              <Text style={{ color: cor }}>{h.hora}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={{ marginTop: 24, marginBottom: 20 }}>
          <Calendar
            onDayPress={(day: CalendarDay) => setDataSelecionada(day.dateString)}
            markedDates={markedDates}
          />
        </View>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#FF69B4" />
            <Text style={{ marginTop: 12, color: "#888" }}>Carregando horários...</Text>
          </View>
        ) : mensagem ? (
          <Text style={{ textAlign: "center", color: "#888", marginTop: 24 }}>
            {mensagem}
          </Text>
        ) : (
          <>
            {renderHorarios("disponivel", "green")}
            {renderHorarios("bloqueado", "gray")}
            {renderHorarios("agendado", "#FF69B4")}
          </>
        )}

        <View
          style={{
            marginTop: 24,
            marginBottom: 32,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <PinkBtn
            title="Editar Agenda"
            onPress={() => router.push("/(tabs)/Calendario/Agenda")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Calendario;
