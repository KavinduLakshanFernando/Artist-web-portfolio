'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Calendar, MapPin, Play, Pause, Volume2, ArrowRight } from 'lucide-react';
import { EXHIBITIONS_DATA, DISCUSSIONS_DATA } from '../../data/portfolioData';

export default function ExhibitionPage() {
  const [playingDiscussionId, setPlayingDiscussionId] = useState<string | null>(null);
  const [exhibitionTab, setExhibitionTab] = useState<'all' | 'upcoming' | 'current' | 'past'>('all');

  const filteredExhibitions = EXHIBITIONS_DATA.filter((ex) => {
    if (exhibitionTab === 'all') return true;
    return ex.type === exhibitionTab;
  });

  const togglePlay = (id: string) => {
    setPlayingDiscussionId(playingDiscussionId === id ? null : id);
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '850px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>INSTITUTIONAL CURATION</span>
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
              Exhibitions & Curatorial Discussions
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Survey of global museum installations, institutional retrospectives, and recorded critical dialogues with leading curators and art theorists.
            </p>
          </div>
        </div>
      </section>

      {/* Part 1: Discussions & Interviews (Highlighted prominently as requested!) */}
      <section style={{ paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: '#fcfbfa' }}>
        <div className="site-container">
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>
              SOUND ARCHIVE & TRANSCRIPTS
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
              Critical Dialogues & Artist Interviews
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Listen to selected recorded discussions or explore in-depth transcripts discussing pigment chemistry, spatial memory, and contemporary aesthetics.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {DISCUSSIONS_DATA.map((disc) => {
              const isPlaying = playingDiscussionId === disc.id;
              return (
                <div
                  key={disc.id}
                  className="glass-panel-gold"
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.75rem)',
                    borderRadius: '8px',
                    position: 'relative',
                  }}
                >
                  {/* Top Header of Discussion */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      borderBottom: '1px solid var(--border-light)',
                      paddingBottom: '1.25rem',
                    }}
                  >
                    <div>
                      <span className="art-badge" style={{ marginBottom: '0.4rem' }}>
                        {disc.platform}
                      </span>
                      <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--text-main)' }}>
                        {disc.title}
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)' }}>
                        In Conversation with {disc.interviewer} ({disc.role}) • {disc.date}
                      </span>
                    </div>

                    {/* Interactive Audio Player Pill */}
                    <button
                      onClick={() => togglePlay(disc.id)}
                      className={isPlaying ? 'btn-gold' : 'btn-outline'}
                      style={{
                        padding: '0.7rem 1.4rem',
                        fontSize: '0.8rem',
                      }}
                    >
                      {isPlaying ? (
                        <>
                          <Pause size={15} />
                          <span>Playing Audio Session</span>
                        </>
                      ) : (
                        <>
                          <Play size={15} />
                          <span>Listen Discussion ({disc.duration})</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Audio Waveform visualization if playing */}
                  {isPlaying && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '1rem 1.5rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(201, 168, 76, 0.1)',
                        border: '1px solid var(--border-gold)',
                        marginBottom: '2rem',
                      }}
                    >
                      <Volume2 size={20} style={{ color: 'var(--accent-gold)' }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', marginRight: '1rem', fontWeight: 600 }}>
                        PLAYING SESSION [AUDIO ARCHIVE STREAM]
                      </span>
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className="sound-bar"
                          style={{
                            animationDelay: `${(i % 5) * 0.2}s`,
                            animationDuration: `${0.8 + (i % 4) * 0.25}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Highlight Quote */}
                  <div
                    style={{
                      borderLeft: '3px solid var(--accent-gold)',
                      paddingLeft: '1.5rem',
                      marginBottom: '2rem',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontStyle: 'italic',
                      color: 'var(--accent-cream)',
                      lineHeight: 1.5,
                    }}
                  >
                    {disc.keyQuote}
                  </div>

                  {/* Transcript Excerpts */}
                  <div
                    style={{
                      backgroundColor: '#f8f7f4',
                      borderRadius: '8px',
                      padding: '1.75rem',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                    }}
                  >
                    <span className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--text-subtle)' }}>
                      VERBATIM TRANSCRIPT EXCERPT
                    </span>
                    {disc.transcriptExcerpt.map((turn, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                        <span
                          style={{
                            color: turn.speaker === 'Aurelia Vance' ? 'var(--accent-gold-light)' : 'var(--text-main)',
                            fontWeight: 600,
                          }}
                        >
                          {turn.speaker}:
                        </span>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>
                          {turn.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Part 2: Exhibitions Listing (Upcoming, Current, Past) */}
      <section style={{ paddingTop: '6rem' }}>
        <div className="site-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>
                GLOBAL PROGRAMMING
              </span>
              <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '0.35rem' }}>
                Exhibition Schedule & Retrospectives
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(
                [
                  { id: 'all', label: 'All Exhibitions' },
                  { id: 'upcoming', label: 'Upcoming' },
                  { id: 'current', label: 'Current' },
                  { id: 'past', label: 'Past Archives' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setExhibitionTab(tab.id)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    border: exhibitionTab === tab.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                    backgroundColor: exhibitionTab === tab.id ? 'var(--accent-gold-dim)' : 'transparent',
                    color: exhibitionTab === tab.id ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {filteredExhibitions.map((ex) => (
              <div
                key={ex.id}
                className="glass-panel"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2.5rem',
                  padding: '2.25rem',
                  alignItems: 'center',
                  borderRadius: '8px',
                }}
              >
                {/* Photo */}
                <div
                  className="art-frame"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '280px',
                    borderRadius: '6px',
                  }}
                >
                  <Image src={ex.image} alt={ex.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 40vw" />
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(10, 10, 13, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--accent-gold-light)',
                      border: '1px solid var(--border-gold)',
                    }}
                  >
                    {ex.status}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                    <MapPin size={16} />
                    <span>{ex.venue} • {ex.city}, {ex.country}</span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
                    {ex.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <Calendar size={15} style={{ color: 'var(--accent-gold)' }} />
                    <span>{ex.dates}</span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                    {ex.description}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/publications" className="btn-gold" style={{ fontSize: '0.78rem', padding: '0.65rem 1.25rem' }}>
                      <span>View Exhibition Catalog</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact" className="btn-outline" style={{ fontSize: '0.78rem', padding: '0.65rem 1.25rem' }}>
                      <span>VIP Preview Inquiry</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
