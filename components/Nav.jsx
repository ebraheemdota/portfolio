'use client';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const links = ['Work', 'Experience', 'About', 'Contact'];
  const ids = ['work', 'experience', 'about', 'contact'];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        padding: isMobile ? '16px 20px' : '24px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(12px)',
        boxSizing: 'border-box'
      }}>
        {isMobile ? (
          <>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'none',
              border: '1px solid #f97316',
              color: '#f97316',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              lineHeight: 1,
              fontFamily: 'inherit',
              zIndex: 1
            }}>
              {menuOpen ? '×' : '☰'}
            </button>

            <span style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '15px',
              fontWeight: 700,
              color: '#f5f5f0'
            }}>
              Ebraheem Ahmed
            </span>
          </>
        ) : (
          <>
            <span style={{fontSize: '18px', fontWeight: 700, color: '#f5f5f0'}}>
              Ebraheem Ahmed
            </span>

            <div style={{display: 'flex', gap: '40px'}}>
              {links.map((link, i) => (
                <button
                  key={link}
                  onClick={() => scrollTo(ids[i])}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#888880',
                    fontSize: '15px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 500
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f5f5f0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888880'}
                >
                  {link}
                </button>
              ))}
            </div>
          </>
        )}
      </nav>

      {menuOpen && isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10,10,10,0.98)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 40px',
          gap: '8px',
          animation: 'slideIn 0.4s ease forwards'
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: '#888880',
            fontSize: '28px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}>×</button>

          <p style={{fontSize: '10px', letterSpacing: '0.2em', color: '#f97316', fontWeight: 600, marginBottom: '24px'}}>NAVIGATE</p>

          {links.map((link, i) => (
            <button
              key={link}
              onClick={() => scrollTo(ids[i])}
              style={{
                background: 'none',
                border: 'none',
                color: '#f5f5f0',
                fontSize: '40px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: '8px 0',
                textAlign: 'left',
                animation: `fadeInUp 0.4s ease ${i * 0.1}s forwards`,
                opacity: 0
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
              onMouseLeave={e => e.currentTarget.style.color = '#f5f5f0'}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
