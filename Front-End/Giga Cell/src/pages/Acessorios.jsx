import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function Acessorios() {
  // Estado para armazenar os produtos
  const [products, setProducts] = useState([]);

  // Função para buscar os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/celulares');
        if (!response.ok) {
          throw new Error('Erro ao buscar os produtos');
        }
        const data = await response.json();
        console.log('Dados recebidos:', data); // Verifique os dados no console
        setProducts(data); // Ajuste conforme a estrutura da resposta
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchProducts();
  }, []);

  // Renderização condicional enquanto os dados são carregados
  if (products.length === 0) {
    return <div className="text-black">Carregando produtos...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-green-600 to-blue-500 h-[90vh] w-full flex justify-center items-center flex-col">
      <div className="title flex justify-between items-center w-full px-12">
        <h1 className="text-7xl font-bold italic text-white mb-12">Acessorios</h1>
        <button className="bg-gray-700 border-2 border-white p-5 rounded-3xl text-2xl transition-all duration-300 hover:bg-gray-800 hover:border-opacity-80 hover:shadow-lg">Todos os Acessorios</button>
      </div>
      <div className="w-full px-12">
        <Swiper
          slidesPerView={5} // Exibe até 5 produtos por vez
          spaceBetween={10} // Espaço entre os produtos
          navigation // Adiciona botões de navegação
          pagination={{ clickable: true }} // Adiciona paginação
          modules={[Navigation, Pagination]} // Módulos do Swiper
          loop={true} // Loop infinito
          breakpoints={{
            // Responsividade
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white p-4 rounded-lg shadow-lg text-center h-96 flex justify-center items-center flex-col">
                {/* Tag da imagem adicionada aqui */}
                <img 
                  src={product.imagemurl} 
                  alt={product.modelo} 
                  className="w-32 h-32 object-cover mb-4" 
                />
                <h2 className="text-lg font-semibold text-black">{product.modelo}</h2>
                <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
                <p className="text-green-600 font-bold">R$ {product.preco}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Acessorios;