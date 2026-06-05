import React from 'react';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight:'60vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:'16px'
    }}>
      <h2 style={{ fontFamily:'Playfair Display', fontSize:'32px', color:'#2C3E50' }}>
        Page Not Found
      </h2>
      <p style={{ color:'#6B6B6B' }}>The page you're looking for doesn't exist.</p>
      <a href="/" style={{ color:'#C0392B', fontWeight:600 }}>← Back to Home</a>
    </div>
  );
}
