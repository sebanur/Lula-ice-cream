import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { DeliveryZoneSection } from '../components/delivery/DeliveryZoneSection';

describe('DeliveryZoneSection component', () => {
  const mockZones = [
    {
      id: 'moda',
      name: 'Kadıköy - Moda (25-35 dk)',
      duration: '25-35 dk',
      available: true,
      note: 'Bu bölgeye aktif kurye servisimiz bulunmaktadır!',
    },
    {
      id: 'other',
      name: 'Diğer Bölgeler (Özel Kurye)',
      duration: '45-60 dk',
      available: false,
      note: 'Kadıköy dışı için özel kurye bedeli uygulanır (45-60 dk).',
    },
  ];

  it('renders delivery zone information and switches feedback dynamically', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <DeliveryZoneSection zones={mockZones} />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByText('Dondurmanız Erimeden Kapınızda 🛵')).toBeInTheDocument();
    expect(
      screen.getByText('Bu bölgeye aktif kurye servisimiz bulunmaktadır!')
    ).toBeInTheDocument();

    const select = screen.getByLabelText(/Mahalle \/ Bölge/i);
    fireEvent.change(select, { target: { value: 'other' } });

    expect(
      screen.getByText('Kadıköy dışı için özel kurye bedeli uygulanır (45-60 dk).')
    ).toBeInTheDocument();
  });
});
