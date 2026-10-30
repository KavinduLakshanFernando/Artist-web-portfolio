'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingBag, ShieldCheck, Truck, Award, Check } from 'lucide-react';
import { SHOP_DATA, ShopItem } from '../../data/portfolioData';
import { useCart } from '../../context/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories = ['All', 'Original Painting', 'Archival Print', 'Fine Art Photo', 'Sculptural Object', 'Edition'];

  const filteredItems = SHOP_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleAddToCart = (item: ShopItem) => {
    addToCart(item, 1);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 2000);
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '850px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>COLLECTOR’S EDITIONS & ORIGINALS</span>
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
              Atelier Art Shop
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Acquire original paintings, limited edition archival giclée prints hand-embellished in 24k gold leaf, darkroom cyanotypes, and signed monographs. Each piece includes a signed Certificate of Authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* Collector Guarantees Banner */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f8f7f4', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Award size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Signed Provenance</strong>
                Numbered & blind-stamped by Aurelia Vance
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Truck size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Insured Global Courier</strong>
                Custom reinforced crates & flatpack shipping
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Museum Archival Standards</strong>
                Hahnemühle 100% cotton rag & mineral pigments
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
        <div className="site-container">
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                    backgroundColor: isActive ? 'var(--accent-gold-dim)' : 'transparent',
                    color: isActive ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Shop Items Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {filteredItems.map((item) => {
              const isJustAdded = addedItemId === item.id;
              return (
                <div
                  key={item.id}
                  className="art-frame"
                  style={{
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Item Image */}
                    <div style={{ position: 'relative', width: '100%', height: '340px' }}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          backgroundColor: 'rgba(10, 10, 13, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-gold)',
                          color: 'var(--accent-gold-light)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                        }}
                      >
                        {item.editionDetails.split('//')[0]}
                      </span>
                    </div>

                    {/* Details */}
                    <div style={{ padding: '1.75rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                        {item.category}
                      </span>
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: '1.35rem',
                          color: 'var(--text-main)',
                          marginBottom: '0.5rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {item.medium}
                      </p>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '0.75rem' }}>
                        Size: {item.size}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#4ade80' }}>
                        Stock: {item.stockCount} {item.stockCount === 1 ? 'piece available' : 'pieces available'}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Cart Action */}
                  <div
                    style={{
                      padding: '1.25rem 1.75rem',
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#faf9f6',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase' }}>
                        Collector Price
                      </span>
                      <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-sans)' }}>
                        {item.formattedPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={isJustAdded ? 'btn-outline' : 'btn-gold'}
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.78rem' }}
                    >
                      {isJustAdded ? (
                        <>
                          <Check size={14} style={{ color: '#4ade80' }} />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>Acquire Edition</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
