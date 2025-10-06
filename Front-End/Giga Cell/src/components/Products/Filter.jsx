import { useState } from 'react';

const FilterSystem = ({ onChangeFilters }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    collection: 'Todas', 
    price: [],
    color: [],
    brand: [],
    products: []
  });

  const filterOptions = {
    collection: ['Todas', 'Telefones Celulares Novos', 'Telefones Celulares usados', 'Tabelas', 'Acessórios'],
    price: ['Até R$ 500', 'R$ 500 - R$ 1000', 'R$ 1000 - R$ 1500', 'Acima de R$ 1500'],
    color: ['Preto', 'Branco', 'Azul', 'Vermelho', 'Dourado'],
    brand: ['Samsung', 'Apple', 'Xiaomi', 'Motorola', 'LG'],
    products: ['Mais vendidos', 'Lançamentos', 'Promoções', 'Com desconto']
  };

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleSelect = (filterName, value) => {
    let newFilters;

    if (filterName === 'collection') {
      newFilters = { ...selectedFilters, [filterName]: value };
    } else {
      const currentSelection = [...selectedFilters[filterName]];
      const index = currentSelection.indexOf(value);

      if (index === -1) {
        currentSelection.push(value);
      } else {
        currentSelection.splice(index, 1);
      }

      newFilters = { ...selectedFilters, [filterName]: currentSelection };
    }

    setSelectedFilters(newFilters);
    onChangeFilters(newFilters); // 🔑 avisa o pai
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Filtrar por</h2>

      {/* Exemplo: Coleção */}
      <div className="mb-4 border-b border-gray-200 pb-2">
        <button 
          className="flex justify-between items-center w-full text-gray-800 hover:text-gray-900"
          onClick={() => toggleFilter('collection')}
        >
          <span className="font-medium">Coleção</span>
          <span className="text-gray-600">{openFilter === 'collection' ? '−' : '+'}</span>
        </button>
        
        {openFilter === 'collection' && (
          <div className="mt-2 space-y-2 pl-2">
            {filterOptions.collection.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`collection-${option}`}
                  name="collection"
                  checked={selectedFilters.collection === option}
                  onChange={() => handleSelect('collection', option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`collection-${option}`} className="text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtro de Preço */}
      <div className="mb-4 border-b border-gray-200 pb-2">
        <button 
          className="flex justify-between items-center w-full text-gray-800 hover:text-gray-900"
          onClick={() => toggleFilter('price')}
        >
          <span className="font-medium">Preço</span>
          <span className="text-gray-600">{openFilter === 'price' ? '−' : '+'}</span>
        </button>
        
        {openFilter === 'price' && (
          <div className="mt-2 space-y-2 pl-2">
            {filterOptions.price.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-${option}`}
                  checked={selectedFilters.price.includes(option)}
                  onChange={() => handleSelect('price', option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`price-${option}`} className="text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtro de Cor */}
      <div className="mb-4 border-b border-gray-200 pb-2">
        <button 
          className="flex justify-between items-center w-full text-gray-800 hover:text-gray-900"
          onClick={() => toggleFilter('color')}
        >
          <span className="font-medium">Cor</span>
          <span className="text-gray-600">{openFilter === 'color' ? '−' : '+'}</span>
        </button>
        
        {openFilter === 'color' && (
          <div className="mt-2 space-y-2 pl-2">
            {filterOptions.color.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`color-${option}`}
                  checked={selectedFilters.color.includes(option)}
                  onChange={() => handleSelect('color', option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`color-${option}`} className="text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtro de Marca */}
      <div className="mb-4 border-b border-gray-200 pb-2">
        <button 
          className="flex justify-between items-center w-full text-gray-800 hover:text-gray-900"
          onClick={() => toggleFilter('brand')}
        >
          <span className="font-medium">Marca</span>
          <span className="text-gray-600">{openFilter === 'brand' ? '−' : '+'}</span>
        </button>
        
        {openFilter === 'brand' && (
          <div className="mt-2 space-y-2 pl-2">
            {filterOptions.brand.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${option}`}
                  checked={selectedFilters.brand.includes(option)}
                  onChange={() => handleSelect('brand', option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`brand-${option}`} className="text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtro de Produtos */}
      <div className="mb-4">
        <button 
          className="flex justify-between items-center w-full text-gray-800 hover:text-gray-900"
          onClick={() => toggleFilter('products')}
        >
          <span className="font-medium">Produtos</span>
          <span className="text-gray-600">{openFilter === 'products' ? '−' : '+'}</span>
        </button>
        
        {openFilter === 'products' && (
          <div className="mt-2 space-y-2 pl-2">
            {filterOptions.products.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`products-${option}`}
                  checked={selectedFilters.products.includes(option)}
                  onChange={() => handleSelect('products', option)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`products-${option}`} className="text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Botão para aplicar filtros */}
      <button 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={() => console.log('Filtros aplicados:', selectedFilters)}
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FilterSystem;