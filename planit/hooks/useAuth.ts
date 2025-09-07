import { useCallback, useEffect, useState } from "react"
import { onAuthStateChanged , signOut , signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { deleteUser } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] = useState<UserCredential | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(
    (type: "signIn" | "signUp", email: string, password: string) => {
      setLoading(true);

      const fn =
        type === "signIn"
          ? signInWithEmailAndPassword
          : createUserWithEmailAndPassword;

      return fn(auth, email, password)
        .then((credential: any) => {
          setCredential(credential);
          setError(null);
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => setLoading(false));
    },
    []
  );

  const logout = useCallback(() => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
        setCredential(null);
        setError(null);
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: any) => {
        setUser(user);
        setLoading(false);
      },
      (error: any) => {
        setError(error);
        setLoading(false);
      }
    );
   
    
    return unsubscribe;
  }, []);

  const deleteAccount = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        setUser(null);
        setCredential(null);
        setError(null);
      } catch (error: any) {
        setError(error);
        console.error("Erro ao excluir a conta:", error);
      }
    }
  }, []);
  
  return { user, credential, loading, login, logout, error, deleteAccount };
}
