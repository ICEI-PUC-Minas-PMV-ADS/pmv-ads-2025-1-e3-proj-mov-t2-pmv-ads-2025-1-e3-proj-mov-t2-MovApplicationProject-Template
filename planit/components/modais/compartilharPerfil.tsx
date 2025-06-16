import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  Platform,
  ToastAndroid,
  Image,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import ModalBase from "./modalBase";
import { Feather } from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";

const profileImage = "https://example.com/default-profile.png";

type Props = {
  visible: boolean;
  onClose: () => void;
  displayName: string;
  photoURL?: string;
};

export default function CompartilharAgendaModal({
  visible,
  onClose,
  displayName,
  photoURL,
}: Props) {
  const [pressed, setPressed] = useState(false);
  const { user } = useAuth();
  const shareLink = user
    ? `https://planit-bfa38.web.app/?profId=${encodeURIComponent(user.uid)}`
    : "";

  // https://planit-bfa38.web.app/?profId=OWPqpsRk0EMRIQ4ClZQRXVsmz0X2

  const handleCopy = async () => {
    await Clipboard.setStringAsync(shareLink);

    if (Platform.OS === "android") {
      ToastAndroid.show("Link copiado com sucesso!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Sucesso", "Link copiado com sucesso!");
    }
  };

  return (
    <ModalBase
      visible={visible}
      onClose={onClose}
      icone="share-social"
      title={
        <View className="items-center">
          <Image
            source={{ uri: user?.photoURL || profileImage }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-xl font-semibold text-center">
            Compartilhe seu perfil!
          </Text>
        </View>
      }
      text="Compartilhe seu link de agendamento com seus clientes e facilite o agendamento de consultas!"
    >
      <View className="mt-4">
        <Text className="mb-2 font-semibold">Compartilhar link</Text>
        <View className="flex-row items-center border border-gray-200 rounded-lg p-3">
          <Text className="flex-1">{shareLink}</Text>

          <Pressable
            onPress={handleCopy}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
          >
            <Feather
              name="copy"
              size={20}
              color={pressed ? "#D3D3D3" : "#000"}
            />
          </Pressable>
        </View>

        <View className="mt-6">
          <Pressable
            onPress={onClose}
            className="bg-principal rounded-md py-3 mb-3"
          >
            <Text className="text-center text-white font-bold">Confirmar</Text>
          </Pressable>
          <Pressable
            onPress={onClose}
            className="border border-gray-300 rounded-md py-3"
          >
            <Text className="text-center text-base">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ModalBase>
  );
}
