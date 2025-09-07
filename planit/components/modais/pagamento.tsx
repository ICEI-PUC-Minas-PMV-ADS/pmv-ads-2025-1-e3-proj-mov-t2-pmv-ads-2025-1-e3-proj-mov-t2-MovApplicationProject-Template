import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import ModalBase from "./modalBase";
import { Feather } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function MetodoPagamentoModal({ visible, onClose }: Props) {
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <ModalBase
      visible={visible}
      onClose={onClose}
      icone="card"
      title="Método de pagamento"
      text="Insira os detalhes do seu cartão para continuar suas compras com segurança."
    >
      {/* Preview do cartão */}
      <View className="w-full h-44 rounded-xl overflow-hidden mb-1">
        <Image
          source={require("@/assets/images/cardMockup.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      {/* Formulário */}
      <View className="mt-2 space-y-7  w-full">
        <View>
          <Text className="text-sm font-medium my-2">
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
            <Text className="text-sm font-medium my-2">Data de validade</Text>
            <TextInput
              value={expiry}
              onChangeText={setExpiry}
              placeholder="MM / AAAA"
              className="border border-gray-200 rounded-lg h-12 px-3"
            />
          </View>
          <View className="w-24">
            <Text className="text-sm font-medium my-2">CVV</Text>
            <TextInput
              value={cvv}
              onChangeText={setCvv}
              placeholder="•••"
              secureTextEntry
              keyboardType="numeric"
              maxLength={3}
              className="border border-gray-200 rounded-lg h-12 px-3"
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-medium my-2">Número do cartão</Text>
          <View className="flex-row items-center border border-gray-200 rounded-lg h-12 px-3">
            <Feather
              name="credit-card"
              size={20}
              color="#000"
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
      <View className="mt-1 flex-row  w-full">
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 border border-gray-300  mr-3 rounded-mb h-12 justify-center items-center"
        >
          <Text className="text-base text-black">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 bg-principal rounded-mb h-12 justify-center items-center"
        >
          <Text className="text-base text-white font-bold">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ModalBase>
  );
}
