import React, { useState, useContext } from 'react';
import { Eye } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import { ToastContext } from '../../context/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

export default function Orders() {
  const { orders, updateOrderStatus } = useContext(AdminContext);
  const { showToast } = useContext(ToastContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
    showToast(`Order ${id} marked as ${newStatus}`, "success");
  };

  const columns = [
    { label: "Order ID", render: (row) => <span className="font-bold text-brand-navy">{row.id}</span> },
    { label: "Customer", key: "customerName" },
    { label: "Date", key: "date" },
    { label: "Total", render: (row) => <span className="font-bold">₹{row.total}</span> },
    { label: "Status", render: (row) => (
      <select 
        value={row.status} 
        onChange={(e) => handleStatusChange(row.id, e.target.value)}
        className="text-xs font-bold uppercase tracking-wider p-1 rounded border outline-none cursor-pointer bg-gray-50"
      >
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    )},
    { label: "View", render: (row) => (
      <button onClick={() => { setSelectedOrder(row); setModalOpen(true); }} className="text-gray-400 hover:text-brand-navy transition-colors">
        <Eye size={18} />
      </button>
    )}
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-brand-navy">Orders</h1>
          <p className="font-inter text-sm text-brand-muted mt-1">Manage customer orders and status</p>
        </div>
      </div>

      <DataTable columns={columns} data={orders} searchable />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Order Details - ${selectedOrder?.id}`}>
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Customer</p>
                <p className="font-bold">{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment Method</p>
                <p className="font-bold">{selectedOrder.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Shipping Address</p>
                <p>{selectedOrder.address.line1}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-bold mb-3">Items ({selectedOrder.items.length})</h4>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span>{item.qty}x {item.title}</span>
                  <span className="font-bold">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 text-right">
              <p className="text-gray-500 text-sm">Subtotal: ₹{selectedOrder.subtotal}</p>
              <p className="text-gray-500 text-sm">Discount: -₹{selectedOrder.discount}</p>
              <p className="text-gray-500 text-sm">Delivery: ₹{selectedOrder.delivery}</p>
              <p className="text-xl font-bold text-brand-navy mt-2">Total: ₹{selectedOrder.total}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
