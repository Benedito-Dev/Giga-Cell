import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/UseCart';
import { Link } from 'react-router-dom';

function ProductsGrid({ categoria }) {
  console.log(categoria)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ monta URL corretamente
        const url = new URL('http://localhost:3000/produtos');
        if (categoria) {
          url.searchParams.append('category', categoria);
        }

        const response = await fetch(url);
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
  }, [categoria]); // ✅ dependência adicionada

  const deleteProduct = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        'Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.'
      );
      if (!confirmDelete) return;

      const response = await fetch(`http://localhost:3000/produtos/${productId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao excluir o produto');

      setProducts(products.filter(p => p.id !== productId));
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert(`Erro ao excluir produto: ${error.message}`);
    }
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-4 md:mb-0">
            Produtos
          </h1>
          <div className="buttons flex">
            <Link to="/produtos/adicionar">
              <button className='bg-orange-500 flex items-center rounded-2xl px-6 gap-2 mr-5 py-3 border-2 border-black text-lg transition-all duration-200 hover:bg-orange-600 hover:scale-105 text-black font-semibold'>
                <i className='bx bx-plus-circle text-2xl'></i>Adicionar Produtos
              </button>
            </Link>
          </div>
        </div>

        {/* Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-600 border-2 border-orange-500 py-6 px-8 rounded-xl shadow-lg flex flex-col h-full 
                transition-all duration-[160ms] ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-orange-500/40 cursor-pointer relative"
            >
              {/* Botão de exclusão */}
              <button
                onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-lg w-8 h-8 flex items-center justify-center transition-all"
                title="Excluir produto"
              >
                <i className='bx bx-trash text-xl'></i>
              </button>

              {/* Imagem e nome */}
              <div className="flex-grow flex flex-col items-center">
                <img
                  src={product.imagemUrl}
                  alt={product.nome}
                  className="w-40 h-40 object-contain mb-6 transition-transform hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-product.png'; }}
                />
                <h2 className="text-xl font-bold text-orange-400 text-center mb-2">
                  {product.nome}
                </h2>
              </div>

              {/* Preço e botão adicionar */}
              <div className="mt-auto">
                <p className="text-orange-500 font-bold text-2xl text-center">
                  R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className='text-gray-300 text-center text-xs text-opacity-70 mb-4'>
                  à vista no Pix ou em até 12x sem juros
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 text-black font-semibold 
                    py-2 px-4 rounded-full border-2 border-black w-full transition-all duration-200 hover:scale-105"
                >
                  <i className='bx bx-basket text-2xl'></i> Adicionar
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
