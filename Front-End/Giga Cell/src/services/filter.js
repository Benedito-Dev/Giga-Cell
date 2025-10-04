// filter.js
export const applyFilters = (products, filters) => {
  return products.filter(product => {
    // Coleção
    if (filters.collection && filters.collection !== 'Todas') {
      if (product.collection !== filters.collection) return false;
    }

    // Preço
    if (filters.price.length > 0) {
      const preco = product.price;
      const match = filters.price.some(range => {
        if (range === 'Até R$ 500') return preco <= 500;
        if (range === 'R$ 500 - R$ 1000') return preco >= 500 && preco <= 1000;
        if (range === 'R$ 1000 - R$ 1500') return preco >= 1000 && preco <= 1500;
        if (range === 'Acima de R$ 1500') return preco > 1500;
        return false;
      });
      if (!match) return false;
    }

    // Cor
    if (filters.color.length > 0 && !filters.color.includes(product.color)) {
      return false;
    }

    // Marca
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false;
    }

    // Produtos especiais
    if (filters.products.length > 0) {
      if (filters.products.includes('Mais vendidos') && !product.bestSeller) return false;
      if (filters.products.includes('Lançamentos') && !product.newRelease) return false;
      if (filters.products.includes('Promoções') && !product.promo) return false;
      if (filters.products.includes('Com desconto') && !product.discount) return false;
    }

    return true;
  });
};
