import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const passwordTextInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);

      let userMessage =
        "Ocorreu um erro inesperado. Tente novamente mais tarde.";
      switch (error.code) {
        case "auth/invalid-email":
          userMessage = "Formato de e‑mail inválido.";
          break;
        case "auth/user-not-found":
          userMessage = "E‑mail não cadastrado.";
          break;
        case "auth/wrong-password":
          userMessage = "Senha incorreta.";
          break;
      }

      setErrorMessage(userMessage);
      Alert.alert("Erro", userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1" />
      <View className="bg-white rounded-t-3xl px-5 pt-10 pb-8 -mt-12 min-h-[450px]">
        <TouchableOpacity
          className="absolute top-4 right-4 p-2"
          onPress={() => router.back()}
        >
          <Text className="text-2xl text-gray-500">×</Text>
        </TouchableOpacity>

        <Text className="text-4xl font-bold text-center mt-6">Login</Text>
        <Text className="text-sm text-gray-600 text-center mt-6 mb-8">
          Entre com o seu e-mail e senha
        </Text>

        <View>
          <TextInput
            className="border-b border-gray-300 py-2 mb-6 text-base"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordTextInputRef.current?.focus()}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage(null);
            }}
          />

          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <TextInput
              ref={passwordTextInputRef}
              className="flex-1 py-2 text-base"
              placeholder="Senha"
              secureTextEntry
              value={password}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              onChangeText={(text) => {
                setPassword(text);
                setErrorMessage(null);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (email) {
                  sendPasswordResetEmail(auth, email)
                    .then(() =>
                      Alert.alert("Sucesso", "Email de recuperação enviado!")
                    )
                    .catch(() => Alert.alert("Erro", "Falha ao enviar email."));
                } else {
                  Alert.alert("Erro", "Insira seu email primeiro.");
                }
              }}
            >
              <Text className="text-pink-500 text-sm ml-2">
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mensagem de erro inline */}
          {errorMessage && (
            <Text className="text-center text-red-500 mb-4">
              {errorMessage}
            </Text>
          )}

          <TouchableOpacity
            className="mb-8"
            onPress={() => router.push("/Register")}
          >
            <Text className="text-center text-gray-600 text-base">
              Não tem uma conta?{" "}
              <Text className="text-pink-500 font-bold underline">
                Cadastro
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-principal py-3 rounded-full items-center"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-base font-bold">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
