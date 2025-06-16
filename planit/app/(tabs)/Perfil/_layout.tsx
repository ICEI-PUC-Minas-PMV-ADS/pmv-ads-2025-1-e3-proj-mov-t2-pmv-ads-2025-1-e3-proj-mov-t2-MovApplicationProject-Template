import { Stack } from "expo-router";

export default function PerfilLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Conta"
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Configuracao"
        options={{
          title: "Configurações",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
