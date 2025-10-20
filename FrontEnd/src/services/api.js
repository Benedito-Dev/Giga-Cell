const API_URL = 'http://localhost:3000'; // Ajuste conforme necessário

export const authService = {
  async register(userData) {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include' // Para cookies
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro no cadastro');
    }
    
    return response.json();
  },

  async login(email, senha) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
        credentials: 'include' // ✅ envia cookies se o backend usar cookies HTTP-only
      });

      // Verifica status da resposta
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // evita erro se não vier JSON
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      // Retorna o JSON da resposta (usuário + token)
      const data = await response.json();
      console.log('Login bem-sucedido:', data);
      return data;

    } catch (error) {
      console.error('Erro no serviço de login:', error.message);
      throw error;
    }
  },

  async getProfile() {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Não autorizado');
    }
    
    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }
    
    return response.json();
  }
};