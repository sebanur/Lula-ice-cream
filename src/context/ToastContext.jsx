import { useState, useCallback } from 'react';
import { ToastContext } from './toastContextInstance';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, icon = 'check_circle') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    const newToast = { id, message, icon, exiting: false };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        removeToast(id);
      }, 300);
    }, 2600);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}
