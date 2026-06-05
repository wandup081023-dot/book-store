import React, { useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastContext } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts } = useContext(ToastContext);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl min-w-[300px] border transform transition-all duration-300 ${
            toast.exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          } ${
            toast.type === "success" ? "bg-white border-green-100 text-green-800" :
            toast.type === "error" ? "bg-white border-red-100 text-red-800" :
            "bg-brand-navy text-white border-brand-navy"
          }`}
        >
          {toast.type === "success" && <CheckCircle size={20} className="text-green-500" />}
          {toast.type === "error" && <AlertCircle size={20} className="text-red-500" />}
          {toast.type === "info" && <Info size={20} className="text-blue-400" />}
          
          <p className="font-inter text-sm font-medium flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
