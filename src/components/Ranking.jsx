// src/components/Ranking.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const dadosMock = [
    { nome: 'Lucas Andrade', pontos: 120, posicao: 1 },
    { nome: 'Maria Fernanda', pontos: 110, posicao: 2 },
    { nome: 'João Victor', pontos: 105, posicao: 3 },
    { nome: 'Beatriz Lima', pontos: 95, posicao: 4 },
    { nome: 'Pedro Henrique', pontos: 90, posicao: 5 },
];

function Ranking() {
    const navigate = useNavigate();

    return (
        <div className="bg-black min-h-screen text-white font-['Saira']">
            <Header />
            <div className="max-w-2xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6 text-center">🏆 Ranking de Fãs</h2>

                <ul className="space-y-4 mb-8">
                    {dadosMock.map((usuario, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-zinc-900 px-4 py-3 rounded-lg"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-amber-300 text-lg font-bold">{usuario.posicao}º</span>
                                <span className="font-semibold">{usuario.nome}</span>
                            </div>
                            <span className="text-sm text-zinc-400">{usuario.pontos} pts</span>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/fanhub')}
                        className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-full hover:scale-105 transition"
                    >
                        ← Voltar ao Fanhub
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ranking;
