import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { CatalogSection } from '../components/catalog/CatalogSection';

describe('CatalogSection component', () => {
  const mockCategories = [
    { id: 'all', slug: 'all', name: 'Tümü', count: 2 },
    { id: 'meyveli', slug: 'meyveli', name: 'Meyveli & Sorbe', count: 1 },
    { id: 'cikolata', slug: 'cikolata', name: 'Çikolatalı', count: 1 },
  ];

  const mockProducts = [
    {
      id: 'p1',
      name: 'Yabani Orman Meyveleri',
      price: 135,
      categories: ['meyveli'],
      category: 'meyveli',
      image: '/images/raspberry.png',
    },
    {
      id: 'p2',
      name: 'Belçika Yoğun Bitter',
      price: 140,
      categories: ['cikolata'],
      category: 'cikolata',
      image: '/images/chocolate.png',
    },
  ];

  const renderComponent = () =>
    render(
      <ToastProvider>
        <CartProvider>
          <CatalogSection products={mockProducts} categories={mockCategories} />
        </CartProvider>
      </ToastProvider>
    );

  it('renders all products by default', () => {
    renderComponent();

    expect(screen.getByText('Yabani Orman Meyveleri')).toBeInTheDocument();
    expect(screen.getByText('Belçika Yoğun Bitter')).toBeInTheDocument();
  });

  it('filters products when a category is selected', () => {
    renderComponent();

    const fruitTab = screen.getByRole('tab', { name: /Meyveli & Sorbe/i });
    fireEvent.click(fruitTab);

    expect(screen.getByText('Yabani Orman Meyveleri')).toBeInTheDocument();
    expect(screen.queryByText('Belçika Yoğun Bitter')).not.toBeInTheDocument();
  });
});
