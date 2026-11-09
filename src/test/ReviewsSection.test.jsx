import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewsSection } from '../components/reviews/ReviewsSection';

describe('ReviewsSection component (Home Page)', () => {
  const mockReviews = [
    {
      id: 'r1',
      name: 'Deniz Kaya',
      initials: 'DK',
      badge: 'Moda Sakini • Gurme',
      rating: 5,
      comment: 'İnanılmaz lezzetli ve tam kıvamında dondurma!',
    },
    {
      id: 'r2',
      name: 'Can Demir',
      initials: 'CD',
      badge: 'Onaylı Sipariş',
      rating: 4,
      comment: 'Teslimat çok hızlı geldi, erimemişti.',
    },
  ];

  it('renders dynamic customer reviews and their ratings', () => {
    render(<ReviewsSection reviews={mockReviews} />);

    // Renders review 1
    expect(screen.getByText('Deniz Kaya')).toBeInTheDocument();
    expect(screen.getByText('DK')).toBeInTheDocument();
    expect(screen.getByText('Moda Sakini • Gurme')).toBeInTheDocument();
    expect(screen.getByText('"İnanılmaz lezzetli ve tam kıvamında dondurma!"')).toBeInTheDocument();
    expect(screen.getByLabelText('5 üzerinden 5 yıldız')).toBeInTheDocument();

    // Renders review 2
    expect(screen.getByText('Can Demir')).toBeInTheDocument();
    expect(screen.getByText('CD')).toBeInTheDocument();
    expect(screen.getByText('Onaylı Sipariş')).toBeInTheDocument();
    expect(screen.getByText('"Teslimat çok hızlı geldi, erimemişti."')).toBeInTheDocument();
    expect(screen.getByLabelText('4 üzerinden 5 yıldız')).toBeInTheDocument();
  });

  it('falls back to default reviews when empty reviews array is provided', () => {
    render(<ReviewsSection reviews={[]} />);

    expect(screen.getByText('Selin Yılmaz')).toBeInTheDocument();
    expect(screen.getByText('SY')).toBeInTheDocument();
    expect(screen.getByText('Caferağa • Onaylı Sipariş')).toBeInTheDocument();
  });
});
