import React, { useState } from 'react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="bg-brand-red text-white overflow-hidden h-9 flex items-center relative"
      role="banner"
    >
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-[#C0392B] to-transparent" />
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-[#C0392B] to-transparent" />
      
      <div className="whitespace-nowrap animate-marquee flex items-center font-inter text-xs font-semibold uppercase tracking-widest">
        <span>📦 Free shipping above ₹499&emsp;·&emsp;🔥 50% Off Sale is LIVE&emsp;·&emsp;⚡ Extra 10% Off above ₹1499&emsp;·&emsp;</span>
        <span>📦 Free shipping above ₹499&emsp;·&emsp;🔥 50% Off Sale is LIVE&emsp;·&emsp;⚡ Extra 10% Off above ₹1499&emsp;·&emsp;</span>
      </div>
    </div>
  );
}
