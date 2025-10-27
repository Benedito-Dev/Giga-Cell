const API_URL = 'http://192.168.1.111:3000';

export const authService = {
  // POST - Login
  async login(email, senha) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      // Salvar token no localStorage se retornado
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },

  // POST - Registro
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no cadastro');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  },

  // GET - Perfil do usuário
  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Não autorizado');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  // POST - Logout
  async logout() {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      // Limpar localStorage independente da resposta
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (!response.ok) {
        throw new Error('Erro ao fazer logout');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }
};