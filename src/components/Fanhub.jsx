import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import FuriaLogo from './FuriaLogo';

function Fanhub() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'usuarios', user.uid);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setUsuario(docSnap.data());
                }
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!usuario) return null;

    const cadastroIncompleto =
        !usuario.instagram &&
        !usuario.twitter &&
        !usuario.tiktok &&
        !usuario.twitch &&
        !usuario.youtube;

    const perfilCompleto = !cadastroIncompleto;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 font-['Saira'] relative">
            <FuriaLogo />
            <h1 className="text-3xl font-extrabold text-center mb-4">
                Bem-vindo ao Fanhub da FURIA, {usuario.nome}!
            </h1>
            <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-10">
                Essa é a sua central de engajamento com a FURIA. Aqui você poderá completar seu perfil, acumular pontos,
                subir no ranking e ganhar recompensas exclusivas como acesso antecipado a eventos, sorteios e muito mais!
            </p>

            <div className="bg-zinc-900 p-6 rounded-xl max-w-md mx-auto mb-6 relative">
                <h2 className="text-xl font-bold mb-4">Seus Dados</h2>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>CPF:</strong> {usuario.cpf}</p>
                <p><strong>Idade:</strong> {usuario.idade}</p>

                {perfilCompleto && (
                    <img
                        src="/logo-furia100.png"
                        alt="Selo 100%"
                        className="absolute top-2 right-2 w-10 h-10"
                        title="Perfil 100% completo!"
                    />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="bg-zinc-900 p-4 rounded-xl text-center">
                    ✅ <p className="mt-2 font-bold">Pontuação de Engajamento</p>
                </div>
                <div
                    onClick={() => navigate('/fanhub/recompensas')}
                    className="bg-zinc-900 p-4 rounded-xl text-center cursor-pointer hover:bg-zinc-800 transition"
                >
                    🎁 <p className="mt-2 font-bold">Recompensas Exclusivas</p>
                </div>
                <div
                    onClick={() => navigate('/fanhub/ranking')}
                    className="bg-zinc-900 p-4 rounded-xl text-center cursor-pointer hover:bg-zinc-800 transition"
                >
                    🏆 <p className="mt-2 font-bold">Ranking de Fãs</p>
                </div>
                <div
                    onClick={() => navigate('/fanhub/upload-documento')}
                    className="bg-zinc-900 p-4 rounded-xl text-center cursor-pointer hover:bg-zinc-800 transition"
                >
                    🧾 <p className="mt-2 font-bold">Verificar Documento</p>
                </div>
            </div>

            {!perfilCompleto && (
                <p className="text-center text-sm text-zinc-400 mb-4">
                    ⚡ Que tal turbinar seu perfil e desbloquear recompensas exclusivas?
                </p>
            )}

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => navigate('/fanhub/turbinar')}
                    className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-full hover:scale-105 transition flex items-center gap-2"
                >
                    🚀 Turbinar Perfil
                </button>
            </div>
        </div>
    );
}

export default Fanhub;
