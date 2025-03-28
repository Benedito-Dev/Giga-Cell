function Help() {
  return (
    <div className="bg-gray-200 py-4 px-10 w-full text-2xl flex justify-between text-black">
      <a href="#" className="transition-all hover:text-sky-500"><i className='bx bxl-whatsapp'></i> Fale Conosco pelo Whatsapp</a>
      <a href="# " className="flex items-center gap-2 transition-all hover:text-sky-500">
        <div className="flex items-center justify-center w-7 h-6 rounded-full border border-black bg-transparent">
                    <i className='bx bx-question-mark'></i>
        </div>
        Tire Suas Dúvidas
      </a>
    </div>
  );
}

export default Help;