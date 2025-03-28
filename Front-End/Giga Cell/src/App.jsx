// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import ListaCelulares from './components/list'
// import './App.css'
// import NavBarr from './components/NavBarr'
// import Banner from './pages/Banner'
// import Products from './pages/Products'
// import Footer from './pages/Footer'
// import Acessorios from './pages/Acessorios'
// import SubBarr from './components/SubBarr'
// import Help from './components/Help'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//     <NavBarr />
//     <SubBarr />
//     <Help />
//     <Banner />
//     <Products />
//     <Acessorios />
//     <Footer />
//     </>
//   )
// }

// export default App
// App.jsx
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';

export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
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