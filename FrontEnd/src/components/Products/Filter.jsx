import { useState } from 'react';

const FilterSystem = ({ onChangeFilters }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    color: [],
    brand: [],
    armazenamento: []
  });

  const filterOptions = {
    price: ['Até R$ 500', 'R$ 500 - R$ 1000', 'R$ 1000 - R$ 1500', 'Acima de R$ 1500'],
    color: ['Preto', 'Branco', 'Azul', 'Vermelho', 'Dourado'],
    brand: ['Samsung', 'Apple', 'Xiaomi', 'Motorola', 'LG'],
    armazenamento: ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB']
  };

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleSelect = (filterName, value) => {
    setSelectedFilters((prev) => {
      const currentSelection = [...prev[filterName]];
      const index = currentSelection.indexOf(value);
      if (index === -1) {
        currentSelection.push(value);
      } else {
        currentSelection.splice(index, 1);
      }
      return { ...prev, [filterName]: currentSelection };
    });
  };

  const applyFilters = () => {
    onChangeFilters(selectedFilters);
    console.log('Filtros aplicados:', selectedFilters);
  };

  const clearFilters = () => {
    const cleared = {
      price: [],
      color: [],
      brand: [],
      armazenamento: []
    };
    setSelectedFilters(cleared);
    onChangeFilters(cleared);
    console.log('Filtros limpos.');
  };

  const getFilterLabel = (filterName) => {
    const labels = {
      price: 'Preço',
      color: 'Cor',
      brand: 'Marca',
      armazenamento: 'Armazenamento'
    };
    return labels[filterName] || filterName;
  };

  return (
    <div className="w-full bg-gray-900 border-2 border-orange-500 p-4 lg:p-5 rounded-xl shadow-lg text-white min-h-fit">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-orange-500 text-center">Filtros</h2>

      {Object.entries(filterOptions).map(([filterName, options]) => (
        <div key={filterName} className="mb-3 sm:mb-4 border-b border-gray-700 pb-2">
          <button
            className="flex justify-between items-center w-full text-gray-200 hover:text-orange-400 transition-all duration-200 py-1"
            onClick={() => toggleFilter(filterName)}
          >
            <span className="font-medium text-sm sm:text-base">{getFilterLabel(filterName)}</span>
            <span className="text-orange-400 text-base sm:text-lg">
              {openFilter === filterName ? '−' : '+'}
            </span>
          </button>

          {openFilter === filterName && (
            <div className="mt-2 space-y-1 sm:space-y-2 pl-1 sm:pl-2 max-h-40 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 transition-all rounded-md sm:rounded-lg px-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`${filterName}-${option}`}
                    name={filterName}
                    checked={selectedFilters[filterName].includes(option)}
                    onChange={() => handleSelect(filterName, option)}
                    className="mr-2 text-orange-500 focus:ring-orange-400 accent-orange-500 w-3 h-3 sm:w-4 sm:h-4"
                  />
                  <label
                    htmlFor={`${filterName}-${option}`}
                    className="text-gray-300 cursor-pointer select-none text-xs sm:text-sm flex-1"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
        <button
          className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg sm:rounded-xl font-semibold border-2 border-black text-xs sm:text-sm
                     hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out"
          onClick={applyFilters}
        >
          Aplicar
        </button>

        <button
          className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg sm:rounded-xl font-semibold border-2 border-black text-xs sm:text-sm
                     hover:bg-gray-800 hover:scale-105 transition-all duration-200 ease-in-out"
          onClick={clearFilters}
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export default FilterSystem;
