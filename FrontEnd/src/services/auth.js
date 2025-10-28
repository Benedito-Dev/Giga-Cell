import api from '../api/api';

// 🟡 [POST] Login do usuário
export const login = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    
    // Salvar token no localStorage se retornado
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.message);
    throw error;
  }
};

// 🟡 [POST] Registro de usuário
export const register = async (userData) => {
  try {
    const response = await api.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    console.error('Erro no registro:', error.message);
    throw error;
  }
};

// 🟢 [GET] Perfil do usuário
export const getProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error.message);
    throw error;
  }
};

// 🟡 [POST] Logout do usuário
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    
    // Limpar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return response.data;
  } catch (error) {
    console.error('Erro no logout:', error.message);
    
    // Limpar localStorage mesmo com erro
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    throw error;
  }
};