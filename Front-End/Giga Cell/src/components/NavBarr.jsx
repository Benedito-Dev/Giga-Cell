import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function NavBarr() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/me', {
                    credentials: 'include' // Importante para enviar cookies
                });

                if (!response.ok) {
                    throw new Error('Não autenticado');
                }

                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setUser(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
    <div className="bg-gray-800 p-4 text-slate-100 flex justify-between items-center">
        <h1 className="text-4xl font-bold font-raleway text-orange-500">GIGA CELL</h1>
        <input
            type="search"
            placeholder="Digite Aqui Sua Pesquisa..."
            className="h-16 w-[60%] px-4 py-2 rounded-full placeholder-black placeholder-opacity-50 text-black italic border bg-slate-100 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {loading ? (
            <div>Carregando...</div>
        ) : user ? (
            <div className="relative group">
                <button className="flex text-xl items-center gap-2 cursor-pointer">
                    <i className='bx bxs-user-circle text-xl'></i>
                    <span className="font-medium">{user.nome}</span>
                    <i className='bx bx-chevron-down text-sm transition-transform duration-200 group-hover:rotate-180'></i>
                </button>
                
                <div className="absolute right-0 top-6 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                        href="#" 
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700 transition-colors"
                    >
                        <Link to="/Account" className="flex items-center">
                            <i className='bx bx-user mr-2'></i> Minha Conta
                        </Link>
                    </a>
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700 transition-colors flex items-center"
                    >
                        <i className='bx bx-log-out mr-2'></i> Sair
                    </button>
                </div>
            </div>
        ) : (
            <Link to="/Login">
                <button className="flex items-center justify-center gap-1 m-2 bg-yellow-400 px-4 py-2 rounded-full text-black transition-all hover:text-slate-200 hover:scale-110">
                    <i className='bx bxs-user'></i> Login
                </button>
            </Link>
        )}
    </div>
);

}

export default NavBarr;