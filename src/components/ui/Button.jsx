import React from 'react';

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  children, 
  disabled = false, 
  fullWidth = false,
  className = '',
  type = 'button'
}) {
  const baseStyles = 'font-inter font-semibold rounded-[4px] transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-brand-red text-white hover:bg-[#A93226] disabled:bg-gray-300 disabled:text-gray-500 shadow-sm',
    outline: 'border border-brand-red text-brand-red hover:bg-red-50 disabled:border-gray-300 disabled:text-gray-500',
    ghost: 'bg-transparent text-brand-muted hover:text-brand-red hover:bg-red-50 disabled:text-gray-400'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
