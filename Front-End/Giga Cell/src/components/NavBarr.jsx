function NavBarr() {
    return (
        <div className="bg-gray-800 p-4 text-slate-100 flex justify-between items-center">
            <h1 className="text-4xl italic text-orange-500">Giga Cell</h1>
            <input
            type="search"
            placeholder="Digite Aqui Sua Pesquisa..."
            className="h-16 px-4 py-2 rounded-full placeholder-black placeholder-opacity-50 italic border bg-slate-100 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[70vw]"
          />
          <button className="flex items-center justify-center gap-2 bg-yellow-400 px-4 py-2 rounded-full text-black transition-all hover:text-slate-200 hover:scale-110" ><i class='bx bxs-user'></i> Login</button>
          <button className="mr-5 transition-all hover:text-yellow-400" ><i className='bx bxs-cart'></i> Carrinho</button>
        </div>
    )
}

export default NavBarr