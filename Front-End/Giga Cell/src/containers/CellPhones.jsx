import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/UseCart';

function CellPhones() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = new URL('http://localhost:3000/produtos');
        url.searchParams.append('category', 'celulares'); 
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        
        const data = await response.json();
        console.log(data)
        
        setProducts(data);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Renderização condicional melhorada
  if (loading) {
    return <div className="text-black">Carregando produtos...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-black">
        Nenhum produto encontrado. 
        <br />
        Verifique se a categoria 'celulares' existe na API.
      </div>
    );
  }

  return (
    <div className="bg-gray-200 h-[90vh] w-full flex justify-center items-center flex-col">
      <div className="w-[95vw] rounded-full h-1 bg-black mb-10 opacity-20"></div>
      <div className="title flex justify-between items-center w-full px-12">
        <h1 className="text-7xl font-bold text-black text-opacity-80 mb-12">
          Celulares Mais Vendidos
        </h1>
        <Link to="/produtos">
          <button className="bg-gray-700 border-2 border-white p-5 rounded-3xl text-2xl transition-all duration-300 hover:bg-gray-800 hover:border-opacity-80 hover:shadow-lg">
            Mais Celulares
          </button>
        </Link>
      </div>
      <div className="w-full px-12">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white p-4 rounded-lg shadow-lg text-center h-96 flex justify-center items-center flex-col">
                {/* Use os campos corretos baseados na sua API */}
                <img 
                  src={product.imagemurl || product.imagemUrl} // Tenta ambos os possíveis nomes
                  alt={product.nome} // Usa 'nome' em vez de 'modelo'
                  className="w-32 h-32 object-cover mb-4" 
                />
                <h2 className="text-lg font-semibold text-black rounded-full drop-shadow-2xl">
                  {product.nome} {/* Corrigido para 'nome' */}
                </h2>
                <p className="text-gray-600 text-[10px]">{product.descricao}</p>
                <p className="text-green-600 font-bold">
                  R$ {product.preco || product.preco_unitario} {/* Tenta ambos */}
                </p>
                <button 
                  onClick={() => addToCart(product)} 
                  className='bg-green-600 mt-5 py-2 px-4 rounded-full border-2 border-black transition-all hover:scale-110 hover:bg-purple-500'
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CellPhones;