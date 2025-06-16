export interface Profissional {
    id: string 
    nome: string
    profissao?: string
    fotoPerfil?: string 
    [key: string]: any
}

export interface Servico {
    nome: string 
    descricao: string
    duracao: number 
    valor: number 
    uid: string
    id: string
}

export interface Horario {
  id: string;
  data: string;
  hora: string;
  status: number;
  uid: string;
  value?: number;
}

export interface Agendamento {
  dataInicio: string  
  horaInicio: string  
  dataFim: string    
  horaFim: string    
  servicoId: string
  profissionalId: string
  clienteId: string
  status: 'agendado' | 'confirmado' | 'cancelado'
  duracao: number
  criadoEm?: string
}

export interface AgendamentoCompleto extends Agendamento {
  id: string;
  profissional: Profissional | null;
  servico: Servico | null;
}

export interface Notificacao {
  titulo: string;
  descricao: string;
  criadoEm: Date;
  status: 1 | 2;
  profissionalId: string;
  clienteId: string;
  dataInicio?: string;
  horaInicio?: string;
}

