import { View, Image, ScrollView, TextInput, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Botao from "@/components/button/button";

const Conta = () => {
  return (
    <ScrollView className="px-4 bg-white">
      {/*foto do perfil*/}
      <View className="flex flex-row justify-center items-center my-12 ml-3">
        <Image
          source={{
            uri: "https://i.pinimg.com/280x280_RS/53/3e/03/533e031c488dd2ec98c186e90a89d1c0.jpg",
          }}
          className="w-[125px] h-[125px] rounded-full mb-2"
        />
      </View>

      {/*input*/}
      <View className="flex items-center">
        {/*input nome e sobrenome*/}
        <View className="mb-4 ">
          <View className="flex items-start ">
            <Text className="mb-3 ml-1">Nome completo</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[171px] h-[41px] bg-transparent border-b-2 border-gray-100 mr-3"
              placeholder="Nome"
            ></TextInput>
            <TextInput
              className="w-[171px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Sobrenome"
            ></TextInput>
          </View>
        </View>
        {/*fim input nome e sobrenome*/}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text className="">Descreva seu trabalho</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[80px] bg-transparent border-b-2 border-gray-100"
              placeholder="Fale sobre seu trabalho em poucas palavras"
              textAlignVertical="top"
            ></TextInput>
          </View>
        </View>

        <View className="mb-4">
          <View className="ml-1">
            <Text className="mb-3">Celular</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Telefone celular"
            ></TextInput>
          </View>
        </View>
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text className="">E-mail</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="E-mail"
            ></TextInput>
          </View>
        </View>
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text className="">Profissão</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Profissão"
            ></TextInput>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Conta;
