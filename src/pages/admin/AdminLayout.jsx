import React, { useState, useContext } from 'react';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ShoppingBag, Users, Tag, Settings, LogOut, Menu, X } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useContext(AdminContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const TABS = [
    { id: "dashboard", path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { id: "books", path: "/admin/books", label: "Books", icon: BookOpen },
    { id: "orders", path: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { id: "customers", path: "/admin/customers", label: "Customers", icon: Users },
    { id: "coupons", path: "/admin/coupons", label: "Coupons", icon: Tag },
    { id: "settings", path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#F4F5F7] overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static top-0 left-0 h-full w-[240px] bg-brand-navy z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 flex items-center gap-2">
          <span className="font-playfair font-bold text-2xl text-white">PageTurn</span>
          <span className="bg-brand-red text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">Admin</span>
          <button className="ml-auto lg:hidden text-gray-300" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {TABS.map(tab => (
            <NavLink 
              key={tab.id} 
              to={tab.path}
              end={tab.id === 'dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm transition-colors relative ${isActive ? "bg-white text-brand-navy font-bold shadow-sm" : "text-gray-300 hover:bg-white/10"}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute left-4 w-1 h-6 bg-brand-red rounded-full" />}
                  <tab.icon size={18} className={isActive ? "text-brand-red" : ""} />
                  {tab.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-sm">A</div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-inter text-sm font-semibold text-white truncate">Admin User</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="lg:hidden bg-white h-16 border-b border-gray-100 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="font-playfair font-bold text-xl text-brand-navy">PageTurn</span>
            <span className="bg-brand-red text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-brand-navy"><Menu size={24} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
