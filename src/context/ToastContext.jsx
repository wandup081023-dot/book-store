import { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(prev => {
      // Keep only up to 2 existing toasts (max 3 visible at once)
      const currentToasts = prev.length >= 3 ? prev.slice(prev.length - 2) : prev;
      return [...currentToasts, { id, message, type, exiting: false }];
    });

    // Auto-dismiss after 3000ms
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300); // Matches CSS transition duration
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}
