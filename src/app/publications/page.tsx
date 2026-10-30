'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, BookOpen, ShoppingBag, Eye, X, Check, ArrowRight } from 'lucide-react';
import { PUBLICATIONS_DATA, SHOP_DATA, Publication } from '../../data/portfolioData';
import { useCart } from '../../context/CartContext';

export default function PublicationsPage() {
  const { addToCart } = useCart();
  const [selectedBook, setSelectedBook] = useState<Publication | null>(null);

  const handleOrderBook = (pub: Publication) => {
    // Look up shop item
    const shopItem = SHOP_DATA.find((s) => s.id === 'shop-4') || {
      id: pub.id,
      title: `${pub.title} (${pub.subtitle})`,
      category: 'Edition' as const,
      editionDetails: 'Monograph Publication',
      medium: `${pub.pages} pages, hardbound linen`,
      size: '28 x 34 cm',
      price: parseInt(pub.price.replace(/\D/g, '')),
      formattedPrice: pub.price,
      image: pub.coverImage,
      inStock: true,
      stockCount: 15,
      description: pub.description,
      coaSigned: true,
      estimatedDelivery: 'Dispatches within 48 hours worldwide.',
    };
    addToCart(shopItem, 1);
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '850px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>PRINTED EDITIONS & MONOGRAPHS</span>
            </span>
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
              }}
            >
              Publications & Monographs
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Hardbound artist monographs, museum exhibition catalogues, and philosophy treatises published in collaboration with Thames & Hudson and international museum houses.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Monograph Spotlight */}
      <section style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="site-container">
          <div
            className="glass-panel-gold"
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Book Cover Image */}
            <div
              className="art-frame"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '6px',
                border: '1px solid var(--border-gold)',
                boxShadow: 'var(--shadow-lux)',
              }}
            >
              <Image
                src={PUBLICATIONS_DATA[0].coverImage}
                alt="Chronicles of Lumen Book Cover"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>

            {/* Info */}
            <div>
              <span className="art-badge" style={{ marginBottom: '0.75rem' }}>
                DEFINITIVE RETROSPECTIVE MONOGRAPH
              </span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                {PUBLICATIONS_DATA[0].title}
              </h2>
              <span style={{ fontSize: '1rem', color: 'var(--accent-gold-light)', display: 'block', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                {PUBLICATIONS_DATA[0].subtitle}
              </span>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '2rem' }}>
                {PUBLICATIONS_DATA[0].description}
              </p>

              {/* Book Specs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '2rem',
                  fontSize: '0.82rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    Publisher
                  </span>
                  <span style={{ color: 'var(--text-main)' }}>{PUBLICATIONS_DATA[0].publisher}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    ISBN
                  </span>
                  <span style={{ color: 'var(--text-main)' }}>{PUBLICATIONS_DATA[0].isbn}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    Specifications
                  </span>
                  <span style={{ color: 'var(--text-main)' }}>{PUBLICATIONS_DATA[0].pages} Pages • Hardbound Cloth</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    Forewords
                  </span>
                  <span style={{ color: 'var(--text-main)' }}>{PUBLICATIONS_DATA[0].forewordBy}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleOrderBook(PUBLICATIONS_DATA[0])}
                  className="btn-gold"
                  style={{ display: 'inline-flex' }}
                >
                  <ShoppingBag size={15} />
                  <span>Order Monograph ({PUBLICATIONS_DATA[0].price})</span>
                </button>

                <button
                  onClick={() => setSelectedBook(PUBLICATIONS_DATA[0])}
                  className="btn-outline"
                  style={{ display: 'inline-flex' }}
                >
                  <Eye size={15} />
                  <span>Look Inside (Table of Contents)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue & Philosophy Treatises */}
      <section style={{ paddingTop: '3rem', backgroundColor: '#fcfbfa', borderTop: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>
              CATALOGUES & ARTIST BOOKS
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.4rem', marginTop: '0.35rem' }}>
              Exhibition Catalogues & Essays
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {PUBLICATIONS_DATA.slice(1).map((book) => (
              <div
                key={book.id}
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="art-badge">{book.year}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-gold-light)' }}>{book.price}</span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {book.title}
                  </h3>
                  <span style={{ fontSize: '0.88rem', color: 'var(--accent-cream)', fontStyle: 'italic', display: 'block', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                    {book.subtitle}
                  </span>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {book.description}
                  </p>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '1.5rem' }}>
                    Published by {book.publisher} • {book.pages} Pages
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    onClick={() => handleOrderBook(book)}
                    className="btn-gold"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '0.65rem' }}
                  >
                    <span>Order Copy</span>
                  </button>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="btn-outline"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '0.65rem' }}
                  >
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Inspector Modal */}
      {selectedBook && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={() => setSelectedBook(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 5, 8, 0.92)',
              backdropFilter: 'blur(12px)',
            }}
          />

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lux)',
              zIndex: 1110,
            }}
          >
            <button
              onClick={() => setSelectedBook(null)}
              aria-label="Close book details"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                padding: '0.5rem',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-main)',
              }}
            >
              <X size={18} />
            </button>

            <span className="art-badge" style={{ marginBottom: '0.75rem' }}>
              TABLE OF CONTENTS & CHAPTER PREVIEW
            </span>

            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {selectedBook.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              {selectedBook.subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {selectedBook.sampleSpreads.map((spread, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                  }}
                >
                  <Check size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span>{spread}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                {selectedBook.price}
              </span>
              <button
                onClick={() => {
                  handleOrderBook(selectedBook);
                  setSelectedBook(null);
                }}
                className="btn-gold"
              >
                <span>Add Monograph to Cart</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
