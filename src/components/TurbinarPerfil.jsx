import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function TurbinarPerfil() {
    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        instagram: '',
        twitter: '',
        tiktok: '',
        twitch: '',
        youtube: ''
    });
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
                        youtube: data.youtube || ''
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

    const handleSave = async () => {
        if (!auth.currentUser) return;
        const docRef = doc(db, 'usuarios', auth.currentUser.uid);
        await updateDoc(docRef, formData);
        navigate('/fanhub');
    };

    if (!usuario) return null;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 font-['Saira']">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-extrabold text-center mb-2">Conecte suas redes sociais</h1>
                <p className="text-center text-zinc-400 mb-6">
                    Quanto mais redes você conectar, mais pontos de engajamento você acumula! <br />
                    <span className="text-amber-400 font-semibold">
                        Ao atingir 100 pontos, você recebe o selo de verificação da FURIA. 💥
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
                </div>

                <div className="text-center mt-6">
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
