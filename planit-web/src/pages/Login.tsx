import '../App.css'
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import PinkBtn from '../components/pinkBtn';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            setErrorMessage("Preencha todos os campos.");
            return;
        }

        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            window.alert("Login realizado com sucesso!");
            navigate('/agendar');

        } catch (error: any) {
            console.error("Erro ao fazer login:", error);

            let userMessage = "Erro ao fazer login. Tente novamente.";

            switch (error.code) {
                case "auth/invalid-email":
                    userMessage = "Formato de e‑mail inválido.";
                    break;

                case "auth/user-not-found":
                    userMessage = "E‑mail não cadastrado.";
                    break;

                case "auth/wrong-password":
                    userMessage = "Senha incorreta.";
                    break;
            }

            setErrorMessage(userMessage);
            window.alert(userMessage);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className='flex flex-col gap-3 justify-center text-center'>
                <div className='border-b border-b-gray-100 p-5'>
                    <p className='text-2xl font-semibold'>Login</p>
                </div>

                <div className='p-3'>
                    <p className='font-extralight'>Entre com seu e-mail e senha</p>
                </div>
            </div>

            <div className='ml-2 mr-2 mt-15 flex justify-center'>
                <form action="" className='p-5 rounded-2xl'>
                    <div className='flex flex-col gap-5 justify-center'>
                        <div className='flex gap-2 items-center'>
                            <div>
                                <label>E-mail:</label>
                            </div>

                            <div>
                                <input onChange={(e) => { setEmail(e.target.value); setErrorMessage(null) }} value={email} type="text" className='border border-gray-700 p-2 w-52 rounded-xl  outline-none' />
                            </div>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <div>
                                <label>Senha:</label>
                            </div>

                            <div className='flex gap-2 items-center'>
                                <div>
                                    <input type={showPassword ? 'text' : 'password'} onChange={(s) => { setSenha(s.target.value); setErrorMessage(null) }} value={senha} className='outline-none border border-gray-700 p-2 w-52 rounded-xl' />
                                </div>

                                <div>
                                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} onClick={() => setShowPassword(!showPassword)} className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end pr-5 m-2'>
                        <div>
                            <p className='text-xs text-pink-700 cursor-pointer'>Esqueceu a Senha?</p>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className='text-center m-3'>
                            <p className='text-red-700'>{errorMessage}</p>
                        </div>
                    )}

                    <div className='mt-15 mb-15 text-center'>
                        <p> Não tem uma conta? <span className='text-pink-700 cursor-pointer' onClick={() => navigate('/cadastrar')}>Cadastra-se</span></p>
                    </div>

                    <div className='flex justify-center'>
                        <PinkBtn title='Entrar' onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? (
                                <PinkBtn />
                            ) : (
                                <PinkBtn title='Entrar' />
                            )}
                        </PinkBtn>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login