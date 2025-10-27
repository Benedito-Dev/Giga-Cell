const API_URL = 'http://192.168.1.111:3000';

export const produtosService = {
  // GET - Buscar todos os produtos ou por categoria
  async getAll(category = null) {
    try {
      const url = new URL(`${API_URL}/produtos`);
      if (category) {
        url.searchParams.append('category', category);
      }
      
      console.log('Fazendo requisição para:', url.toString());
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      
      const data = await response.json();
      console.log('Dados recebidos do backend:', data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  // GET - Buscar produto por ID
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`);
      if (!response.ok) throw new Error('Produto não encontrado');
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  // POST - Criar novo produto
  async create(produtoData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(produtoData)
      });
      
      if (!response.ok) throw new Error('Erro ao criar produto');
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  // PUT - Atualizar produto
  async update(id, produtoData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(produtoData)
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // DELETE - Deletar produto
  async delete(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Erro ao deletar produto');
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }
};