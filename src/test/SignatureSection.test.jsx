import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { SignatureSection } from '../components/signature/SignatureSection';

describe('SignatureSection component (Home Page)', () => {
  const mockProducts = [
    {
      id: 'sig-1',
      name: 'Signature Taste 1',
      price: 150,
      isSignature: true,
      badge: 'Çok Satan',
      origin: 'Sicilya',
      description: 'Harika fıstıklı lezzet.',
      image: '/images/pistachio.png',
    },
    {
      id: 'sig-2',
      name: 'Signature Taste 2',
      price: 140,
      isSignature: true,
      badge: 'Favori',
      origin: 'Belçika',
      description: 'Yoğun bitter çikolata.',
      image: '/images/chocolate.png',
    },
    {
      id: 'normal-1',
      name: 'Regular Taste 1',
      price: 120,
      isSignature: false,
      description: 'Klasik vanilya.',
      image: '/images/vanilla.png',
    },
    {
      id: 'sig-3',
      name: 'Signature Taste 3',
      price: 160,
      isSignature: true,
      origin: 'Moda',
      description: 'Özel karamel.',
      image: '/images/caramel.png',
    },
    {
      id: 'sig-4',
      name: 'Signature Taste 4 (Excluded by limit)',
      price: 170,
      isSignature: true,
      description: 'Dördüncü imza ürün.',
      image: '/images/cherry.png',
    },
  ];

  const renderComponent = (products = mockProducts) =>
    render(
      <ToastProvider>
        <CartProvider>
          <SignatureSection products={products} />
        </CartProvider>
      </ToastProvider>
    );

  it('renders only signature products and limits display to top 3 items', () => {
    renderComponent();

    // The first 3 signature products should be present
    expect(screen.getByText('Signature Taste 1')).toBeInTheDocument();
    expect(screen.getByText('Signature Taste 2')).toBeInTheDocument();
    expect(screen.getByText('Signature Taste 3')).toBeInTheDocument();

    // Non-signature product must not be rendered
    expect(screen.queryByText('Regular Taste 1')).not.toBeInTheDocument();

    // 4th signature product should be excluded by slice(0, 3)
    expect(screen.queryByText('Signature Taste 4 (Excluded by limit)')).not.toBeInTheDocument();
  });

  it('dynamically adds signature product to cart on clicking Sepete Ekle', () => {
    renderComponent();

    const addBtn = screen.getByRole('button', {
      name: /Signature Taste 1 ürününü sepete ekle/i,
    });
    fireEvent.click(addBtn);

    // Dynamic price and badge are rendered correctly
    expect(screen.getByText('150 ₺')).toBeInTheDocument();
    expect(screen.getByText('Çok Satan')).toBeInTheDocument();
    expect(screen.getByText('Sicilya')).toBeInTheDocument();
  });
});
