// ProductsGrid.js
import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/UseCart';
import { Link } from 'react-router-dom';

function ProductsGrid({ categoria, filtros }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  console.log(filtros)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Verifica se existe algum filtro "válido"
        const hasFilters =
          filtros &&
          (filtros.collection !== 'Todas' ||
            filtros.price.length > 0 ||
            filtros.color.length > 0 ||
            filtros.brand.length > 0 ||
            filtros.products.length > 0);

        let response;
        if (hasFilters) {
          // Rota de filtro
          const filtroJSON = {
            marca: filtros.brand?.[0] || null,
            cor: filtros.color?.[0] || null,
            armazenamento: filtros.collection !== 'Todas' ? filtros.collection : null,
            preco: filtros.price?.[0] ? mapPriceToNumber(filtros.price[0]) : null
          };

          response = await fetch('http://localhost:3000/produtos/filtro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filtroJSON)
          });
        } else {
          // Rota normal
          const url = new URL('http://localhost:3000/produtos');
          if (categoria) url.searchParams.append('category', categoria);

          response = await fetch(url);
        }

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoria, filtros]);

  // Função auxiliar para converter faixa de preço para número
  const mapPriceToNumber = (priceString) => {
    const priceMap = {
      'Até R$ 500': 500,
      'R$ 500 - R$ 1000': 750,
      'R$ 1000 - R$ 1500': 1250,
      'Acima de R$ 1500': 1500
    };
    return priceMap[priceString] || null;
  };

  // ... restante do seu código de renderização continua igual
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

  if (products.length === 0)
    return (
      <div className="flex justify-center items-center h-[50vh] bg-gray-900">
        <div className="text-2xl font-semibold text-gray-300">
          Nenhum produto disponível no momento
        </div>
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen w-full p-6 md:p-12 text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-600 border-2 border-orange-500 py-6 px-8 rounded-xl shadow-lg flex flex-col h-full transition-all duration-[160ms] ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-orange-500/40 cursor-pointer relative">
              {/* ... resto do render dos produtos */}
              <img src={product.imagemUrl} alt={product.nome} className="w-40 h-40 object-contain mb-6" />
              <h2 className="text-xl font-bold text-orange-400 text-center mb-2">{product.nome}</h2>
              <p className="text-orange-500 font-bold text-2xl text-center">
                R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <button onClick={() => addToCart(product)} className="bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 text-black font-semibold py-2 px-4 rounded-full border-2 border-black w-full transition-all duration-200 hover:scale-105">
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
