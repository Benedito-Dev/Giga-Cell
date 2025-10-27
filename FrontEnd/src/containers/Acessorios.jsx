import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useCart } from '../context/CartContext'; // Importando o hook de carrinho
import { Link } from 'react-router-dom';

function Acessorios() {
  // Estado para armazenar os produtos
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  // Função para buscar os produtos da API
  useEffect(() => {
    const fetchProducts = async (category) => {
      try {
        // Cria a URL com o parâmetro de categoria se existir
        const url = new URL('http://localhost:3000/produtos');
        if (category) {
          url.searchParams.append('category', category);
        }
    
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        
        const data = await response.json();
        console.log("Acessorios :", data)
        setProducts(data);
      } catch (error) {
        console.error('Erro:', error);
        // Adicione tratamento de erro visível para o usuário
      }
    };

    fetchProducts('acessorios');
  }, []);

  // Renderização condicional enquanto os dados são carregados
  if (products.length === 0) {
    return <div className="text-black">Carregando produtos...</div>;
  }

  return (
    <div className="w-full py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            <span className="text-blue-600 font-semibold text-sm sm:text-base uppercase tracking-wider">Complemente</span>
            <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
            Acessórios Essenciais
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            Proteja e potencialize seus dispositivos com nossa seleção premium de acessórios
          </p>
          <Link to="/produtos" className="hidden sm:inline-block">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Ver Todos os Acessórios
            </button>
          </Link>
        </div>
      
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: '.accessories-swiper-button-next',
              prevEl: '.accessories-swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            modules={[Navigation, Pagination]}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 28 },
              1280: { slidesPerView: 5, spaceBetween: 32 },
            }}
            className="!pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                  <div className="relative p-4 sm:p-6">
                    <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                      <img 
                        src={product.imagemUrl} 
                        alt={product.nome} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
                        {product.nome}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 min-h-[2rem]">
                        {product.descricao || "Acessório de qualidade para seu dispositivo"}
                      </p>
                      <div className="pt-2">
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
                          R$ {product.preco}
                        </p>
                        <button 
                          onClick={() => addToCart(product)} 
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
                        >
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button className="accessories-swiper-button-prev !hidden lg:!block !absolute !top-1/2 !-translate-y-1/2 !-left-12 !z-20 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!shadow-xl !border !border-gray-200 hover:!border-blue-300 !transition-all !duration-300 hover:!scale-110">
            <svg className="w-5 h-5 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="accessories-swiper-button-next !hidden lg:!block !absolute !top-1/2 !-translate-y-1/2 !-right-12 !z-20 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!shadow-xl !border !border-gray-200 hover:!border-blue-300 !transition-all !duration-300 hover:!scale-110">
            <svg className="w-5 h-5 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Acessorios;