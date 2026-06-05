import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, viewAllLink }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
      <div>
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-navy mb-2">{title}</h2>
        {subtitle && (
          <p className="font-playfair italic text-brand-muted text-lg">{subtitle}</p>
        )}
      </div>
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className="group inline-flex items-center gap-2 font-inter font-semibold text-sm text-brand-red hover:text-[#A93226] transition-colors"
        >
          View All 
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
