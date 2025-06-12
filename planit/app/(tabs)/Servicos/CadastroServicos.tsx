import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Modal,ActivityIndicator,Alert} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';

const CadastroServicos: React.FC = () => {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [duracaoValue, setDuracaoValue] = useState('');
  const [duracaoUnit, setDuracaoUnit] = useState<'min' | 'h' | 'dia' | 'sem'>('min');
  const [modalUnidadeVisivel, setModalUnidadeVisivel] = useState(false);

  const categorias = ['Saúde', 'Beleza', 'Design', 'Outros'];
  const unidades: { label: string; value: 'min' | 'h' | 'dia' | 'sem' }[] = [
    { label: 'Minutos', value: 'min' },
    { label: 'Horas',   value: 'h'   },
    { label: 'Dias',    value: 'dia' },
    { label: 'Semanas', value: 'sem' },
  ];

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim() || !duracaoValue.trim() || !categoriaSelecionada || !valor.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos antes de salvar.');
      return;
    }
    if (isNaN(Number(duracaoValue))) {
      Alert.alert('Erro', 'Informe um valor numérico válido para a duração.');
      return;
    }

    setLoading(true);

    try {
      const servicoRef = doc(collection(db, 'Servicos'));
      const serviceId = servicoRef.id;

      const novoServico = {
        id: serviceId,                     
        nome: nome.trim(),
        descricao: descricao.trim(),
        duracao: `${duracaoValue.trim()}${duracaoUnit}`,
        categoria: categoriaSelecionada,
        valor: valor.trim(),
        ativo: true,
        criadoEm: Timestamp.now(),
        uid: auth.currentUser?.uid,        
      };

      await setDoc(servicoRef, novoServico);

      console.log('Serviço cadastrado com ID:', serviceId);
      Alert.alert('Sucesso', `Serviço cadastrado com sucesso!`);

      setNome('');
      setDescricao('');
      setValor('');
      setDuracaoValue('');
      setDuracaoUnit('min');
      setCategoriaSelecionada('');
      setModalVisivel(false);
      router.push('/Servicos/Index');
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      Alert.alert('Erro', 'Falha ao salvar serviço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Cadastro de Serviço</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Corte feminino"
              returnKeyType="next"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              multiline
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva o serviço..."
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Duração:</Text>
            <TextInput
              style={[styles.input, { flex: 0.6 }]}
              value={duracaoValue}
              onChangeText={setDuracaoValue}
              placeholder="Valor"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.input, styles.categoriaBox, { flex: 0.4 }]}
              onPress={() => setModalUnidadeVisivel(true)}
            >
              <Text style={{ flex: 1 }}>
                {unidades.find(u => u.value === duracaoUnit)?.label}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
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
              placeholder="Ex: 120,00"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Salvar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalUnidadeVisivel} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalUnidadeVisivel(false)}>
                <Ionicons name="close" size={24} color="#FF006F" />
              </TouchableOpacity>
            </View>
            {unidades.map(u => (
              <TouchableOpacity
                key={u.value}
                onPress={() => {
                  setDuracaoUnit(u.value);
                  setModalUnidadeVisivel(false);
                }}
                style={styles.modalItem}
              >
                <Text>{u.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisivel} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Ionicons name="close" size={24} color="#FF006F" />
              </TouchableOpacity>
            </View>
            {categorias.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setCategoriaSelecionada(cat);
                  setModalVisivel(false);
                }}
                style={styles.modalItem}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    position: 'relative',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  botaoVoltar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
});

export default CadastroServicos;
