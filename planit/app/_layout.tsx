import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="loginGoogle" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen
          name="Notificacao"
          options={{
            title: "Notificações",
            headerTitleAlign: "left",
            headerBackVisible: true,
            headerRight: () => (
              <Menu>
                <MenuTrigger>
                  <Feather
                    name="more-horizontal"
                    size={24}
                    color={Colors.preto}
                    style={{ marginRight: 16 }}
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={() => alert("Notificações marcadas como lidas.")}
                    text="Marcar como lido"
                  />
                  <MenuOption
                    onSelect={() =>
                      alert("Notificações excluídas com sucesso.")
                    }
                  >
                    <Text>Excluir tudo</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            ),
          }}
        />
      </Stack>
      <Toast />
    </MenuProvider>
  );
}
