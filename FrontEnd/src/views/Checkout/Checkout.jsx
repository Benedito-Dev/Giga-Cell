/* eslint-disable no-unused-vars */
import NavBarr from '../../components/NavBarr';
import SubBarr from '../../components/SubBarr';
import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Não autenticado');

        const response = await fetch('http://localhost:3000/auth/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Não autenticado');

        const data = await response.json();
        setCustomerInfo(data || null);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.preco * (item.quantity || 1)), 0);

  const handlePaymentChange = (paymentMethod) => {
    setCustomerInfo(prevState => ({
      ...prevState,
      Payment: paymentMethod
    }));
  };

  const handleSubmitPedido = async () => {
    if (!customerInfo?.id_usuario || !customerInfo?.Payment || cart.length === 0) {
      alert("Preencha todas as informações antes de confirmar o pedido.");
      return;
    }

    const formaPagamentoMap = {
      "Cartão de Crédito": "cartao_credito",
      "Boleto": "boleto",
      "PIX": "pix",
      "Transferência Bancária": "transferencia",
      "Dinheiro": "dinheiro"
    };
    const forma_pagamento = formaPagamentoMap[customerInfo.Payment] || "pendente";

    const pedidoId = uuidv4();
    const itensCorrigidos = cart.map(item => {
      console.log('🔍 Produto:', item.nome, 'image_url:', item.imagemUrl); // Debug
      return {
        id: uuidv4(),
        produto_id: item.id,
        image_url: item.imagemUrl,
        nome: item.nome,
        preco_unitario: Number(item.preco),
        quantidade: item.quantity || 1
      };
    });

    const pedidoData = {
      id: pedidoId,
      usuario_id: customerInfo.id_usuario,
      data: new Date().toISOString(),
      status: "pendente",
      total,
      forma_pagamento,
      itens: itensCorrigidos
    };

    try {
      const response = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar pedido");
      }

      const result = await response.json();
      console.log("Pedido confirmado:", result);
      setPedidoConfirmado(true);

      clearCart(); // Limpa o carrinho via contexto

      window.location.href = "http://localhost:5173/account/meus-pedidos";
    } catch (err) {
      console.error("Erro ao enviar pedido:", err.message);
      alert("Erro ao confirmar o pedido: " + err.message);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-100"><NavBarr /><SubBarr /><div className="container mx-auto py-8 px-4 text-black">Carregando informações do cliente...</div></div>;
  if (error) return <div className="min-h-screen bg-gray-100"><NavBarr /><SubBarr /><div className="container mx-auto py-8 px-4 text-black"><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Erro ao carregar informações: {error}</div></div></div>;
  if (!customerInfo) return <div className="min-h-screen bg-gray-100"><NavBarr /><SubBarr /><div className="container mx-auto py-8 px-4 text-black"><div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">Você precisa estar autenticado para finalizar o pedido.</div></div></div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarr />
      <SubBarr />
      <div className="container mx-auto py-8 px-4 text-black">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

        {pedidoConfirmado && <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-400 rounded">Pedido confirmado com sucesso!</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo do Pedido */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

            <div className="divide-y max-h-[50vh] overflow-y-auto px-5">
              {cart.map(item => (
                <div key={item.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.imagemUrl} alt={item.nome} className="w-20 h-20 object-cover rounded mr-4"/>
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-gray-600">{item.quantity || 1} × R$ {item.preco}</p>
                    </div>
                  </div>
                  <p className="font-medium">R$ {(item.preco * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span className='text-green-600'>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Nome</h3>
                <p>{customerInfo.nome || 'Não informado'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">E-mail</h3>
                <p>{customerInfo.email || 'Não informado'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Endereço de Entrega</h3>
                <p>{customerInfo.endereco || 'Não informado'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Telefone</h3>
                <p>{customerInfo.telefone || 'Não informado'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Método de Pagamento</h3>
                <select className='bg-slate-100 rounded-md px-2 py-2' value={customerInfo.Payment || ''} onChange={(e) => handlePaymentChange(e.target.value)}>
                  <option value="">Não informado</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Boleto">Boleto</option>
                  <option value="PIX">PIX</option>
                  <option value="Transferência Bancária">Transferência Bancária</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>

              <button onClick={handleSubmitPedido} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mt-6">
                Confirmar Pedido
              </button>

              <p className="text-sm text-gray-500 mt-4">Ao confirmar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
