'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Calendar, MapPin, Users, CheckCircle, ArrowRight, X, Clock } from 'lucide-react';
import { WORKSHOPS_DATA, Workshop } from '../../data/portfolioData';

export default function WorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const handleCloseModal = () => {
    setSelectedWorkshop(null);
    setBookingSuccess(false);
    setAttendeeName('');
    setAttendeeEmail('');
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '850px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>ATELIER MASTERCLASSES</span>
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
              Art Workshops & Masterclasses
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Intensive, small-group studio masterclasses in Paris and virtual mentorships taught directly by Aurelia Vance. Learn the alchemy of raw mineral grinding, historical binder formulation, and genuine 24-karat gold water gilding.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Workshop Banner */}
      <section style={{ paddingTop: '4rem', paddingBottom: '4.5rem' }}>
        <div className="site-container">
          <div
            className="glass-panel-gold"
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '360px' }}>
              <Image
                src="/images/art_workshop.jpg"
                alt="Art Studio Workshop Masterclass"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="art-badge" style={{ marginBottom: '1rem' }}>
                WINTER FLAGSHIP MASTERCLASS
              </span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
                {WORKSHOPS_DATA[0].title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Spend three transformative days inside Aurelia Vance’s historic Montmartre studio. Limited strictly to 10 participants to ensure intimate, individual technical mentorship.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                  <Calendar size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>{WORKSHOPS_DATA[0].dates}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>Paris, Montmartre</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                  <Users size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>Only 3 Seats Remaining</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{WORKSHOPS_DATA[0].price}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkshop(WORKSHOPS_DATA[0])}
                className="btn-gold"
                style={{ width: '100%' }}
              >
                <span>Reserve Seat in Paris Atelier</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Workshops Grid */}
      <section style={{ paddingTop: '2rem' }}>
        <div className="site-container">
          <div style={{ marginBottom: '3rem' }}>
            <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>
              2026 – 2027 CURRICULUM
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '0.35rem' }}>
              Upcoming Studio Masterclasses
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {WORKSHOPS_DATA.map((ws) => (
              <div
                key={ws.id}
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="art-badge">{ws.level}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-gold-light)' }}>
                      {ws.price}
                    </span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.25 }}>
                    {ws.title}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-cream)', fontStyle: 'italic', display: 'block', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                    {ws.subtitle}
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} style={{ color: 'var(--accent-gold)' }} />
                      <span>{ws.dates} ({ws.duration})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} style={{ color: 'var(--accent-gold)' }} />
                      <span>{ws.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={14} style={{ color: 'var(--accent-gold)' }} />
                      <span style={{ color: '#4ade80' }}>Seats remaining: {ws.seatsLeft} of {ws.capacity}</span>
                    </div>
                  </div>

                  {/* Syllabus Points */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.6rem' }}>
                      Syllabus Overview
                    </span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {ws.syllabus.map((syl, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--accent-gold)' }}>•</span>
                          <span>{syl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedWorkshop(ws)}
                  className="btn-gold"
                  style={{ width: '100%', fontSize: '0.8rem' }}
                >
                  <span>Enroll in Masterclass</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedWorkshop && (
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
            onClick={handleCloseModal}
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
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              padding: 'clamp(2rem, 3.5vw, 2.75rem)',
              boxShadow: 'var(--shadow-lux)',
              zIndex: 1110,
            }}
          >
            <button
              onClick={handleCloseModal}
              aria-label="Close booking modal"
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

            {!bookingSuccess ? (
              <div>
                <span className="art-badge" style={{ marginBottom: '0.75rem' }}>
                  MASTERCLASS REGISTRATION
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {selectedWorkshop.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)', marginBottom: '1.5rem' }}>
                  {selectedWorkshop.dates} • {selectedWorkshop.location} • Tuition: {selectedWorkshop.price}
                </p>

                {/* Materials included checklist */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.1em' }}>
                    Materials Provided By Atelier
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                    {selectedWorkshop.materialsIncluded.map((mat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Artist Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marcella Fontaine"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        color: '#fff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Email for Syllabus & Orientation Dossier
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="artist@atelier.com"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        color: '#fff',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button type="submit" className="btn-gold" style={{ marginTop: '0.75rem', width: '100%' }}>
                    <span>Confirm Seat Reservation ({selectedWorkshop.price})</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
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
                  <CheckCircle size={30} />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                  Masterclass Reservation Received
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thank you, {attendeeName}. Your registration for <strong>{selectedWorkshop.title}</strong> has been logged. Aurelia Vance’s studio assistant will email your confirmation and orientation dossier to {attendeeEmail}.
                </p>
                <button onClick={handleCloseModal} className="btn-gold" style={{ display: 'inline-flex' }}>
                  <span>Return to Workshops</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
