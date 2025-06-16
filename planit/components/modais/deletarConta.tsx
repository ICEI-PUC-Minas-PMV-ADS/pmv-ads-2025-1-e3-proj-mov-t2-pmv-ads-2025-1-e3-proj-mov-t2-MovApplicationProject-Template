import { Text, TouchableOpacity, View } from "react-native";
import ModalBase from "./modalBase";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ModalExcluirConta({
  visible,
  onClose,
  onConfirm,
}: Readonly<Props>) {
  return (
    <ModalBase
      visible={visible}
      title="Excluir conta"
      text="Deseja realmente excluir sua conta?"
      icone="alert-circle-outline"
      onClose={onClose}
    >
      {/* Barra de Atenção */}
      <View className="bg-pink-50 px-4 py-2 items-center rounded-md">
        <Text className="text-pink-600 font-bold uppercase">Atenção!</Text>
        <Text className="text-sm text-pink-600 text-center mt-1">
          Esta ação é permanente e não pode ser desfeita.
        </Text>
      </View>

      {/* Botões */}
      <View className="px-6 pb-6 w-full mt-6">
        <TouchableOpacity
          className="bg-principal rounded-md w-full py-3 mb-3"
          onPress={onConfirm}
        >
          <Text className="text-center text-white font-bold">
            Deletar minha conta
          </Text>
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
