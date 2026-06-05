import React, { useState, useContext } from 'react';
import { Eye } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

export default function Customers() {
  const { customers } = useContext(AdminContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const colors = ["bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-purple-100 text-purple-700", "bg-yellow-100 text-yellow-700", "bg-red-100 text-red-700"];
  const getColor = (name) => colors[name.length % colors.length];

  const columns = [
    { label: "Customer", render: (row) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${getColor(row.name)}`}>
          {row.avatar}
        </div>
        <div>
          <p className="font-bold text-brand-navy">{row.name}</p>
          <p className="text-brand-muted text-xs">{row.email}</p>
        </div>
      </div>
    )},
    { label: "Joined", key: "joinedDate" },
    { label: "Orders", key: "totalOrders" },
    { label: "Total Spent", render: (row) => <span className="font-bold text-green-600">₹{row.totalSpent}</span> },
    { label: "View", render: (row) => (
      <button onClick={() => { setSelectedCustomer(row); setModalOpen(true); }} className="text-gray-400 hover:text-brand-navy transition-colors">
        <Eye size={18} />
      </button>
    )}
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-brand-navy">Customers</h1>
          <p className="font-inter text-sm text-brand-muted mt-1">View customer data and history</p>
        </div>
      </div>

      <DataTable columns={columns} data={customers} searchable />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Customer Profile" size="sm">
        {selectedCustomer && (
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center font-bold text-2xl mb-4 ${getColor(selectedCustomer.name)}`}>
              {selectedCustomer.avatar}
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-1">{selectedCustomer.name}</h2>
            <p className="text-gray-500 mb-6">{selectedCustomer.email} • {selectedCustomer.phone}</p>
            
            <div className="grid grid-cols-2 gap-4 text-center border-t border-gray-100 pt-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                <p className="text-xl font-bold">{selectedCustomer.totalOrders}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Lifetime Value</p>
                <p className="text-xl font-bold text-green-600">₹{selectedCustomer.totalSpent}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
