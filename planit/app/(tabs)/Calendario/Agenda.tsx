import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from 'expo-router';

import ModalBase from "../../../components/modais/modalBase";
import PinkBtn from "@/components/button/pinkBtn";
import WhiteBtn from "../../../components/button/whiteBtn";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const meses = [
    { name: "Jan", value: 1 },
    { name: "Fev", value: 2 },
    { name: "Mar", value: 3 },
    { name: "Abr", value: 4 },
    { name: "Mai", value: 5 },
    { name: "Jun", value: 6 },
    { name: "Jul", value: 7 },
    { name: "Ago", value: 8 },
    { name: "Set", value: 9 },
    { name: "Out", value: 10 },
    { name: "Nov", value: 11 },
    { name: "Dez", value: 12 }
];

const getDiasMes = (mes: number, ano: number) => {
    return new Date(ano, mes, 0).getDate();
};

const getStatusCor = ( status: number ) => {
    switch (status) {
        case 1: return {
            text: 'text-green-600',
            border: 'border-green-600' 
        };
        case 2: return {
            text: 'text-pink-700',
            border: 'border-pink-700' 
        };
        case 3: return {
            text: 'text-slate-500',
            border: 'border-slate-500' 
        };
        default: return {
            text: 'text-black',
            border: 'border-black' 
        };
    }
};

