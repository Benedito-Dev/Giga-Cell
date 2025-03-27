// function NavBarr() {
//     return (
//         <div className="bg-gray-800 p-4 text-slate-100 flex justify-between items-center">
//             <h1 className="text-4xl italic text-orange-500">Giga Cell</h1>
//             <ul className="flex justify-between p-2 gap-3 mr-4">
//                 <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="">Home</a></li>
//                 <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="">Carrinho</a></li>
//                 <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="">Produtos</a></li>
//                 <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="">Contato</a></li>
//                 <li><a className="transition-all hover:text-sky-400 hover:scale-300" href="">Sobre nós</a></li>
//             </ul>
//         </div>
//     )
// }

// export default NavBarr

function NavBarr() {
    return (
        <div className="bg-gray-800 p-4 text-slate-100 flex justify-between items-center flex-col">
            <h1 className="text-4xl italic text-orange-500 mb-5">Giga Cell</h1>
            <div className="nav-list">
                <ul className="flex p-2 gap-20 mr-4 text-2xl">
                    <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="#">Pagina Inicial</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="#">Ver Tudo</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="#">Celulares</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-200" href="#">Tablets</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-300" href="#">Acessórios</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-300" href="#">Sobre</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-300" href="#">Contato</a></li>
                    <li><a className="transition-all hover:text-sky-400 hover:scale-300" href="#">Agendamento Online</a></li>
                    <div className="flex align-center justify-center items-center gap-5 ml-20"> 
                        <h1>Usuario <i class='bx bxs-down-arrow'></i></h1>
                        <a href="#"><i class='bx bxs-cart'></i></a>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default NavBarr