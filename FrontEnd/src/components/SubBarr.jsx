import { Link } from 'react-router-dom';
import { useState } from 'react';

function SubBarr() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Página Inicial" },
    { to: "/produtos", label: "Produtos" },
    { to: "/celulares", label: "Celulares" },
    { to: "/tablets", label: "Tablets" },
    { to: "/acessorios", label: "Acessórios" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
    { to: "/agendamento", label: "Agendamento" }
  ];

  return (
    <div className="bg-gray-700 text-slate-100">
      {/* Desktop Menu */}
      <div className="hidden lg:block p-4">
        <ul className="flex justify-center gap-8 xl:gap-12 text-sm xl:text-base">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="transition-all hover:text-sky-400 whitespace-nowrap">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center p-4">
          <span className="text-lg font-medium">Menu</span>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          >
            <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="border-t border-gray-600">
            <ul className="py-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className="block px-4 py-3 transition-all hover:bg-gray-600 hover:text-sky-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubBarr;