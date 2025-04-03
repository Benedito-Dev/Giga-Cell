import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

// 1. Primeiro crie o contexto
const AuthContext = createContext();

// 2. Crie o provider como função separada
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { user } = await authService.getProfile();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email, senha) => {
    const { user } = await authService.login(email, senha);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Crie o hook como função separada
function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}

// 4. Exporte as funções separadamente
export { AuthProvider, useAuth };