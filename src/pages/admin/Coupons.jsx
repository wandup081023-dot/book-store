import React, { useState, useContext } from 'react';
import { Plus } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import { ToastContext } from '../../context/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function Coupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCoupon } = useContext(AdminContext);
  const { showToast } = useContext(ToastContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  
  const [formData, setFormData] = useState({
    code: "", discount: "", type: "percent", minOrder: "", expiry: ""
  });

  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData(coupon);
    } else {
      setEditingCoupon(null);
      setFormData({ code: "", discount: "", type: "percent", minOrder: "", expiry: "" });
    }
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon({ ...formData, id: editingCoupon.id });
      showToast("Coupon updated", "success");
    } else {
      addCoupon({ ...formData, active: true, usageCount: 0 });
      showToast("Coupon created", "success");
    }
    setModalOpen(false);
  };

  const columns = [
    { label: "Code", render: (row) => <span className="font-bold tracking-wider">{row.code}</span> },
    { label: "Discount", render: (row) => row.type === 'percent' ? `${row.discount}% OFF` : `₹${row.discount} OFF` },
    { label: "Min Order", render: (row) => `₹${row.minOrder}` },
    { label: "Usage", key: "usageCount" },
    { label: "Status", render: (row) => (
      <button 
        onClick={() => { toggleCoupon(row.id); showToast(`${row.code} status updated`, "info"); }}
        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${row.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
      >
        {row.active ? 'Active' : 'Inactive'}
      </button>
    )}
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-brand-navy">Coupons</h1>
          <p className="font-inter text-sm text-brand-muted mt-1">Manage discount codes</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Create Coupon
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={coupons} 
        searchable 
        onEdit={handleOpenModal} 
        onDelete={(row) => { deleteCoupon(row.id); showToast("Coupon deleted", "info"); }} 
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCoupon ? "Edit Coupon" : "Create Coupon"} size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Coupon Code</label>
            <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full border p-2 rounded uppercase" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Discount Value</label>
              <input type="number" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Discount Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border p-2 rounded">
                <option value="percent">Percentage</option>
                <option value="flat">Flat Amount</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Min Order (₹)</label>
              <input type="number" value={formData.minOrder} onChange={e => setFormData({...formData, minOrder: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Expiry Date</label>
              <input type="date" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Coupon</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
