import { Stack } from "expo-router";
import { GestureResponderEvent, TouchableOpacity, Text } from "react-native";

export default function CalendarioLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Index"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          title: "Calendário",
        }}
      />
      <Stack.Screen name="Agenda" options={{ headerShadowVisible: false }} />
    </Stack>
  );
}
