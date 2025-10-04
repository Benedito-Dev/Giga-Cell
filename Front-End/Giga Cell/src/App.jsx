import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import AboutPage from './views/AboutPage/About'
import Contato from './views/Contato/Contato'
import Agendamento from './views/Agendamento/Agendamento';
import Login from './views/Login';
import Products from './views/Products/Products';
import CellPhones from './views/CellPhones/CellPhones';
import Tablets from './views/Tablets/Tablets';
import Acessorios from './views/Acessorios/Acessorios';
import AddProducts from './views/Products/AddProducts';
import AccountUser from './views/User/Account';
import RotaProtegidas from './auth/RotaProtegida';
import Pedidos from './views/User/Pedidos';
import Checkout from './views/Checkout/Checkout';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <Router>

      <CartProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/celulares" element={<CellPhones />} />
          <Route path="/acessorios" element={<Acessorios />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/agendamento" element={<Agendamento />} />

          <Route element={<RotaProtegidas />}>

            <Route path="/produtos/adicionar" element={<AddProducts />} />
            <Route path="/Account" element={<AccountUser />} />
            <Route path="/Account/meus-pedidos" element={<Pedidos />} />
            {/* <Route path="/Account/meus-pedidos/:id" element={<Pedidos />} /> */}
            <Route path="/Checkout" element={<Checkout />} />


          </Route>

          <Route path='*' element={<h1>404 Pagina não encontrada</h1>}></Route>
        </Routes>
        
      </CartProvider>
    </Router>
  );
}