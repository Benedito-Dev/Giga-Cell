import api from '../api/api';

// 🟡 [POST] Buscar produtos com filtros
export const buscarComFiltros = async (filtroData) => {
  try {
    const response = await api.post('/produtos/filtro', filtroData);
    return response.data || [];
  } catch (error) {
    console.error('Erro ao buscar produtos com filtros:', error.message);
    throw error;
  }
};