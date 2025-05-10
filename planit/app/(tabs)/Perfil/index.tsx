import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { X } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import SairContaModal from "@/components/modais/sairConta";

const shareLink = "www.planit.com/id.name=iriana";
const profileImage =
  "https://i.pinimg.com/280x280_RS/53/3e/03/533e031c488dd2ec98c186e90a89d1c0.jpg";

export default function Perfil() {
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <>
      <ScrollView className="bg-white px-4 pt-10">
        {/* Foto do Perfil */}
        <View className="flex-row items-center my-6 ml-3">
          <Image
            source={{ uri: profileImage }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-2xl font-semibold ml-6">Iriana Darua</Text>
        </View>

        {/* Lista de Opções */}
        <View className="mx-3">
          <Item
            icon={<Ionicons name="person" size={15} color={Colors.preto} />}
            label="Conta"
            onPress={() => router.push("/Perfil/Conta")}
          />
          <Item
            icon={<Feather name="settings" size={15} color={Colors.preto} />}
            label="Configurações"
            onPress={() => router.push("/Perfil/Configuracao")}
          />
          <Item
            icon={<Feather name="share-2" size={15} color={Colors.preto} />}
            label="Compartilhar Agenda"
            onPress={() => setShareModalVisible(true)}
          />
          <Item
            icon={
              <MaterialIcons name="payment" size={15} color={Colors.preto} />
            }
            label="Métodos de Pagamento"
            onPress={() => setPayModalVisible(true)}
          />
          <Item
            icon={
              <MaterialIcons name="logout" size={15} color={Colors.preto} />
            }
            label="Logout"
            textColor="text-error"
            onPress={() => setLogoutModalVisible(true)}
          />
        </View>
      </ScrollView>

      <SairContaModal
        visible={logoutModalVisible}
        title="Deseja sair da conta?"
        text="Você deseja encerrar as suas atividades?"
        icone="log-out-outline"
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={() => setLogoutModalVisible(true)}
      ></SairContaModal>

      {/* Modal Compartilhar Agenda */}
      <Modal
        animationType="fade"
        transparent
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
          <View className="w-full max-w-md bg-white rounded-2xl overflow-hidden">
            <Pressable
              className="absolute top-3 right-3 p-1"
              onPress={() => setShareModalVisible(false)}
            >
              <X size={20} color="#999" />
            </Pressable>
            <View className="pt-6 px-6">
              <Text className="text-center text-lg font-semibold">
                Compartilhe seu perfil!
              </Text>
              <Text className="text-center text-sm text-gray-500 mt-2">
                Compartilhe seu link de agendamento com seus clientes e facilite
                o agendamento de consultas!
              </Text>
            </View>
            <View className="px-6 mt-4 mb-6">
              <Text className="text-sm font-semibold mb-2">
                Compartilhar link
              </Text>
              <View className="flex-row items-center border border-gray-200 rounded-lg p-3">
                <Text className="flex-1">{shareLink}</Text>
                <Pressable
                  onPress={async () => {
                    await Clipboard.setStringAsync(shareLink);
                    Alert.alert("Link copiado!");
                  }}
                >
                  <Feather name="copy" size={20} color={Colors.preto} />
                </Pressable>
              </View>
            </View>
            <View className="px-6 pb-6">
              <TouchableOpacity
                className="bg-pink-500 rounded-md w-full py-3 mb-3"
                onPress={() => setShareModalVisible(false)}
              >
                <Text className="text-center text-white font-bold">
                  Confirmar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border border-gray-300 rounded-md w-full py-3"
                onPress={() => setShareModalVisible(false)}
              >
                <Text className="text-center text-base">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Métodos de Pagamento */}
      <Modal
        animationType="fade"
        transparent
        visible={payModalVisible}
        onRequestClose={() => setPayModalVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center p-4">
          <View className="w-full max-w-md bg-white rounded-2xl overflow-hidden">
            {/* Preview do Cartão */}
            <View className="pt-6 px-6 items-center">
              <View className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-gradient-to-r from-purple-300 via-yellow-200 to-pink-300">
                <View className="flex-1 p-4 justify-between">
                  <Text className="text-white opacity-70">Sem título</Text>
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-white text-sm font-semibold">
                        OLIVIA RIBEIRO
                      </Text>
                      <Text className="text-white text-sm">06 / 28</Text>
                    </View>
                    <MaterialIcons name="credit-card" size={24} color="white" />
                  </View>
                  <Text className="text-white tracking-widest">
                    1234 1234 1234 1234
                  </Text>
                </View>
              </View>

              {/* Título e descrição */}
              <Text className="text-lg font-semibold text-black">
                Método de pagamento
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-1">
                Insira os detalhes do seu cartão para continuar suas compras com
                segurança.
              </Text>
            </View>

            {/* Formulário */}
            <View className="px-6 mt-6 space-y-4">
              <View>
                <Text className="text-sm font-medium mb-1">
                  Nome do titular do cartão
                </Text>
                <TextInput
                  value={cardName}
                  onChangeText={setCardName}
                  placeholder="Olivia Ribeiro"
                  className="border border-gray-200 rounded-lg h-12 px-3"
                />
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-sm font-medium mb-1">
                    Data de validade
                  </Text>
                  <TextInput
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="MM / AAAA"
                    className="border border-gray-200 rounded-lg h-12 px-3"
                  />
                </View>
                <View className="w-24">
                  <Text className="text-sm font-medium mb-1">CVV</Text>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="•••"
                    secureTextEntry
                    className="border border-gray-200 rounded-lg h-12 px-3"
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium mb-1">
                  Número do cartão
                </Text>
                <View className="flex-row items-center border border-gray-200 rounded-lg h-12 px-3">
                  <Feather
                    name="credit-card"
                    size={20}
                    color={Colors.preto}
                    className="mr-2"
                  />
                  <TextInput
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="1234 1234 1234 1234"
                    keyboardType="numeric"
                    className="flex-1 h-full"
                  />
                </View>
              </View>
            </View>

            {/* Botões */}
            <View className="px-6 pb-6 pt-4 flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setPayModalVisible(false)}
                className="flex-1 border border-gray-300 rounded-full h-12 justify-center items-center"
              >
                <Text className="text-base text-black">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPayModalVisible(false)}
                className="flex-1 bg-pink-500 rounded-full h-12 justify-center items-center"
              >
                <Text className="text-base text-white font-bold">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const Item = ({
  icon,
  label,
  textColor = "text-black",
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  textColor?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-7 border-b border-gray-100"
  >
    <View className="flex-row items-center">
      <View className="bg-violet-100 justify-center items-center w-10 h-10 rounded-2xl mr-3">
        {icon}
      </View>
      <Text className={`text-base ${textColor}`}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);
