// function Home() {
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
import NavBarr from '../components/NavBarr'
import Banner from '../containers/Banner'
import Products from '../containers/Products'
import Footer from '../containers/Footer'
import Acessorios from '../containers/Acessorios'
import SubBarr from '../components/SubBarr'
import Help from '../components/Help'

function Home() {
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

export default Home;