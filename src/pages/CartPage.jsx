import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, ShieldCheck, CreditCard, Clock } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import COUPONS from '../data/coupons';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, cartCount } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    const found = COUPONS.find(c => c.code === couponCode && c.active);
    if (!found) {
      showToast("Invalid or expired coupon code.", "error");
      return;
    }
    if (cart.total < found.minOrder) {
      showToast(`Minimum order amount for this coupon is ₹${found.minOrder}`, "error");
      return;
    }
    setAppliedCoupon(found);
    showToast("Coupon applied successfully!", "success");
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.", "info");
  };

  const deliveryCharge = cart.total > 499 || cart.total === 0 ? 0 : 49;
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (cart.total * appliedCoupon.discount) / 100;
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }
  const grandTotal = cart.total - discountAmount + deliveryCharge;

  const safeItems = cart?.items || [];

  return (
    <>
      <Navbar />
      <main className="bg-surface flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="font-playfair text-4xl font-bold text-brand-navy mb-8">Your Bag ({cartCount} items)</h1>

          {safeItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-10">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
                <Tag size={40} />
              </div>
              <h2 className="font-playfair text-3xl font-bold text-brand-navy mb-4">Your bag is empty</h2>
              <p className="font-inter text-brand-muted mb-8 max-w-sm mx-auto">Looks like you haven't added any books to your bag yet. Let's fix that!</p>
              <Button variant="primary" size="lg" onClick={() => navigate('/books')}>Start Shopping</Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Column - Items */}
              <div className="w-full lg:w-[65%]">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {safeItems.map(item => (
                    <div key={item.id} className="p-6 border-b border-gray-100 last:border-0 flex gap-6 relative group">
                      <div className="w-24 aspect-[2/3] bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => navigate(`/books/${item.id}`)}>
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = `https://picsum.photos/seed/${e.target.alt}/300/450` }} />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start pr-10">
                          <div>
                            <h3 className="font-playfair text-xl font-bold text-brand-navy mb-1 cursor-pointer hover:text-brand-red transition-colors" onClick={() => navigate(`/books/${item.id}`)}>{item.title}</h3>
                            <p className="font-inter text-sm text-brand-muted mb-2">Format: {item.format}</p>
                          </div>
                          <span className="font-inter font-bold text-lg text-brand-navy">&#8377;{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-navy"><Minus size={14} /></button>
                            <span className="w-10 text-center font-inter font-semibold text-sm">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-navy"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors absolute top-4 right-4 sm:static flex items-center gap-2 font-inter text-sm font-medium">
                            <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="w-full lg:w-[35%]">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                  <h2 className="font-playfair text-2xl font-bold text-brand-navy mb-6">Order Summary</h2>
                  
                  {/* Coupon Input */}
                  {!appliedCoupon ? (
                    <div className="flex gap-2 mb-8">
                      <div className="relative flex-1">
                        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Coupon code" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl font-inter text-sm outline-none focus:border-brand-red uppercase"
                        />
                      </div>
                      <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Tag size={14} /></div>
                        <div>
                          <p className="font-inter font-bold text-sm text-green-800">{appliedCoupon.code}</p>
                          <p className="font-inter text-xs text-green-600">Coupon applied successfully</p>
                        </div>
                      </div>
                      <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  )}

                  <div className="space-y-4 mb-6 font-inter text-sm">
                    <div className="flex justify-between text-brand-text">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="font-semibold">&#8377;{cart.total.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#2E7D32]">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span className="font-semibold">-&#8377;{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-text">
                      <span>Delivery charges</span>
                      {deliveryCharge === 0 ? (
                        <span className="font-semibold text-[#2E7D32]">Free</span>
                      ) : (
                        <span className="font-semibold">&#8377;{deliveryCharge}</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-6 mb-8">
                    <div className="flex justify-between items-end">
                      <span className="font-inter font-bold text-brand-navy text-lg">Total Amount</span>
                      <span className="font-playfair font-bold text-3xl text-brand-red">&#8377;{grandTotal.toLocaleString()}</span>
                    </div>
                    {deliveryCharge > 0 && (
                      <p className="font-inter text-xs text-brand-muted text-right mt-2">Add ₹{500 - cart.total} more for free delivery</p>
                    )}
                  </div>

                  <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </Button>

                  <div className="mt-8 flex justify-center gap-6 opacity-50 grayscale">
                    <ShieldCheck size={24} />
                    <CreditCard size={24} />
                    <Clock size={24} />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
