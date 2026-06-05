import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-brand-navy mb-2">PageTurn Admin</h1>
          <p className="font-inter text-sm text-brand-muted">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-inter p-3 rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red transition-colors"
              placeholder="admin@pageturn.com"
              required
            />
          </div>
          
          <div>
            <label className="block font-inter text-sm font-semibold text-brand-navy mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter outline-none focus:border-brand-red transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg">
            Login to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
