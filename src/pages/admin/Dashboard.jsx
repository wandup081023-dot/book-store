import React, { useContext } from 'react';
import { BookOpen, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import StatsCard from '../../components/ui/StatsCard';

export default function Dashboard() {
  const { books, orders, customers } = useContext(AdminContext);

  const totalRevenue = orders.filter(o => o.status !== "Cancelled").reduce((sum, o) => sum + o.total, 0);

  const bestSellingBooks = [...books]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5); // Mock logic for best selling

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-brand-navy">Dashboard Overview</h1>
          <p className="font-inter text-sm text-brand-muted mt-1">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Books" value={books.length} icon={BookOpen} color="blue" />
        <StatsCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="green" />
        <StatsCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={TrendingUp} color="purple" />
        <StatsCard title="Total Customers" value={customers.length} icon={Users} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl font-bold text-brand-navy">Recent Orders</h2>
            <button className="text-brand-red text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter">
              <thead className="bg-gray-50 text-brand-muted text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-l-lg">Order ID</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right rounded-r-lg">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-bold text-brand-navy">{o.id}</td>
                    <td className="px-4 py-4 text-sm text-brand-text">{o.customerName}</td>
                    <td className="px-4 py-4 text-sm text-brand-muted">{o.date}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : o.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-brand-navy text-right">&#8377;{o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl font-bold text-brand-navy">Top Selling</h2>
          </div>
          <div className="space-y-6">
            {bestSellingBooks.map((book, idx) => (
              <div key={book.id} className="flex items-center gap-4">
                <span className="font-playfair text-xl font-bold text-brand-muted/40 w-6">{idx + 1}</span>
                <img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm flex-shrink-0" onError={(e) => { e.target.src = `https://picsum.photos/seed/${e.target.alt}/300/450` }} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-inter font-bold text-sm text-brand-navy truncate">{book.title}</h4>
                  <p className="font-inter text-xs text-brand-muted truncate mb-2">{book.author}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-brand-red h-1.5 rounded-full" style={{ width: `${Math.max(20, 100 - (idx * 15))}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
