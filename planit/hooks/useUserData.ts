import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

type UserData = {
  nome?: string;
  profissao?: string;
  email?: string;
  uid?: string;
};

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "Profissional", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData({ ...docSnap.data(), uid: user.uid } as UserData);
          } else {
            console.log("Documento do usuário não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  return { userData };
};
