import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { filtrosService } from '../../services/filtros';

function ProductsGrid({ categoria, filtros }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const filtroJSON = {
          categoria: categoria || null,
          marca: filtros.brand?.length ? filtros.brand : null,
          cor: filtros.color?.length ? filtros.color : null,
          armazenamento: filtros.armazenamento?.length ? filtros.armazenamento : null,
          preco: filtros.price?.[0] || null,
        };

        const data = await filtrosService.buscarComFiltros(filtroJSON);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoria, filtros]);

  // Estados de carregamento e erro
  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] bg-gray-900">
        <div className="text-2xl font-semibold text-orange-500">Carregando produtos...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[50vh] bg-gray-900">
        <div className="text-2xl font-semibold text-red-600">
          Erro ao carregar produtos: {error}
        </div>
      </div>
    );

  // Caso não haja produtos encontrados
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] bg-gray-900">
        <div className="text-2xl font-semibold text-gray-300 text-center px-4">
          😞 Nenhum produto se encaixa nos filtros selecionados.
        </div>
      </div>
    );
  }

  // Renderização dos produtos
  return (
    <div className="bg-gray-900 min-h-screen w-full p-6 md:p-12 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-600 border-2 border-orange-500 py-6 px-8 rounded-xl shadow-lg flex flex-col h-full transition-all duration-[160ms] ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-orange-500/40 cursor-pointer relative"
            >
              <img
                src={product.imagemUrl}
                alt={product.nome}
                className="w-40 h-40 object-contain mb-6 mx-auto"
              />
              <h2 className="text-xl font-bold text-orange-400 text-center mb-2">
                {product.nome}
              </h2>
              <p className="text-orange-500 font-bold text-2xl text-center mb-4">
                R$ {parseFloat(product.preco).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 text-black font-semibold py-2 px-4 rounded-full border-2 border-black w-full transition-all duration-200 hover:scale-105"
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsGrid;
