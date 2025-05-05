import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Header from './components/Header';
import Intro from './components/Intro';
import Painel from './components/Painel';
import Catalogo from './components/Catalogo';
import Novidades from './components/Novidades';
import Parceiros from './components/Parceiros';
import UploadDocumento from './components/UploadDocumento';
import Footer from './components/Footer';
import Recompensas from './components/Recompensas';
import Fanhub from './components/Fanhub';
import TurbinarPerfil from './components/TurbinarPerfil';
import Ranking from './components/Ranking';
function App() {
    return (
        <div className="bg-[#000000] text-zinc-100 font-['Saira'] min-h-screen overflow-x-hidden">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <Intro />
                        <Novidades />
                        <Catalogo />
                        <Parceiros />
                        <Footer />
                    </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/fanhub" element={<Fanhub />} />
                <Route path="/fanhub/upload-documento" element={<UploadDocumento />} />
                <Route path="/fanhub/recompensas" element={<Recompensas />} />
                <Route path="/fanhub/turbinar" element={<TurbinarPerfil />} />
                <Route path="/fanhub/ranking" element={<Ranking />} />
                <Route path="/painel" element={<Painel />} />
            </Routes>
        </div>
    );
}

export default App;
