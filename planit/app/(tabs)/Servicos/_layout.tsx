import { Stack } from "expo-router";

export default function ServiçosLayout() {
  return (
    <Stack>
     
      <Stack.Screen name="Index" options={{ headerShown: false }} />
      <Stack.Screen name="CadastroServicos" options={{ headerShown: false }} />
      <Stack.Screen name="EditarServicos" options={{ headerShown: false }} />
      
    </Stack>
  );
}
