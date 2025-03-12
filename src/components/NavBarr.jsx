function NavBarr() {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-0 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold italic text-gray-800">Giga Cell</h1>
          <ul className="flex space-x-4 whitespace-nowrap">
            <li>
              <a
                href="#"
                className="inline-block text-gray-600 hover:text-gray-900 hover:scale-110 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block text-gray-600 hover:text-gray-900 hover:scale-110 transition duration-300"
              >
                Produtos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block text-gray-600 hover:text-gray-900 hover:scale-110 transition duration-300"
              >
                Carrinho
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block text-gray-600 hover:text-gray-900 hover:scale-110 transition duration-300"
              >
                Sobre nós
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
export default NavBarr;