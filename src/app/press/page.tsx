'use client';

import React, { useState } from 'react';
import { Sparkles, Newspaper, BookOpen, Download, ArrowRight, X, ExternalLink } from 'lucide-react';
import { PRESS_DATA, PressItem } from '../../data/portfolioData';

type PressFilter = 'all' | 'newspaper' | 'magazine' | 'article';

export default function PressPage() {
  const [activeFilter, setActiveFilter] = useState<PressFilter>('all');
  const [selectedPress, setSelectedPress] = useState<PressItem | null>(null);

  const filteredPress = PRESS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '850px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>CRITICAL RECEPTION & REVIEWS</span>
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
              Press, Magazines & Articles
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Selected international coverage, front-page newspaper features, architectural magazine essays, and critical reviews of Aurelia Vance’s work.
            </p>
          </div>
        </div>
      </section>

      {/* Press Kit Banner */}
      <section style={{ padding: '2.5rem 0', backgroundColor: '#fcfbfa', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div
            className="glass-panel-gold"
            style={{
              padding: '1.75rem 2.25rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <span className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--accent-gold)' }}>
                FOR JOURNALISTS, EDITORS & CURATORS
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Download Official Studio Press Kit (Autumn 2026)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Includes 300dpi high-resolution artwork reproductions, studio photography by François Halard, curriculum vitae, and press releases.
              </p>
            </div>

            <a
              href="/images/hero_masterpiece.jpg"
              download="Aurelia_Vance_Official_Press_Kit_2026.zip"
              className="btn-gold"
              style={{ display: 'inline-flex' }}
            >
              <Download size={15} />
              <span>Download Press Kit (.ZIP)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '1rem' }}>
        <div className="site-container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {(
              [
                { id: 'all', label: 'All Media' },
                { id: 'newspaper', label: 'Newspapers (NYT, Guardian)' },
                { id: 'magazine', label: 'Magazines (Vogue, Wallpaper*)' },
                { id: 'article', label: 'Critical Articles (Artforum)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  border: activeFilter === tab.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  backgroundColor: activeFilter === tab.id ? 'var(--accent-gold-dim)' : 'transparent',
                  color: activeFilter === tab.id ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Press Clippings Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {filteredPress.map((press) => (
              <div
                key={press.id}
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedPress(press)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="art-badge">{press.badge}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{press.date}</span>
                  </div>

                  <span
                    className="font-display"
                    style={{
                      fontSize: '0.82rem',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-gold-light)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {press.publication}
                  </span>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: '1.5rem',
                      lineHeight: 1.25,
                      color: 'var(--text-main)',
                      marginBottom: '1rem',
                    }}
                  >
                    {press.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      color: 'var(--accent-cream)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                      borderLeft: '2px solid var(--accent-gold)',
                      paddingLeft: '1rem',
                    }}
                  >
                    {press.snippet}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>By {press.author}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading Modal */}
      {selectedPress && (
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
            onClick={() => setSelectedPress(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 5, 8, 0.9)',
              backdropFilter: 'blur(12px)',
            }}
          />

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '750px',
              maxHeight: '85vh',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lux)',
              zIndex: 1110,
            }}
          >
            <button
              onClick={() => setSelectedPress(null)}
              aria-label="Close article"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                padding: '0.5rem',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                color: 'var(--text-main)',
              }}
            >
              <X size={18} />
            </button>

            <span className="art-badge" style={{ marginBottom: '0.75rem' }}>
              {selectedPress.publication} • {selectedPress.date}
            </span>

            <h2 className="font-serif" style={{ fontSize: '2rem', lineHeight: 1.25, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {selectedPress.title}
            </h2>

            <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)', marginBottom: '2rem' }}>
              Written by {selectedPress.author}
            </div>

            <div
              style={{
                borderLeft: '3px solid var(--accent-gold)',
                paddingLeft: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--accent-cream)',
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}
            >
              {selectedPress.snippet}
            </div>

            <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.98rem', whiteSpace: 'pre-line' }}>
              {selectedPress.fullContent}
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Archived in Aurelia Vance Media Dossier
              </span>
              <button onClick={() => setSelectedPress(null)} className="btn-gold" style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}>
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
