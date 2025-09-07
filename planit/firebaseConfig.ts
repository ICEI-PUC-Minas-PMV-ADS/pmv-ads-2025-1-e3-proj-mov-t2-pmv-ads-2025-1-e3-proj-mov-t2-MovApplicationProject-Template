// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  where,
  getCountFromServer,
  getDocs,
  addDoc,
  updateDoc,
  setLogLevel
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAAhaVIEQd2QkVO8KxOUR_H-XY3PhUo6o",
  authDomain: "planit-bfa38.firebaseapp.com",
  projectId: "planit-bfa38",
  storageBucket: "planit-bfa38.firebasestorage.app",
  messagingSenderId: "1018099220762",
  appId: "1:1018099220762:web:5de7a07a0765ba08652ca3",
  measurementId: "G-DMZBM9BCM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
setLogLevel('info');
const db = getFirestore(app);
const auth = getAuth(app);

// Funções para contar consultas
export const countConsultasHoje = async (profissionalId: string): Promise<number> => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);
  
  const q = query(
    collection(db, "Agendamento"),
    where("profissionalId", "==", profissionalId),
    where("dataInicio", ">=", hoje), // Usa o objeto Date completo
    where("dataInicio", "<", amanha) // Usa o objeto Date completo
  );
  
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const countConsultasSemana = async (profissionalId: string): Promise<number> => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay()); // Domingo da semana atual
  
  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 7);
  
  const q = query(
    collection(db, "Agendamento"),
    where("profissionalId", "==", profissionalId),
    where("dataInicio", ">=", inicioSemana.toISOString().split('T')[0]),
    where("dataInicio", "<", fimSemana.toISOString().split('T')[0])
  );
  
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

// Exportações principais
export { app, db, auth };