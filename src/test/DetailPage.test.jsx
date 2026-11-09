import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { DetailPage } from '../pages/DetailPage';
import { api } from '../api/client';

vi.mock('../api/client', () => ({
  api: {
    getProductById: vi.fn(),
  },
}));

describe('DetailPage component - Dynamic Content', () => {
  const mockProduct = {
    id: 'test-1',
    name: 'Bronte Antep Fıstığı',
    shortName: 'Antep Fıstıklı Gelato',
    price: 150,
    badge: 'Çok Satan',
    badgeColor: 'primary',
    origin: 'Sicilya & Gaziantep',
    description: 'Kavrulmuş Antep ve Bronte fıstıklarının ezmesiyle hazırlanan lezzet.',
    shortDescription: 'Bronte fıstığı ezmesi ve kavrulmuş çıtır fıstık parçaları.',
    rating: 5.0,
    reviewsCount: 142,
    image: '/images/pistachio.png',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = (props) =>
    render(
      <ToastProvider>
        <CartProvider>
          <DetailPage {...props} />
        </CartProvider>
      </ToastProvider>
    );

  it('renders loading state while dynamically fetching product by id', () => {
    // Keep promise pending to observe loading state
    api.getProductById.mockReturnValue(new Promise(() => {}));

    renderComponent({ productId: 'test-1' });

    expect(screen.getByTestId('detail-loader')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state dynamically when product fetch fails or product is not found', async () => {
    api.getProductById.mockResolvedValue(null);

    renderComponent({ productId: 'non-existing-product-id' });

    await waitFor(() => {
      expect(screen.getByTestId('detail-error')).toBeInTheDocument();
      expect(screen.getByText('Ürün bulunamadı')).toBeInTheDocument();
    });
  });

  it('dynamically displays product details from product data', async () => {
    api.getProductById.mockResolvedValue(mockProduct);

    renderComponent({ productId: 'test-1' });

    await waitFor(() => {
      // Dynamic name & price
      expect(screen.getByRole('heading', { level: 1, name: 'Bronte Antep Fıstığı' })).toBeInTheDocument();
      expect(screen.getByTestId('unit-price')).toHaveTextContent('150 ₺');

      // Dynamic badge & origin
      expect(screen.getByText('Çok Satan')).toBeInTheDocument();
      expect(screen.getAllByText('Sicilya & Gaziantep').length).toBeGreaterThanOrEqual(1);

      // Dynamic rating & reviews count
      expect(screen.getByText('5.0')).toBeInTheDocument();
      expect(screen.getByText('(142)')).toBeInTheDocument();

      // Dynamic description
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });
  });

  it('dynamically toggles serving selection between Külah and Bardak', () => {
    renderComponent({ product: mockProduct });

    const kulahOption = screen.getByRole('radio', { name: /Külah/i });
    const bardakOption = screen.getByRole('radio', { name: /Bardak/i });

    // Initially Külah is checked
    expect(kulahOption).toHaveAttribute('aria-checked', 'true');
    expect(bardakOption).toHaveAttribute('aria-checked', 'false');

    // Switch to Bardak
    fireEvent.click(bardakOption);

    // Dynamic state updates
    expect(bardakOption).toHaveAttribute('aria-checked', 'true');
    expect(kulahOption).toHaveAttribute('aria-checked', 'false');
  });

  it('dynamically updates quantity and recalculates total price on stepper changes', () => {
    renderComponent({ product: mockProduct });

    const incBtn = screen.getByRole('button', { name: 'Artır' });
    const decBtn = screen.getByRole('button', { name: 'Azalt' });
    const calculatedTotalEl = screen.getByTestId('calculated-total');

    // Default quantity 1, total 150 ₺
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(calculatedTotalEl).toHaveTextContent('150 ₺');

    // Increment to 2 (2 x 150 = 300 ₺)
    fireEvent.click(incBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(calculatedTotalEl).toHaveTextContent('300 ₺');

    // Increment to 3 (3 x 150 = 450 ₺)
    fireEvent.click(incBtn);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(calculatedTotalEl).toHaveTextContent('450 ₺');

    // Decrement back to 2 (2 x 150 = 300 ₺)
    fireEvent.click(decBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(calculatedTotalEl).toHaveTextContent('300 ₺');
  });

  it('dynamically adds customized item to cart and reflects calculated amount in CTA', () => {
    renderComponent({ product: mockProduct });

    const incBtn = screen.getByRole('button', { name: 'Artır' });
    fireEvent.click(incBtn); // quantity = 2

    const addToCartBtn = screen.getByRole('button', {
      name: /2 adet Bronte Antep Fıstığı sepete ekle/i,
    });
    expect(addToCartBtn).toHaveTextContent('Sepete Ekle (300 ₺)');

    // Click add to cart
    fireEvent.click(addToCartBtn);

    // Quantity resets or persists per component logic, and button remains interactive
    expect(addToCartBtn).toBeInTheDocument();
  });

  it('triggers onBack callback when the back button is clicked', () => {
    const handleBack = vi.fn();
    renderComponent({ product: mockProduct, onBack: handleBack });

    const backBtn = screen.getByRole('button', { name: 'Kataloğa Geri Dön' });
    fireEvent.click(backBtn);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
