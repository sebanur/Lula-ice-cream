import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { ProductCard } from '../components/catalog/ProductCard';

describe('ProductCard component', () => {
  const mockProduct = {
    id: 'test-fistik',
    name: 'Bronte Antep Fıstığı',
    shortName: 'Antep Fıstıklı Gelato',
    price: 150,
    badge: 'Çok Satan',
    shortDescription: 'Bronte fıstığı ezmesi ve çıtır fıstık parçaları.',
    image: '/images/pistachio.png',
  };

  const renderComponent = () =>
    render(
      <ToastProvider>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </ToastProvider>
    );

  it('renders product details correctly', () => {
    renderComponent();

    expect(screen.getByText('Antep Fıstıklı Gelato')).toBeInTheDocument();
    expect(screen.getByText('150 ₺')).toBeInTheDocument();
    expect(screen.getByText('Çok Satan')).toBeInTheDocument();
    expect(
      screen.getByText('Bronte fıstığı ezmesi ve çıtır fıstık parçaları.')
    ).toBeInTheDocument();
  });

  it('allows toggling between Külah and Bardak', () => {
    renderComponent();

    const kulahBtn = screen.getByRole('radio', { name: /Külah/i });
    const bardakBtn = screen.getByRole('radio', { name: /Bardak/i });

    expect(kulahBtn).toHaveAttribute('aria-checked', 'true');
    expect(bardakBtn).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(bardakBtn);

    expect(bardakBtn).toHaveAttribute('aria-checked', 'true');
    expect(kulahBtn).toHaveAttribute('aria-checked', 'false');
  });

  it('increments and decrements quantity via stepper', () => {
    renderComponent();

    const incBtn = screen.getByRole('button', { name: 'Artır' });
    const decBtn = screen.getByRole('button', { name: 'Azalt' });

    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(incBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(decBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('adds item to cart on clicking Sepete Ekle', () => {
    renderComponent();

    const addBtn = screen.getByRole('button', { name: /sepete ekle/i });
    fireEvent.click(addBtn);

    // Quantity resets back to 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
