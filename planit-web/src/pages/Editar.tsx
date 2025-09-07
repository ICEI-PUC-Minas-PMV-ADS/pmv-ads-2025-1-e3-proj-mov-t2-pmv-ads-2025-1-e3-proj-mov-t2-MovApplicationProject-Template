import '../App.css'
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, timeOutline } from 'ionicons/icons'
import { chevronBackCircleOutline, chevronForwardCircleOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import WhiteBtn from '../components/whiteBtn';
import PinkBtn from '../components/pinkBtn';

function Editar() {
    const navigate = useNavigate();

    const formatMonthYear = (_locale: unknown, date: Date) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const monthIndex = date.getMonth();
        return `${months[monthIndex]} ${date.getFullYear()}`;
    };

    return (
        <div>
            <div className='flex justify-center border-b border-b-gray-100'>
                <p className='text-xl font-light text-pink-700 p-5'>Editar Serviço</p>
            </div>

            <div className='m-5 flex flex-col gap-10'>
                <div>
                    <p className='text-pink-600 font-bold'>Selecione o Serviço Desejado: </p>

                    <div className='flex justify-center'>
                        <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-xl text-emerald-600'>Primeira Consulta</p>
                                </div>

                                <div>
                                    <IonIcon icon={heartCircleOutline} style={{ fontSize: "30px", color: "#059669" }} className='text-shadow-emerald-600'></IonIcon>
                                </div>
                            </div>

                            <div>
                                <p className='font-extralight'>Primeiro contato do cliente conosco</p>
                            </div>

                            <div className='flex flex-row gap-6 justify-end mt-7'>
                                <div className='flex flex-row'>
                                    <div>
                                        <IonIcon icon={timeOutline} style={{ fontSize: "20px", paddingTop: "3px", fontWeight: 900 }}></IonIcon>
                                    </div>

                                    <div>
                                        <p className='font-bold'>30 Min</p>
                                    </div>
                                </div>

                                <div>
                                    <p className='text-emerald-600 font-bold'>R$ 150,00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-xl text-emerald-600'>Consulta de Rotina</p>
                                </div>

                                <div>
                                    <IonIcon icon={heartCircleOutline} style={{ fontSize: "30px", color: "#059669" }} className='text-shadow-emerald-600'></IonIcon>
                                </div>
                            </div>

                            <div>
                                <p className='font-extralight'>Consulta periódica</p>
                            </div>

                            <div className='flex flex-row gap-6 justify-end mt-7'>
                                <div className='flex flex-row'>
                                    <div>
                                        <IonIcon icon={timeOutline} style={{ fontSize: "20px", paddingTop: "3px", fontWeight: 900 }}></IonIcon>
                                    </div>

                                    <div>
                                        <p className='font-bold'>30 Min</p>
                                    </div>
                                </div>

                                <div>
                                    <p className='text-emerald-600 font-bold'>R$ 150,00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-xl text-emerald-600'>Retorno</p>
                                </div>

                                <div>
                                    <IonIcon icon={heartCircleOutline} style={{ fontSize: "30px", color: "#059669" }} className='text-shadow-emerald-600'></IonIcon>
                                </div>
                            </div>

                            <div>
                                <p className='font-extralight'>Checkup após emergência</p>
                            </div>

                            <div className='flex flex-row gap-6 justify-end mt-7'>
                                <div className='flex flex-row'>
                                    <div>
                                        <IonIcon icon={timeOutline} style={{ fontSize: "20px", paddingTop: "3px", fontWeight: 900 }}></IonIcon>
                                    </div>

                                    <div>
                                        <p className='font-bold'>30 Min</p>
                                    </div>
                                </div>

                                <div>
                                    <p className='text-emerald-600 font-bold'>R$ 150,00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='mt-10 ml-5 mb-10 mr-5 '>
                        <p className='text-pink-600 font-bold'>Selecione data e horário:</p>
                    </div>

                    <div className='flex justify-center'>
                        <Calendar
                            prevLabel={<IonIcon icon={chevronBackOutline} />}
                            nextLabel={<IonIcon icon={chevronForwardOutline} />}
                            prev2Label={<IonIcon icon={chevronBackCircleOutline} />}
                            next2Label={<IonIcon icon={chevronForwardCircleOutline} />}
                            formatMonthYear={formatMonthYear}
                        />
                    </div>

                    <div className=' flex flex-col gap-8 mt-10 ml-5 mb-10 mr-5 '>
                        <div>
                            <p className=''>Horários disponíveis:</p>
                        </div>

                        <div className='flex justify-center'>
                            <form action="">
                                <select id='horario' name='horario' className=' w-80 pt-2 pb-2 pl-5 pr-5 rounded-2xl border border-gray-200'>
                                    <option value="1">De 9h00 ás 9h30</option>
                                    <option value="2">De 9h30 ás 10h00</option>
                                    <option value="3">De 10h00 ás 10h30</option>
                                    <option value="4">De 10h30 ás 11h00</option>
                                    <option value="5">De 11h00 ás 11h30</option>
                                    <option value="6">De 11h30 ás 12h00</option>
                                    <option value="7">De 13h00 ás 13h30</option>
                                    <option value="8">De 13h30 ás 14h00</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex justify-between mt-5 mb-4 p-5'>
                <div>
                    <PinkBtn title='Sim' onClick={() => navigate('/home')} />
                </div>

                <div>
                    <WhiteBtn title='Não' onClick={() => navigate('/home')} />
                </div>
            </div>
        </div>
    )
}

export default Editar