import React from "react";
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { Pressable } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.principal,
        tabBarInactiveTintColor: Colors.iconNavDefault,
        tabBarStyle: {
          paddingTop: 5,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                router.replace("/(tabs)/Home");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendario"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Clientes"
        options={{
          title: "",
          headerTitle: "Histórico de clientes",
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            elevation: 0, //  Android - remove sombra
            shadowOpacity: 0, //  iOS - remove sombra
          },

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Servicos"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                router.replace("/(tabs)/Perfil");
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
