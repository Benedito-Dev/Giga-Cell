import NavBarr from '../../components/NavBarr';
import SubBarr from '../../components/SubBarr';
import { useCart } from '../../hooks/UseCart';
import { useEffect, useState } from 'react';

const Pedidos = () => {
  // Usando dados do hook useCart
  // eslint-disable-next-line no-unused-vars
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log('Cookie :', document.cookie); // Debug de busca
        const response = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include' // envia cookies (ex: token de sessão)
        });

        if (!response.ok) {
          throw new Error('Não autenticado');
        }

        const data = await response.json();
        if (data.success) {
          setCustomerInfo(data.user);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setCustomerInfo(null);
      }
    };

    fetchUserInfo();
  }, []);

  console.log('Dados do cliente:', customerInfo); // Debug de dados do cliente

  const total = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarr />
      <SubBarr />
      
      <div className="container mx-auto py-8 px-4 text-black">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo do Pedido */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="divide-y">
            {cart.map(item => (
              <div key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-gray-600">{item.quantity || 1} × R$ {item.preco}</p>
                </div>
                <p className="font-medium">R$ {(item.preco * (item.quantity || 1)).toFixed(2) || '00.00'}</p>
              </div>
            ))}
            </div>
            
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span className='text-green-600' >R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Informações do Cliente */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Nome</h3>
                <p>{customerInfo.nome}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">E-mail</h3>
                <p>{customerInfo.email}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Endereço de Entrega</h3>
                <p>{customerInfo.endereco}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Telefone</h3>
                <p>{customerInfo.telefone}</p>
              </div>
              {/* <div>
                <h3 className="font-medium text-gray-700">Método de Pagamento</h3>
                <p>{customerInfo.paymentMethod}</p>
              </div> */}
              
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mt-6">
                Confirmar Pedido
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Ao confirmar, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
