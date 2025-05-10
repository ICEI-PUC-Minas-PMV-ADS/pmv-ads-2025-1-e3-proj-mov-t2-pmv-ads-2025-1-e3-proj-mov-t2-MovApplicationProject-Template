import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const EditarServicos = () => {
  const router = useRouter();

  const [nome, setNome] = useState('Limpeza de Pele ');
  const [descricao, setDescricao] = useState('Descrição do Procedimento ');
  const [duracao, setDuracao] = useState('30 min');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [valor, setValor] = useState('150,00');
  const [modalVisivel, setModalVisivel] = useState(false);

  const categorias = ['Saúde', 'Beleza', 'Design', 'Outros'];

  const handleSalvar = () => {
    alert('Serviço atualizado!');
    router.push('/Servicos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={{ width: 24 }}>
         <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
               <Ionicons name="arrow-back" size={24} color="#111827" />
             </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.titulo}>Editar Serviço</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Duração:</Text>
            <TextInput
              style={styles.input}
              value={duracao}
              onChangeText={setDuracao}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Categoria:</Text>
            <TouchableOpacity
              style={[styles.input, styles.categoriaBox]}
              onPress={() => setModalVisivel(true)}
            >
              <Text style={{ flex: 1 }}>
                {categoriaSelecionada || 'Selecionar...'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    paddingTop: 10,
  },
  cabecalho: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  formBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  column: {
    marginBottom: 16,
  },
  label: {
    width: 90,
    fontSize: 14,
    color: '#374151',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  categoriaBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#FF006F',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditarServicos;
