import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Tesseract from 'tesseract.js';

function TurbinarPerfil() {
    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        instagram: '',
        twitter: '',
        tiktok: '',
        twitch: '',
        youtube: '',
        endereco: ''
    });
    const [imagem, setImagem] = useState(null);
    const [texto, setTexto] = useState('');
    const [validado, setValidado] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'usuarios', user.uid);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUsuario(data);
                    setFormData({
                        instagram: data.instagram || '',
                        twitter: data.twitter || '',
                        tiktok: data.tiktok || '',
                        twitch: data.twitch || '',
                        youtube: data.youtube || '',
                        endereco: data.endereco || ''
                    });
                }
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArquivo = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagem(URL.createObjectURL(file));
            const { data: { text } } = await Tesseract.recognize(file, 'por');
            setTexto(text);

            const user = auth.currentUser;
            if (!user) return;

            const docRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) return;

            const nomeUsuario = docSnap.data().nome.toLowerCase();
            const textoLower = text.toLowerCase();
            const palavrasChave = ['cnh', 'carteira nacional', 'endere', 'comprovante'];

            const contemNome = textoLower.includes(nomeUsuario);
            const contemChave = palavrasChave.some(p => textoLower.includes(p));

            setValidado(contemNome && contemChave);

            // Captura possível endereço
            const linhaEndereco = text.split('\n').find(linha =>
                linha.toLowerCase().includes('rua') ||
                linha.toLowerCase().includes('avenida') ||
                linha.toLowerCase().includes('travessa') ||
                linha.toLowerCase().includes('estrada')
            );

            if (linhaEndereco) {
                setFormData((prev) => ({ ...prev, endereco: linhaEndereco.trim() }));
            }
        }
    };

    const handleSave = async () => {
        if (!auth.currentUser) return;
        const docRef = doc(db, 'usuarios', auth.currentUser.uid);
        await updateDoc(docRef, {
            ...formData,
            documentoValidado: validado === true
        });
        navigate('/fanhub');
    };

    if (!usuario) return null;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 font-['Saira']">
            <div className="max-w-xl mx-auto space-y-6">
                <h1 className="text-3xl font-extrabold text-center">🚀 Turbine seu Perfil</h1>
                <p className="text-center text-zinc-400">
                    Conecte suas redes sociais e envie um documento para validar seu perfil.
                    <br />
                    <span className="text-amber-400 font-semibold">
                        Perfis verificados recebem o selo oficial da FURIA. 💥
                    </span>
                </p>

                <div className="space-y-4">
                    {['instagram', 'twitter', 'tiktok', 'twitch', 'youtube'].map((rede) => (
                        <div key={rede}>
                            <label className="block mb-1 capitalize">{rede}</label>
                            <input
                                type="text"
                                name={rede}
                                value={formData[rede]}
                                onChange={handleChange}
                                className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-800"
                                placeholder={`https://${rede}.com/seuPerfil`}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block mb-1">📍 Endereço</label>
                        <input
                            type="text"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-800"
                            placeholder="Digite ou reconheça via documento"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold">📄 Upload de Documento</label>
                    <input type="file" onChange={handleArquivo} className="mb-4" />
                    {imagem && (
                        <img src={imagem} alt="Documento" className="max-w-full max-h-60 rounded" />
                    )}
                    {texto && (
                        <div className="mt-4 text-sm bg-zinc-800 p-3 rounded whitespace-pre-wrap">
                            <p className="mb-2 font-bold">🧾 Texto reconhecido:</p>
                            {texto}
                        </div>
                    )}
                    {validado === true && (
                        <p className="text-green-400 font-bold mt-2">✅ Documento válido!</p>
                    )}
                    {validado === false && (
                        <p className="text-red-500 font-bold mt-2">❌ Documento inválido!</p>
                    )}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSave}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 rounded-full transition"
                    >
                        Salvar e Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TurbinarPerfil;
