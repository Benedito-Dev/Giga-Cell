// CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log('➕ Adicionando produto ao carrinho:', product); // Debug de ação
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('🔢 Quantidade incrementada:', newCart); // Debug de modificação
        return newCart;
      }
      
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      console.log('🆕 Novo produto adicionado:', newCart); // Debug de adição
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    console.log('➖ Removendo produto do carrinho:', productId); // Debug de ação
  
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
  
      if (!existingItem) {
        console.log('❌ Produto não encontrado no carrinho. Nenhuma ação realizada.');
        return prevCart;
      }
  
      if (existingItem.quantity > 1) {
        const newCart = prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        console.log('🔻 Quantidade decrementada:', newCart); // Debug de modificação
        return newCart;
      }
  
      const newCart = prevCart.filter(item => item.id !== productId);
      console.log('🗑️ Produto removido do carrinho:', newCart); // Debug de remoção total
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log(`✏️ Atualizando quantidade do produto ${productId} para:`, newQuantity); // Debug de ação
  
    setCart(prevCart => {
      if (newQuantity <= 0) {
        // Se a nova quantidade for 0 ou negativa, remove o item
        const newCart = prevCart.filter(item => item.id !== productId);
        console.log('🗑️ Quantidade zero ou menor, produto removido do carrinho:', newCart);
        return newCart;
      }
  
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
  
      console.log('✅ Quantidade atualizada:', newCart);
      return newCart;
    });
  };

  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
