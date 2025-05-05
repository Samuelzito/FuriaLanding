import React from 'react';
import { useNavigate } from 'react-router-dom';

function Recompensas() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 font-['Saira']">
            <button
                onClick={() => navigate('/fanhub')}
                className="mb-6 bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700"
            >
                ← Voltar ao Fanhub
            </button>

            <h1 className="text-3xl font-bold text-center mb-8">🎁 Recompensas por Engajamento</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Bronze */}
                <div className="bg-zinc-900 rounded-xl p-6 text-center border border-amber-700">
                    <h2 className="text-xl font-bold text-amber-400 mb-2">🥉 Bronze</h2>
                    <p className="text-zinc-400 mb-4">0 a 49 pontos</p>
                    <ul className="text-sm text-zinc-300 space-y-2">
                        <li>✔ Adesivo digital exclusivo</li>
                        <li>✔ Papel de parede da FURIA</li>
                    </ul>
                </div>

                {/* Prata */}
                <div className="bg-zinc-900 rounded-xl p-6 text-center border border-slate-400">
                    <h2 className="text-xl font-bold text-slate-300 mb-2">🥈 Prata</h2>
                    <p className="text-zinc-400 mb-4">50 a 99 pontos</p>
                    <ul className="text-sm text-zinc-300 space-y-2">
                        <li>✔ Cupom de desconto</li>
                        <li>✔ Participação em sorteios mensais</li>
                    </ul>
                </div>

                {/* Ouro */}
                <div className="bg-zinc-900 rounded-xl p-6 text-center border border-yellow-400">
                    <h2 className="text-xl font-bold text-yellow-400 mb-2">🥇 Ouro</h2>
                    <p className="text-zinc-400 mb-4">100 pontos ou mais</p>
                    <ul className="text-sm text-zinc-300 space-y-2">
                        <li>✔ Acesso antecipado a eventos</li>
                        <li>✔ Sorteios exclusivos</li>
                        <li>✔ Selo de verificação da FURIA</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Recompensas;
