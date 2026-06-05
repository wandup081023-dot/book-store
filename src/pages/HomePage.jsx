import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, RefreshCw, Headphones, ArrowRight, Play } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import BOOKS from '../data/books';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/layout/SectionHeader';
import BookCard from '../components/ui/BookCard';
import Button from '../components/ui/Button';

// ── INTERNAL COMPONENTS ──

const heroBooks = [
  { title: "Atomic Habits", author: "James Clear", 
    img: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg" },
  { title: "The Silent Patient", author: "Alex Michaelides",
    img: "https://images-na.ssl-images-amazon.com/images/I/91lslnZ-btL.jpg" },
  { title: "Ikigai", author: "Hector Garcia",
    img: "https://images-na.ssl-images-amazon.com/images/I/71oEbqXVYAL.jpg" },
  { title: "Verity", author: "Colleen Hoover",
    img: "https://images-na.ssl-images-amazon.com/images/I/91zqaLfGPBL.jpg" },
  { title: "Dune", author: "Frank Herbert",
    img: "https://images-na.ssl-images-amazon.com/images/I/A1u+2fY5yTL.jpg" },
  { title: "The Midnight Library", author: "Matt Haig",
    img: "https://images-na.ssl-images-amazon.com/images/I/81J6APjwxlL.jpg" }
];

function HeroBanner() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [animClass, setAnimClass] = React.useState('book-slide-in');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimClass('book-slide-out');
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % heroBooks.length);
        setAnimClass('book-slide-in');
      }, 400);
    }, 3000);  // change every 3 seconds, not 1 second — feels more premium
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#EAE6DF] relative overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 px-6 sm:px-12 py-16 md:py-24 flex flex-col justify-center z-10">
        <span className="font-inter text-brand-red font-bold tracking-widest text-sm uppercase mb-4 animate-fade-in">Bestseller Edition</span>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-brand-navy leading-tight mb-6 animate-slide-up">
          Stories That <br className="hidden md:block" /> Stay With You
        </h1>
        <p className="font-inter text-brand-muted text-lg md:text-xl mb-10 max-w-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Discover curated reads from award-winning authors. Find your next favorite book today.
        </p>
        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/books')}>Shop Bestsellers</Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/books')}>Browse All Books</Button>
        </div>
         </div>
      <div className="flex-1 relative min-h-[400px] md:min-h-0 bg-[#2C3E50] overflow-hidden group">
        <img
          key={currentIndex}
          src={heroBooks[currentIndex].img}
          alt={heroBooks[currentIndex].title}
          className={`w-full h-full object-cover absolute inset-0 ${animClass}`}
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${currentIndex}/1000/1000` }}
        />
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Text and indicators overlaid at bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center">
          <div className="text-center text-white mb-4 drop-shadow-md">
            <h3 className="font-playfair text-3xl font-bold mb-1 shadow-sm">{heroBooks[currentIndex].title}</h3>
            <p className="font-inter text-base opacity-90">{heroBooks[currentIndex].author}</p>
          </div>
          
          <div className="flex gap-3 justify-center">
            {heroBooks.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 h-2.5 bg-brand-red' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const features = [
    { icon: <Truck size={24} />, title: "Free Shipping", sub: "On orders above ₹499" },
    { icon: <ShieldCheck size={24} />, title: "Secure Payments", sub: "100% safe checkout" },
    { icon: <RefreshCw size={24} />, title: "Easy Returns", sub: "7-day return policy" },
    { icon: <Headphones size={24} />, title: "24/7 Support", sub: "Dedicated help desk" },
  ];
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-brand-red flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="font-inter font-bold text-sm text-brand-navy">{f.title}</h4>
                <p className="font-inter text-xs text-brand-muted">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTiles() {
  const navigate = useNavigate();
  const genres = [
    { name: "Fiction", color: "bg-[#FDF2F8]", icon: "bg-[#FBCFE8]" },
    { name: "Non-Fiction", color: "bg-[#F0FDF4]", icon: "bg-[#BBF7D0]" },
    { name: "Business", color: "bg-[#EFF6FF]", icon: "bg-[#BFDBFE]" },
    { name: "Children's", color: "bg-[#FFFBEB]", icon: "bg-[#FDE68A]" },
    { name: "Young Adult", color: "bg-[#FAF5FF]", icon: "bg-[#E9D5FF]" },
    { name: "Manga", color: "bg-[#FEF2F2]", icon: "bg-[#FECACA]" },
    { name: "Classics", color: "bg-[#F8FAFC]", icon: "bg-[#E2E8F0]" },
    { name: "Self-Help", color: "bg-[#ECFEFF]", icon: "bg-[#A5F3FC]" },
  ];
  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4">
        {genres.map((g) => (
          <button 
            key={g.name} 
            onClick={() => navigate(`/books?genre=${g.name}`)}
            className={`flex-shrink-0 w-32 h-32 rounded-2xl ${g.color} flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md`}
          >
            <div className={`w-12 h-12 rounded-full ${g.icon} flex items-center justify-center shadow-inner`} />
            <span className="font-inter font-semibold text-sm text-brand-navy">{g.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function QuoteMarquee() {
  return (
    <section className="bg-brand-navy py-12 overflow-hidden border-y-4 border-brand-red relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="flex whitespace-nowrap animate-marquee-slow items-center font-playfair italic text-2xl md:text-3xl text-white/90">
        <span>"A reader lives a thousand lives before he dies." — George R.R. Martin &emsp;★&emsp; </span>
        <span>"Books are a uniquely portable magic." — Stephen King &emsp;★&emsp; </span>
        <span>"So many books, so little time." — Frank Zappa &emsp;★&emsp; </span>
        <span>"There is no friend as loyal as a book." — Ernest Hemingway &emsp;★&emsp; </span>
        <span>"A reader lives a thousand lives before he dies." — George R.R. Martin &emsp;★&emsp; </span>
        <span>"Books are a uniquely portable magic." — Stephen King &emsp;★&emsp; </span>
      </div>
    </section>
  );
}

function NewsletterSignup() {
  return (
    <section className="py-24 bg-[#EAE6DF] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-navy mb-4">Join the PageTurn Family</h2>
        <p className="font-inter text-brand-muted text-lg mb-10 max-w-2xl mx-auto">
          Subscribe to get updates on new releases, exclusive discounts, and hand-picked reading recommendations.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" className="flex-1 px-6 py-4 rounded-full font-inter outline-none shadow-sm focus:shadow-md focus:ring-2 focus:ring-brand-red border border-transparent transition-all" required />
          <Button variant="primary" size="lg" className="rounded-full px-8">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}

// ── MAIN HOMEPAGE ──

export default function HomePage() {
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleAddToCart = (book) => {
    addToCart(book);
    showToast(`Added ${book.title} to your bag!`, 'success');
  };

  const handleWishlist = (book) => {
    showToast(`Added ${book.title} to wishlist!`, 'info');
  };

  const bestSellers = BOOKS.filter(b => b.isBestSeller);
  const preOrders = BOOKS.filter(b => b.isPreOrder);
  const bookToScreen = BOOKS.filter(b => b.isBookToScreen);

  const Carousel = ({ books, title, subtitle, link }) => {
    const scrollRef = useRef(null);
    const scroll = (dir) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
      }
    };

    return (
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader title={title} subtitle={subtitle} viewAllLink={link} />
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors"><ChevronLeft size={20} /></button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {books.map(book => (
            <div key={book.id} className="w-[280px] flex-shrink-0 cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>
              <BookCard book={book} onAddToCart={handleAddToCart} onWishlist={handleWishlist} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroBanner />
        <TrustBar />
        <CategoryTiles />
        
        <div id="bestsellers">
          <Carousel books={bestSellers} title="Best Sellers" subtitle="Read what millions have loved" link="/books" />
        </div>
        
        <QuoteMarquee />
        
        <div className="bg-brand-navy/5 pt-10">
          <Carousel books={preOrders} title="Highly Anticipated Pre-Orders" subtitle="Reserve your copy before they hit the shelves" link="/books" />
        </div>

        <Carousel books={bookToScreen} title="Book to Screen" subtitle="Read it before you watch it" link="/books" />
        
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}
