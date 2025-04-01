import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/UseCart'; // Importando o hook de carrinho
import { Link } from 'react-router-dom';

function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Função para buscar os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/celulares');
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Estados de carregamento
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-2xl font-semibold text-black">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-2xl font-semibold text-red-600">
          Erro ao carregar produtos: {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-2xl font-semibold text-gray-600">
          Nenhum produto disponível no momento
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen w-full p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-opacity-80 mb-4 md:mb-0">
            Produtos
          </h1>
          <div className="buttons">
            <Link to="/produtos/adicionar">
            <button className='bg-green-500 rounded-2xl px-6 gap-5 mr-5 py-3 border-white border-2 text-lg transition-all hover:bg-green-700' ><i class='bx bx-plus-circle'></i>Adicionar Produtos</button>
            </Link>
          <button className="bg-gray-700 border-2 border-white px-6 py-3 rounded-2xl text-lg transition-all duration-300 hover:bg-gray-800 hover:border-opacity-80 hover:shadow-lg">
            Ver Todos
          </button>
          </div>
        </div>

        {/* Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border-2 border-black py-6 px-8 rounded-xl shadow-lg flex flex-col h-full transition-transform hover:scale-[1.02] hover:cursor-pointer"
            >
              <div className="flex-grow flex flex-col items-center">
                <img
                  src={product.imagemurl}
                  alt={product.modelo}
                  className="w-40 h-40 object-contain mb-6"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.png';
                  }}
                />
                <h2 className="text-xl font-bold text-black text-center mb-2">
                  {product.modelo}
                </h2>
              </div>

              <div className="mt-auto">
                <p className="text-green-600 font-bold text-2xl text-center">
                  R$ {product.preco.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
                <p className='text-black text-center text-xs text-opacity-50 mb-4'>à vista no Pix ou em até 12x de R$402,56 sem juros</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-white font-medium nowrap py-1 px-3 rounded-full border-2 border-black w-full transition-all duration-200"
                >
                  <i className='bx bx-basket text-2xl' ></i> Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsGrid;