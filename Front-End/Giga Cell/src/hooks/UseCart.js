// src/hooks/useCart.js
import { useState, useEffect } from 'react';

export function useCart() {
  // Carrega do LocalStorage ao iniciar
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      console.log('📦 Carrinho carregado do LocalStorage:', savedCart); // Debug inicial
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Salva no LocalStorage sempre que o carrinho mudar
  useEffect(() => {
    console.log('🔄 Carrinho atualizado, salvando no LocalStorage:', cart); // Debug de atualização
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  console.log('🛒 Estado atual do carrinho (para renderização):', cart); // Debug de estado
  return { cart, addToCart };
}