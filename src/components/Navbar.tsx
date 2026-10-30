'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Exhibitions', href: '/exhibition' },
  { label: 'Press', href: '/press' },
  { label: 'Publications', href: '/publications' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 320;
      setIsAtBottom(atBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Primary Header: Desktop uses absolute on Home hero; Mobile is ALWAYS fixed with frosted glass for 100% navigation accessibility */}
      <header
        className={`main-header ${isScrolled ? 'is-scrolled' : ''} ${isHome ? 'is-home' : ''}`}
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Atelier Brand Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: isHome ? '#ffffff' : (isScrolled ? 'var(--text-main)' : '#ffffff'),
                lineHeight: 1.1,
              }}
            >
              AURELIA VANCE
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: '#e6cb78',
                textTransform: 'uppercase',
                marginTop: '0.15rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
              }}
            >
              Atelier & Contemporary Art
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.65rem',
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '0.82rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 600 : 500,
                    color: isHome
                      ? (isActive ? '#e6cb78' : '#e4e4e7')
                      : (isActive ? 'var(--accent-gold)' : 'var(--text-muted)'),
                    position: 'relative',
                    padding: '0.25rem 0',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isHome ? '#ffffff' : 'var(--text-main)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isHome
                      ? (isActive ? '#e6cb78' : '#e4e4e7')
                      : (isActive ? 'var(--accent-gold)' : 'var(--text-muted)'))
                  }
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: isHome ? '#e6cb78' : 'var(--accent-gold)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls (Cart & Mobile Menu Trigger) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link
              href="/gallery"
              className="btn-outline desktop-only"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.75rem',
                background: isHome ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: isHome ? '#ffffff' : 'var(--text-main)',
                borderColor: isHome ? 'rgba(255, 255, 255, 0.25)' : 'var(--border-light)',
                backdropFilter: isHome ? 'blur(10px)' : 'none',
              }}
            >
              <Sparkles size={13} style={{ color: isHome ? '#e6cb78' : 'var(--accent-gold)' }} />
              <span>Acquire Art</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: '#d4af37',
                    color: '#121215',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Capsule Bar on Sections 2-6 (Home page only, shows all tabs, hides in Section 1 and in Footer) */}
      {isHome && (
        <div
          className="desktop-only"
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '50%',
            transform: `translateX(-50%) translateY(${isScrolled && !isAtBottom ? '0' : '-100px'})`,
            opacity: isScrolled && !isAtBottom ? 1 : 0,
            pointerEvents: isScrolled && !isAtBottom ? 'auto' : 'none',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 850,
            background: 'rgba(15, 15, 20, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '9999px',
            padding: '0.4rem 1.25rem',
            boxShadow: '0 14px 40px rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.15rem',
            maxWidth: '96vw',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
            <span className="font-display" style={{ fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.12em', color: '#ffffff' }}>
              AURELIA VANCE
            </span>
          </Link>

          <div style={{ height: '14px', width: '1px', background: 'rgba(255, 255, 255, 0.2)', flexShrink: 0 }} />

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '0.74rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#e6cb78' : '#d4d4d8',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? '#e6cb78' : '#d4d4d8')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ height: '14px', width: '1px', background: 'rgba(255, 255, 255, 0.2)', flexShrink: 0 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link
              href="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.72rem',
                color: '#e6cb78',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(230, 203, 120, 0.12)',
                border: '1px solid rgba(230, 203, 120, 0.35)',
                borderRadius: '9999px',
                padding: '0.25rem 0.65rem',
                whiteSpace: 'nowrap',
              }}
            >
              <Sparkles size={11} />
              <span>Acquire</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <ShoppingBag size={14} style={{ color: '#e6cb78' }} />
              <span>({totalItems})</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay for White Theme */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 890,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2.5rem',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
            <span
              className="font-display"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-gold)',
                letterSpacing: '0.25em',
                marginBottom: '1rem',
              }}
            >
              EXPLORE ATELIER
            </span>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-main)',
                    fontWeight: isActive ? 600 : 300,
                    letterSpacing: '0.04em',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div style={{ marginTop: '2rem' }}>
              <Link
                href="/shop"
                className="btn-gold"
                style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Visit Art Shop</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 990;
          padding: 1rem 0;
          background: rgba(14, 15, 18, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        @media (min-width: 1024px) {
          .main-header.is-home:not(.is-scrolled) {
            position: absolute;
            background: transparent;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }
          .main-header:not(.is-home) {
            background: rgba(255, 255, 255, 0.94);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          }
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .desktop-only {
            display: inline-flex !important;
          }
        }
        @media (max-width: 1023px) {
          .main-header {
            position: fixed !important;
            padding: 0.75rem 0 !important;
            background: rgba(12, 13, 16, 0.95) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-only {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
