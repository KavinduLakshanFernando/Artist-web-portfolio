'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, CheckCircle2, Mail, MapPin, Sparkles, Globe } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="overlap-footer"
      style={{
        backgroundColor: '#0e0e12',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '3rem',
        color: '#d1d1d6',
      }}
    >
      <div className="site-container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand & Atelier Manifesto */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                className="font-display"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                  display: 'block',
                }}
              >
                AURELIA VANCE
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Studio & Master Atelier // Paris
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: '#a1a1aa',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
                fontStyle: 'italic',
              }}
            >
              “Painting is not simulation; it is the physical compression of celestial light, raw minerals, and terrestrial memory onto linen.”
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>14 Rue Lepic, 75018 Montmartre, Paris, France</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>atelier@aureliavance.art</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <h4
                className="font-display"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.25rem',
                  fontWeight: 700,
                }}
              >
                THE ATELIER
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <li><Link href="/" style={{ color: '#d1d1d6' }}>Home</Link></li>
                <li><Link href="/about" style={{ color: '#d1d1d6' }}>Artist Biography</Link></li>
                <li><Link href="/gallery" style={{ color: '#d1d1d6' }}>Gallery & Catalog</Link></li>
                <li><Link href="/exhibition" style={{ color: '#d1d1d6' }}>Exhibitions & Talks</Link></li>
              </ul>
            </div>
            <div>
              <h4
                className="font-display"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.25rem',
                  fontWeight: 700,
                }}
              >
                DISCOURSE & SHOP
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <li><Link href="/press" style={{ color: '#d1d1d6' }}>Press & Articles</Link></li>
                <li><Link href="/publications" style={{ color: '#d1d1d6' }}>Publications</Link></li>
                <li><Link href="/workshops" style={{ color: '#d1d1d6' }}>Art Workshops</Link></li>
                <li><Link href="/shop" style={{ color: '#d1d1d6' }}>Originals & Prints</Link></li>
                <li><Link href="/contact" style={{ color: '#d1d1d6' }}>Private Inquiries</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Gallery Representation */}
          <div>
            <h4
              className="font-display"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.18em',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              GALLERY REPRESENTATION
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>Paris: Galerie Marais Moderne</strong>
                <span>7 Rue de Turenne, 75004 Paris</span>
              </div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>London: Marlborough Contemporary</strong>
                <span>6 Albemarle St, Mayfair, London</span>
              </div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>New York: Vance & Chelsea Editions</strong>
                <span>520 W 24th St, New York, NY</span>
              </div>
            </div>
          </div>

          {/* Column 4: VIP Collector's Salon Newsletter */}
          <div>
            <h4
              className="font-display"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.18em',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              COLLECTOR&apos;S SALON
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Receive exclusive invitations to private viewings, new masterwork releases, and quarterly studio monographs.
            </p>
            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '1rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--accent-gold)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                <CheckCircle2 size={18} />
                <span>You are now subscribed to the Collector’s Salon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your collector email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)')}
                />
                <button type="submit" className="btn-gold" style={{ width: '100%' }}>
                  <span>Request Invitation</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.8rem',
            color: '#71717a',
          }}
        >
          <div>
            © {new Date().getFullYear()} Aurelia Vance Studio & Atelier. All rights reserved. Registered under ADAGP Paris. Client-First Architecture.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a1a1aa' }}>
              <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} /> @aureliavance.atelier
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a1a1aa' }}>
              <Globe size={14} /> Artsy / 1stDibs Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
