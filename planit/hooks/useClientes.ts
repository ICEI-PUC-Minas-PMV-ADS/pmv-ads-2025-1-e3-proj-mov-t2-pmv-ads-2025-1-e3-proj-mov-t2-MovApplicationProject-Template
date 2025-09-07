import { useState, useEffect, useCallback } from 'react';
import { db, auth } from '../firebaseConfig'; 
import { collection, query, where, onSnapshot, getDocs, doc, getDoc, limit, DocumentData } from 'firebase/firestore';
import { Cliente, AgendamentoDoc, ClienteDoc, ServicoDoc, StatusCliente } from '../src/cliente.types';
import { mapFirestoreStatusToClienteStatus, formatDateString, parseAgendamentoDateTime } from '../utils/dataUtils';

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profissionalId, setProfissionalId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      setProfissionalId(user ? user.uid : null);
      if (!user) {
        setClientes([]);
        setLoading(false);
        setError("Profissional não autenticado.");
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const refetch = useCallback(() => {
    const currentId = auth.currentUser?.uid;
    if (profissionalId === currentId) {
        setProfissionalId(null);
        setTimeout(() => setProfissionalId(currentId || null), 50);
    }
  }, [profissionalId]);

  useEffect(() => {
    if (!profissionalId) {
      return;
    }

    setLoading(true);
    setError(null);

    const agendamentosRef = collection(db, "Agendamento");
    const q = query(agendamentosRef, where("profissionalId", "==", profissionalId));

    const unsubscribeSnapshots = onSnapshot(q, async (agendamentosSnapshot) => {
      if (agendamentosSnapshot.empty) {
        setClientes([]);
        setLoading(false);
        return;
      }

      const fetchedAgendamentos: AgendamentoDoc[] = agendamentosSnapshot.docs.map(d => ({
        firestoreId: d.id,
        ...(d.data() as Omit<AgendamentoDoc, 'firestoreId'>),
      }));

      try {
        const uniqueClienteUids = Array.from(new Set(fetchedAgendamentos.map(ag => ag.clienteId).filter(Boolean)));
        const uniqueServicoIds = Array.from(new Set(fetchedAgendamentos.map(ag => ag.servicoId).filter(Boolean)));
        
        if (uniqueClienteUids.length === 0) {
            setClientes([]);
            setLoading(false);
            return;
        }

        const clienteDetailsPromises = uniqueClienteUids.map(async (uid) => {
          const clienteQuery = query(collection(db, "Cliente"), where("uid", "==", uid), limit(1));
          const clienteSnap = await getDocs(clienteQuery);
          return clienteSnap.docs[0] || null;
        });

        const servicoDetailsPromises = uniqueServicoIds.map(id => getDoc(doc(db, "Servicos", id)));

        const [clienteDocSnapshots, servicoDocsSnap] = await Promise.all([
          Promise.all(clienteDetailsPromises),
          Promise.all(servicoDetailsPromises),
        ]);

        const clientesMap = new Map<string, ClienteDoc>();
        clienteDocSnapshots.forEach(snap => {
          if (snap && snap.exists()) {
            const data = snap.data();
            clientesMap.set(data.uid, { id: snap.id, nome: data.nome || "Nome não informado", uid: data.uid });
          }
        });

        const servicosMap = new Map<string, ServicoDoc>();
        servicoDocsSnap.forEach(snap => {
          if (snap.exists()) {
            servicosMap.set(snap.id, { id: snap.id, ...snap.data() } as ServicoDoc);
          }
        });

        const agendamentosPorClienteUid: Record<string, AgendamentoDoc[]> = {};
        fetchedAgendamentos.forEach(ag => {
          if (ag.clienteId) {
            if (!agendamentosPorClienteUid[ag.clienteId]) {
              agendamentosPorClienteUid[ag.clienteId] = [];
            }
            agendamentosPorClienteUid[ag.clienteId].push(ag);
          }
        });

        const finalClientesArray = Object.keys(agendamentosPorClienteUid)
          .map(clienteUid => {
            const clienteInfo = clientesMap.get(clienteUid);
            const seusAgendamentos = agendamentosPorClienteUid[clienteUid]
              .filter(ag => ag.dataInicio && ag.horaInicio && ag.servicoId)
              .sort((a, b) => parseAgendamentoDateTime(b.dataInicio, b.horaInicio).getTime() - parseAgendamentoDateTime(a.dataInicio, a.horaInicio).getTime());

            if (seusAgendamentos.length === 0) return null;

            const ultimoAgendamento = seusAgendamentos[0];

            return {
              id: clienteInfo?.id || clienteUid,
              nome: clienteInfo?.nome || "Cliente Desconhecido",
              ultimaVisita: formatDateString(ultimoAgendamento.dataInicio),
              imagem: clienteInfo?.fotoPerfil || null, 
              status: mapFirestoreStatusToClienteStatus(ultimoAgendamento.status),
              consultas: seusAgendamentos.map(ag => {
                const servicoInfo = servicosMap.get(ag.servicoId);
                return {
                  titulo: servicoInfo?.nome || "Serviço Removido",
                  data: formatDateString(ag.dataInicio),
                };
              }),
            };
          })
          .filter((cliente): cliente is Cliente => cliente !== null);

        setClientes(finalClientesArray);

      } catch (fetchError) {
        console.error(fetchError);
        setError("Falha ao carregar detalhes dos clientes/serviços.");
      } finally {
        setLoading(false);
      }
    }, (err) => {
      console.error(err);
      setError("Falha ao carregar agendamentos.");
      setLoading(false);
    });

    return () => unsubscribeSnapshots();
  }, [profissionalId]);

  return { clientes, loading, error, refetch };
};