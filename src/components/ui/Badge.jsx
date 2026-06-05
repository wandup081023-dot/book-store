import React from 'react';

export default function Badge({ type, children, value }) {
  if (type === 'sale') {
    return (
      <span className="bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
        {children || `₹${value} Off`}
      </span>
    );
  }

  if (type === 'status') {
    const status = children || value;
    const colors = {
      'Delivered': 'bg-green-100 text-green-700',
      'Processing': 'bg-yellow-100 text-yellow-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'Active': 'bg-green-100 text-green-700',
      'Inactive': 'bg-gray-100 text-gray-700'
    };
    const colorClass = colors[status] || 'bg-gray-100 text-gray-700';
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
        {status}
      </span>
    );
  }

  if (type === 'preorder') {
    return (
      <span className="bg-brand-navy text-white px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wider">
        Pre-Order
      </span>
    );
  }

  if (type === 'screen') {
    return (
      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wider">
        Now a Motion Picture
      </span>
    );
  }

  return (
    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wider">
      {children}
    </span>
  );
}
