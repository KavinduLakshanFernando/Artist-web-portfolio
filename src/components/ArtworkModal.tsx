'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Sparkles, Compass, CheckCircle } from 'lucide-react';
import { Artwork } from '../data/portfolioData';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  if (!artwork) return null;

  return (
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
        }}
      />

      {/* Modal Dialog */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lux)',
          zIndex: 1110,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          animation: 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close artwork details"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 20,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
        >
          <X size={18} />
        </button>

        {/* Artwork Visual Display */}
        <div
          style={{
            position: 'relative',
            minHeight: '400px',
            backgroundColor: '#f5f4ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            borderRight: '1px solid var(--border-light)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '380px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Artwork Metadata & Curatorial Content */}
        <div style={{ padding: '2.5rem 2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="art-badge">{artwork.category}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                {artwork.series} • {artwork.year}
              </span>
            </div>

            <h2
              className="font-serif"
              style={{
                fontSize: '1.85rem',
                lineHeight: 1.25,
                color: 'var(--text-main)',
                marginBottom: '1rem',
              }}
            >
              {artwork.title}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                background: '#f8f7f4',
                border: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
                fontSize: '0.82rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Medium & Pigment
                </span>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{artwork.medium}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Dimensions
                </span>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{artwork.dimensions}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Current Status
                </span>
                <span
                  style={{
                    color: artwork.status === 'Available' ? '#16a34a' : 'var(--accent-gold)',
                    fontWeight: 600,
                  }}
                >
                  {artwork.status}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Acquisition Value
                </span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '1rem' }}>
                  {artwork.price || 'Price Upon Request'}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {artwork.description}
            </p>

            {/* Curator's Note */}
            <div
              style={{
                borderLeft: '2px solid var(--accent-gold)',
                paddingLeft: '1rem',
                marginBottom: '1.5rem',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                color: 'var(--text-main)',
              }}
            >
              {artwork.curatorNote}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <Compass size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Provenance: {artwork.provenance}</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
            <Link
              href={`/contact?inquiry=${encodeURIComponent(artwork.title)}`}
              className="btn-gold"
              onClick={onClose}
              style={{ flex: 1, minWidth: '180px' }}
            >
              <Sparkles size={15} />
              <span>Acquisition Inquiry</span>
            </Link>

            <Link
              href="/shop"
              className="btn-outline"
              onClick={onClose}
              style={{ flex: 1, minWidth: '180px' }}
            >
              <CheckCircle size={15} />
              <span>View Archival Prints</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
