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
import Footer from '../containers/Footer'
import Acessorios from '../containers/Acessorios'
import SubBarr from '../components/SubBarr'
import Help from '../components/Help'
import CellPhones from '../containers/CellPhones'

function Home() {
    return (
        <>
        <NavBarr />
        <SubBarr />
        <Help />
        <Banner />
        <CellPhones />
        <Acessorios />
        <Footer />
        </>
    )
}

export default Home;