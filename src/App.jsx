import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/common/ToastContainer';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { HeroSection } from './components/hero/HeroSection';
import { TrustSection } from './components/trust/TrustSection';
import { SignatureSection } from './components/signature/SignatureSection';
import { CatalogSection } from './components/catalog/CatalogSection';
import { PromoBanner } from './components/promo/PromoBanner';
import { StorySection } from './components/story/StorySection';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { DeliveryZoneSection } from './components/delivery/DeliveryZoneSection';
import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useShopData } from './hooks/useShopData';
import { DetailPage } from './pages/DetailPage';

function MainContent() {
  const { products } = useProducts();
  const { categories, promotions, reviews, deliveryZones } = useShopData();
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Slide-out Cart Drawer Overlay */}
      <CartDrawer />

      {/* Sticky Glassmorphic Header */}
      <Header />

      {/* Main Semantic Page Body */}
      <main className="w-full pt-20 bg-surface flex-1">
        {selectedProductId ? (
          <DetailPage
            productId={selectedProductId}
            onBack={() => setSelectedProductId(null)}
          />
        ) : (
          <>
            <HeroSection />
            <TrustSection />
            <SignatureSection products={products} />
            <CatalogSection
              products={products}
              categories={categories}
              onSelectProduct={setSelectedProductId}
            />
            <PromoBanner promotion={promotions?.[0]} />
            <StorySection />
            <ReviewsSection reviews={reviews} />
            <DeliveryZoneSection zones={deliveryZones} />
          </>
        )}
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ToastProvider>
  );
}
