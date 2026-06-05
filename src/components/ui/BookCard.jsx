import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

export default function BookCard({ book, onAddToCart, onWishlist }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discount = book.mrp - book.price;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onWishlist) onWishlist(book);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart(book);
  };

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2 pointer-events-none">
        {book.isPreOrder && <Badge type="preorder" />}
        {book.isBookToScreen && <Badge type="screen" />}
      </div>

      <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center hover:bg-brand-red transition-colors group/heart"
      >
        <Heart size={16} className={`transition-colors ${isWishlisted ? 'fill-brand-red text-brand-red group-hover/heart:text-white group-hover/heart:fill-white' : 'text-gray-400 group-hover/heart:text-white'}`} />
      </button>

      {/* Cover */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-100 relative">
        <img 
          src={book.cover} 
          alt={book.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${e.target.alt}/300/450` }}
        />
        {/* Quick Add Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleAddToCart}
            className="shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingCart size={16} /> Quick Add
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-1.5">{book.genre}</p>
        <h3 className="font-playfair font-bold text-lg text-brand-navy leading-tight mb-1 line-clamp-2">{book.title}</h3>
        <p className="font-inter text-[13px] text-brand-muted mb-4 flex-1">{book.author}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-inter font-bold text-lg text-brand-red">&#8377;{book.price}</span>
              {discount > 0 && (
                <span className="font-inter text-xs text-brand-muted line-through">&#8377;{book.mrp}</span>
              )}
            </div>
          </div>
          {discount > 0 && <Badge type="sale" value={discount} />}
        </div>
      </div>
    </div>
  );
}
