import { useState, useEffect } from 'react';
import { api } from '../api/client';
import dbData from '../../db.json';

export function useShopData() {
  const [data, setData] = useState({
    shopInfo: dbData.shopInfo,
    categories: dbData.categories,
    trustHighlights: dbData.trustHighlights,
    promotions: dbData.promotions,
    reviews: dbData.reviews,
    deliveryZones: dbData.deliveryZones,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [shopInfo, categories, trustHighlights, promotions, reviews, deliveryZones] =
          await Promise.allSettled([
            api.getShopInfo(),
            api.getCategories(),
            api.getTrustHighlights(),
            api.getPromotions(),
            api.getReviews(),
            api.getDeliveryZones(),
          ]);

        if (isMounted) {
          setData({
            shopInfo: shopInfo.status === 'fulfilled' && shopInfo.value ? shopInfo.value : dbData.shopInfo,
            categories: categories.status === 'fulfilled' && categories.value ? categories.value : dbData.categories,
            trustHighlights:
              trustHighlights.status === 'fulfilled' && trustHighlights.value
                ? trustHighlights.value
                : dbData.trustHighlights,
            promotions:
              promotions.status === 'fulfilled' && promotions.value ? promotions.value : dbData.promotions,
            reviews: reviews.status === 'fulfilled' && reviews.value ? reviews.value : dbData.reviews,
            deliveryZones:
              deliveryZones.status === 'fulfilled' && deliveryZones.value
                ? deliveryZones.value
                : dbData.deliveryZones,
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { ...data, loading };
}
