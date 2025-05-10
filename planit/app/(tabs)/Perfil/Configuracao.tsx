import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { ChevronDown, Trash2, X } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import SairContaModal from "@/components/modais/sairConta";

export default function ConfigScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
          <View className="w-full max-w-md bg-white rounded-2xl overflow-hidden">
            {/* Conteúdo do Modal */}
            <View className="pt-8 pb-6">
              {/* Barra de atenção */}
              <View className="bg-pink-50 px-4 py-2 items-center">
                <Text className="text-pink-600 font-bold uppercase">
                  Atenção!
                </Text>
                <Text className="text-sm text-pink-600 text-center mt-1">
                  Esta ação é permanente e não pode ser desfeita.
                </Text>
              </View>

              {/* Título e mensagem */}
              <View className="px-6 mt-4 items-center">
                <Text className="text-base font-semibold mb-2">
                  Excluir conta
                </Text>
                <Text className="text-center text-sm mb-6">
                  Deseja realmente excluir sua conta?
                </Text>

                {/* Botão Deletar */}
                <TouchableOpacity
                  className="bg-pink-500 rounded-md w-full py-3 mb-3"
                  onPress={() => {
                    // lógica de exclusão aqui
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-center text-white font-bold">
                    Deletar minha conta
                  </Text>
                </TouchableOpacity>

                {/* Botão Cancelar */}
                <TouchableOpacity
                  className="border border-gray-300 rounded-md w-full py-3"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-center text-base">Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão de fechar “X” */}
            <Pressable
              onPress={() => setModalVisible(false)}
              className="absolute top-1 right-3 p-1"
            >
              <X size={20} color="#999" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
