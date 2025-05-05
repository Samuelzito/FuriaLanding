import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        try {
            const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
            const uid = credenciais.user.uid;

            await setDoc(doc(db, 'usuarios', uid), {
                nome,
                email,
                idade,
                cpf,
                createdAt: new Date()
            });

            localStorage.setItem('nome', nome);
            localStorage.setItem('idade', idade);
            localStorage.setItem('cpf', cpf);

            setSucesso('🔥 Cadastro realizado com sucesso! Bem-vindo(a) à FURIA!');
            setTimeout(() => {
                navigate('/fanhub');
            }, 3000);
        } catch (err) {
            setErro('Erro ao cadastrar: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-escuro text-white px-4">
            <div className="bg-card p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-extrabold mb-6 text-center">Crie sua conta</h1>

                {erro && (
                    <p className="text-red-500 text-center text-sm mb-4">{erro}</p>
                )}

                {sucesso && (
                    <div className="text-center text-amber-300 font-bold bg-zinc-900 border border-amber-400 rounded-lg p-4 mb-4">
                        {sucesso}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        placeholder="Nome completo"
                    />
                    <input
                        type="text"
                        required
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        placeholder="CPF"
                    />
                    <input
                        type="number"
                        required
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        placeholder="Idade"
                    />
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
                        Cadastrar
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-zinc-400">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-amber-300 font-bold hover:underline">
                        Voltar para o login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro;
