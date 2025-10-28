import api from '../api/api';

// 🟢 [GET] Lista todos os produtos ou por categoria
export const getProdutos = async (category = null) => {
  try {
    const params = category ? { category } : {};
    const response = await api.get('/produtos', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    throw error;
  }
};

// 🟢 [GET] Busca produto por ID
export const getProdutoById = async (id) => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto ID ${id}:`, error.message);
    throw error;
  }
};

// 🟡 [POST] Cria um novo produto
export const createProduto = async (produtoData) => {
  try {
    const response = await api.post('/produtos', produtoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error.message);
    throw error;
  }
};

// 🟠 [PUT] Atualiza um produto existente
export const updateProduto = async (id, produtoData) => {
  try {
    const response = await api.put(`/produtos/${id}`, produtoData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar produto ID ${id}:`, error.message);
    throw error;
  }
};

// 🔴 [DELETE] Remove um produto
export const deleteProduto = async (id) => {
  try {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar produto ID ${id}:`, error.message);
    throw error;
  }
};