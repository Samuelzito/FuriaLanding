import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { extrairDadosEDepositarNoFirebase } from '../utils/ocrUtils';

function UploadDocumento() {
    const [imagem, setImagem] = useState(null);
    const [texto, setTexto] = useState('');
    const [validado, setValidado] = useState(null);

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

            const palavrasChave = ['cnh', 'carteira nacional de habilita', 'endere', 'comprovante'];

            const contemNome = textoLower.includes(nomeUsuario);
            const contemChave = palavrasChave.some(palavra => textoLower.includes(palavra));

            setValidado(contemNome && contemChave);

            // 🧠 Extração e salvamento de CPF/endereço
            await extrairDadosEDepositarNoFirebase(text);
        }
    };

    return (
        <div className="bg-zinc-900 text-white p-6 max-w-2xl mx-auto rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-4">📄 Upload de Documento</h2>
            <input type="file" onChange={handleArquivo} className="mb-4" />

            {imagem && (
                <div>
                    <img src={imagem} alt="Documento" className="max-w-full max-h-64 object-contain rounded" />
                </div>
            )}

            {texto && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">📑 Texto Reconhecido:</h3>
                    <p className="bg-zinc-800 p-4 rounded text-sm whitespace-pre-wrap">{texto}</p>

                    {validado === true && (
                        <p className="text-green-400 font-bold mt-4">✅ Documento válido! Nome e tipo reconhecido.</p>
                    )}
                    {validado === false && (
                        <p className="text-red-500 font-bold mt-4">❌ Documento inválido! Não encontramos o nome do usuário ou tipo de documento.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default UploadDocumento;
