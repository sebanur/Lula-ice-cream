import { useState, useEffect, useMemo, useCallback } from 'react';
import { CartContext } from './cartContextInstance';
import dbData from '../../db.json';

const FREE_DELIVERY_THRESHOLD = 285;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lula_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return dbData.initialCart || [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState('moda');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('lula_cart', JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((product, serving = 'Külah', quantity = 1) => {
    // If an order was previously confirmed, reset confirmed order state on new add
    setConfirmedOrder(null);

    const servingLabel = serving.includes('Külah') ? 'Çıtır Waffle Külah 🍦' : 'Eko Bardak 🍨';
    const itemId = `${product.id || product.name}-${serving}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id || 'custom',
          name: product.shortName || product.name,
          serving: servingLabel,
          price: product.price,
          quantity: quantity,
          image: product.image || '/images/pistachio.png',
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id, change) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const { itemCount, subtotal, freeDeliveryRemaining, freeDeliveryPercent } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - totalAmount);
    const percent = Math.min(100, Math.round((totalAmount / FREE_DELIVERY_THRESHOLD) * 100));

    return {
      itemCount: count,
      subtotal: totalAmount,
      freeDeliveryRemaining: remaining,
      freeDeliveryPercent: percent,
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount,
      subtotal,
      total: subtotal,
      freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
      freeDeliveryRemaining,
      freeDeliveryPercent,
      deliveryZone,
      setDeliveryZone,
      confirmedOrder,
      setConfirmedOrder,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount,
      subtotal,
      freeDeliveryRemaining,
      freeDeliveryPercent,
      deliveryZone,
      confirmedOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
