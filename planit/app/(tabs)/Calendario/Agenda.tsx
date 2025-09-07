import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ModalBase from "../../../components/modais/modalBase";
import PinkBtn from "../../../components/button/pinkBtn";
import WhiteBtn from "@/components/button/whiteBtn";

import { db } from "../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type Horario = {
  name: string;
  value: number;
  status: number;
};

const meses = [
  { name: "Jan", value: 1 },
  { name: "Fev", value: 2 },
  { name: "Mar", value: 3 },
  { name: "Abr", value: 4 },
  { name: "Mai", value: 5 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 7 },
  { name: "Ago", value: 8 },
  { name: "Set", value: 9 },
  { name: "Out", value: 10 },
  { name: "Nov", value: 11 },
  { name: "Dez", value: 12 },
];

const getDiasMes = (mes: number, ano: number) => new Date(ano, mes, 0).getDate();

interface StatusModalProps {
  visible: boolean;
  currentStatus: number | null;
  onClose: () => void;
  onSelectStatus: (status: number) => void;
}

function StatusModal({
  visible,
  currentStatus,
  onClose,
  onSelectStatus,
}: StatusModalProps) {
  const allOptions = [
    { status: 1, label: "Disponibilizar", color: "green", icon: "checkmark-circle-outline" },
    { status: 3, label: "Bloquear", color: "red", icon: "remove-circle-outline" },
    { status: 2, label: "Cancelar", color: "gray", icon: "close-outline" },
  ];

  const options = allOptions.filter((opt) => {
    if (currentStatus === 1) return opt.status === 3;
    if (currentStatus === 2) return opt.status === 2;
    if (currentStatus === 3) return opt.status === 1;
    return false;
  });


  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);
  
  const [confirmExitVisible, setConfirmExitVisible] = useState(false);

  return (
    <>
     
      <Modal visible={visible} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
           
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-semibold text-center flex-1">
                Alterar status
              </Text>
              <TouchableOpacity
                onPress={() => setConfirmExitVisible(true)}
                className="p-2"
              >
                <Ionicons name="close-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View className="h-px bg-gray-200 mb-4" />

            {options.map(({ status, label, color, icon }) => {
              const isCancelOption = status === 2;
              return (
                <TouchableOpacity
                  key={status}
                  className="flex-row items-center p-3 mb-2 rounded-lg"
                  onPress={() => {
                    if (isCancelOption) {
                      setConfirmCancelVisible(true);
                    } else {
                      onSelectStatus(status);
                      onClose();
                    }
                  }}
                >
                  <Ionicons
                    name={icon as any}
                    size={24}
                    color={color}
                    style={{ marginRight: 10 }}
                  />
                  <Text className="text-lg" style={{ color }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <View className="h-px bg-gray-200 mt-4 mb-4" />

            <TouchableOpacity
              className="py-3 bg-gray-100 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-center text-gray-700 text-base">
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      <ModalBase
        visible={confirmExitVisible}
        title="Alterações não salvas"
        text="Você deseja salvar ou descartar as alterações?"
        icone="save-outline"
        onClose={() => setConfirmExitVisible(false)}
      >
        <View className="flex-row justify-between mt-4">
          <WhiteBtn
            title="Cancelar"
            onPress={() => setConfirmExitVisible(false)}
          />
          <PinkBtn
            title="Confirmar"
            onPress={() => {
              setConfirmExitVisible(false);
              onClose();
            }}
          />
        </View>
      </ModalBase>

   
      <ModalBase
        visible={confirmCancelVisible}
        title="Cancelar"
        text="Deseja realmente cancelar este agendamento?"
        icone="trash-bin-outline"
        onClose={() => setConfirmCancelVisible(false)}
      >
        <View className="flex-row justify-between mt-4">
          <WhiteBtn
            title="Não"
            onPress={() => setConfirmCancelVisible(false)}
          />
          <PinkBtn
            title="Sim"
            onPress={() => {
              onSelectStatus(2);
              setConfirmCancelVisible(false);
              onClose();
            }}
          />
        </View>
      </ModalBase>
    </>
  );
}

const getStatusCor = (status: number) => {
  switch (status) {
    case 1:
      return { text: "text-green-600", border: "border-green-600" };
    case 2:
      return { text: "text-pink-700", border: "border-pink-700" };
    case 3:
      return { text: "text-slate-500", border: "border-slate-500" };
    default:
      return { text: "text-black", border: "border-black" };
  }
};

const Agenda = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const anoAtual = new Date().getFullYear();
  const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth() + 1);
  const [diaSelecionado, setDiaSelecionado] = useState<number>(new Date().getDate());
  const [diasNoMes, setDiasNoMes] = useState<number[]>([]);

 
  const [modalVisivel, setModalVisivel] = useState(false);
  const [statusModalVisivel, setStatusModalVisivel] = useState(false);

  
  const fecharModal = () => setModalVisivel(false);
  const fecharStatusModal = () => setStatusModalVisivel(false);

  const [horarioSelecionadoState, setHorarioSelecionadoState] = useState<Horario | null>(null);

  const horariosBase: Horario[] = [
    { name: "08:00", value: 1, status: 1 },
    { name: "08:30", value: 2, status: 1 },
    { name: "09:00", value: 3, status: 1 },
    { name: "09:30", value: 4, status: 1 },
    { name: "10:00", value: 5, status: 1 },
    { name: "10:30", value: 6, status: 1 },
    { name: "11:00", value: 7, status: 1 },
    { name: "11:30", value: 8, status: 1 },
    { name: "12:00", value: 9, status: 1 },
    { name: "12:30", value: 10, status: 1 },
    { name: "13:00", value: 11, status: 1 },
    { name: "13:30", value: 12, status: 1 },
    { name: "14:00", value: 13, status: 1 },
    { name: "14:30", value: 14, status: 1 },
    { name: "15:00", value: 15, status: 1 },
    { name: "15:30", value: 16, status: 1 },
    { name: "16:00", value: 17, status: 1 },
    { name: "16:30", value: 18, status: 1 },
    { name: "17:00", value: 19, status: 1 },
    { name: "17:30", value: 20, status: 1 },
    { name: "18:00", value: 21, status: 1 },
  ];

  const [horarios, setHorarios] = useState<Horario[]>(horariosBase);

  const dataKey = `${anoAtual}-${String(mesSelecionado).padStart(2, "0")}-${String(
    diaSelecionado
  ).padStart(2, "0")}`;

  useEffect(() => {
    const dias = Array.from({ length: getDiasMes(mesSelecionado, anoAtual) }, (_, i) => i + 1);
    setDiasNoMes(dias);
    if (diaSelecionado > dias.length) setDiaSelecionado(1);
  }, [mesSelecionado]);

  useEffect(() => {
    const carregarHorarios = async () => {
      if (!userId) return;
      try {
        const docRef = doc(db, "Agenda", userId, "Horarios", dataKey);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHorarios(data.horarios || horariosBase);
        } else {
          setHorarios(horariosBase);
        }
      } catch (error) {
        console.error("Erro ao carregar horários:", error);
        setHorarios(horariosBase);
      }
    };
    carregarHorarios();
  }, [userId, mesSelecionado, diaSelecionado]);

  const abrirStatusModal = (h: Horario) => {
    setHorarioSelecionadoState(h);
    setStatusModalVisivel(true);
  };

  const handleSelectStatus = async (novoStatus: number) => {
    if (!horarioSelecionadoState || !userId) return;
    const novoHorarios = horarios.map((h) =>
      h.value === horarioSelecionadoState.value
        ? { ...h, status: novoStatus === 2 ? 1 : novoStatus }
        : h
    );
    setHorarios(novoHorarios);
    await setDoc(doc(db, "Agenda", userId, "Horarios", dataKey), {
      userId,
      data: dataKey,
      horarios: novoHorarios,
    });
  };

  const bloquearDia = () => setModalVisivel(true);

  const confirmBloquearDia = async () => {
    if (!userId) return;
    const novoHorarios = horarios.map((h) => ({ ...h, status: 3 }));
    setHorarios(novoHorarios);
    setModalVisivel(false);
    await setDoc(doc(db, "Agenda", userId, "Horarios", dataKey), {
      userId,
      data: dataKey,
      horarios: novoHorarios,
    });
  };

  const salvarNoFirestore = async () => {
    if (!userId) return;
    await setDoc(doc(db, "Agenda", userId, "Horarios", dataKey), {
      userId,
      data: dataKey,
      horarios,
    });
    navigation.goBack();
  };

  return (
    <View className="bg-white flex-1">
      <ScrollView className="mt-6">
        <View className="flex-1 bg-white p-4">

        
          <TouchableOpacity
            className="flex-row justify-center mb-4"
            onPress={bloquearDia}
          >
            <Ionicons name="lock-closed-outline" size={30} color="#4b5563" />
          </TouchableOpacity>

          
          <View className="flex-row justify-between items-center mb-4 px-4">
            <Text className="text-lg">Selecione o mês:</Text>
            <View className="border border-slate-400 rounded-full w-32">
              <RNPicker
                selectedValue={mesSelecionado}
                onValueChange={(v) => setMesSelecionado(v)}
                mode="dropdown"
                dropdownIconColor="#000"
              >
                {meses.map((m) => (
                  <RNPicker.Item key={m.value} label={m.name} value={m.value} />
                ))}
              </RNPicker>
            </View>
          </View>

         
          <View className="flex-row justify-between items-center mb-6 px-4">
            <Text className="text-lg">Selecione o dia:</Text>
            <View className="border border-slate-400 rounded-full w-32">
              <RNPicker
                selectedValue={diaSelecionado}
                onValueChange={(v) => setDiaSelecionado(v)}
                mode="dropdown"
                dropdownIconColor="#000"
              >
                {diasNoMes.map((d) => (
                  <RNPicker.Item
                    key={d}
                    label={`${String(d).padStart(2, "0")}/${String(mesSelecionado).padStart(2, "0")}`}
                    value={d}
                  />
                ))}
              </RNPicker>
            </View>
          </View>

        
          <Text className="text-center text-xl mb-4">Horários</Text>
          <View className="flex-row flex-wrap justify-center gap-4">
            {horarios.map((h) => {
              const cls = getStatusCor(h.status);
              return (
                <TouchableOpacity
                  key={h.value}
                  className={`w-20 p-4 rounded-full border ${cls.border} items-center`}
                  onPress={() => abrirStatusModal(h)}
                >
                  <Text className={cls.text}>{h.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          
          <View className="mt-6 items-center">
            <PinkBtn title="Salvar" onPress={salvarNoFirestore} />
          </View>

          
          <ModalBase
            visible={modalVisivel}
            title="Bloquear dia"
            text="Deseja realmente bloquear todos os horários deste dia?"
            icone="lock-closed-outline"
            onClose={fecharModal}
          >
            <View className="flex-row justify-between mt-4">
              <WhiteBtn title="Cancelar" onPress={fecharModal} />
              <PinkBtn title="Confirmar" onPress={confirmBloquearDia} />
            </View>
          </ModalBase>

          
          <StatusModal
            visible={statusModalVisivel}
            currentStatus={horarioSelecionadoState?.status || null}
            onClose={fecharStatusModal}
            onSelectStatus={handleSelectStatus}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Agenda;
