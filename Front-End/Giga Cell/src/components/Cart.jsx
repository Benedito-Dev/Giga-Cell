import { useState, useEffect } from 'react';

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // eslint-disable-next-line no-unused-vars
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  return (
    <>
      {/* Botão flutuante */}
      <button 
        className="fixed bottom-6 right-6 bg-indigo-600 text-white text-2xl p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 z-50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className='bx bxs-cart'></i>
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Painel do carrinho */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center p-4 border-b">
          <button 
                onClick={() => setIsOpen(false)}
                className="mr-2 text-xl text-red-500 hover:text-red-700 transition-colors"
              >
                <i className='bx bx-arrow-back'></i>
              </button>
            <h3 className="text-xl font-bold text-gray-800">Seu Carrinho</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
            </button>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-start border-b pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-2">
                        <button 
                          className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-3 text-gray-800">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <span className="ml-auto font-medium text-gray-800">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-red-500 ml-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rodapé (só aparece se tiver itens) */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-indigo-600">R$ {total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingCart;