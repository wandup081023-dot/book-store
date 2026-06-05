import React, { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

export default function Settings() {
  const { showToast } = useContext(ToastContext);

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Settings saved successfully", "success");
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-brand-navy">Settings</h1>
        <p className="font-inter text-sm text-brand-muted mt-1">Manage global store settings</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="font-inter text-xl font-bold text-brand-navy mb-6">Store Information</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Store Name</label>
                <input type="text" defaultValue="PageTurn" className="w-full border p-3 rounded-lg outline-none focus:border-brand-navy" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Support Email</label>
                <input type="email" defaultValue="support@pageturn.com" className="w-full border p-3 rounded-lg outline-none focus:border-brand-navy" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Store Address</label>
              <textarea defaultValue="123 Bookstore Avenue, Bangalore" className="w-full border p-3 rounded-lg outline-none focus:border-brand-navy" rows="2" required />
            </div>
            <div className="pt-2">
              <Button variant="primary" type="submit">Save Store Info</Button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="font-inter text-xl font-bold text-brand-navy mb-6">Delivery Settings</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Free Delivery Threshold (₹)</label>
                <input type="number" defaultValue="499" className="w-full border p-3 rounded-lg outline-none focus:border-brand-navy" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Standard Delivery Charge (₹)</label>
                <input type="number" defaultValue="49" className="w-full border p-3 rounded-lg outline-none focus:border-brand-navy" required />
              </div>
            </div>
            <div className="pt-2">
              <Button variant="primary" type="submit">Save Delivery Rules</Button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 border-l-4 border-l-brand-red">
          <h2 className="font-inter text-xl font-bold text-brand-navy mb-6">Admin Security</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full max-w-md border p-3 rounded-lg outline-none focus:border-brand-navy" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full max-w-md border p-3 rounded-lg outline-none focus:border-brand-navy" required />
            </div>
            <div className="pt-2">
              <Button variant="primary" type="submit">Change Password</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
