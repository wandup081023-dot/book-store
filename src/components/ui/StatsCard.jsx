import React from 'react';

export default function StatsCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-brand-red',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="font-inter text-sm text-brand-muted font-medium">{title}</p>
        <p className="font-playfair text-2xl font-bold text-brand-navy">{value}</p>
      </div>
    </div>
  );
}
