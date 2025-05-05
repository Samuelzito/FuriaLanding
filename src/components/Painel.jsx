import React from 'react';
import { Link } from 'react-router-dom';

function Painel() {
    const nome = localStorage.getItem('nome');
    const cpf = localStorage.getItem('cpf');
    const idade = localStorage.getItem('idade');
    const redes = {
        instagram: localStorage.getItem('instagram'),
        twitter: localStorage.getItem('twitter'),
        tiktok: localStorage.getItem('tiktok'),
        twitch: localStorage.getItem('twitch'),
        youtube: localStorage.getItem('youtube'),
    };

    const perfilCompleto = nome && cpf && idade;

    return (
        <div className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold mb-6">Painel do Fã 👤</h1>

            {perfilCompleto ? (
                <>
                    <div className="bg-zinc-900 p-6 rounded-xl shadow-md text-left w-full max-w-lg mb-6">
                        <p><strong>Nome:</strong> {nome}</p>
                        <p><strong>CPF:</strong> {cpf}</p>
                        <p><strong>Idade:</strong> {idade}</p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-xl shadow-md text-left w-full max-w-lg mb-6">
                        <h2 className="text-xl font-bold mb-2">Redes Sociais</h2>
                        {Object.entries(redes).map(([key, value]) => (
                            value ? (
                                <p key={key}>
                                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline">
                                        {value}
                                    </a>
                                </p>
                            ) : null
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-red-400 mb-6">Você ainda não completou seu cadastro.</p>
            )}

            <div className="flex gap-4">
                <Link
                    to="/fanhub/completar"
                    className="bg-amber-300 text-zinc-900 font-bold py-2 px-6 rounded hover:scale-105 transition"
                >
                    Editar Cadastro
                </Link>
                <Link
                    to="/fanhub"
                    className="border border-amber-300 text-amber-300 font-bold py-2 px-6 rounded hover:bg-amber-300 hover:text-zinc-900 transition"
                >
                    Voltar para o Fanhub
                </Link>
            </div>
        </div>
    );
}

export default Painel;
