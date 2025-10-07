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
    onChangeFilters(newFilters);
  };

  return (
    <div className="w-full max-w-md bg-gray-900 border-2 border-orange-500 p-5 rounded-2xl shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4 text-orange-500 text-center">Filtros</h2>

      {Object.entries(filterOptions).map(([filterName, options]) => (
        <div key={filterName} className="mb-4 border-b border-gray-700 pb-2">
          <button
            className="flex justify-between items-center w-full text-gray-200 hover:text-orange-400 transition-all duration-200"
            onClick={() => toggleFilter(filterName)}
          >
            <span className="font-medium capitalize">
              {filterName === 'collection'
                ? 'Coleção'
                : filterName === 'price'
                ? 'Preço'
                : filterName === 'color'
                ? 'Cor'
                : filterName === 'brand'
                ? 'Marca'
                : 'Produtos'}
            </span>
            <span className="text-orange-400 text-lg">
              {openFilter === filterName ? '−' : '+'}
            </span>
          </button>

          {openFilter === filterName && (
            <div className="mt-2 space-y-2 pl-2">
              {options.map(option => (
                <div
                  key={option}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 transition-all rounded-lg px-2 py-1 cursor-pointer"
                >
                  <input
                    type={filterName === 'collection' ? 'radio' : 'checkbox'}
                    id={`${filterName}-${option}`}
                    name={filterName}
                    checked={
                      filterName === 'collection'
                        ? selectedFilters.collection === option
                        : selectedFilters[filterName].includes(option)
                    }
                    onChange={() => handleSelect(filterName, option)}
                    className="mr-2 text-orange-500 focus:ring-orange-400 accent-orange-500"
                  />
                  <label
                    htmlFor={`${filterName}-${option}`}
                    className="text-gray-300 cursor-pointer select-none"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        className="w-full bg-orange-600 text-white py-2 rounded-xl font-semibold border-2 border-black
                   hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out"
        onClick={() => console.log('Filtros aplicados:', selectedFilters)}
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FilterSystem;
