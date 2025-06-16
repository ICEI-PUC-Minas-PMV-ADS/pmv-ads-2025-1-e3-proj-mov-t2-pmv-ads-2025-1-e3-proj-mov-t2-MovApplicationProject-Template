import { Ionicons } from "@expo/vector-icons";
import ModalBase from "./modalBase";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

type Props = {
  visible: boolean;
  title: string;
  text: string;
  icone?: keyof typeof Ionicons.glyphMap;
  onClose: () => void;
  onConfirm: () => void;
  setNewImageUrl: (url: string) => void;
};

export default function MudarFotoPerfil({
  visible,
  title,
  text,
  icone,
  onClose,
  onConfirm,
  setNewImageUrl,
}: Readonly<Props>) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setNewImageUrl(uri);
    }
  };

  return (
    <ModalBase
      visible={visible}
      title={title}
      text={text}
      icone={icone}
      onClose={onClose}
    >
      <View className="items-center my-4 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 w-full">
        <Pressable onPress={pickImage} className="items-center">
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              className="w-32 h-32 rounded-full mb-2"
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} color="#999" />
          )}
          <Text className="text-pink-600 font-semibold text-center mt-2">
            Clique para enviar e anexar arquivos
          </Text>
          <Text className="text-gray-500 text-xs text-center mt-1">
            SVG, PNG, JPG ou GIF (max. 800×400px)
          </Text>
        </Pressable>
      </View>

      {/* Botões */}
      <View className="px-6 pb-6 w-full">
        <TouchableOpacity
          className="bg-principal rounded-md w-full py-3 mb-3"
          onPress={onConfirm}
        >
          <Text className="text-center text-white font-bold">Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-gray-300 rounded-md w-full py-3"
          onPress={onClose}
        >
          <Text className="text-center text-base">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ModalBase>
  );
}
