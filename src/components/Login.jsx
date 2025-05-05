import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);

    // Verifica se o usuário já está logado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
            if (usuario) {
                const docRef = doc(db, 'usuarios', usuario.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const dados = docSnap.data();
                    localStorage.setItem('nome', dados.nome || '');
                    localStorage.setItem('idade', dados.idade || '');
                    localStorage.setItem('cpf', dados.cpf || '');
                    navigate('/fanhub');
                }
            }
            setCarregando(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const credenciais = await signInWithEmailAndPassword(auth, email, senha);
            const uid = credenciais.user.uid;

            const docRef = doc(db, 'usuarios', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const dados = docSnap.data();
                localStorage.setItem('nome', dados.nome || '');
                localStorage.setItem('idade', dados.idade || '');
                localStorage.setItem('cpf', dados.cpf || '');
                navigate('/fanhub');
            } else {
                setErro('Usuário não encontrado na base de dados.');
            }
        } catch (err) {
            setErro('Erro ao fazer login: ' + err.message);
        }
    };

    if (carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-escuro text-white">
                <p className="text-lg">Verificando login...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-escuro text-white px-4">
            <div className="bg-card p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-extrabold mb-6 text-center">Login</h1>
                {erro && <p className="text-red-500 text-center text-sm mb-4">{erro}</p>}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        placeholder="E-mail"
                    />
                    <input
                        type="password"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        placeholder="Senha"
                    />
                    <button
                        type="submit"
                        className="w-full bg-amber-300 text-zinc-900 font-bold py-2 rounded hover:scale-105 transition-transform"
                    >
                        Entrar
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-zinc-400">
                    Não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-amber-300 font-bold hover:underline">
                        Crie uma agora
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
