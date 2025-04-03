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
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <i className='bx bxs-user-circle text-xl'></i>
                        <span className="font-medium">{user.nome}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-1 m-2 bg-red-500 px-4 py-2 rounded-full text-white transition-all hover:bg-red-600 hover:scale-105"
                    >
                        <i className='bx bx-log-out'></i> Sair
                    </button>
                </div>
            ) : (
                <Link to="/Login">
                    <button className="flex items-center justify-center gap-1 m-2 bg-yellow-400 px-4 py-2 rounded-full text-black transition-all hover:text-slate-200 hover:scale-110">
                        <i className='bx bxs-user'></i> Login
                    </button>
                </Link>
            )}
            
            <button className="mr-5 transition-all hover:text-yellow-400">
                <i className='bx bxs-cart'></i> Carrinho
            </button>
        </div>
    );
}

export default NavBarr;