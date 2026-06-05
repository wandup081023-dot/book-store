import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2, ShieldCheck, Clock, Check, ChevronDown, Truck } from 'lucide-react';
import BOOKS from '../data/books';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import BookCard from '../components/ui/BookCard';
import NotFound from '../components/ui/NotFound';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const book = BOOKS.find(b => b.id.toString() === id);
  
  const [qty, setQty] = useState(1);
  const [format, setFormat] = useState("Paperback");
  const [pincode, setPincode] = useState("");
  const [pinChecked, setPinChecked] = useState(false);
  const [accordion, setAccordion] = useState({ desc: true, details: false });

  if (!book) return <NotFound />;

  const discount = book.mrp - book.price;
  const discountPercent = Math.round((discount / book.mrp) * 100);

  const handleAddToCart = () => {
    // Add multiple qty
    for(let i=0; i<qty; i++) addToCart({ ...book, format });
    showToast(`Added ${qty}x ${book.title} to bag!`, 'success');
  };

  return (
    <>
      <Navbar />
      <main className="bg-white flex-1 pb-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="flex items-center gap-2 font-inter text-xs text-brand-muted mb-8">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <Link to={`/books?genre=${book.genre}`} className="hover:text-brand-red">{book.genre}</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold truncate max-w-[200px]">{book.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            {/* Left Column - Images */}
            <div className="w-full lg:w-[40%] flex flex-col gap-4">
              <div className="aspect-[2/3] w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 origin-center" onError={(e) => { e.target.src = `https://picsum.photos/seed/${e.target.alt}/300/450` }} />
                {book.isPreOrder && (
                  <div className="absolute top-4 left-4">
                    <Badge type="preorder" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-[2/3] rounded-xl overflow-hidden border-2 border-transparent hover:border-brand-red cursor-pointer transition-colors bg-gray-50">
                    <img src={book.cover} alt={`${book.title} view ${i}`} className="w-full h-full object-cover" onError={(e) => { e.target.src = `https://picsum.photos/seed/${e.target.alt}/300/450` }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="w-full lg:w-[60%] flex flex-col">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-navy leading-tight mb-2">{book.title}</h1>
              <p className="font-inter text-lg text-brand-red font-semibold mb-6 hover:underline cursor-pointer inline-flex w-max">{book.author}</p>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex text-[#F5B041]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(book.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="font-inter text-sm font-semibold text-brand-navy">{book.rating}</span>
                <span className="font-inter text-sm text-brand-muted">({book.reviews} reviews)</span>
              </div>

              <div className="flex items-end gap-4 mb-8">
                <span className="font-inter text-4xl font-bold text-brand-navy">&#8377;{book.price}</span>
                {discount > 0 && (
                  <>
                    <span className="font-inter text-lg text-brand-muted line-through mb-1">&#8377;{book.mrp}</span>
                    <span className="font-inter text-sm font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded mb-1">Save &#8377;{discount} ({discountPercent}%)</span>
                  </>
                )}
              </div>

              <div className="mb-8">
                <p className="font-inter text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">Format</p>
                <div className="flex gap-3">
                  {(Array.isArray(book.format) ? book.format : ["Paperback"]).map(f => (
                    <button 
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`px-6 py-3 rounded-xl font-inter text-sm font-semibold border-2 transition-all ${format === f ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-200 text-brand-text hover:border-gray-300 bg-white'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-brand-navy hover:bg-white rounded-lg transition-colors"><Minus size={16} /></button>
                  <span className="w-12 text-center font-inter font-bold text-brand-navy">{qty}</span>
                  <button onClick={() => setQty(Math.min(book.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center text-brand-navy hover:bg-white rounded-lg transition-colors"><Plus size={16} /></button>
                </div>
                <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart}>Add to Bag</Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>Buy Now</Button>
              </div>

              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
                <button onClick={() => showToast('Added to Wishlist', 'info')} className="flex items-center gap-2 font-inter text-sm font-semibold text-brand-muted hover:text-brand-red transition-colors">
                  <Heart size={18} /> Add to Wishlist
                </button>
                <button className="flex items-center gap-2 font-inter text-sm font-semibold text-brand-muted hover:text-brand-navy transition-colors">
                  <Share2 size={18} /> Share
                </button>
              </div>

              {/* Delivery Check */}
              <div className="bg-[#FAFAF7] rounded-2xl p-6 border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="text-brand-red" size={20} />
                  <h3 className="font-inter font-bold text-brand-navy">Delivery Options</h3>
                </div>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter Pincode" 
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value); setPinChecked(false); }}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 font-inter text-sm outline-none focus:border-brand-red"
                    maxLength={6}
                  />
                  <Button variant="outline" onClick={() => setPinChecked(true)}>Check</Button>
                </div>
                {pinChecked && pincode.length === 6 && (
                  <div className="mt-4 flex items-start gap-2 text-[#2E7D32] bg-[#E8F5E9] p-3 rounded-lg">
                    <Check size={16} className="mt-0.5 flex-shrink-0" />
                    <p className="font-inter text-sm">Delivery available! Estimated arrival: <strong>2–4 business days</strong>.</p>
                  </div>
                )}
              </div>

              {/* Accordions */}
              <div className="border-t border-gray-100">
                <div className="border-b border-gray-100">
                  <button className="w-full py-5 flex items-center justify-between" onClick={() => setAccordion({ ...accordion, desc: !accordion.desc })}>
                    <span className="font-playfair font-bold text-xl text-brand-navy">Description</span>
                    <ChevronDown className={`transition-transform duration-300 ${accordion.desc ? 'rotate-180' : ''}`} />
                  </button>
                  {accordion.desc && (
                    <div className="pb-6 font-inter text-brand-muted text-sm leading-relaxed prose prose-sm max-w-none">
                      <p>{book.description}</p>
                      <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                  )}
                </div>
                <div className="border-b border-gray-100">
                  <button className="w-full py-5 flex items-center justify-between" onClick={() => setAccordion({ ...accordion, details: !accordion.details })}>
                    <span className="font-playfair font-bold text-xl text-brand-navy">Book Details</span>
                    <ChevronDown className={`transition-transform duration-300 ${accordion.details ? 'rotate-180' : ''}`} />
                  </button>
                  {accordion.details && (
                    <div className="pb-6">
                      <div className="grid grid-cols-2 gap-y-4 font-inter text-sm">
                        <div><span className="text-gray-400 block mb-1">Publisher</span><strong className="text-brand-navy">Penguin Random House</strong></div>
                        <div><span className="text-gray-400 block mb-1">Language</span><strong className="text-brand-navy">English</strong></div>
                        <div><span className="text-gray-400 block mb-1">Pages</span><strong className="text-brand-navy">352</strong></div>
                        <div><span className="text-gray-400 block mb-1">ISBN-13</span><strong className="text-brand-navy">978-0123456789</strong></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
          
          {/* Below Fold Carousels */}
          <div className="mt-24 pt-16 border-t border-gray-100">
            <h2 className="font-playfair text-3xl font-bold text-brand-navy mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {BOOKS.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4).map(b => (
                <div key={b.id} onClick={() => navigate(`/books/${b.id}`)} className="cursor-pointer">
                  <BookCard book={b} onAddToCart={(book) => { addToCart(book); showToast("Added to bag", "success"); }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
