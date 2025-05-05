import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 shadow-md">
            {/* Logo à esquerda */}
            <img
                src="/logo-furia.png"
                alt="Logo FURIA"
                onClick={() => navigate('/')}
                className="w-10 h-10 object-contain cursor-pointer hover:scale-105 transition"
            />

            {/* Menu ao centro */}
            <nav className="flex gap-6 text-lg font-medium">
                <Link to="/" className="text-amber-300">Loja</Link>
                <span className="text-zinc-100">Coleções</span>
                <span className="text-zinc-100">Novidades</span>
                <span className="text-zinc-100">Times</span>
                <Link to="/fanhub" className="text-zinc-100 hover:text-amber-300 transition">Fanhub</Link>
            </nav>
        </header>
    );
}

export default Header;
