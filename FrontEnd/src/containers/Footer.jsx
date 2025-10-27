function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-8 sm:pt-12 pb-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Coluna 1: Sobre */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Sobre Nós</h3>
                        <p className="mb-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                            Somos uma empresa dedicada a fornecer as melhores soluções para nossos clientes desde 2010.
                        </p>
                        <div className="flex space-x-4 justify-center sm:justify-start">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-facebook text-xl sm:text-2xl'></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-twitter text-xl sm:text-2xl'></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-instagram text-xl sm:text-2xl'></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className='bx bxl-linkedin text-xl sm:text-2xl'></i>
                            </a>
                        </div>
                    </div>

                    {/* Coluna 2: Links Rápidos */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm sm:text-base">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Início</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Produtos</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Sobre</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contato</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Agendamento</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Contato */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Contato</h3>
                        <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                            <li className="flex items-start">
                                <i className='bx bx-map mr-2 mt-1 text-lg flex-shrink-0'></i>
                                <span className="leading-relaxed">Rua José Hipólito, 264, Rua 14, Nº - 1411 - 1º andar - Messejana, Fortaleza - CE</span>
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-phone mr-2 text-lg'></i>
                                <span>(85) 98864-0696</span>
                            </li>
                            <li className="flex items-center">
                                <i className='bx bx-envelope mr-2 text-lg'></i>
                                <span>contato@gigacell.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 4: Newsletter */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                            Assine nossa newsletter para receber atualizações e ofertas especiais.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="email" 
                                placeholder="Seu e-mail" 
                                className="px-4 py-2 flex-1 rounded sm:rounded-l sm:rounded-r-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded sm:rounded-r sm:rounded-l-none transition flex items-center justify-center"
                            >
                                <i className='bx bx-send mr-2 sm:mr-0'></i>
                                <span className="sm:hidden">Assinar</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Rodapé inferior */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p className="text-sm sm:text-base mb-4 sm:mb-2">
                        &copy; {new Date().getFullYear()} Giga Cell. Todos os direitos reservados.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                        <a href="#" className="hover:text-white transition">Termos de Serviço</a>
                        <a href="#" className="hover:text-white transition">Política de Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;