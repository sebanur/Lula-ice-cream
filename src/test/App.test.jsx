import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import App from '../App';

vi.mock('../api/client', () => ({
  api: {
    getProducts: vi.fn().mockResolvedValue([]),
    getShopInfo: vi.fn().mockResolvedValue(null),
    getCategories: vi.fn().mockResolvedValue([]),
    getTrustHighlights: vi.fn().mockResolvedValue([]),
    getPromotions: vi.fn().mockResolvedValue([]),
    getReviews: vi.fn().mockResolvedValue([]),
    getDeliveryZones: vi.fn().mockResolvedValue([]),
  },
}));

describe('Home Page (App) Dynamic Content', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderHomePage = async () => {
    let rendered;
    await act(async () => {
      rendered = render(<App />);
    });
    return rendered;
  };

  it('dynamically displays initial cart badge and increments it when adding a signature product to cart', async () => {
    await renderHomePage();

    // Dynamic cart badge in header reflects initial cart items (2 items)
    const cartButton = screen.getByRole('button', { name: /sepet,\s*2\s*ürün\s*var/i });
    expect(cartButton).toBeInTheDocument();

    // Find and click the quick-add button for a signature product
    const signatureAddBtn = screen.getByRole('button', {
      name: /Bronte Antep Fıstığı ürününü sepete ekle/i,
    });
    fireEvent.click(signatureAddBtn);

    // Cart badge dynamically updates to 3
    expect(
      screen.getByRole('button', { name: /sepet,\s*3\s*ürün\s*var/i })
    ).toBeInTheDocument();

    // Cart drawer dynamically opens and displays the updated count
    expect(screen.getByText('Sepetiniz (3)')).toBeInTheDocument();
  });

  it('dynamically renders promotion banner details and claims promo into cart', async () => {
    await renderHomePage();

    // Dynamic promo details are rendered
    expect(screen.getByText('LULAFRESH')).toBeInTheDocument();
    const promoClaimBtn = screen.getByRole('button', { name: /Fırsatı Yakala/i });
    expect(promoClaimBtn).toBeInTheDocument();

    // Claim promo
    fireEvent.click(promoClaimBtn);

    // Cart badge increments from initial 2 to 3
    expect(
      screen.getByRole('button', { name: /sepet,\s*3\s*ürün\s*var/i })
    ).toBeInTheDocument();

    // The promo item is dynamically added to the open cart drawer
    expect(screen.getByText('1 kg Aile Paketi (2 Kutu)')).toBeInTheDocument();
  });

  it('filters catalog products dynamically when a category filter is selected', async () => {
    await renderHomePage();

    // Products grid region
    const productsGrid = screen.getByRole('region', { name: /Dondurma Listesi/i });

    // Initially both fruit and chocolate products are present
    expect(within(productsGrid).getByText('Yabani Orman Meyveleri')).toBeInTheDocument();
    expect(within(productsGrid).getByText('Belçika Yoğun Bitter')).toBeInTheDocument();

    // Switch to 'Meyveli & Sorbe' category
    const meyveliTab = screen.getByRole('tab', { name: /Meyveli & Sorbe/i });
    fireEvent.click(meyveliTab);

    // Dynamic filtering updates visible items
    expect(within(productsGrid).getByText('Yabani Orman Meyveleri')).toBeInTheDocument();
    expect(within(productsGrid).queryByText('Belçika Yoğun Bitter')).not.toBeInTheDocument();
  });

  it('dynamically renders customer reviews list with reviewer data', async () => {
    await renderHomePage();

    const reviewsRegion = screen.getByRole('region', { name: /Müşteri Değerlendirmeleri/i });

    // Reviews from dynamic data are displayed
    expect(within(reviewsRegion).getByText('Selin Yılmaz')).toBeInTheDocument();
    expect(within(reviewsRegion).getByText('Caferağa • Onaylı Sipariş')).toBeInTheDocument();
    expect(within(reviewsRegion).getByText(/Vegan sorbeleri muazzam!/i)).toBeInTheDocument();
  });

  it('toggles mobile navigation drawer dynamically', async () => {
    await renderHomePage();

    // Mobile nav is initially not visible
    expect(screen.queryByLabelText('Mobil Menü')).not.toBeInTheDocument();

    // Open mobile menu
    const menuOpenBtn = screen.getByLabelText('Menüyü Aç');
    fireEvent.click(menuOpenBtn);

    // Mobile nav is now dynamically rendered
    const mobileNav = screen.getByLabelText('Mobil Menü');
    expect(mobileNav).toBeInTheDocument();

    // Close mobile menu
    const menuCloseBtn = screen.getByLabelText('Menüyü Kapat');
    fireEvent.click(menuCloseBtn);

    // Mobile nav is removed
    expect(screen.queryByLabelText('Mobil Menü')).not.toBeInTheDocument();
  });

  it('opens and closes cart drawer dynamically via header controls', async () => {
    await renderHomePage();

    const cartDrawerDialog = screen.getByRole('dialog', {
      name: /Alışveriş Sepeti ve Sipariş Onayı/i,
    });

    // Drawer is initially closed (has opacity-0 and pointer-events-none class)
    expect(cartDrawerDialog.className).toContain('opacity-0');

    // Click cart button in header to open
    const cartBtn = screen.getByRole('button', { name: /sepet,\s*2\s*ürün\s*var/i });
    fireEvent.click(cartBtn);

    // Drawer is now open (opacity-100)
    expect(cartDrawerDialog.className).toContain('opacity-100');

    // Close drawer via close button
    const closeBtn = screen.getByRole('button', { name: 'Sepeti Kapat' });
    fireEvent.click(closeBtn);

    expect(cartDrawerDialog.className).toContain('opacity-0');
  });
});
