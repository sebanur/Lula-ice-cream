import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { CartDrawer } from '../components/cart/CartDrawer';

describe('Simulated Order Confirmation Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderCartDrawer = () =>
    render(
      <ToastProvider>
        <CartProvider>
          <CartDrawer />
        </CartProvider>
      </ToastProvider>
    );

  it('renders the "Confirm Order" button in the cart drawer', () => {
    renderCartDrawer();

    const confirmBtn = screen.getByRole('button', { name: /confirm order/i });
    expect(confirmBtn).toBeInTheDocument();
    expect(confirmBtn).toHaveAttribute('id', 'confirm-order-btn');
    expect(confirmBtn).not.toBeDisabled();
  });

  it('simulates order confirmation with loading animation and prevents multiple clicks', async () => {
    renderCartDrawer();

    const confirmBtn = screen.getByRole('button', { name: /confirm order/i });

    // Click to confirm
    fireEvent.click(confirmBtn);

    // Shows loading state immediately and is disabled
    expect(screen.getByText(/Confirming Order.../i)).toBeInTheDocument();
    expect(confirmBtn).toBeDisabled();

    // Prevent duplicate click during loading
    fireEvent.click(confirmBtn);

    // Wait for the simulated confirmation to resolve (1.2s timeout)
    await waitFor(
      () => {
        expect(
          screen.getByText('Your order has been confirmed successfully!')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText('Durum: Confirmed (Onaylandı)')).toBeInTheDocument();
  });

  it('generates a random demo order number and displays product summary with quantities and total', async () => {
    renderCartDrawer();

    const confirmBtn = screen.getByRole('button', { name: /confirm order/i });
    fireEvent.click(confirmBtn);

    // Wait for the simulated confirmation to resolve
    await waitFor(
      () => {
        expect(
          screen.getByText('Your order has been confirmed successfully!')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Checks random demo order number generated (format: #LULA-XXXXXX)
    expect(screen.getByText(/#LULA-\d{6}/)).toBeInTheDocument();

    // Displays order confirmation summary with selected products and quantities
    expect(screen.getByText('Sipariş Özeti (2 Çeşit Dondurma)')).toBeInTheDocument();
    expect(screen.getByText('Bronte Antep Fıstığı')).toBeInTheDocument();
    expect(screen.getByText('Belçika Bitter Çikolata')).toBeInTheDocument();

    // Displays total price breakdown
    expect(screen.getByText(/Genel Toplam \(Total Price\)/i)).toBeInTheDocument();
    expect(screen.getAllByText('290 ₺').length).toBeGreaterThan(0);
  });
});
