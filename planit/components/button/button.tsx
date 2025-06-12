import { Alert, Text, TouchableOpacity } from "react-native";

const Botao = () => {
  const onPress = () => Alert.alert("oi");

  return (
    <TouchableOpacity
      className="bg-principal w-[107px] h-[44px] flex items-center justify-center rounded-xl"
      onPress={onPress}
    >
      <Text className="text-white font-inter font-semibold">Salvar</Text>
    </TouchableOpacity>
  );
};

export default Botao;
