import { Ionicons } from "@expo/vector-icons";
import PinkBtn from "../button/pinkBtn";
import WhiteBtn from "../button/whiteBtn";
import ModalBase from "./modalBase";
import { View, Text } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  text: string;
  icone?: keyof typeof Ionicons.glyphMap;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SairContaModal({
  visible,
  title,
  text,
  icone,
  onClose,
  onConfirm,
}: Readonly<Props>) {
  return (
    <ModalBase
      visible={visible}
      title={title}
      text={text}
      icone={icone}
      onClose={() => onClose()}
    >
      <View className="flex flex-wrap flex-row justify-between mt-6">
        <WhiteBtn title="Cancelar" onPress={() => onClose()} />
        <PinkBtn title="Confirmar" onPress={onConfirm} />
      </View>
    </ModalBase>
  );
}
