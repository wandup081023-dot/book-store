import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers
import CartProvider from './context/CartContext';
import AdminProvider, { AdminContext } from './context/AdminContext';
import ToastProvider from './context/ToastContext';

// Overlays
import ToastContainer from './components/ui/ToastContainer';

// Pages
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFound from './components/ui/NotFound';
import ScrollToTop from './components/layout/ScrollToTop';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import BooksManager from './pages/admin/BooksManager';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Coupons from './pages/admin/Coupons';
import Settings from './pages/admin/Settings';

// Admin Protected Route Wrapper
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = React.useContext(AdminContext);
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ToastProvider>
      <AdminProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col font-inter bg-[#FAFAF7] text-[#1A1A1A]">
            <ScrollToTop />
            <Routes>
              {/* Storefront Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<ListingPage />} />
              <Route path="/books/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="books" element={<BooksManager />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="coupons" element={<Coupons />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </div>
        </CartProvider>
      </AdminProvider>
    </ToastProvider>
  );
}
