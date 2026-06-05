import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Banknote, Smartphone, ShieldCheck, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart, cartCount } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", pincode: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (step === 3 && cartCount > 0) {
      setOrderId(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
      clearCart();
    }
  }, [step, cartCount, clearCart]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const required = ['firstName', 'email', 'phone', 'address1', 'city', 'state', 'pincode'];
    for (let field of required) {
      if (!formData[field]) {
        showToast("Please fill in all required fields.", "error");
        return;
      }
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      showToast("Please select a payment method.", "error");
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const grandTotal = cart.total > 499 ? cart.total : cart.total + 49;

  return (
    <>
      <Navbar />
      <main className="bg-surface flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Bar */}
          <div className="mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-red rounded-full transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
            
            <div className="relative flex justify-between">
              {[
                { num: 1, label: "Delivery" },
                { num: 2, label: "Payment" },
                { num: 3, label: "Confirmation" }
              ].map(s => (
                <div key={s.num} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-inter font-bold text-sm border-2 bg-white transition-colors duration-300 z-10 ${
                    step > s.num ? 'border-brand-red text-brand-red' :
                    step === s.num ? 'border-brand-red bg-brand-red text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {step > s.num ? <Check size={20} /> : s.num}
                  </div>
                  <span className={`mt-2 font-inter text-xs sm:text-sm font-semibold transition-colors duration-300 ${step >= s.num ? 'text-brand-navy' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
            
            {/* Step 1: Delivery */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-playfair text-3xl font-bold text-brand-navy mb-8">Delivery Details</h2>
                <form onSubmit={handleDeliverySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-inter font-bold text-lg text-brand-navy mb-6">Shipping Address</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Address Line 1 *</label>
                        <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" placeholder="House no, Building, Street" />
                      </div>
                      <div>
                        <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Address Line 2</label>
                        <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" placeholder="Locality, Area" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">City *</label>
                          <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" />
                        </div>
                        <div>
                          <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">State *</label>
                          <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" />
                        </div>
                        <div>
                          <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Pincode *</label>
                          <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red" maxLength={6} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <Button type="submit" variant="primary" size="lg">Save & Continue</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <h2 className="font-playfair text-3xl font-bold text-brand-navy">Payment Method</h2>
                  <div className="text-right">
                    <p className="font-inter text-sm text-brand-muted mb-1">Amount to Pay</p>
                    <p className="font-playfair text-3xl font-bold text-brand-red">&#8377;{grandTotal}</p>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  {[
                    { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: <Smartphone size={24} /> },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: <CreditCard size={24} /> },
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: <Banknote size={24} /> },
                  ].map((method) => (
                    <label key={method.id} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-brand-navy bg-gray-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === method.id ? 'border-brand-navy' : 'border-gray-300'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-navy" />}
                      </div>
                      <input type="radio" name="payment" className="hidden" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-inter font-bold text-brand-navy">{method.label}</h4>
                          <div className={`text-gray-400 ${paymentMethod === method.id ? 'text-brand-navy' : ''}`}>{method.icon}</div>
                        </div>
                        <p className="font-inter text-sm text-brand-muted mt-1">{method.desc}</p>
                        
                        {/* Expandable Content based on selection */}
                        {paymentMethod === "upi" && method.id === "upi" && (
                          <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
                            <input type="text" placeholder="Enter UPI ID (e.g., name@okbank)" className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-navy bg-white" />
                          </div>
                        )}
                        {paymentMethod === "card" && method.id === "card" && (
                          <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up space-y-4">
                            <input type="text" placeholder="Card Number" maxLength={19} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-navy bg-white" />
                            <div className="flex gap-4">
                              <input type="text" placeholder="MM/YY" maxLength={5} className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-navy bg-white" />
                              <input type="password" placeholder="CVV" maxLength={3} className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-navy bg-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}

                  <div className="flex items-center justify-center gap-2 mt-8 text-green-600 bg-green-50 py-3 rounded-xl">
                    <ShieldCheck size={20} />
                    <span className="font-inter text-sm font-semibold">100% Secure Encrypted Payment</span>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(1)} className="font-inter text-sm font-semibold text-brand-muted hover:text-brand-navy">
                      &larr; Back to Delivery
                    </button>
                    <Button type="submit" variant="primary" size="lg">Pay &#8377;{grandTotal}</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center py-10 animate-fade-in">
                {/* CSS Checkmark Animation */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                  <div className="relative w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                </div>

                <h2 className="font-playfair text-4xl font-bold text-brand-navy mb-4">Order Confirmed!</h2>
                <p className="font-inter text-lg text-brand-muted mb-8 max-w-md mx-auto">
                  Thank you for shopping with PageTurn. Your order has been placed successfully.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 inline-block mb-10 text-left border border-gray-100">
                  <p className="font-inter text-sm text-brand-muted mb-2">Order Reference Number</p>
                  <p className="font-inter text-xl font-bold text-brand-navy tracking-wider">{orderId}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" size="lg" onClick={() => navigate('/')}>Continue Shopping</Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
