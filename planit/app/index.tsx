import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import "../styles/global.css";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao PLANIT</Text>
        <Text style={styles.subtitle}>
          Gerencie atendimentos, clientes e agenda em um só lugar. Fácil,
          gratuito e feito para autônomos.
        </Text>

        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: "#ccc" }]} />
          <View style={[styles.dot, { backgroundColor: "#ccc" }]} />
          <View style={[styles.dot, { backgroundColor: "#ccc" }]} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/loginGoogle");
        }}
      >
        <Text style={styles.buttonText}>Comece Agora</Text>
      </TouchableOpacity> 
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/(tabs)/Clientes");
        }}
      >
        <Text style={styles.buttonText}>Comece Agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: "#E1FF00",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
