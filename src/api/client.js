import dbData from '../../db.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Robust fetch wrapper that calls json-server if available,
 * falling back gracefully to static db.json data.
 */
async function fetchEndpoint(endpoint) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    // Graceful fallback to static db.json for standalone preview and offline environments
    return dbData[endpoint] || null;
  }
}

export const api = {
  getShopInfo: () => fetchEndpoint('shopInfo'),
  getCategories: () => fetchEndpoint('categories'),
  getProducts: () => fetchEndpoint('products'),
  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return dbData.products.find((p) => p.id === String(id)) || null;
  },
  getTrustHighlights: () => fetchEndpoint('trustHighlights'),
  getPromotions: () => fetchEndpoint('promotions'),
  getReviews: () => fetchEndpoint('reviews'),
  getDeliveryZones: () => fetchEndpoint('deliveryZones'),
  getInitialCart: () => fetchEndpoint('initialCart'),
  getOrders: async () => {
    const serverOrders = await fetchEndpoint('orders');
    if (Array.isArray(serverOrders) && serverOrders.length > 0) {
      return serverOrders;
    }
    try {
      return JSON.parse(localStorage.getItem('lula_orders') || '[]');
    } catch {
      return [];
    }
  },
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        const created = await response.json();
        // Also sync to local storage cache
        try {
          const localOrders = JSON.parse(localStorage.getItem('lula_orders') || '[]');
          localOrders.push(created);
          localStorage.setItem('lula_orders', JSON.stringify(localOrders));
        } catch {
          // ignore
        }
        return created;
      }
    } catch {
      // Fallback to local persistence if json-server is not reachable
    }

    try {
      const localOrders = JSON.parse(localStorage.getItem('lula_orders') || '[]');
      localOrders.push(orderData);
      localStorage.setItem('lula_orders', JSON.stringify(localOrders));
    } catch {
      // ignore
    }

    return orderData;
  },
};
