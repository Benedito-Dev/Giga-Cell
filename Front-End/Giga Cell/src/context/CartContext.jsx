/* eslint-disable react/prop-types */
// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// CartProvider envolve sua aplicação no index.jsx ou App.jsx
export function CartProvider({ children }) {
  // Carrega do localStorage ao iniciar
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  // Adicionar produto ao carrinho
  const addToCart = (product) => {
    console.log('➕ Adicionando produto ao carrinho:', product);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('🔢 Quantidade incrementada:', newCart);
        return newCart;
      }

      const newCart = [...prevCart, { ...product, quantity: 1 }];
      console.log('🆕 Novo produto adicionado:', newCart);
      alert(`Produto "${product.nome}" adicionado ao carrinho!`);
      return newCart;
    });
  };

  // Remover produto do carrinho (ou decrementar quantidade)
  const removeFromCart = (productId) => {
    console.log('➖ Removendo produto do carrinho:', productId);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);

      if (!existingItem) return prevCart;

      if (existingItem.quantity > 1) {
        const newCart = prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        console.log('🔻 Quantidade decrementada:', newCart);
        return newCart;
      }

      const newCart = prevCart.filter(item => item.id !== productId);
      console.log('🗑️ Produto removido do carrinho:', newCart);
      return newCart;
    });
  };

  // Atualizar quantidade específica
  const updateQuantity = (productId, newQuantity) => {
    console.log(`✏️ Atualizando quantidade do produto ${productId} para:`, newQuantity);

    setCart(prevCart => {
      if (newQuantity <= 0) {
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

  // Limpar carrinho
  const clearCart = () => {
    console.log('🧹 Limpando carrinho');
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o carrinho em qualquer componente
export const useCart = () => useContext(CartContext);
