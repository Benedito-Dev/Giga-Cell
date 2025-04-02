import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Products from './views/Products';
import { AddProducts } from './views/Products/AddProducts';

export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/products/add" element={<AddProducts />} />
        {/* <Route path="/produtos" element={<Produtos />} />
        <Route path="/celulares" element={<Celulares />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/acessorios" element={<Acessorios />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/agendamento" element={<Agendamento />} /> */}
      </Routes>
    </Router>
  );
}