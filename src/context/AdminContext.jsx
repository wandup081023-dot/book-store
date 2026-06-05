import { createContext, useState, useCallback } from 'react';
import BOOKS from '../data/books';
import ORDERS from '../data/orders';
import CUSTOMERS from '../data/customers';
import COUPONS from '../data/coupons';

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [books, setBooks] = useState(BOOKS);
  const [orders, setOrders] = useState(ORDERS);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [coupons, setCoupons] = useState(COUPONS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((email, pass) => {
    if (email === "admin@pageturn.com" && pass === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const addBook = useCallback((book) => {
    setBooks(prev => [{ ...book, id: Date.now() }, ...prev]);
  }, []);

  const updateBook = useCallback((book) => {
    setBooks(prev => prev.map(b => b.id === book.id ? book : b));
  }, []);

  const deleteBook = useCallback((id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const addCoupon = useCallback((coupon) => {
    setCoupons(prev => [{ ...coupon, id: `CPN-${Date.now()}` }, ...prev]);
  }, []);

  const updateCoupon = useCallback((coupon) => {
    setCoupons(prev => prev.map(c => c.id === coupon.id ? coupon : c));
  }, []);

  const deleteCoupon = useCallback((id) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  }, []);

  const toggleCoupon = useCallback((id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  }, []);

  const value = {
    books, orders, customers, coupons, isAuthenticated,
    login, logout,
    addBook, updateBook, deleteBook,
    updateOrderStatus,
    addCoupon, updateCoupon, deleteCoupon, toggleCoupon
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}
