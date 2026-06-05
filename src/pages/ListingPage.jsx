import React, { useState, useMemo, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Filter, ChevronDown, X } from 'lucide-react';
import BOOKS from '../data/books';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookCard from '../components/ui/BookCard';
import Button from '../components/ui/Button';

const GENRES = ["All Books", "Fiction", "Non-Fiction", "Business", "Self-Help", "Sci-Fi", "Thriller", "Romance", "Mythology"];

export default function ListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  console.log("books received:", BOOKS);

  const initialGenre = searchParams.get('genre') || "All Books";
  const [activeGenre, setActiveGenre] = useState(initialGenre);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Filters
  const [priceRange, setPriceRange] = useState(2000);
  const [format, setFormat] = useState("All");
  const [rating, setRating] = useState(false); // 4+ only

  // Sync genre from URL
  React.useEffect(() => {
    if (searchParams.get('genre')) {
      setActiveGenre(searchParams.get('genre'));
    }
  }, [searchParams]);

  const filteredBooks = useMemo(() => {
    if (!BOOKS || !Array.isArray(BOOKS)) return [];
    let result = [...BOOKS];
    if (activeGenre !== "All Books") {
      result = result.filter(b => b.genre === activeGenre);
    }
    result = result.filter(b => b?.price <= priceRange);
    if (format !== "All") {
      result = result.filter(b => Array.isArray(b?.format) ? b.format.includes(format) : b?.format === format);
    }
    if (rating) {
      result = result.filter(b => b?.rating >= 4.0);
    }

    if (sortOption === "Price: Low to High") result.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortOption === "Price: High to Low") result.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortOption === "Newest") result.sort((a, b) => (b.id || 0) - (a.id || 0)); // Mock logic
    
    return result;
  }, [activeGenre, priceRange, format, rating, sortOption]);

  const handleAddToCart = (book) => {
    addToCart(book);
    showToast(`Added ${book.title} to your bag!`, 'success');
  };

  const handleGenreSelect = (genre) => {
    setActiveGenre(genre);
    setSearchParams({ genre });
    setMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setActiveGenre("All Books");
    setSearchParams({});
    setPriceRange(2000);
    setFormat("All");
    setRating(false);
    setSortOption("Relevance");
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-inter font-bold text-sm uppercase tracking-wider text-brand-navy mb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          {GENRES.map(g => (
            <label key={g} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="genre" checked={activeGenre === g} onChange={() => handleGenreSelect(g)} className="hidden" />
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${activeGenre === g ? 'bg-brand-red border-brand-red' : 'border-gray-300 group-hover:border-brand-red'}`}>
                {activeGenre === g && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className={`font-inter text-sm ${activeGenre === g ? 'font-bold text-brand-red' : 'text-brand-muted group-hover:text-brand-navy'}`}>{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-inter font-bold text-sm uppercase tracking-wider text-brand-navy mb-4">Max Price (₹{priceRange})</h3>
        <input type="range" min="0" max="2000" step="50" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-brand-red" />
        <div className="flex justify-between font-inter text-xs text-brand-muted mt-2">
          <span>₹0</span><span>₹2000</span>
        </div>
      </div>

      <div>
        <h3 className="font-inter font-bold text-sm uppercase tracking-wider text-brand-navy mb-4">Format</h3>
        <div className="flex flex-col gap-2">
          {["All", "Paperback", "Hardcover"].map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="format" checked={format === f} onChange={() => setFormat(f)} className="hidden" />
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${format === f ? 'bg-brand-navy border-brand-navy' : 'border-gray-300 group-hover:border-brand-navy'}`}>
                {format === f && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className={`font-inter text-sm ${format === f ? 'font-bold text-brand-navy' : 'text-brand-muted group-hover:text-brand-navy'}`}>{f}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-inter font-bold text-sm uppercase tracking-wider text-brand-navy mb-4">Rating</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" checked={rating} onChange={() => setRating(!rating)} className="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red cursor-pointer" />
          <span className="font-inter text-sm text-brand-muted group-hover:text-brand-navy">4 Stars & Above</span>
        </label>
      </div>

      <button onClick={clearFilters} className="font-inter text-sm font-semibold text-brand-red underline hover:text-[#A93226]">
        Clear All Filters
      </button>
    </div>
  );

  try {
    if (!BOOKS || BOOKS.length === 0) return <p>No books found</p>;

    return (
      <>
        <Navbar />
        <main className="flex-1 bg-surface py-8 min-h-screen">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 font-inter text-xs text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">{activeGenre}</span>
          </div>

          <div className="flex items-end justify-between border-b border-gray-200 pb-6 mb-8">
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-navy mb-2">{activeGenre}</h1>
              <p className="font-inter text-sm text-brand-muted">{filteredBooks.length} results</p>
            </div>
            
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center gap-3 relative">
              <span className="font-inter text-sm font-semibold text-brand-navy">Sort by:</span>
              <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-8 bg-white border border-gray-200 px-4 py-2 rounded-lg font-inter text-sm text-brand-text hover:border-brand-red transition-colors min-w-[200px] justify-between">
                {sortOption} <ChevronDown size={16} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-20 py-2">
                  {["Relevance", "Newest", "Price: Low to High", "Price: High to Low"].map(opt => (
                    <button key={opt} onClick={() => { setSortOption(opt); setSortOpen(false); }} className={`w-full text-left px-4 py-2 font-inter text-sm hover:bg-red-50 hover:text-brand-red transition-colors ${sortOption === opt ? 'font-bold text-brand-red bg-red-50' : 'text-brand-text'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg font-inter text-sm font-semibold text-brand-navy" onClick={() => setMobileFilterOpen(true)}>
              <Filter size={16} /> Filters
            </button>
          </div>

          <div className="flex gap-10 relative">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar pr-4 pb-12">
              <FilterContent />
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredBooks?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                    {filteredBooks?.map(book => (
                      <div key={book.id} className="cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>
                         <BookCard book={book} onAddToCart={handleAddToCart} onWishlist={() => showToast(`Added ${book.title} to wishlist`, 'info')} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-16 text-center">
                    <Button variant="outline" size="lg">Load More Books</Button>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                  <h3 className="font-playfair text-2xl font-bold text-brand-navy mb-3">No books found</h3>
                  <p className="font-inter text-brand-muted mb-6">Try adjusting your filters or browsing a different category.</p>
                  <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="bg-white w-full rounded-t-3xl p-6 relative max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-playfair text-2xl font-bold text-brand-navy">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full text-brand-navy"><X size={20} /></button>
            </div>
            <FilterContent />
            <div className="mt-8 pt-4 border-t border-gray-100 sticky bottom-0 bg-white">
              <Button variant="primary" fullWidth size="lg" onClick={() => setMobileFilterOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  } catch (error) {
    console.error("ListingPage Crash:", error);
    return <div className="p-10 text-center"><h1 className="text-2xl font-bold text-red-500">Something went wrong while loading books.</h1></div>;
  }
}
