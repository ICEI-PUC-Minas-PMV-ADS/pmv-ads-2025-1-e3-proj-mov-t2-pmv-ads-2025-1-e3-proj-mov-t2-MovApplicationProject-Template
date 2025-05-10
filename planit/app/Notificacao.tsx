import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

const Notificacao = () => {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: "Notificações",
          headerTitleAlign: "left",
          headerBackVisible: true, // Alinha o título à esquerda
          headerRight: () => (
            <Feather
              name="more-horizontal" // Ícone de três pontos verticais
              size={24}
              color={Colors.preto}
              className="mr-4"
            />
          ),
        }}
      />

      {/* Conteúdo principal */}
      <Text className="text-center mt-5 text-base">
        Suas notificações aparecerão aqui
      </Text>
    </View>
  );
};

export default Notificacao;