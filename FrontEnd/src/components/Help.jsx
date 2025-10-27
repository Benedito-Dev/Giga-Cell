function Help() {
  return (
    <div className="bg-gray-200 py-4 sm:py-6 px-4 sm:px-6 lg:px-10 w-full text-black">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-lg lg:text-2xl">
        <a 
          href="https://wa.me/5585988640696" 
          className="flex items-center gap-2 transition-all hover:text-green-500"
        >
          <i className='bx bxl-whatsapp text-lg sm:text-xl lg:text-2xl'></i>
          <span className="text-center sm:text-left">Fale Conosco pelo Whatsapp</span>
        </a>
        
        <a href="#" className="flex items-center gap-2 transition-all hover:text-sky-500">
          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-black bg-transparent">
            <i className='bx bx-question-mark text-sm sm:text-base'></i>
          </div>
          <span>Tire Suas Dúvidas</span>
        </a>
      </div>
    </div>
  );
}

export default Help;