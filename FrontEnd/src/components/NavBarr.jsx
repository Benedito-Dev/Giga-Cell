import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function NavBarr() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Não autenticado');

                const response = await fetch('http://localhost:3000/auth/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Não autenticado');
                }

                const data = await response.json();
                setUser(data);
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
        <div className="bg-gray-800 p-2 sm:p-4 text-slate-100">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="flex justify-between items-center w-full lg:w-auto">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-raleway text-orange-500">
                        GIGA CELL
                    </h1>
                    
                    <button 
                        className="lg:hidden text-2xl"
                        onClick={() => setSearchVisible(!searchVisible)}
                    >
                        <i className='bx bx-search'></i>
                    </button>
                </div>

                <div className={`w-full lg:w-[60%] ${searchVisible ? 'block' : 'hidden lg:block'}`}>
                    <input
                        type="search"
                        placeholder="Digite Aqui Sua Pesquisa..."
                        className="h-12 sm:h-14 lg:h-16 w-full px-4 py-2 rounded-full placeholder-black placeholder-opacity-50 text-black italic border bg-slate-100 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                </div>
                
                <div className="flex items-center">
                    {loading ? (
                        <div className="text-sm">Carregando...</div>
                    ) : user ? (
                        <div className="relative group">
                            <button className="flex text-sm sm:text-lg lg:text-xl items-center gap-2 cursor-pointer">
                                <i className='bx bxs-user-circle text-xl sm:text-2xl'></i>
                                <span className="font-medium hidden sm:inline">{user.nome}</span>
                                <i className='bx bx-chevron-down text-sm transition-transform duration-300 group-hover:rotate-180'></i>
                            </button>
                            
                            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out border border-gray-700">
                                <Link 
                                    to="/Account" 
                                    className="block px-4 py-3 text-gray-200 hover:bg-gray-700 transition-all duration-200 flex items-center rounded-lg mx-2 hover:text-white"
                                >
                                    <i className='bx bx-user mr-3 text-lg'></i> Minha Conta
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-gray-200 hover:bg-gray-700 transition-all duration-200 flex items-center rounded-lg mx-2 hover:text-white"
                                >
                                    <i className='bx bx-log-out mr-3 text-lg'></i> Sair
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/Login">
                            <button className="flex items-center justify-center gap-1 bg-yellow-400 px-3 sm:px-4 py-2 rounded-full text-black transition-all hover:text-slate-200 hover:scale-110 text-sm sm:text-base">
                                <i className='bx bxs-user'></i>
                                <span className="hidden sm:inline">Login</span>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBarr;