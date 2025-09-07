import { StatusCliente } from '../src/cliente.types';

export const parseAgendamentoDateTime = (dataStr: string, horaStr: string): Date => {
  return new Date(`${dataStr}T${horaStr}:00`);
};

export const formatDateString = (dateStr: string | undefined): string => {
  if (!dateStr) return "Data desconhecida";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const dayFormatted = date.getDate();
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const monthFormatted = monthNames[date.getMonth()];
    return `${dayFormatted} ${monthFormatted} ${year}`;
  } catch (e) {
    console.error("Error formatting date string:", dateStr, e);
    return dateStr;
  }
};

export const mapFirestoreStatusToClienteStatus = (firestoreStatus: string | undefined): StatusCliente => {
  if (!firestoreStatus) return StatusCliente.EmAndamento;
  switch (firestoreStatus.toLowerCase()) {
    case "agendado":
    case "confirmado":
      return StatusCliente.EmAndamento;
    case "concluído":
    case "concluido":
    case "finalizado":
      return StatusCliente.Finalizados;
    case "cancelado pelo cliente":
    case "cancelado pelo profissional":
    case "cancelado":
      return StatusCliente.Cancelados;
    case "rejeitado":
      return StatusCliente.Rejeitados;
    default:
      if (Object.values(StatusCliente).includes(firestoreStatus as StatusCliente)) {
        return firestoreStatus as StatusCliente;
      }
      console.warn(`Status do Firestore não mapeado: "${firestoreStatus}", usando "Em Andamento".`);
      return StatusCliente.EmAndamento;
  }
};