import '../App.css';
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, calendarClearOutline, timeOutline, pricetagOutline, trashOutline, pencilOutline, logOutOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, getProfissional } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { Servico, Agendamento, AgendamentoCompleto } from '../../types';
import ModalBase from '../components/modalBase';
import PinkBtn from '../components/pinkBtn';
import WhiteBtn from '../components/whiteBtn';
import perfilPadrao from '../../src/assets/perfilPadrao.jpg';

function Homepage() {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [agendamentos, setAgendamentos] = useState<AgendamentoCompleto[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                setLoading(true);
                const user = auth.currentUser;
                if (!user) {
                    navigate('/login');
                    return;
                }

                const q = query(
                    collection(db, 'Agendamento'),
                    where('clienteId', '==', user.uid)
                );

                const querySnapshot = await getDocs(q);

                const agendamentosCompletos = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const agendamento = doc.data() as Agendamento;
                        
                        const [profissional, servico] = await Promise.all([
                            getProfissional(agendamento.profissionalId),
                            getServicoById(agendamento.servicoId)
                        ]);

                        return {
                            id: doc.id,
                            ...agendamento,
                            profissional,
                            servico
                        } as AgendamentoCompleto;
                    })
                );

                agendamentosCompletos.sort((a, b) => 
                    new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
                );

                setAgendamentos(agendamentosCompletos);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            } finally {
                setLoading(false);
            }
        };

        const getServicoById = async (servicoId: string): Promise<Servico | null> => {
            try {
                const docRef = doc(db, 'Servicos', servicoId);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    return {
                        id: docSnap.id,
                        nome: data.nome || 'Serviço',
                        descricao: data.descricao || 'Descrição não disponível',
                        duracao: typeof data.duracao === 'string' ? 
                                parseInt(data.duracao) || 30 : 
                                data.duracao || 30,
                        valor: data.valor || 0,
                        uid: data.uid || ''
                    };
                }
                return null;
            } catch (error) {
                console.error('Erro ao buscar serviço:', error);
                return null;
            }
        };

        fetchAgendamentos();
    }, [navigate]);

    const formatarData = (dataString: string) => {
        const [year, month, day] = dataString.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatarValor = (valor?: number) => {
        return valor ? valor.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }) : 'R$ --,--';
    };

    return (
        <div className='m-2'>
            <div className='flex justify-center border-b border-b-gray-100'>
                <p className='text-xl font-light text-pink-700 p-5'>Meus Agendamentos</p>
            </div>

            {loading ? (
                <div className='flex justify-center mt-10'>
                    <p>Carregando agendamentos...</p>
                </div>
            ) : agendamentos.length === 0 ? (
                <div className='flex justify-center mt-10'>
                    <p className='text-gray-500'>Nenhum agendamento encontrado</p>
                </div>
            ) : (
                <div className='flex justify-center'>
                    <div className='flex flex-col gap-6 mt-10 w-full items-center'>
                        {agendamentos.map((agendamento) => (
                            <div key={agendamento.id} className='flex flex-col gap-4 w-80 p-3 rounded-3xl shadow-xl'>
                                <div className='flex flex-wrap gap-6 mt-3 items-center'>
                                    <div>
                                        <img
                                            className='rounded-full w-18 h-18 object-cover'
                                            src={agendamento.profissional?.fotoPerfil || perfilPadrao}
                                            alt={`Foto de ${agendamento.profissional?.nome}`}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = perfilPadrao;
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <p className='text-lg font-bold'>
                                            {agendamento.profissional?.nome || 'Profissional não encontrado'}
                                        </p>
                                        <p className='text-emerald-500 font-light'>
                                            {agendamento.profissional?.profissao || 'Serviço profissional'}
                                        </p>
                                    </div>
                                </div>

                                <div className='pr-3 pl-3 flex justify-between items-center'>
                                    <p className='text-xl text-emerald-500'>
                                        {agendamento.servico?.nome || 'Serviço não encontrado'}
                                    </p>
                                    <IonIcon className='text-emerald-500' icon={heartCircleOutline} style={{ fontSize: "25px" }} />
                                </div>

                                <p className='font-light'>
                                    {agendamento.servico?.descricao || 'Descrição não disponível'}
                                </p>

                                <div className='flex gap-5 p-3 justify-center'>
                                    <div className='flex gap-1 items-center font-extralight'>
                                        <IonIcon icon={calendarClearOutline} style={{ fontSize: "12px" }} />
                                        <p className='text-xs'>{formatarData(agendamento.dataInicio)}</p>
                                    </div>

                                    <div className='flex gap-1 items-center font-extralight'>
                                        <IonIcon icon={timeOutline} style={{ fontSize: "12px" }} />
                                        <p className='text-xs'>{agendamento.horaInicio} - {agendamento.horaFim}</p>
                                    </div>

                                    <div className='flex gap-1 items-center font-extralight text-emerald-500'>
                                        <IonIcon icon={pricetagOutline} style={{ fontSize: "12px" }} />
                                        <p className='text-xs'>{formatarValor(agendamento.servico?.valor)}</p>
                                    </div>
                                </div>

                                <div className='flex gap-5 justify-end m-3'>
                                    <button 
                                        className='bg-pink-700 w-8 h-8 rounded-full flex items-center justify-center'
                                        onClick={() => setModalVisivel(true)}
                                    >
                                        <IonIcon className='text-white' icon={trashOutline} style={{ fontSize: "16px" }} />
                                    </button>
                                    <button 
                                        className='bg-white border border-gray-200 w-8 h-8 rounded-full flex items-center justify-center'
                                        onClick={() => navigate(`/editar/${agendamento.id}`)}
                                    >
                                        <IonIcon className='text-pink-700' icon={pencilOutline} style={{ fontSize: "16px" }} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='flex mt-20 mb-20 ml-10'>
                <div className='flex gap-3 items-center cursor-pointer' onClick={handleLogout}>
                    <div className='flex bg-pink-100 w-10 h-10 p-1 rounded-full justify-center items-center'>
                        <IonIcon className='text-pink-600' icon={logOutOutline} style={{ fontSize: 20 }} />
                    </div>
                    <p className='font-light text-pink-600'>Logout</p>
                </div>
            </div>

            <ModalBase
                icon={trashOutline}
                title='Cancelar Agendamento'
                text='Deseja cancelar o agendamento? O profissional será notificado.'
                onClose={() => setModalVisivel(false)}
                visible={modalVisivel}
            >
                <div className='flex justify-between mt-6 mb-5'>
                    <PinkBtn title='Sim' onClick={() => setModalVisivel(false)} />
                    <WhiteBtn title='Não' onClick={() => setModalVisivel(false)} />
                </div>
            </ModalBase>
        </div>
    );
}

export default Homepage;