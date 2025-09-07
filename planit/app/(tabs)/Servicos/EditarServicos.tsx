import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator,Alert,Modal,} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const EditarServicos: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracaoValue, setDuracaoValue] = useState('');
  const [duracaoUnit, setDuracaoUnit] = useState<'min' | 'h' | 'dia' | 'sem'>('min');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [valor, setValor] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalCategoriaVisivel, setModalCategoriaVisivel] = useState(false);
  const [modalUnidadeVisivel, setModalUnidadeVisivel] = useState(false);

  const categorias = ['Saúde', 'Beleza', 'Design', 'Outros'];
  const unidades = [
    { label: 'Minutos', value: 'min' },
    { label: 'Horas', value: 'h' },
    { label: 'Dias', value: 'dia' },
    { label: 'Semanas', value: 'sem' },
  ];

  useEffect(() => {
    const fetchServico = async () => {
      try {
        if (typeof id !== 'string') {
          Alert.alert('Erro', 'ID inválido.');
          router.back();
          return;
        }
        const ref = doc(db, 'Servicos', id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          Alert.alert('Erro', 'Serviço não encontrado.');
          router.back();
          return;
        }

        const data = snap.data() as any;
        setNome(data.nome);
        setDescricao(data.descricao);

        const match = data.duracao.match(/^(\d+)(min|h|dia|sem)$/);
        if (match) {
          setDuracaoValue(match[1]);
          setDuracaoUnit(match[2] as any);
        } else {
          setDuracaoValue(data.duracao);
        }

        setCategoriaSelecionada(data.categoria);
        setValor(data.valor);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Falha ao carregar dados.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchServico();
  }, [id]);

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim() || !duracaoValue.trim() || !categoriaSelecionada || !valor.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (isNaN(Number(duracaoValue))) {
      Alert.alert('Erro', 'Duração deve ser numérica.');
      return;
    }

    setSaving(true);

    try {
      const ref = doc(db, 'Servicos', id as string);
      await updateDoc(ref, {
        nome: nome.trim(),
        descricao: descricao.trim(),
        duracao: `${duracaoValue.trim()}${duracaoUnit}`,
        categoria: categoriaSelecionada,
        valor: valor.trim(),
        atualizadoEm: Timestamp.now(),
      });

      Alert.alert('Sucesso', 'Serviço atualizado!');
      router.push('/(tabs)/Servicos/Index');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar. Tente de novo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF006F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Editar Serviço</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />
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
              style={[styles.input, { flex: 0.6 }]}
              value={duracaoValue}
              onChangeText={setDuracaoValue}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.input, styles.categoriaBox, { flex: 0.4 }]}
              onPress={() => setModalUnidadeVisivel(true)}
            >
              <Text>{unidades.find(u => u.value === duracaoUnit)?.label}</Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Categoria:</Text>
            <TouchableOpacity
              style={[styles.input, styles.categoriaBox]}
              onPress={() => setModalCategoriaVisivel(true)}
            >
              <Text>{categoriaSelecionada || 'Selecionar...'}</Text>
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
          <TouchableOpacity
            style={[styles.button, saving && { opacity: 0.6 }]}
            onPress={handleSalvar}
            disabled={saving}
          >
            {saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalUnidadeVisivel} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalUnidadeVisivel(false)}>
              <Ionicons name="close" size={24} color="#FF006F" />
            </TouchableOpacity>
            {unidades.map(u => (
              <TouchableOpacity
                key={u.value}
                onPress={() => {
                  setDuracaoUnit(u.value as 'min' | 'h' | 'dia' | 'sem');
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

      <Modal visible={modalCategoriaVisivel} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalCategoriaVisivel(false)}>
              <Ionicons name="close" size={24} color="#FF006F" />
            </TouchableOpacity>
            {categorias.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setCategoriaSelecionada(cat);
                  setModalCategoriaVisivel(false);
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    paddingTop: 10,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  botaoVoltar: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
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
    justifyContent: 'space-between',
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

export default EditarServicos;