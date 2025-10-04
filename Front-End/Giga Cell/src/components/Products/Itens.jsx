import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/UseCart';
import { Link } from 'react-router-dom';

function ProductsGrid({ filters }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  console.log('Filters received:', filters);

  // Buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        setProducts(data);
        console.log('Products fetched:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Função para filtrar produtos
  const applyFilters = (products, filters) => {
    if (!filters) return products;

    return products.filter(product => {
      let match = true;

      // Coleção
      if (filters.collection && filters.collection !== 'Todas') {
        match = match && product.collection === filters.collection;
      }

      // Preço
      if (filters.price && filters.price.length > 0) {
        match = match && filters.price.some(priceRange => {
          if (priceRange === 'Até R$ 500') return product.preco_unitario <= 500;
          if (priceRange === 'R$ 500 - R$ 1000') return product.preco_unitario > 500 && product.preco_unitario <= 1000;
          if (priceRange === 'R$ 1000 - R$ 1500') return product.preco_unitario > 1000 && product.preco_unitario <= 1500;
          if (priceRange === 'Acima de R$ 1500') return product.preco_unitario > 1500;
          return false;
        });
      }

      // Cor
      if (filters.color && filters.color.length > 0) {
        match = match && filters.color.includes(product.color);
      }

      // Marca
      if (filters.brand && filters.brand.length > 0) {
        match = match && filters.brand.includes(product.brand);
      }

      // Produtos (tipo)
      if (filters.products && filters.products.length > 0) {
        match = match && filters.products.includes(product.productType);
      }

      return match;
    });
  };

  const filteredProducts = applyFilters(products, filters);
  console.log('Filtered products:', filteredProducts);

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

  if (loading) return <div className="flex justify-center items-center h-[50vh]"><div className="text-2xl font-semibold text-black">Carregando produtos...</div></div>;
  if (error) return <div className="flex justify-center items-center h-[50vh]"><div className="text-2xl font-semibold text-red-600">Erro ao carregar produtos: {error}</div></div>;
  if (filteredProducts.length === 0) return <div className="flex justify-center items-center h-[50vh]"><div className="text-2xl font-semibold text-gray-600">Nenhum produto disponível no momento</div></div>;

  return (
    <div className="bg-gray-200 min-h-screen w-full p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-opacity-80 mb-4 md:mb-0">
            Produtos
          </h1>
          <div className="buttons flex">
            <Link to="/produtos/adicionar">
              <button className='bg-green-500 flex items-center rounded-2xl px-6 gap-1 mr-5 py-3 border-white border-2 text-lg transition-all hover:bg-green-700'>
                <i className='bx bx-plus-circle'></i>Adicionar Produtos
              </button>
            </Link>
          </div>
        </div>

        {/* Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border-2 border-black py-6 px-8 rounded-xl shadow-lg flex flex-col h-full transition-transform hover:scale-[1.02] hover:cursor-pointer relative">
              <button
                onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg w-8 h-8 flex items-center justify-center"
                title="Excluir produto"
              >
                <i className='bx bx-trash text-xl'></i>
              </button>

              <div className="flex-grow flex flex-col items-center">
                <img
                  src={product.imagemurl}
                  alt={product.nome}
                  className="w-40 h-40 object-contain mb-6"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-product.png'; }}
                />
                <h2 className="text-xl font-bold text-black text-center mb-2">{product.nome}</h2>
              </div>

              <div className="mt-auto">
                <p className="text-green-600 font-bold text-2xl text-center">
                  R$ {product.preco_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className='text-black text-center text-xs text-opacity-50 mb-4'>à vista no Pix ou em até 12x de R$402,56 sem juros</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-white font-medium nowrap py-1 px-3 rounded-full border-2 border-black w-full transition-all duration-200"
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
