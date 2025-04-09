import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarr from '../../components/NavBarr';
import SubBarr from '../../components/SubBarr';

const Pedidos = () => {
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2023-0015',
      date: '15/10/2023',
      status: 'Entregue',
      total: 287.90,
      payment: 'Cartão de Crédito',
      tracking: 'ABC123456789',
      items: [
        {
          id: 1,
          name: 'iPhone 13 Pro',
          price: 259.90,
          quantity: 1,
          image: '/images/iphone13.jpg'
        },
        {
          id: 2,
          name: 'Capa Protetora',
          price: 28.00,
          quantity: 1,
          image: '/images/capa-iphone.jpg'
        }
      ]
    },
    {
      id: 'ORD-2023-0012',
      date: '05/09/2023',
      status: 'Cancelado',
      total: 1599.90,
      payment: 'PIX',
      tracking: '',
      items: [
        {
          id: 3,
          name: 'Samsung Galaxy S22',
          price: 1599.90,
          quantity: 1,
          image: '/images/s22.jpg'
        }
      ]
    },
    {
      id: 'ORD-2023-0008',
      date: '22/07/2023',
      status: 'Enviado',
      total: 899.90,
      payment: 'Cartão de Débito',
      tracking: 'XYZ987654321',
      items: [
        {
          id: 4,
          name: 'Xiaomi Redmi Note 11',
          price: 899.90,
          quantity: 1,
          image: '/images/redmi-note11.jpg'
        }
      ]
    }
  ]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Primeiro, buscar dados do usuário logado
        const userResponse = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include' // necessário se o backend usa cookies
        });
        const userData = await userResponse.json();

        if (!userData.success || !userData.user) {
          console.error('Erro ao obter usuário logado:', userData.message);
          return;
        }

        const usuario_id = userData.user.id_usuario;
        console.log('Usuário logado:', userData.user);

        // Em seguida, buscar os pedidos desse usuário
        const pedidosResponse = await fetch(`http://localhost:3000/pedidos?usuario_id=${usuario_id}`);
        const pedidosData = await pedidosResponse.json();

        console.log('Pedidos recebidos do backend:', pedidosData);
        // setOrders(pedidosData); // Descomente caso queira substituir os dados mockados
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchPedidos();
  }, []);

  const [filterStatus, setFilterStatus] = useState('todos');
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [filterDate, setFilterDate] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'todos' || order.status.toLowerCase() === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Entregue':
        return <i className='bx bx-check-circle text-green-500'></i>;
      case 'Enviado':
        return <i className='bx bx-paper-plane text-blue-500'></i>;
      case 'Processando':
        return <i className='bx bx-time-five text-yellow-500'></i>;
      case 'Cancelado':
        return <i className='bx bx-x-circle text-red-500'></i>;
      default:
        return <i className='bx bx-package text-gray-500'></i>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarr />
      <SubBarr />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Histórico de Pedidos</h1>
            <p className="text-gray-600">Acompanhe seus pedidos recentes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-600"
            >
              <option value="todos">Todos</option>
              <option value="entregue">Entregue</option>
              <option value="processando">Processando</option>
              <option value="enviado">Enviado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className='bx bx-package text-3xl text-gray-400'></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Nenhum pedido encontrado</h2>
            <p className="text-gray-500 mb-6">Parece que você ainda não fez nenhum pedido ou os filtros não correspondem a nenhum pedido.</p>
            <Link
              to="/produtos"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block font-medium"
            >
              Comprar agora
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Pedido #{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                            order.status === 'Cancelado' ? 'bg-red-100 text-red-800' :
                            order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-900">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                      <span className="text-xs text-gray-500 mt-1">{order.payment}</span>
                      <i className={`bx bx-chevron-down text-xl text-gray-400 mt-2 transition-transform ${
                        expandedOrder === order.id ? 'rotate-180' : ''
                      }`}></i>
                    </div>
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="border-t p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <i className='bx bx-package text-orange-500'></i> Detalhes da Entrega
                        </h4>
                        {order.tracking ? (
                          <>
                            <p className="text-sm text-gray-600">Código de rastreio:</p>
                            <p className="font-medium text-gray-800 mb-2">{order.tracking}</p>
                            <button className="text-orange-500 text-sm font-medium hover:text-orange-600 flex items-center gap-1">
                              Rastrear pedido <i className='bx bx-link-external'></i>
                            </button>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">Nenhuma informação de entrega disponível</p>
                        )}
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <i className='bx bx-credit-card text-orange-500'></i> Pagamento
                        </h4>
                        <p className="text-sm text-gray-600">Método:</p>
                        <p className="font-medium text-gray-800 mb-2">{order.payment}</p>
                        <p className="text-sm text-gray-600">Valor total:</p>
                        <p className="font-medium text-gray-800">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <i className='bx bx-help-circle text-orange-500'></i> Precisa de ajuda?
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">Algum problema com seu pedido?</p>
                        <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          Contatar suporte
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-700 mb-3">Produtos</h4>
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-contain rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800">{item.name}</h5>
                            <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-800">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                            <p className="text-xs text-gray-500">unidade</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Link
                        to={`/pedidos/${order.id}`}
                        className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
                      >
                        Ver detalhes completos <i className='bx bx-chevron-right'></i>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;