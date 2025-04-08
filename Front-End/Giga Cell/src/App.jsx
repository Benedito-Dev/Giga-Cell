import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Products from './views/Products/Products';
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

          <Route element={<RotaProtegidas />}>

            <Route path="/produtos/adicionar" element={<AddProducts />} />
            <Route path="/Account" element={<AccountUser />} />
            <Route path="/Account/meus-pedidos" element={<Pedidos />} />
            {/* <Route path="/Account/meus-pedidos/:id" element={<Pedidos />} /> */}
            <Route path="/Checkout" element={<Checkout />} />


          </Route>

          <Route path='*' element={<h1>404 Pagina não encontrada</h1>}></Route>
          {/* <Route path="/produtos" element={<Produtos />} />
          <Route path="/celulares" element={<Celulares />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/acessorios" element={<Acessorios />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/agendamento" element={<Agendamento />} /> */}
        </Routes>
        
      </CartProvider>
    </Router>
  );
}