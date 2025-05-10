import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native'; 
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';


export default function CadastroScreen() {

  const handleCadastro = async () => {
    if (!nomeCompleto || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
  
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
  
      await addDoc(collection(db, 'Usuario'), {
        uid: user.uid,
        nomeCompleto,
        email,
        criadoEm: new Date(),
      });
  
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      router.replace('/(tabs)/Perfil/Conta');
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', error.message || 'Erro desconhecido.');
    }
  };
  
  const router = useRouter();
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        router.replace('/loginGoogle');
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

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
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
        <TextInput
          className="border-b border-gray-300 py-2 mb-5 text-base"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View className="flex-row items-center border-b border-gray-300 mb-5">
          <TextInput
            className="flex-1 py-2 text-base"
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
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
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="p-2">
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-pink-500 py-3 rounded-full items-center"
          onPress={handleCadastro}
        >
          <Text className="text-white text-base font-bold">Cadastrar</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text className="text-gray-600 text-sm">Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/Login')}>
            <Text className="text-pink-500 text-sm font-bold"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}