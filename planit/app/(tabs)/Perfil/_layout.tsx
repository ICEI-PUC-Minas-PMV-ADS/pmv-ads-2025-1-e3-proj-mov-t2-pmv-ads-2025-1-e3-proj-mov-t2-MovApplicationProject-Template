import { Stack } from "expo-router";
import { GestureResponderEvent, TouchableOpacity, Text } from "react-native";

export default function PerfilLayout() {
  function handleSalvar(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Stack>

      
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Conta"
        options={{
          headerShown: true,
          headerRight: (_props) => (
            <TouchableOpacity
              onPress={() => alert("Salvo!")}
              className="px-2 py-1"
            >
              <Text className="text-cinza text-lg">Salvar</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Configuracao"
        options={{ title: "Configurações", headerShown: true }}
      />
    </Stack>
  );
}
