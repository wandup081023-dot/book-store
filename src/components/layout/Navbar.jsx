import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

function MegaMenu({ visible }) {
  return (
    <div
      className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 transform origin-top ${
        visible ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
      }`}
    >
      <div className="max-w-8xl mx-auto px-8 py-10 flex gap-12">
        <div className="w-1/4">
          <h3 className="font-playfair text-xl font-bold text-brand-navy mb-4">Discover</h3>
          <p className="font-inter text-sm text-brand-muted leading-relaxed mb-6">
            Explore our curated collections across all genres. Find your next favorite story.
          </p>
          <Link to="/books" className="text-brand-red font-inter text-sm font-semibold hover:underline">
            Browse All Books &rarr;
          </Link>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-8">
          {[
            { title: "Fiction", links: ["Literary Fiction", "Sci-Fi & Fantasy", "Romance", "Thrillers"] },
            { title: "Non-Fiction", links: ["Biographies", "History", "Science", "Essays"] },
            { title: "Lifestyle", links: ["Business", "Self-Help", "Cookbooks", "Art & Design"] },
            { title: "Children & YA", links: ["Picture Books", "Middle Grade", "Young Adult", "Educational"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-inter text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to="/books" className="font-inter text-sm text-brand-muted hover:text-brand-red transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose, cartCount }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span className="font-playfair text-2xl font-bold text-brand-navy">
            Page<span className="text-brand-red">Turn</span>
          </span>
          <button onClick={onClose} className="p-2 -mr-2 text-brand-muted hover:text-brand-red transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col px-2 space-y-1">
            <Link to="/books" onClick={onClose} className="px-4 py-3 text-brand-text font-inter font-semibold rounded-xl hover:bg-gray-50 transition-colors">Books</Link>
            <Link to="/books" onClick={onClose} className="px-4 py-3 text-brand-text font-inter font-semibold rounded-xl hover:bg-gray-50 transition-colors">Stationery</Link>
            <Link to="/books" onClick={onClose} className="px-4 py-3 text-brand-text font-inter font-semibold rounded-xl hover:bg-gray-50 transition-colors">Gifts</Link>
            <Link to="/books" onClick={onClose} className="px-4 py-3 text-brand-red font-inter font-bold rounded-xl hover:bg-red-50 transition-colors">Sale</Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 font-inter text-sm text-brand-text transition-colors">
            <Heart size={18} /> Wishlist
          </button>
          <Link to="/cart" onClick={onClose} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 font-inter text-sm text-brand-text transition-colors">
            <ShoppingCart size={18} /> Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  return (
    <>
      <header
        className={`nav-slide sticky top-0 z-50 transition-all duration-300 ${
          scrolled || megaOpen ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-4 md:w-1/4">
              <button className="lg:hidden p-1 -ml-1 text-brand-navy hover:text-brand-red transition-colors" onClick={() => setMobileOpen(true)}>
                <Menu size={24} />
              </button>
              <Link to="/" className="logo-pulse font-playfair text-2xl sm:text-3xl font-bold text-brand-navy hover:opacity-80 transition-opacity">
                Page<span className="text-brand-red">Turn</span>
              </Link>
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center justify-center gap-8 flex-1 relative h-full">
              <div
                className="h-10 flex items-center"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link to="/books" className="nav-link-hover font-inter text-sm font-semibold text-brand-navy hover:text-brand-red transition-colors flex items-center gap-1 group">
                  Books
                  <ChevronDown size={14} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                </Link>
              </div>
              <Link to="/books" className="nav-link-hover font-inter text-sm font-semibold text-brand-navy hover:text-brand-red transition-colors">Stationery</Link>
              <Link to="/books" className="nav-link-hover font-inter text-sm font-semibold text-brand-navy hover:text-brand-red transition-colors">Gifts</Link>
              <Link to="/books" className="nav-link-hover font-inter text-sm font-bold text-brand-red hover:text-[#A93226] transition-colors">Sale</Link>
              
              {/* MegaMenu Bridge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                <MegaMenu visible={megaOpen} />
              </div>
            </nav>

            {/* Right: Icons */}
            <div className="flex items-center gap-1 ml-auto md:ml-0 flex-shrink-0 md:w-1/4 justify-end">
              <div className="relative flex items-center">
                <div className={`flex items-center overflow-hidden transition-all duration-300 bg-gray-50 rounded-full border ${searchOpen ? "w-44 sm:w-56 border-brand-red/40 shadow-sm" : "w-9 border-transparent"}`}>
                  <button className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-red transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
                    <Search size={18} />
                  </button>
                  <input ref={searchRef} type="search" placeholder="Search books…" className={`flex-1 bg-transparent font-inter text-sm text-brand-text placeholder-brand-muted outline-none pr-3 transition-all ${searchOpen ? "w-full opacity-100" : "w-0 opacity-0"}`} 
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchOpen(false);
                      if (e.key === "Enter") {
                        if (e.target.value.trim()) {
                          navigate(`/books?search=${encodeURIComponent(e.target.value.trim())}`);
                          setSearchOpen(false);
                          e.target.value = '';
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              <button className="icon-bounce relative p-2 rounded-full hover:bg-gray-100 transition-colors group" style={{ animationDelay: '0.3s' }}>
                <Heart size={20} className="text-brand-muted group-hover:text-brand-red transition-colors" />
              </button>

              <Link to="/cart" className="icon-bounce relative p-2 rounded-full hover:bg-gray-100 transition-colors group" style={{ animationDelay: '0.6s' }}>
                <ShoppingCart size={20} className="text-brand-muted group-hover:text-brand-red transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none px-1 shadow-sm">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} cartCount={cartCount} />
    </>
  );
}
