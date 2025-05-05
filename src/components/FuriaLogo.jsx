import React from 'react';
import { useNavigate } from 'react-router-dom';

function FuriaLogo() {
    const navigate = useNavigate();

    return (
        <div
            className="absolute top-4 left-4 z-50 cursor-pointer p-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
            onClick={() => navigate('/')}
        >
            <img
                src="/logo-furia.png"
                alt="Logo FURIA"
                className="w-10 h-10 object-contain hover:scale-105 transition-transform"
            />
        </div>
    );
}

export default FuriaLogo;
