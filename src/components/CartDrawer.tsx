'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: 'France',
  });

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      clearCart();
      setCheckoutStep('cart');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lux)',
          zIndex: 1010,
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#faf9f7',
          }}
        >
          <div>
            <h3
              className="font-display"
              style={{ fontSize: '1.1rem', letterSpacing: '0.1em', color: 'var(--text-main)', fontWeight: 700 }}
            >
              {checkoutStep === 'cart'
                ? 'COLLECTOR’S CART'
                : checkoutStep === 'checkout'
                ? 'SECURE ACQUISITION'
                : 'ORDER CONFIRMED'}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
              {cart.length} {cart.length === 1 ? 'Artwork / Edition' : 'Artworks / Editions'}
            </span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close cart"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body content based on state */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem' }}>
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      margin: '0 auto 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--accent-gold-dim)',
                      border: '1px solid var(--border-gold)',
                      color: 'var(--accent-gold)',
                      fontSize: '1.5rem',
                    }}
                  >
                    ✧
                  </div>
                  <h4 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                    Your Collection Portfolio is Empty
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Explore original paintings, archival prints, and limited monographs from the studio.
                  </p>
                  <Link
                    href="/shop"
                    className="btn-gold"
                    onClick={() => setIsCartOpen(false)}
                    style={{ display: 'inline-flex' }}
                  >
                    <span>Browse Atelier Editions</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto',
                        gap: '1rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid var(--border-light)',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="80px" />
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            color: 'var(--text-main)',
                            marginBottom: '0.2rem',
                          }}
                        >
                          {item.title}
                        </h4>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                          {item.category} • {item.size}
                        </span>
                        <span
                          style={{
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: 'var(--accent-gold)',
                            display: 'block',
                            marginTop: '0.35rem',
                          }}
                        >
                          Rs. {(item.price * quantity).toLocaleString()}
                        </span>
                        {/* Quantity Counter */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              background: '#f0eee8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              color: 'var(--text-main)',
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              background: '#f0eee8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              color: 'var(--text-main)',
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        style={{
                          color: 'var(--text-subtle)',
                          padding: '0.5rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Full Collector Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lady Evelyn Montgomery"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#f8f7f4',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    color: '#121215',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Email Address (For Certificate of Authenticity)
                </label>
                <input
                  required
                  type="email"
                  placeholder="collector@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#f8f7f4',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    color: '#121215',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Delivery Address
                </label>
                <input
                  required
                  type="text"
                  placeholder="Street and residence address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#f8f7f4',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    color: '#121215',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    City
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Paris / London / NYC"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#f8f7f4',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px',
                      color: '#121215',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Country
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#f8f7f4',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px',
                      color: '#121215',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--accent-gold-dim)',
                  border: '1px solid var(--border-gold)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <ShieldCheck size={16} />
                  <span>Atelier Escrow & Insured Art Freight</span>
                </div>
                Your acquisition is protected with verified provenance registration and full marine & air fine-art transit insurance.
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>
                <span>Confirm Acquisition (Rs. {totalPrice.toLocaleString()})</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  textDecoration: 'underline',
                  textAlign: 'center',
                }}
              >
                Back to Cart
              </button>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-dim)',
                  border: '1px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--accent-gold)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Acquisition Registered
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Thank you, {formData.name || 'esteemed collector'}. The studio registrar will prepare your Certificate of Authenticity and contact you with dedicated tracking details.
              </p>
              <button onClick={handleClose} className="btn-gold" style={{ display: 'inline-flex' }}>
                <span>Return to Atelier</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info & action */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div
            style={{
              padding: '1.5rem 2rem',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: '#faf9f7',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Insured Fine Art Courier</span>
              <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Complimentary Worldwide</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'baseline' }}>
              <span className="font-display" style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700 }}>TOTAL INVESTMENT</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-sans)' }}>
                Rs. {totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => setCheckoutStep('checkout')}
              className="btn-gold"
              style={{ width: '100%', padding: '1rem' }}
            >
              <span>Proceed to Collector Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