const Agenda = () => {
    const router = useRouter();

    type Horario = {
        name: string;
        value: number;
        status: number;
    };

    const [horarios, setHorarios] = useState<Horario[]>([
        { name: "08:00", value: 1, status: 1 },
        { name: "08:30", value: 2, status: 1 },
        { name: "09:00", value: 3, status: 1 },
        { name: "09:30", value: 4, status: 1 },
        { name: "10:00", value: 5, status: 1 },
        { name: "10:30", value: 6, status: 2 },
        { name: "11:00", value: 7, status: 1 },
        { name: "11:30", value: 8, status: 1 },
        { name: "12:00", value: 9, status: 2 },
        { name: "12:30", value: 10, status: 1 },
        { name: "13:00", value: 11, status: 3 },
        { name: "13:30", value: 12, status: 1 },
        { name: "14:00", value: 13, status: 1 },
        { name: "14:30", value: 14, status: 1 },
        { name: "15:00", value: 15, status: 1 },
        { name: "15:30", value: 16, status: 1 },
        { name: "16:00", value: 17, status: 1 },
        { name: "16:30", value: 18, status: 3 },
        { name: "17:00", value: 19, status: 1 },
        { name: "17:30", value: 20, status: 1 },
        { name: "18:00", value: 21, status: 1}
    ]);

    type Status = number;

    const statusTexto: { [key in Status]: string } = {
        1: 'Disponível',
        2: 'Agendado',
        3: 'Bloqueado',
    };

    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalAcaoVisivel, setModalAcaoVisivel] = useState(false);

    const anoAtual = new Date().getFullYear();
    const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth() + 1);
    const [diaSelecionado, setDiaSelecionado] = useState<number>(1);
    const [diasNoMes, setDiasNoMes] = useState<number[]>([]);

    const [acaoSelecionada, setAcaoSelecionada] = useState('');
    const [horarioSelecionado, setHorarioSelecionado] = useState<Horario | null>(null);

    type IconeType = keyof typeof Ionicons.glyphMap;

    const [iconeModal, setIconeModal] = useState<IconeType>('alert-circle-outline');
    const [titleModal, setTitleModal] = useState('');
    const [textModal, setTextModal] = useState('');   

    const [menuVisivel, setMenuVisivel] = useState(false);

    useEffect(() => {
        const dias = Array.from(
            { length: getDiasMes(mesSelecionado, anoAtual) },
            (_, i) => i + 1
        );
        setDiasNoMes(dias);
        setDiaSelecionado(1);
    }, [mesSelecionado]);

    const acaoPermitida = (acao: string, status: number): boolean => {
        if (status === 1 && acao === 'Disponibilizar') return false; // Já está disponível
        if (status === 1 && acao === 'Cancelar') return false; // Não pode cancelar o que não foi agendado
        if (status === 2 && acao !== 'Cancelar') return false; // Agendado só pode ser cancelado
        if (status === 3 && acao !== 'Disponibilizar') return false; // Bloqueado só pode ser disponibilizado
        return true;
    };

    const gerarMensagemModal = (acao: string, horario: Horario) => {
        switch (acao) {
            case 'Disponibilizar':
                setIconeModal('checkmark-circle-outline');
                setTitleModal('Disponibilizar Horário');
                return `Deseja disponibilizar o horário ${horario.name}?`;
            case 'Cancelar':
                setIconeModal('trash-bin-outline');
                setTitleModal('Cancelar Agendamento');
                return `Deseja cancelar o agendamento do horário ${horario.name}? Seu cliente será notificado sobre o cancelamento.`;
            case 'Bloquear':
                setIconeModal('remove-circle-outline');
                setTitleModal('Bloquear Horário');
                return `Deseja bloquear o horário ${horario.name}?`;
            default:
                setIconeModal('alert-circle-outline');
                setTitleModal('Ação Inválida');
                return 'Ação desconhecida.';
        }
    };

    const abrirMenu = (horario: Horario) => {
        setHorarioSelecionado(horario);
        setMenuVisivel(true);
    };

    const fecharMenu = () => {
        setMenuVisivel(false);
    }

    const executarAcao = (acao: string) => {
        if (!horarioSelecionado) return;

        if (!acaoPermitida(acao, horarioSelecionado.status)) {
            setTitleModal("Ação inválida");
            setTextModal("Essa ação não é permitida para o status atual do horário.");
            setIconeModal("alert-circle-outline");
            setModalVisivel(true);
            setMenuVisivel(false);
            return;
        }

        const mensagem = gerarMensagemModal(acao, horarioSelecionado);
        setAcaoSelecionada(acao);
        setTextModal(mensagem);
        setMenuVisivel(false);
        setModalAcaoVisivel(true);
    }

    const confirmarAcao = () => {
        if (!horarioSelecionado || !acaoSelecionada) return;
      
        const novoStatus = acaoSelecionada === 'Disponibilizar' ? 1 :
                          acaoSelecionada === 'Cancelar' ? 1 :
                          acaoSelecionada === 'Bloquear' ? 3 : 
                          horarioSelecionado.status;
      
        const horariosAtualizados = horarios.map(h =>
            h.value === horarioSelecionado.value ? { ...h, status: novoStatus } : h
        );
      
        setHorarios(horariosAtualizados);
        setModalAcaoVisivel(false);
        setMenuVisivel(false);
        setHorarioSelecionado(null);
    };

    const getAcoesDisponiveis = (status: number) => {
        switch (status) {
            case 1:
                return ['Bloquear'];
            case 2:
                return ['Cancelar'];
            case 3:
                return ['Disponibilizar'];
            default:
                return [];
        }
    };

    const bloquearDia = () => {
        const horariosBloqueados = horarios.map(horario => ({
            ...horario,
            status: 3
        }));
        
        setHorarios(horariosBloqueados);
        setModalVisivel(false);
    };

    return (
        <ScrollView>
            <View className="flex flex-1 bg-white">
                <TouchableOpacity className="flex flex-row justify-center m-5" onPress={() => setModalVisivel(true)}>
                    <Ionicons accessibilityLabel="Bloquear o dia" size={30} name="lock-closed-outline" className="bg-slate-50 pb-6 pt-6 pl-1 pr-1 rounded-3xl border border-gray-400"/>
                </TouchableOpacity>

                <SafeAreaProvider>
                    <SafeAreaView>
                        <View className="flex flex-col justify-end mt-8">
                            <View className="flex flex-row justify-between items-center mt-5 mr-16 ml-16">
                                <View>
                                    <Text className="text-lg">Selecione o mês:</Text>
                                </View>

                                <View className="w-40 border border-slate-400 rounded-full">
                                    <RNPicker selectedValue={mesSelecionado} onValueChange={(itemValue) => setMesSelecionado(itemValue)}>
                                        {meses.map((mes) => (
                                            <RNPicker.Item key={mes.value} label={mes.name} value={mes.value}/>
                                        ))}
                                    </RNPicker>
                                </View>
                            </View>

                            <View className="flex flex-row justify-between items-center mt-5 mr-16 ml-16">
                                <View>
                                    <Text className="text-lg">Selecione o dia:</Text>
                                </View>

                                <View className="w-40 border border-slate-400 rounded-full">
                                    <RNPicker selectedValue={diaSelecionado} onValueChange={(itemValue) => setDiaSelecionado(itemValue)}>
                                        {diasNoMes.map((dia) => (
                                            <RNPicker.Item key={dia} label={`${dia.toString().padStart(2, '0')}/${mesSelecionado.toString().padStart(2, '0')}`} value={dia}/>
                                        ))}
                                    </RNPicker>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>

                <View className='bg-white mt-10'>
                    <View className='m-3 p-3'>
                        <Text className='text-center text-xl mb-8'>Horários</Text>
                            
                        <View className="flex flex-row flex-wrap justify-center gap-5">
                            {horarios.map(horario => {
                                const statusClasses = getStatusCor(horario.status);

                                return (
                                <TouchableOpacity
                                    key={horario.value}
                                    className={`p-4 justify-center rounded-full border ${statusClasses.border}`}
                                    onPress={() => abrirMenu(horario)}
                                >
                                    <Text className={`text-center ${statusClasses.text}`}>{horario.name}</Text>
                                </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>

                <View className='mt-6 mb-8 flex flex-row flex-wrap justify-evenly'>
                    <PinkBtn title="Salvar" onPress={() => { router.push('/(tabs)/Calendario/Index') }} />
                </View>

                <Modal
                    transparent
                    visible={menuVisivel}
                    animationType="fade"
                    onRequestClose={fecharMenu}
                >
                    <TouchableOpacity 
                        className="flex-1 bg-black/30 justify-center items-center" 
                        onPress={fecharMenu}
                        activeOpacity={1}
                    >
                        <View className="bg-white p-4 rounded-xl w-64">
                            <Text className="text-center font-semibold mb-2">Escolha uma ação</Text>
                            {horarioSelecionado && getAcoesDisponiveis(horarioSelecionado.status).map(acao => (
                                <TouchableOpacity
                                    key={acao}
                                    className="p-3 border border-neutral-200 rounded-xl"
                                    onPress={() => executarAcao(acao)}
                                >
                                    <Text className="text-center">{acao}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </TouchableOpacity>
                </Modal>

                <ModalBase
                    visible={modalAcaoVisivel}
                    title={titleModal}
                    text={textModal}
                    icone={iconeModal}
                    onClose={() => setModalAcaoVisivel(false)}
                >
                    <View className='flex flex-wrap flex-row justify-between mt-6'>
                        <WhiteBtn title="Cancelar" onPress={() => setModalAcaoVisivel(false)} />
                        <PinkBtn title="Confirmar" onPress={confirmarAcao} />
                    </View>
                </ModalBase>

                <ModalBase 
                    visible={modalVisivel} 
                    title="Bloquear dia" 
                    text="Ao bloquear o dia selecionado os clientes não poderão agendar horários nesta data, caso houver agendamentos os mesmos serão cancelados. Deseja bloquear?" 
                    icone="lock-closed-outline" 
                    onClose={() => setModalVisivel(false)}
                >
                    <View className='flex flex-wrap flex-row justify-between mt-6'>
                        <WhiteBtn title="Cancelar" onPress={() => setModalVisivel(false)}/>
                        <PinkBtn title="Confirmar" onPress={bloquearDia}/>
                    </View>
                </ModalBase>
            </View>
        </ScrollView>
    )
}

export default Agenda;