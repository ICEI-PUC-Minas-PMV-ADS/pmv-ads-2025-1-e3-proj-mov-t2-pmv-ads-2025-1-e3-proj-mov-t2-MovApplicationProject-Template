import "../App.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import PinkBtn from "../components/pinkBtn";

import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";

function Cadastrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCadastro = async () => {
    debugger;
    if (!nome || !email || !senha || !confirmarSenha) {
      window.alert("Preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      window.alert("Por favor, insira um email válido.");
      return;
    }

    if (senha.length < 8) {
      window.alert("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      window.alert("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      await addDoc(collection(db, "Cliente"), {
        uid: user.uid,
        nome,
        email,
        criadoEm: new Date(),
      });

      window.alert("Usuário cadastrado com sucesso!");

      navigate("/agendar");
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/email-already-in-use") {
          window.alert("Este email já está em uso.");
        } else if (firebaseError.code === "auth/invalid-email") {
          window.alert("Email inválido.");
        } else {
          window.alert("Ocorreu um erro ao cadastrar. Tente novamente.");
        }
      } else {
        window.alert("Erro desconhecido.");
      }
      console.error("Erro ao cadastrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 justify-center text-center">
        <div className="border-b border-b-gray-100 p-5">
          <p className="text-2xl font-semibold">Cadastro</p>
        </div>

        <div className="p-3">
          <p className="font-extralight">Crie sua Conta</p>
        </div>
      </div>

      <div className="ml-2 mr-2 mt-15 flex justify-center">
        <form action="" className="p-5 rounded-2xl">
          <div className="flex flex-col gap-5 justify-center">
            <div className="flex gap-2 items-center">
              <div>
                <label>Nome:</label>
              </div>

              <div>
                <input
                  onChange={(n) => setNome(n.target.value)}
                  value={nome}
                  type="text"
                  className="border border-gray-700 p-2 w-56 rounded-xl  outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <label>E-mail:</label>
              </div>

              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  className="border border-gray-700 p-2 w-56 rounded-xl  outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <label>Senha:</label>
              </div>

              <div className="flex gap-2 items-center">
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(s) => setSenha(s.target.value)}
                    value={senha}
                    className="outline-none border border-gray-700 p-2 w-56 rounded-xl"
                  />
                </div>

                <div>
                  <IonIcon
                    icon={showPassword ? eyeOutline : eyeOffOutline}
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <label>Confirmar senha:</label>
              </div>

              <div className="flex gap-2 items-center">
                <div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(cs) => setConfirmarSenha(cs.target.value)}
                    className="outline-none border border-gray-700 p-2 w-72 rounded-xl"
                  />
                </div>

                <div>
                  <IonIcon
                    icon={showConfirmPassword ? eyeOutline : eyeOffOutline}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-15 mb-15 text-center">
            <p>
              {" "}
              Já possui uma conta?{" "}
              <span
                className="text-pink-700 cursor-pointer"
                onClick={() => navigate("/cadastrar")}
              >
                Login
              </span>
            </p>
          </div>

          <div className="flex justify-center">
            <PinkBtn
              title="Cadastrar"
              onClick={handleCadastro}
              disabled={isLoading}
            >
              {isLoading ? <PinkBtn /> : <PinkBtn title="Cadastrar" />}
            </PinkBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastrar;
