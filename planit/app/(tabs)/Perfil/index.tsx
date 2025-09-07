import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import SairContaModal from "@/components/modais/sairConta";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import CompartilharAgendaModal from "@/components/modais/compartilharPerfil";

const profileImage =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

export default function Perfil() {
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const onConfirmLogout = () => {
    setLogoutModalVisible(false);
    signOut(auth).then(() => {
      Alert.alert("Sucesso", "Logout realizado com sucesso!");
      router.replace("/Login");
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <View className="bg-white flex-1">
      <ScrollView
        className="px-4 pt-10"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Foto do Perfil */}
        <View className="flex-row items-center my-6 ml-3">
          <Image
            source={{ uri: user?.photoURL || profileImage }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-2xl font-semibold ml-6">
            {user?.displayName || "Usuário"}
          </Text>
        </View>

        {/* Lista de Opções */}
        <View className="mx-3">
          <Item
            icon={<Feather name="user" size={15} color={Colors.preto} />}
            label="Conta"
            onPress={() => router.push("/Perfil/Conta")}
          />
          <Item
            icon={<Feather name="settings" size={15} color={Colors.preto} />}
            label="Configurações"
            onPress={() => router.push("/Perfil/Configuracao")}
          />
          <Item
            icon={<Feather name="share-2" size={15} color={Colors.preto} />}
            label="Compartilhar Agenda"
            onPress={() => setShareModalVisible(true)}
          />
          <Item
            icon={
              <MaterialIcons name="logout" size={15} color={Colors.preto} />
            }
            label="Logout"
            textColor="text-error"
            onPress={() => setLogoutModalVisible(true)}
          />
        </View>
      </ScrollView>

      <SairContaModal
        visible={logoutModalVisible}
        title="Deseja sair da conta?"
        text="Você deseja encerrar as suas atividades?"
        icone="log-out-outline"
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={onConfirmLogout}
      ></SairContaModal>

      <CompartilharAgendaModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        displayName={user?.displayName || "Usuário"}
      />
    </View>
  );
}

const Item = ({
  icon,
  label,
  textColor = "text-black",
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  textColor?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-7 border-b border-gray-100"
  >
    <View className="flex-row items-center">
      <View className="bg-slate-100 justify-center items-center w-10 h-10 rounded-2xl mr-3">
        {icon}
      </View>
      <Text className={`text-base ${textColor}`}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);
