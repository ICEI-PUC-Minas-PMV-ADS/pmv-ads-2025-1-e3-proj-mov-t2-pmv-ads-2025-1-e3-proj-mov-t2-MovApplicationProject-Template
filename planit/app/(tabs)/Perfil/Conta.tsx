import {
  View,
  Image,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/hooks/useUserData";
import useAuth from "@/hooks/useAuth";
import { updateProfile, updateEmail } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import MudarFotoPerfil from "@/components/modais/mudarFotoPerfil";
import { useRouter } from "expo-router";

const Conta = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const profileImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const [profileImageModalVisible, setProfileImageModalVisible] =
    useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profissao, setProfissao] = useState(userData?.profissao || "");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      setProfissao(userData.profissao || "");
    }
  }, [userData]);

  const onConfirmProfileImage = async () => {
    try {
      if (auth.currentUser && newImageUrl) {
        await updateProfile(auth.currentUser, {
          photoURL: newImageUrl,
        });

        const userDocRef = doc(db, "Profissional", auth.currentUser.uid);
        await setDoc(
          userDocRef,
          {
            photoURL: newImageUrl,
          },
          { merge: true }
        );

        setNewImageUrl(auth.currentUser.photoURL);
        Alert.alert("Sucesso", "Foto de perfil atualizada.");
      }
      setProfileImageModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      Alert.alert("Erro", "Não foi possível atualizar a foto.");
    }
  };

  const handleSaveChanges = async () => {
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName: displayName });
      }

      if (email !== user.email) {
        await updateEmail(user, email);
      }

      const userDocRef = doc(db, "Profissional", user.uid);
      await updateDoc(userDocRef, {
        profissao: profissao,
      });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/Home"),
        },
      ]);
    } catch (error: any) {
      console.error("Erro ao salvar alterações:", error);
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Erro de Autenticação",
          "Para atualizar seu e-mail, por favor, faça login novamente."
        );
      } else {
        Alert.alert(
          "Erro",
          `Não foi possível salvar as alterações: ${error.message}`
        );
      }
    }
  };

  return (
    <ScrollView className="px-4 bg-white">
      <View className="flex flex-row justify-center items-center my-12 ml-3">
        <Pressable onPress={() => setProfileImageModalVisible(true)}>
          <Image
            source={{ uri: user?.photoURL || profileImage }}
            className="w-[125px] h-[125px] rounded-full mb-2"
          />
        </Pressable>
      </View>

      <View className="flex items-center">
        <View className="mb-4">
          <View className="flex items-start">
            <Text className="mb-3 ml-1">Nome</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Nome de Exibição"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>
        </View>

        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="lock-outline"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text className="text-preto">E-mail</Text>
          </View>
          <View className="flex-row items-center text-cinza">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={email}
              editable={false}
              selectTextOnFocus={false}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.cinza}
            />
          </View>
        </View>

        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Text>Profissão</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Profissão"
              value={profissao}
              onChangeText={setProfissao}
            />
          </View>
        </View>
      </View>

      <Pressable
        onPress={handleSaveChanges}
        style={{
          backgroundColor: Colors.principal,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Salvar Alterações
        </Text>
      </Pressable>

      <MudarFotoPerfil
        visible={profileImageModalVisible}
        title="Envie uma nova foto para atualizar seu perfil."
        text="Envie e anexe arquivos a esta aba."
        icone="folder-open-outline"
        onClose={() => setProfileImageModalVisible(false)}
        onConfirm={onConfirmProfileImage}
        setNewImageUrl={setNewImageUrl}
      />
    </ScrollView>
  );
};

export default Conta;
