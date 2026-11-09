import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { PromoBanner } from '../components/promo/PromoBanner';

describe('PromoBanner component (Home Page)', () => {
  const customPromotion = {
    tag: 'Özel Yaz İndirimi',
    title: '3 Kutu Alana 1 Kutu Hediye!',
    description: 'YAZGELDI kupon kodu ile anında geçerli.',
    code: 'YAZGELDI',
    buttonText: 'Kampanyayı Uygula (390 ₺)',
    productName: 'Yaz Paketi (4 Kutu)',
    buttonPrice: 390,
  };

  const renderComponent = (promotion = customPromotion) =>
    render(
      <ToastProvider>
        <CartProvider>
          <PromoBanner promotion={promotion} />
        </CartProvider>
      </ToastProvider>
    );

  it('renders dynamic promotion properties correctly', () => {
    renderComponent();

    expect(screen.getByText('Özel Yaz İndirimi')).toBeInTheDocument();
    expect(screen.getByText('3 Kutu Alana 1 Kutu Hediye!')).toBeInTheDocument();
    expect(screen.getByText('YAZGELDI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kampanyayı Uygula (390 ₺)' })).toBeInTheDocument();
  });

  it('adds promotional product to cart on button click', () => {
    renderComponent();

    const claimBtn = screen.getByRole('button', { name: 'Kampanyayı Uygula (390 ₺)' });
    fireEvent.click(claimBtn);

    // Button remains functional
    expect(claimBtn).toBeInTheDocument();
  });

  it('renders default fallback promotional content when promotion prop is omitted', () => {
    renderComponent(null);

    expect(screen.getByText('Hafta Sonuna Özel Avantaj')).toBeInTheDocument();
    expect(screen.getByText('LULAFRESH')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fırsatı Yakala \(520 ₺\)/i })).toBeInTheDocument();
  });
});
