function Search() {
  return (
    <div className="bg-gray-200 p-8 w-full text-2xl flex justify-between">
        <div className="contact flex justify-start gap-5 text-black flex-col">

            <a href="#"><i class='bx bxl-whatsapp'></i> Fale Conosco pelo Whatsapp</a>
            <a href="#" class="flex items-center gap-2">
                <div class="flex items-center justify-center w-7 h-6 rounded-full border border-black bg-transparent">
                    <i class='bx bx-question-mark'></i>
                </div>
                Tire Suas Dúvidas
            </a>

        </div>
        <input
            type="search"
            placeholder="Buscar..."
            className="h-16 px-4 py-2 rounded-lg italic border bg-gray-700 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
          />
    </div>
  );
}

export default Search;