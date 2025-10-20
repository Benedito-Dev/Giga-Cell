function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Coluna 1: Sobre */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Sobre Nós</h3>
                        <p className="mb-4 text-gray-400">
                            Somos uma empresa dedicada a fornecer as melhores soluções para nossos clientes desde 2010.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-facebook text-2xl'></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-twitter text-2xl'></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-instagram text-2xl'></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-linkedin text-2xl'></i>
                            </a>
                        </div>
                    </div>

                    {/* Coluna 2: Links Rápidos */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Início</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Serviços</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Sobre</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contato</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Contato */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contato</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-start">
                                <i className='bx bx-map mr-2 mt-1'></i>
                                <span> Rua José Hipólito, 264, Rua 14, Nº - 1411 - 1º andar - Messejana, Fortaleza - CE</span>
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-phone mr-2'></i>
                                <span>(11) 9999-9999</span>
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-envelope mr-2'></i>
                                <span>contato@empresa.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 4: Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Assine nossa newsletter para receber atualizações e ofertas especiais.
                        </p>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Seu e-mail" 
                                className="px-4 py-2 w-full rounded-l text-white focus:outline-none"
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition"
                            >
                                <i className='bx bx-send'></i>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Rodapé inferior */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Giga Cell. Todos os direitos reservados.
                    </p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="#" className="hover:text-white transition">Termos de Serviço</a>
                        <a href="#" className="hover:text-white transition">Política de Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;