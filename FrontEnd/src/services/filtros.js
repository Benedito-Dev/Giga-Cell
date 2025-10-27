const API_URL = 'https://giga-cell.vercel.app';

export const filtrosService = {
  // POST - Buscar produtos com filtros
  async buscarComFiltros(filtroData) {
    try {
      const response = await fetch(`${API_URL}/api/filtro`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(filtroData)
      });

      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos com filtros:', error);
      throw error;
    }
  }
};