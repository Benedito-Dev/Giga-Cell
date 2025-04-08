/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/UseCart'; // Corrigi o nome do arquivo para case-sensitive


function CellPhones() {
  // Estado para armazenar os produtos
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { cart, addToCart } = useCart(); // Usando o hook useCart

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
        setProducts(data);
      } catch (error) {
        console.error('Erro:', error);
        // Adicione tratamento de erro visível para o usuário
      }
    };

    fetchProducts('celulares');
  }, []);

  // Renderização condicional enquanto os dados são carregados
  if (products.length === 0) {
    return <div className="text-black">Carregando produtos...</div>;
  }

  return (
    <div className="bg-gray-200 h-[90vh] w-full flex justify-center items-center flex-col">
      <div className="w-[95vw] rounded-full h-1 bg-black mb-10 opacity-20"></div>
      <div className="title flex justify-between items-center w-full px-12">
        <h1 className="text-7xl font-bold text-black text-opacity-80 mb-12">Celulares Mais Vendidos</h1>
        <Link to="/produtos">
          <button className="bg-gray-700 border-2 border-white p-5 rounded-3xl text-2xl transition-all duration-300 hover:bg-gray-800 hover:border-opacity-80 hover:shadow-lg">
            Mais Celulares
          </button>
        </Link>
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
                <h2 className="text-lg font-semibold text-black rounded-full drop-shadow-2xl">{product.modelo}</h2>
                <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
                <p className="text-green-600 font-bold">R$ {product.preco}</p>
                <button onClick={() => addToCart(product)} className='bg-green-600 mt-5 py-2 px-4 rounded-full border-2 border-black transition-all hover:scale-110 hover:bg-purple-500' >Adicionar ao Carrinho</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CellPhones;