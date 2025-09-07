import '../App.css'
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, timeOutline } from 'ionicons/icons'
import { chevronBackCircleOutline, chevronForwardCircleOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, getProfissional, getServicos, getHorarios, createAgendamento } from '../../firebaseConfig';
import { Profissional, Servico, Horario } from '../../types';

import Calendar, { CalendarProps } from 'react-calendar';
import perfilPlanit from '../assets/perfilPlanit.jpg';
import WhiteBtn from '../components/whiteBtn';
import GreenBtn from '../components/greenBtn';


function Agendar() {
  const navigate = useNavigate();
  const [profissional, setProfissional] = useState<Profissional | null>(null);

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [horaSelecionada, setHoraSelecionada] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const profId = localStorage.getItem('profissionalId');

        if (!profId) {
          navigate('/home');
          return;
        }

        const [profData, servicosData] = await Promise.all([
          getProfissional(profId),
          getServicos(profId)
        ]);

        setProfissional(profData);
        setServicos(servicosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [navigate])

  const formatMonthYear = (_locale: unknown, date: Date) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthIndex = date.getMonth();
    return `${months[monthIndex]} ${date.getFullYear()}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!profissional) {
    return null;
  }

  const handleDateChange: CalendarProps['onChange'] = async (value) => {
    const horaSelecionada = (Array.isArray(value) ? value[0] : value) as Date;

    setDate(horaSelecionada);
    setLoading(true);

    try {
      const profId = localStorage.getItem('profissionalId');
      if (!profId) {
        window.alert('Erro ao buscar Profissional');
        navigate("/home");
        return;
      }

      const dataFormatada = horaSelecionada.toISOString().split('T')[0];
      const horarioDisponiveis = await getHorarios(profId, dataFormatada);
      setHorarios(horarioDisponiveis);

    } catch (error) {
      window.alert('Erro ao buscar horarios');
      console.error("Erro ao buscar horários:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatHora = (hora: string) => {
    const [h, m] = hora.split(':');
    return `${parseInt(h)}h${m}`;
  };

  const handleAgendamento = async () => {
    if (!servicoSelecionado || !date || !horaSelecionada) {
      window.alert("Selecione o serviço, a data e o horário antes de agendar.");
      return;
    }

    const [h, m] = horaSelecionada.split(':').map(Number);
    const dataSelecionada = new Date(date); // Cópia do objeto Date
    dataSelecionada.setHours(h, m);

    const clienteId = auth.currentUser?.uid;

    if (!clienteId) {
      window.alert("Cliente não identificado.");
      return;
    }

    try {
      setLoading(true);
      console.log("Data selecionada:", dataSelecionada);
      await createAgendamento(dataSelecionada, horaSelecionada, servicoSelecionado, clienteId);
      window.alert("Agendamento realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao agendar:", error);
      window.alert("Falha ao realizar o agendamento: Tente novamente.");
    } finally {
      setLoading(false);
    }


  };


  return (
    <div>
      <div className='m-5 flex flex-col gap-10'>
        <div className='flex flex-wrap gap-6 items-center'>
          <div>
            <img className='rounded-full w-20 h-20' src={profissional.fotoPerfil || perfilPlanit} alt="Perfil Profissional" />
          </div>

          <div>
            <p className='text-xl font-bold'>{profissional.nome}</p>

            <div>
              <p className='text-emerald-500 font-light'>{profissional.profissao}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='m-5 flex flex-col gap-10'>
        <div>
          <p className='text-pink-600 font-bold'>Selecione o Serviço Desejado: </p>

          {servicos.map(servico => (
            <div key={servico.id} className='flex justify-center'>
              <div onClick={() => setServicoSelecionado(servico)} className={`mt-10 w-72 p-5 rounded-3xl border shadow-2xl flex flex-col gap-3 hover:scale-105 cursor-pointer ${servicoSelecionado?.id === servico.id ? 'border-pink-600' : 'border-gray-100'}`}>
                <div className='flex flex-row justify-between'>
                  <div>
                    <p className='text-xl text-emerald-600'>{servico.nome}</p>
                  </div>
                  <div>
                    <IonIcon icon={heartCircleOutline} style={{ fontSize: "30px", color: "#059669" }} />
                  </div>
                </div>

                <div>
                  <p className='font-extralight'>{servico.descricao}</p>
                </div>

                <div className='flex flex-row gap-6 justify-end mt-7'>
                  <div className='flex flex-row'>
                    <IonIcon icon={timeOutline} style={{ fontSize: "20px", paddingTop: "3px", fontWeight: 900 }} />
                    <p className='font-bold'>{servico.duracao}</p>
                  </div>
                  <div>
                    <p className='text-emerald-600 font-bold'>R$ {servico.valor.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className='mt-10 ml-5 mb-10 mr-5 '>
            <p className='text-pink-600 font-bold'>Selecione data e horário:</p>
          </div>

          <div className='flex justify-center'>
            <Calendar
              onChange={handleDateChange}
              value={date}
              minDate={new Date()}
              prevLabel={<IonIcon icon={chevronBackOutline} />}
              nextLabel={<IonIcon icon={chevronForwardOutline} />}
              prev2Label={<IonIcon icon={chevronBackCircleOutline} />}
              next2Label={<IonIcon icon={chevronForwardCircleOutline} />}
              formatMonthYear={formatMonthYear}
              tileClassName={({ date: currentDate, view }) => {
                if (view === 'month') {
                  const today = new Date();
                  const isToday =
                    currentDate.getFullYear() === today.getFullYear() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getDate() === today.getDate();

                  const isSelected =
                    date &&
                    currentDate.getFullYear() === date.getFullYear() &&
                    currentDate.getMonth() === date.getMonth() &&
                    currentDate.getDate() === date.getDate();

                  if (isSelected) return 'selected-day';
                  if (isToday) return 'today';
                }
                return '';
              }}
            />
          </div>

          <div className=' flex flex-col gap-8 mt-10 ml-5 mb-10 mr-5 '>
            <div>
              <p className=''>Horários disponíveis:</p>
            </div>

            <div className='flex justify-center'>
              <form>
                <select id='horario' name='horario' value={horaSelecionada} onChange={(e) => setHoraSelecionada(e.target.value)} disabled={!date || loading} className=' w-80 pt-2 pb-2 pl-5 pr-5 rounded-2xl border border-gray-200'>
                  {loading ? (
                    <option value="">Carregando...</option>
                  ) : horarios.length === 0 ? (
                    <option value="">Nenhum horário disponível</option>
                  ) : (
                    <>
                      <option value="">Selecione um horário</option>
                      {horarios.map((horario) => (
                        <option key={horario.id} value={horario.hora}>
                          {formatHora(horario.hora)}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </form>
            </div>
          </div>
        </div>

      </div>

      <div className='flex justify-around m-5'>
        <WhiteBtn title='Pular' onClick={() => navigate('/home')} />
        <GreenBtn title='Agendar' onClick={handleAgendamento} type='submit' />
      </div>
    </div>
  )
}

export default Agendar