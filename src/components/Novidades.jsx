import React from 'react';

function Novidades() {
  return (
      <section className="bg-zinc-950 text-white py-20 px-6 font-['Saira']">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">🔥 Novidades do Fanhub</h2>
          <p className="text-zinc-400 text-lg mb-12">
            O Fanhub é o seu portal de conexão direta com o universo da FURIA. Aqui, sua paixão pelo time se transforma em pontos, recompensas exclusivas e experiências inesquecíveis.
          </p>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">💡 Como funciona?</h3>
              <p className="text-zinc-400">
                Ao criar sua conta e turbinar seu perfil conectando suas redes sociais, você começa a acumular pontos de engajamento. Quanto mais você interage, compartilha e participa, mais pontos ganha.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">🎯 Pontos e Engajamento</h3>
              <p className="text-zinc-400">
                Cada ação conta: seguir a FURIA, curtir, comentar, divulgar eventos e até comparecer presencialmente. Tudo isso aumenta sua pontuação no ranking de fãs.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">🏆 Ranking dos FURIOSOS</h3>
              <p className="text-zinc-400">
                Suba no ranking e mostre que você é realmente #FURIA. Os fãs mais ativos aparecem no topo e têm prioridade nas melhores experiências, incluindo viagens com o time.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">🎁 Recompensas Exclusivas</h3>
              <p className="text-zinc-400">
                Ganhe acesso antecipado a lançamentos, sorteios, produtos limitados, bastidores e outras surpresas pensadas especialmente para quem vive a FURIA intensamente.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Novidades;
