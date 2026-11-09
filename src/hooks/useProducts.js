import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import dbData from '../../db.json';

export function useProducts() {
  const [products, setProducts] = useState(dbData.products || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const data = await api.getProducts();
        if (!ignore && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        if (!ignore) setError(err);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}
