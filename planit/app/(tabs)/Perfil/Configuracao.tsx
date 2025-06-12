import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import ModalExcluirConta from "@/components/modais/deletarConta";
import Toast from "react-native-toast-message";

export default function ConfigScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { deleteAccount } = useAuth();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 pt-14 items-center">
      <ScrollView className="space-y-8">
        {/* Notificações */}
        <View className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">Desativar Notificações</Text>
          <Switch
            value={!notificationsEnabled}
            onValueChange={() => setNotificationsEnabled((prev) => !prev)}
            trackColor={{ false: "#d1d5db", true: "#f472b6" }}
            thumbColor={!notificationsEnabled ? Colors.principal : "#f4f3f4"}
          />
        </View>

        {/* Tema do Aplicativo */}
        <View className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">Tema do Aplicativo:</Text>
          <View className="flex-row items-center">
            <Text className="text-gray-600 mr-2">Padrão</Text>
            <ChevronDown size={20} color={Colors.principal} />
          </View>
        </View>

        {/* Termos de Serviço */}
        <TouchableOpacity className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">Termos de Serviço</Text>
        </TouchableOpacity>

        {/* Políticas */}
        <TouchableOpacity className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">
            Políticas de Privacidade e Segurança
          </Text>
        </TouchableOpacity>

        {/* Excluir Conta */}
        <TouchableOpacity
          className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-base text-error">Excluir Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <ModalExcluirConta
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={async () => {
          try {
            await deleteAccount();
            Toast.show({
              type: "success",
              text1: "Conta excluída!",
              text2: "Sua conta foi removida com sucesso.",
              position: "top",
              visibilityTime: 3000,
              autoHide: true,
            });
            setModalVisible(false);
            router.replace("/");
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Erro ao excluir",
              text2: "Tente novamente.",
              position: "top",
              visibilityTime: 3000,
              autoHide: true,
            });
            setModalVisible(false);
          }
        }}
      />
    </View>
  );
}
