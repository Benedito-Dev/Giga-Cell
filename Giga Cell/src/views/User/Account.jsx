import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBarr from '../../components/NavBarr';
import SubBarr from '../../components/SubBarr';

function AccountUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('token');
          throw new Error('Não autenticado');
        }

        const data = await response.json();
        // Backend retorna usuário diretamente
        setUser(data);
        setFormData({
          nome: data.nome || '',
          email: data.email || '',
          telefone: data.telefone || '',
          cpf: data.cpf || '',
          endereco: data.endereco || ''
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Verifica se o usuário está carregado
      if (!user || !user.id_usuario) {
        throw new Error('Usuário não identificado');
      }

      const response = await fetch(`http://localhost:3000/usuarios/${user.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar perfil');
      }

      setUser(data);
      setSuccessMessage('Perfil atualizado com sucesso!');
      setEditMode(false);
      setTimeout(() => {
      window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErrorMessage(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Você precisa estar logado para acessar esta página</p>
        <Link
          to="/login"
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Ir para Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarr />
      <SubBarr />

      <div className="text-black py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Minha Conta</h1>
            <p className="text-lg">Gerencie suas informações pessoais</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Menu Lateral */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <i className="bx bxs-user text-4xl text-orange-500"></i>
                </div>
                <h2 className="text-xl font-semibold">{user.nome}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <Link
                  to="/account"
                  className="block px-4 py-2 bg-orange-100 text-orange-600 rounded-md font-medium"
                >
                  <i className="bx bx-user mr-2"></i> Meu Perfil
                </Link>
                <Link
                  to="/account/meus-pedidos"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <i className="bx bx-package mr-2"></i> Meus Pedidos
                </Link>
                <Link
                  to="/account/enderecos"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <i className="bx bx-home mr-2"></i> Meus Endereços
                </Link>
                <Link
                  to="/account/seguranca"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <i className="bx bx-lock-alt mr-2"></i> Segurança
                </Link>
              </nav>
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="text-orange-500 hover:text-orange-600 flex items-center"
                    >
                      <i className="bx bx-edit mr-1"></i> Editar
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditMode(false)}
                      className="text-gray-500 hover:text-gray-600 flex items-center"
                    >
                      <i className="bx bx-x mr-1"></i> Cancelar
                    </button>
                  )}
                </div>

                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {errorMessage}
                  </div>
                )}

                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border text-white bg-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border text-white bg-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                        <input
                          type="text"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border text-white bg-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                        <input
                          type="text"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border text-white bg-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                      <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border text-white bg-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Salvar Alterações
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-32 text-gray-500">
                        <i className="bx bx-user mr-2"></i> Nome:
                      </div>
                      <div className="flex-1 font-medium">{user.nome}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-gray-500">
                        <i className="bx bx-envelope mr-2"></i> E-mail:
                      </div>
                      <div className="flex-1 font-medium">{user.email}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-gray-500">
                        <i className="bx bx-phone mr-2"></i> Telefone:
                      </div>
                      <div className="flex-1 font-medium">{user.telefone || 'Não informado'}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-gray-500">
                        <i className="bx bx-id-card mr-2"></i> CPF:
                      </div>
                      <div className="flex-1 font-medium">{user.cpf || 'Não informado'}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-gray-500">
                        <i className="bx bx-home mr-2"></i> Endereço:
                      </div>
                      <div className="flex-1 font-medium">{user.endereco || 'Não informado'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountUser;
