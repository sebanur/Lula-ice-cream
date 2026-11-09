import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';
import { Icon } from '../common/Icon';
import { CartItem } from './CartItem';
import { FreeDeliveryMeter } from './FreeDeliveryMeter';
import { ThermalShippingNote } from './ThermalShippingNote';
import dbData from '../../../db.json';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    itemCount,
    subtotal,
    total,
    clearCart,
    deliveryZone,
    confirmedOrder,
    setConfirmedOrder,
  } = useCart();

  const { showToast } = useToast();
  const drawerRef = useRef(null);
  const submittingRef = useRef(false);

  // Form State with sensible defaults so user can confirm immediately
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    neighborhood: '',
    address: '',
    paymentMethod: 'Kapıda Kredi Kartı',
    note: '',
  });

  const activeNeighborhood = formData.neighborhood || deliveryZone || 'moda';
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Simulated Order Confirmation Flow
   * Runs client-side with 1.2s loading state, generates random demo order number,
   * prevents duplicate clicks, displays summary, and shows success notification.
   */
  const handleConfirmOrder = async (e) => {
    if (e) e.preventDefault();

    // Prevent duplicate orders / multiple clicks
    if (submittingRef.current || isSubmitting) {
      return;
    }

    if (items.length === 0) {
      showToast('Sepetinizde ürün bulunmamaktadır.', 'error');
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    // Save snapshot of items before clearing cart
    const itemsSnapshot = items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      serving: item.serving,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      total: item.price * item.quantity,
    }));

    const orderSubtotal = subtotal;
    const orderTotal = total;
    const orderItemCount = itemCount;

    // Simulate 1.2s loading animation
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Generate random demo order number (e.g. #LULA-749281)
    const randomDemoOrderNumber = `#LULA-${Math.floor(100000 + Math.random() * 900000)}`;
    const selectedZoneObj = dbData.deliveryZones.find((z) => z.id === activeNeighborhood);

    const simulatedOrder = {
      id: randomDemoOrderNumber,
      date: new Date().toLocaleString('tr-TR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'Confirmed',
      items: itemsSnapshot,
      itemCount: orderItemCount,
      subtotal: orderSubtotal,
      shippingFee: 0,
      total: orderTotal,
      customer: {
        fullName: formData.fullName.trim() || 'Misafir Müşteri',
        phone: formData.phone.trim() || '0555 123 45 67',
        neighborhood: selectedZoneObj ? selectedZoneObj.name : 'Kadıköy - Moda (25-35 dk)',
        address: formData.address.trim() || 'Moda Cad. No: 42, Kadıköy, İstanbul',
        note: formData.note.trim(),
      },
      paymentMethod: formData.paymentMethod,
      estimatedDelivery: selectedZoneObj ? selectedZoneObj.duration : '25-35 dk',
      thermalPackaging: 'Kuru buz takviyeli %100 geri dönüştürülebilir kutu (-18°C)',
    };

    // Store in localStorage history
    try {
      const existing = JSON.parse(localStorage.getItem('lula_orders') || '[]');
      existing.unshift(simulatedOrder);
      localStorage.setItem('lula_orders', JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Clear active cart & update confirmed state
    clearCart();
    setConfirmedOrder(simulatedOrder);

    // Show success notification
    showToast(`Your order has been confirmed successfully! (${randomDemoOrderNumber})`, 'check_circle');

    submittingRef.current = false;
    setIsSubmitting(false);
  };

  const handleStartNewOrder = () => {
    setConfirmedOrder(null);
    setFormData({
      fullName: '',
      phone: '',
      neighborhood: '',
      address: '',
      paymentMethod: 'Kapıda Kredi Kartı',
      note: '',
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Alışveriş Sepeti ve Sipariş Onayı"
    >
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[460px] bg-surface shadow-2xl flex flex-col transition-transform duration-300 ease-in-out pointer-events-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between border-b border-surface-container shrink-0">
          <div className="flex items-center gap-space-xs">
            <Icon
              name={confirmedOrder ? 'verified' : 'shopping_bag'}
              size={24}
              className="text-primary"
            />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {confirmedOrder ? 'Sipariş Onaylandı 🎉' : `Sepetiniz (${itemCount})`}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors focus:ring-2 focus:ring-primary"
            aria-label="Sepeti Kapat"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* ===================== SIMULATED CONFIRMED ORDER SUCCESS SUMMARY ===================== */}
        {confirmedOrder ? (
          <div className="flex-1 overflow-y-auto px-space-md py-space-md flex flex-col items-center gap-space-md text-center">
            {/* Celebration icon & notification */}
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-md animate-bounce">
              <Icon name="check_circle" size={38} filled={true} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-primary/15 text-primary font-label-sm text-label-sm uppercase tracking-wider rounded-full font-bold mb-1.5">
                Durum: Confirmed (Onaylandı)
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Your order has been confirmed successfully!
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Siparişiniz başarıyla alındı. Dondurmalarınız -18°C termal kutuda kuryemizle kapınıza ulaştırılacaktır.
              </p>
            </div>

            {/* Order Details & Demo Order Number */}
            <div className="w-full bg-surface-container-lowest p-space-md rounded-2xl shadow-sm text-left flex flex-col gap-2 border border-surface-container">
              <div className="flex justify-between items-center pb-2 border-b border-surface-container text-body-sm">
                <span className="text-on-surface-variant font-medium">Sipariş No (Order #):</span>
                <span className="font-bold text-primary font-mono text-base">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-body-sm">
                <span className="text-on-surface-variant font-medium">Tarih:</span>
                <span className="font-bold text-on-surface">{confirmedOrder.date}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-body-sm">
                <span className="text-on-surface-variant font-medium">Alıcı:</span>
                <span className="font-bold text-on-surface">{confirmedOrder.customer.fullName}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-body-sm">
                <span className="text-on-surface-variant font-medium">Teslimat Bölgesi:</span>
                <span className="font-bold text-on-surface">{confirmedOrder.customer.neighborhood}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-body-sm">
                <span className="text-on-surface-variant font-medium">Tahmini Varış:</span>
                <span className="font-bold text-secondary">{confirmedOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Selected Products Confirmation Summary (Requirement 6) */}
            <div className="w-full bg-surface-container-lowest p-space-md rounded-2xl shadow-sm text-left border border-surface-container flex flex-col gap-2">
              <h4 className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-on-surface-variant pb-1 border-b border-surface-container">
                Sipariş Özeti ({confirmedOrder.items.length} Çeşit Dondurma)
              </h4>
              <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-body-sm py-1 border-b border-surface-container/40 last:border-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.image || '/images/pistachio.png'}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-surface-container-low shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-on-surface text-sm truncate">{item.name}</p>
                        <p className="text-xs text-on-surface-variant">{item.serving} • Adet: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-headline-sm text-sm font-bold text-secondary shrink-0 ml-2">
                      {item.total} ₺
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-surface-container flex flex-col gap-1 text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Ara Toplam</span>
                  <span className="font-bold text-on-surface">{confirmedOrder.subtotal} ₺</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Kuru Buz &amp; Termal Ambalaj</span>
                  <span className="text-primary font-bold">Ücretsiz</span>
                </div>
                <div className="flex justify-between font-headline-sm text-base text-on-surface pt-1 border-t border-surface-container">
                  <span>Genel Toplam (Total Price)</span>
                  <span className="text-secondary font-bold">{confirmedOrder.total} ₺</span>
                </div>
              </div>
            </div>

            {/* Thermal Packaging Assurance */}
            <div className="w-full bg-primary-fixed/25 p-3 rounded-xl flex items-center gap-space-xs text-left">
              <Icon name="ac_unit" size={20} className="text-primary shrink-0" />
              <p className="font-body-sm text-[12px] text-on-primary-fixed-variant">
                {confirmedOrder.thermalPackaging}
              </p>
            </div>

            {/* Return Button */}
            <button
              type="button"
              onClick={handleStartNewOrder}
              className="w-full py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-md hover:bg-primary/95 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Icon name="shopping_bag" size={20} />
              <span>Yeni Sipariş Ver (Continue Shopping)</span>
            </button>
          </div>
        ) : (
          /* ===================== ACTIVE CART & ORDER DETAILS ===================== */
          <>
            {/* Free Delivery Meter */}
            <FreeDeliveryMeter />

            {/* Thermal Shipping Note */}
            <ThermalShippingNote />

            {/* Scrollable Container with Items & Details */}
            <div className="flex-1 overflow-y-auto px-space-md py-space-sm flex flex-col gap-space-md">
              {/* Empty state */}
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-3 text-primary">
                    <Icon name="shopping_bag" size={32} />
                  </div>
                  <p className="font-headline-sm text-[18px] text-on-surface mb-1">
                    Sepetiniz henüz boş
                  </p>
                  <p className="font-body-sm text-body-sm max-w-xs mb-4">
                    Taze ve katkısız lezzetlerimizi keşfederek hemen sepetinize ekleyebilirsiniz.
                  </p>
                  <a
                    href="#urunler"
                    onClick={closeCart}
                    className="px-space-md py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary/95 transition-all inline-flex items-center gap-2"
                  >
                    <span>Dondurmalara Göz At</span>
                    <Icon name="arrow_forward" size={16} />
                  </a>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="flex flex-col gap-space-xs">
                    <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                      Sepetteki Lezzetler ({itemCount})
                    </h4>
                    <div className="flex flex-col gap-space-xs">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>
                  </div>

                  {/* Optional Delivery & Contact Info */}
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container flex flex-col gap-space-sm">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-surface-container">
                      <Icon name="local_shipping" size={20} className="text-primary" />
                      <h4 className="font-headline-sm text-[17px] text-on-surface">
                        Teslimat ve İletişim Bilgileri
                      </h4>
                    </div>

                    {/* Ad Soyad */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="customer-fullname"
                        className="font-label-sm text-label-sm text-on-surface font-bold"
                      >
                        Ad Soyad
                      </label>
                      <input
                        id="customer-fullname"
                        name="fullName"
                        type="text"
                        placeholder="Örn: Ece Çelik (Opsiyonel)"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>

                    {/* Telefon */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="customer-phone"
                        className="font-label-sm text-label-sm text-on-surface font-bold"
                      >
                        Telefon Numarası
                      </label>
                      <input
                        id="customer-phone"
                        name="phone"
                        type="tel"
                        placeholder="Örn: 0532 123 45 67 (Opsiyonel)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>

                    {/* Mahalle / Bölge */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="customer-neighborhood"
                        className="font-label-sm text-label-sm text-on-surface font-bold"
                      >
                        Teslimat Bölgesi
                      </label>
                      <select
                        id="customer-neighborhood"
                        name="neighborhood"
                        value={activeNeighborhood}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
                      >
                        {dbData.deliveryZones.map((z) => (
                          <option key={z.id} value={z.id}>
                            {z.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Açık Adres */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="customer-address"
                        className="font-label-sm text-label-sm text-on-surface font-bold"
                      >
                        Açık Adres
                      </label>
                      <textarea
                        id="customer-address"
                        name="address"
                        rows={2}
                        placeholder="Cadde/Sokak, Bina No, Daire..."
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      />
                    </div>

                    {/* Ödeme Yöntemi */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="customer-payment"
                        className="font-label-sm text-label-sm text-on-surface font-bold"
                      >
                        Ödeme Şekli
                      </label>
                      <select
                        id="customer-payment"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
                      >
                        <option value="Kapıda Kredi Kartı">💳 Kapıda Kredi Kartı / Temassız</option>
                        <option value="Kapıda Nakit">💵 Kapıda Nakit</option>
                        <option value="Online Kredi Kartı">🌐 Online Güvenli Ödeme</option>
                      </select>
                    </div>

                    {/* Sipariş Notu */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="customer-note"
                        className="font-label-sm text-label-sm text-on-surface font-bold"
                      >
                        Sipariş Notu (Opsiyonel)
                      </label>
                      <input
                        id="customer-note"
                        name="note"
                        type="text"
                        placeholder="Örn: Zili çalmayın, kapıya bırakın..."
                        value={formData.note}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer with the Confirm Order Button */}
            {items.length > 0 && (
              <div className="p-space-md bg-surface-container-low shadow-lg flex flex-col gap-space-xs border-t border-surface-container shrink-0">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Ara Toplam</span>
                  <span className="font-bold text-on-surface">{subtotal} ₺</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Kuru Buz &amp; Termal Paket</span>
                  <span className="text-primary font-bold">Ücretsiz</span>
                </div>
                <div className="flex justify-between font-headline-sm text-headline-sm text-on-surface pt-1.5 border-t border-surface-container">
                  <span>Genel Toplam</span>
                  <span className="text-secondary font-bold">{total} ₺</span>
                </div>

                {/* THE CONFIRM ORDER BUTTON */}
                <button
                  id="confirm-order-btn"
                  data-testid="confirm-order-btn"
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || items.length === 0}
                  className="w-full mt-2 py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-md hover:bg-primary/95 transition-all flex items-center justify-center gap-space-xs active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Confirm Order"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="progress_activity" size={20} className="animate-spin" />
                      <span>Confirming Order... (Sipariş Onaylanıyor)</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Order (Siparişi Onayla)</span>
                      <Icon name="check_circle" size={20} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
