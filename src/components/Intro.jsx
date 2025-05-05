import React from 'react';
import { useNavigate } from 'react-router-dom';

function Intro() {
    const navigate = useNavigate();

    return (
        <section className="text-white py-20 px-6 text-center font-['Saira']">
            <div className="max-w-4xl mx-auto">
                <img
                    src="/logo-furia.png"
                    alt="Logo FURIA"
                    className="mx-auto w-16 h-16 object-contain mb-4"
                />
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    Você não torce, você sente. <br />
                    Bem-vindo ao seu território.
                </h2>
                <p className="text-zinc-400 mb-8">
                    Desde 2017, a FURIA vem ultrapassando barreiras e criando um novo padrão de paixão e performance nos eSports.
                    Este é o seu espaço para viver tudo isso de perto.
                </p>
                <button
                    onClick={() => navigate('/cadastro')}
                    className="bg-amber-300 text-black font-bold px-6 py-2 rounded hover:scale-105 transition"
                >
                    Junte-se à FURIA
                </button>
            </div>

            {/* Blocos Horizontais de Seções */}
            <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-left max-w-6xl mx-auto">
                <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-white">🔥 Novidades</h3>
                    <p className="text-zinc-400 text-sm mt-2">
                        Apresentamos o <strong>Fanhub da FURIA</strong>: sua nova central de engajamento!
                        Conecte suas redes e acumule pontos por curtir, compartilhar e participar dos nossos eventos.
                        Troque por <strong>recompensas exclusivas</strong> e suba no ranking oficial dos fãs!
                    </p>
                </div>
                <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-white">🧢 Catálogo</h3>
                    <p className="text-zinc-400 text-sm mt-2">
                        Em breve, explore o catálogo oficial da FURIA com nossos produtos licenciados e experiências exclusivas.
                        Conecte seu perfil para desbloquear acesso antecipado a lançamentos!
                    </p>
                </div>
                <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-white">🤝 Parceiros</h3>
                    <p className="text-zinc-400 text-sm mt-2">
                        Conheça as marcas que caminham lado a lado com a FURIA.
                        Conecte-se e aproveite <strong>benefícios e cupons exclusivos</strong> oferecidos pelos nossos parceiros.
                    </p>
                </div>
                <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-white">📜 Comunidade</h3>
                    <p className="text-zinc-400 text-sm mt-2">
                        Receba atualizações da equipe, participe de enquetes e fique por dentro dos bastidores da FURIA.
                        A cada interação, você se aproxima do topo do ranking de fãs.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Intro;
