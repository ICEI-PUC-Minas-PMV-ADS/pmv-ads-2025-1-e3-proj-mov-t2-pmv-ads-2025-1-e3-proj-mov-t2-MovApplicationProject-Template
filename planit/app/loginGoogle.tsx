import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session";
import styles from "../styles/styles";
import { router, useRouter } from "expo-router";
import { signInWithCredential, GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [modalVisible, setModalVisible] = useState(true);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "1018099220762-qnt2iljavf4ivoju7kbvjkkoa97u8q7e.apps.googleusercontent.com",
    androidClientId: "1018099220762-1dkssql8r3c8lk21sk9r38oj39lpe297.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  if (request) {
    console.log("REDIRECT URI →", request.redirectUri);
  } else {
    console.log("Request is null.");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setModalVisible(false);
        router.push("/(tabs)");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Response completa:", response);
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Authentication:", authentication);
      const idToken = authentication?.idToken;
      if (!idToken) {
        console.error("ID Token não encontrado. Authentication object:", authentication);
        return;
      }
      console.log("ID Token encontrado:", idToken);

      const getFirebaseUser = async () => {
        try {
          const credential = GoogleAuthProvider.credential(idToken);
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;
          console.log("Usuário autenticado no Firebase:", user);
          setModalVisible(false);
          router.push("/(tabs)");
        } catch (error) {
          console.error("Erro ao autenticar com Firebase:", error);
        }
      };

      getFirebaseUser();
    }
  }, [response]);

  const handleEmailLogin = () => {
    const user = auth.currentUser;
    if (user) {
      router.push("/(tabs)");
    } else {
      router.replace("/Register");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Faça login ou cadastre-se</Text>
            <Text style={styles.modalSubtitle}>
              Selecione seu método preferido para continuar configurando sua
              conta
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleEmailLogin} 
            >
              <Text style={styles.buttonText}>Continuar com e-mail</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>ou</Text>

            <View style={styles.socialLoginContainer}>
              <TouchableOpacity
                style={[styles.socialButton, styles.leftSocialButton]}
                onPress={() => promptAsync()}
                disabled={!request}
              >
                <Image
                  source={require("../assets/images/google.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.privacyText}>
              Se você estiver criando uma nova conta,{" "}
              <Text style={styles.linkText}>Termos e Condições</Text> e{" "}
              <Text style={styles.linkText}>Política de Privacidade</Text> serão
              aplicados.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}