import { createContext, useState, useCallback, useMemo } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((book) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === book.id);
      if (existing) {
        return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: book.id, title: book.title, price: book.price, cover: book.cover, format: book.format || "Paperback", qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.qty), 0), [items]);
  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  const value = {
    cart: { items, total },
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
