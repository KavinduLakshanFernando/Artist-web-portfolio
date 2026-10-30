'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, MapPin, Mail, Phone, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialInquiry = searchParams ? searchParams.get('inquiry') || '' : '';

  const [inquiryType, setInquiryType] = useState('Acquisition');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artworkTitle: initialInquiry,
    message: initialInquiry ? `I am inquiring regarding the provenance and acquisition availability of "${initialInquiry}".` : '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialInquiry) {
      setFormData((prev) => ({
        ...prev,
        artworkTitle: initialInquiry,
        message: `I am inquiring regarding the provenance and acquisition availability of "${initialInquiry}".`,
      }));
    }
  }, [initialInquiry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '850px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>STUDIO & ATELIER LIAISON</span>
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
              Contact & Acquisition Inquiries
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Connect with Aurelia Vance’s studio directly for artwork acquisitions, private commissions, institutional museum loans, press credentials, or private atelier visit appointments in Paris.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Atelier Directory */}
      <section style={{ paddingTop: '5rem' }}>
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4.5rem',
            }}
          >
            {/* Left Column: Direct Atelier & Representation Details */}
            <div>
              <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.75rem' }}>
                PARIS ATELIER
              </span>
              <h2 className="font-serif" style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>
                Studio Montmartre
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                The studio is located in the historic 18th arrondissement of Paris. Private viewings are conducted on Tuesday and Friday afternoons by prior appointment only.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-gold)', marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Studio Address</strong>
                    <span style={{ color: 'var(--text-muted)' }}>14 Rue Lepic, 75018 Montmartre, Paris, France</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Mail size={18} style={{ color: 'var(--accent-gold)', marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Primary Liaison Email</strong>
                    <span style={{ color: 'var(--text-muted)' }}>atelier@aureliavance.art</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Phone size={18} style={{ color: 'var(--accent-gold)', marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block' }}>Studio Registrar Direct</strong>
                    <span style={{ color: 'var(--text-muted)' }}>+33 1 42 68 90 20 (Mon–Fri 10:00–18:00 CET)</span>
                  </div>
                </div>
              </div>

              {/* Representation Cards */}
              <div
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: '6px',
                }}
              >
                <h3 className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.15em', color: 'var(--accent-gold-light)', marginBottom: '1.25rem' }}>
                  GALLERY REPRESENTATION DIRECTORY
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Paris // Galerie Marais Moderne</strong>
                    <span style={{ color: 'var(--text-muted)' }}>contact@maraismoderne.com • +33 1 48 04 22 10</span>
                  </div>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>London // Marlborough Contemporary</strong>
                    <span style={{ color: 'var(--text-muted)' }}>mayfair@marlboroughart.co.uk • +44 20 7629 5161</span>
                  </div>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>New York // Vance & Chelsea Editions</strong>
                    <span style={{ color: 'var(--text-muted)' }}>inquiries@chelseaeditionsny.com • +1 212 929 8830</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div>
              <div
                className="glass-panel-gold"
                style={{
                  padding: 'clamp(2rem, 3.5vw, 3rem)',
                  borderRadius: '8px',
                }}
              >
                {!submitted ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                    <div>
                      <span className="font-display" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.5rem' }}>
                        DIRECT INQUIRY DOSSIER
                      </span>
                      <h3 className="font-serif" style={{ fontSize: '1.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        Send Atelier Message
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        The artist’s registrar responds to all collector inquiries within 24 business hours.
                      </p>
                    </div>

                    {/* Inquiry Type Radio / Buttons */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Nature of Inquiry
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                        {['Acquisition', 'Commission', 'Studio Visit', 'Press / Curatorial'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquiryType(type)}
                            style={{
                              padding: '0.6rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textAlign: 'center',
                              border: inquiryType === type ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                              backgroundColor: inquiryType === type ? 'var(--accent-gold-dim)' : 'transparent',
                              color: inquiryType === type ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                          Your Name / Institution *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Laurent De Sica"
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
                        <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                          Email Address *
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
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        Telephone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+33 6 00 00 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        Artwork of Interest / Commission Scale
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Luminescence No. VIII or Private Salon Commission"
                        value={formData.artworkTitle}
                        onChange={(e) => setFormData({ ...formData, artworkTitle: e.target.value })}
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
                      <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        Detailed Message / Project Scope *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please include any architectural spatial dimensions, collection context, or preferred viewing dates..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: '#f8f7f4',
                          border: '1px solid var(--border-light)',
                          borderRadius: '4px',
                          color: '#121215',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-gold" style={{ width: '100%', padding: '0.95rem' }}>
                      <span>Submit Inquiry to Registrar</span>
                      <ArrowRight size={15} />
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(201, 168, 76, 0.15)',
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
                    <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                      Inquiry Registered
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                      Thank you, {formData.name}. Your dossier regarding <strong>{inquiryType}</strong> has been transmitted to Aurelia Vance’s studio registrar. A formal reply with provenance documentation will be sent to {formData.email}.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', artworkTitle: '', message: '' });
                      }}
                      className="btn-outline"
                      style={{ display: 'inline-flex' }}
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collector Acquisition FAQ */}
      <section style={{ paddingTop: '6rem' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>
              ACQUISITION GUIDE
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.4rem', marginTop: '0.35rem' }}>
              Frequently Asked Questions for Collectors
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '6px' }}>
              <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                How is international art freight handled?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                All original canvases and bronze works are packed in bespoke, museum-grade ISPM-15 heat-treated timber crates with temperature-insulating foam. Shipping is executed via specialized fine-art handlers (Hasenkamp, Dietl, or André Chenue) with full door-to-door insurance.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '6px' }}>
              <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                What authentication documents are provided?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                Every unique original artwork and limited edition print is accompanied by a Certificate of Authenticity signed by Aurelia Vance, embossed with the studio seal, and permanently registered in the official digital Catalogue Raisonné archive.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '6px' }}>
              <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                How do private commissions work?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                Aurelia accepts a maximum of four bespoke architectural commissions per calendar year. Following an initial spatial consultation and color study proposal, a 50% deposit secures studio scheduling. Completion typically requires 12 to 16 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--accent-gold)' }}>Loading Atelier Liaison...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
