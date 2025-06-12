import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; // Obrigado pela correção
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";

export default function CadastroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [profissao, setProfissao] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !profissao) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }
    /*
    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    */
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    async function Register(): Promise<void> {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: nome,
        });
        await setDoc(doc(db, "Profissional", user.uid), {
          // aqui a mudanca do setDoc
          uid: user.uid,
          nome,
          email,
          profissao,
          criadoEm: new Date(),
        });
        console.log(auth.currentUser?.displayName);

        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        router.replace("/(tabs)/Home");
      } catch (error) {
        if (error instanceof Error && "code" in error) {
          const firebaseError = error as { code: string };
          if (firebaseError.code === "auth/email-already-in-use") {
            Alert.alert("Erro", "Este email já está em uso.");
          } else if (firebaseError.code === "auth/invalid-email") {
            Alert.alert("Erro", "Email inválido.");
          } else {
            Alert.alert(
              "Erro",
              "Ocorreu um erro ao cadastrar. Tente novamente."
            );
          }
        } else {
          Alert.alert("Erro", "Erro desconhecido.");
        }
        console.error("Erro ao cadastrar:", error);
      } finally {
        setIsLoading(false);
      }
    }
    Register();
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        router.replace("/loginGoogle");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <View className="flex-1 bg-white px-5">
      <View className="mt-24 items-center">
        <Text className="text-4xl font-bold">Cadastro</Text>
        <Text className="text-lg text-gray-500 mt-3 mb-5">Crie sua conta</Text>
      </View>

      <View className="mt-10">
        <TextInput
          className="border-b border-gray-300 py-2 mb-5 text-base"
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          className="border-b border-gray-300 py-2 mb-5 text-base"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border-b border-gray-300 py-2 mb-5 text-base"
          placeholder="Profissão"
          value={profissao}
          onChangeText={setProfissao}
          maxLength={20}
        />
        <View className="flex-row items-center border-b border-gray-300 mb-5">
          <TextInput
            className="flex-1 py-2 text-base"
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-2"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center border-b border-gray-300 mb-8">
          <TextInput
            className="flex-1 py-2 text-base"
            placeholder="Confirmar senha"
            secureTextEntry={!showConfirmPassword}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="p-2"
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-principal py-3 rounded-full items-center"
          onPress={handleCadastro}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold">Cadastrar</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text className="text-gray-600 text-sm">Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/Login")}>
            <Text className="text-pink-500 text-sm font-bold"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
