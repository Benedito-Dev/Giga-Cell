import { Link } from 'react-router-dom';

function SubBarr() {
  return (
    <div className="bg-gray-700 p-4 text-slate-100">
      <div className="nav-list">
        <ul className="flex justify-around gap-20 text-1xl">
          <li>
            <Link to="/" className="transition-all hover:text-sky-400">
              Página Inicial
            </Link>
          </li>
          <li>
            <Link to="/produtos" className="transition-all hover:text-sky-400">
              Ver Tudo
            </Link>
          </li>
          <li>
            <Link to="/celulares" className="transition-all hover:text-sky-400">
              Celulares
            </Link>
          </li>
          <li>
            <Link to="/tablets" className="transition-all hover:text-sky-400">
              Tablets
            </Link>
          </li>
          <li>
            <Link to="/acessorios" className="transition-all hover:text-sky-400">
              Acessórios
            </Link>
          </li>
          <li>
            <Link to="/sobre" className="transition-all hover:text-sky-400">
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/contato" className="transition-all hover:text-sky-400">
              Contato
            </Link>
          </li>
          <li>
            <Link to="/agendamento" className="transition-all hover:text-sky-400">
              Agendamento Online
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SubBarr;