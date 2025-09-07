import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import "../styles/global.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function WelcomeScreen() {
  const slides = [
    {
      title: "Bem-vindo ao PLANIT",
      subtitle:
        "Gerencie atendimentos, clientes e agenda em um só lugar. Fácil, gratuito e feito para autônomos.",
    },
    {
      title: "Organize sua agenda",
      subtitle: "Marque e visualize seus compromissos de forma simples.",
    },
    {
      title: "Controle seus clientes",
      subtitle:
        "Acompanhe o histórico e informações dos seus clientes em poucos cliques.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>

        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? "#FF006F" : "#ccc",
                },
              ]}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/Login");
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
