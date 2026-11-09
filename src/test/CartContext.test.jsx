import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { useCart } from '../context/useCart';

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  it('calculates initial cart count and subtotal', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.itemCount).toBeGreaterThan(0);
    expect(result.current.subtotal).toBeGreaterThan(0);
  });

  it('adds an item to cart and updates subtotal', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const initialCount = result.current.itemCount;

    act(() => {
      result.current.addItem(
        { id: 'test-1', name: 'Test Gelato', price: 100 },
        'Külah',
        2
      );
    });

    expect(result.current.itemCount).toBe(initialCount + 2);
  });

  it('updates quantity and removes item when qty is 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(
        { id: 'single-item', name: 'Single Scoop', price: 50 },
        'Bardak',
        1
      );
    });

    const targetItem = result.current.items.find((i) => i.id.includes('single-item'));
    expect(targetItem).toBeDefined();

    act(() => {
      result.current.updateQuantity(targetItem.id, -1);
    });

    const removedItem = result.current.items.find((i) => i.id === targetItem.id);
    expect(removedItem).toBeUndefined();
  });

  it('tracks free delivery progress correctly towards 285 threshold', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.subtotal).toBe(0);
    expect(result.current.freeDeliveryRemaining).toBe(285);
    expect(result.current.freeDeliveryPercent).toBe(0);

    act(() => {
      result.current.addItem({ id: '1', name: 'Gelato 1', price: 200 }, 'Külah', 1);
    });

    expect(result.current.subtotal).toBe(200);
    expect(result.current.freeDeliveryRemaining).toBe(85);
    expect(result.current.freeDeliveryPercent).toBe(70);
  });
});
