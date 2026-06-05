import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Video, CreditCard, Smartphone } from 'lucide-react';

const FOOTER_COLS = [
  { heading: "Shop", links: ["Fiction", "Non-Fiction", "Children's Books", "Stationery", "Gift Cards"] },
  { heading: "Help", links: ["Track Order", "Returns & Refunds", "Shipping Info", "FAQs", "Contact Us"] },
  { heading: "About", links: ["Our Story", "Careers", "Blog", "Press", "Affiliates"] },
];

const SOCIAL_LINKS = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Video, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-playfair text-3xl font-bold text-white hover:text-brand-red transition-colors">
              Page<span className="text-brand-red">Turn</span>
            </Link>
            <p className="font-inter text-sm text-white/60 mt-4 leading-relaxed">
              Your neighbourhood bookstore, online. Curated reads for every mood, age, and occasion — delivered with love.
            </p>
            <div className="mt-6">
              <p className="font-inter text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Stay in the loop</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-white/10 border border-white/20 rounded-[4px] px-3 py-2 font-inter text-sm text-white placeholder-white/40 outline-none focus:border-brand-red transition-colors" />
                <button type="submit" className="bg-brand-red hover:bg-[#A93226] text-white font-inter font-semibold text-xs px-4 py-2 rounded-[4px] transition-colors flex-shrink-0">Go</button>
              </form>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-inter font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to="/books" className="font-inter text-sm text-white/55 hover:text-white hover:translate-x-0.5 inline-block transition-transform">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">Follow Us</p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center transition-all duration-200 hover:scale-110">
                <Icon size={16} className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#1f2c38]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} PageTurn Books Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {[
              { label: "Visa", bg: "bg-blue-600", icon: <CreditCard size={12} /> },
              { label: "Mastercard", bg: "bg-red-600", icon: <CreditCard size={12} /> },
              { label: "UPI", bg: "bg-green-600", icon: <Smartphone size={12} /> },
              { label: "Net Banking", bg: "bg-gray-600", icon: <CreditCard size={12} /> },
            ].map(({ label, bg, icon }) => (
              <div key={label} title={label} className={`${bg} text-white rounded-md px-2.5 py-1 flex items-center gap-1 font-inter text-[10px] font-bold`}>
                {icon} {label}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/admin" className="font-inter text-xs text-brand-red/60 hover:text-brand-red transition-colors">Admin ↗</Link>
            <Link to="/" className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/" className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
