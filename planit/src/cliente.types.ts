
export enum StatusCliente {
    Finalizados = "Finalizados",
    Cancelados = "Cancelados",
    Antigos = "Antigos",
    Rejeitados = "Rejeitados",
    EmAndamento = "Em andamento",
  }
  
  export type Consulta = {
    titulo: string;
    data: string;
  };
  
  export type Cliente = {
    id: string;
    nome: string;
    ultimaVisita: string;
    imagem: string | null;
    status: StatusCliente;
    consultas: Consulta[];
  };
  
  export interface AgendamentoDoc {
    firestoreId: string;
    clienteId: string;
    dataInicio: string;
    horaInicio: string;
    profissionalId: string;
    servicoId: string;
    status: string;
    dataFim?: string;
    horaFim?: string;
    duracao?: string;
  }
  
  export interface ClienteDoc {
    id: string;
    nome: string;
    uid?: string;
    fotoPerfil?: string | null;
  }
  
  export interface ServicoDoc {
    id: string;
    nome: string;
  }