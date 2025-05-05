import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function AdminPainel() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'usuarios'));
                const listaUsuarios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsuarios(listaUsuarios);
                setCarregando(false);
            } catch (erro) {
                console.error('Erro ao carregar usuários:', erro);
                setCarregando(false);
            }
        };

        carregarUsuarios();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white px-6 py-10">
            <h1 className="text-4xl font-bold mb-6 text-center">Painel de Admin - Usuários Cadastrados</h1>

            {carregando ? (
                <p className="text-center text-gray-400">Carregando dados...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-zinc-700">
                        <thead className="bg-zinc-800">
                        <tr>
                            <th className="px-4 py-2">Nome</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">CPF</th>
                            <th className="px-4 py-2">Idade</th>
                            <th className="px-4 py-2">Instagram</th>
                            <th className="px-4 py-2">Twitter</th>
                            <th className="px-4 py-2">TikTok</th>
                            <th className="px-4 py-2">Twitch</th>
                            <th className="px-4 py-2">YouTube</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id} className="border-t border-zinc-700 hover:bg-zinc-800">
                                <td className="px-4 py-2">{usuario.nome}</td>
                                <td className="px-4 py-2">{usuario.email}</td>
                                <td className="px-4 py-2">{usuario.cpf}</td>
                                <td className="px-4 py-2">{usuario.idade}</td>
                                <td className="px-4 py-2">{usuario.instagram}</td>
                                <td className="px-4 py-2">{usuario.twitter}</td>
                                <td className="px-4 py-2">{usuario.tiktok}</td>
                                <td className="px-4 py-2">{usuario.twitch}</td>
                                <td className="px-4 py-2">{usuario.youtube}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminPainel;
