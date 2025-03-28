// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import ListaCelulares from './components/list'
import './App.css'
import NavBarr from './components/NavBarr'
import Banner from './pages/Banner'
import Products from './pages/Products'
import Footer from './pages/Footer'
import Acessorios from './pages/Acessorios'
import SubBarr from './components/SubBarr'
import Help from './components/Help'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <NavBarr />
    <SubBarr />
    <Help />
    <Banner />
    <Products />
    <Acessorios />
    <Footer />
    </>
  )
}

export default App
