'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Award, MapPin, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  const TIMELINE = [
    {
      year: '2026',
      title: 'Palais de Tokyo Retrospective & Thames & Hudson Monograph',
      location: 'Paris, France',
      desc: 'Mid-career survey exhibition spanning ten years of work across painting, bronze sculpture, and cyanotypes. Release of the definitive 368-page hardbound monograph "Chronicles of Lumen".',
    },
    {
      year: '2024',
      title: 'Venice Biennale Collateral Pavilion & Special Mention',
      location: 'Venice, Italy',
      desc: 'Selected to present site-specific tidal water and gold-leaf architectural installations at Campo San Maurizio during the 60th International Art Exhibition.',
    },
    {
      year: '2022 – 2023',
      title: 'Villa Kujoyama Laureate Residency',
      location: 'Kyoto, Japan',
      desc: '12-month research residency investigating Japanese mineral nihonga pigments, charcoal casting, and handmade kozo paper architectures.',
    },
    {
      year: '2019 – 2021',
      title: 'The Tectonic Series & Etna Fieldwork',
      location: 'Sicily & Paris',
      desc: 'Formulated ground-breaking cold-wax techniques incorporating harvested volcanic basalt ash and raw cinnabar pigments on monumental Belgian linen.',
    },
    {
      year: '2014 – 2018',
      title: 'Atelier Montmartre Establishment & École des Beaux-Arts',
      location: 'Paris, France',
      desc: 'Graduated with Highest Honors (Félicitations du Jury) from École Nationale Supérieure des Beaux-Arts de Paris under Christian Boltanski.',
    },
  ];

  const MUSEUM_COLLECTIONS = [
    'Fondation Beyeler, Riehen / Basel',
    'Palais de Tokyo Contemporary Collection, Paris',
    'Mori Art Museum, Tokyo',
    'Hayward Modern Collection, London',
    'The Moreau Foundation of Contemporary Art, Zurich',
    'The Gwangju Art Foundation, South Korea',
  ];

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {/* Editorial Header */}
      <section style={{ paddingTop: '3rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '820px' }}>
            <span className="art-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              <span>BIOGRAPHY & PHILOSOPHY</span>
            </span>
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: 'var(--text-main)',
                marginBottom: '1.5rem',
              }}
            >
              Aurelia Vance
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                color: 'var(--accent-cream)',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}
            >
              “In an era seduced by weightless screens, I choose the stubborn density of stone, the sacred shimmer of beaten gold, and the slow drying of linseed oil under winter sunlight.”
            </p>
          </div>
        </div>
      </section>

      {/* Main Biography & Studio Layout */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4.5rem',
              alignItems: 'start',
            }}
          >
            {/* Atelier Image & Specs */}
            <div>
              <div
                className="art-frame"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  borderRadius: '6px',
                  border: '1px solid var(--border-gold)',
                  marginBottom: '2rem',
                }}
              >
                <Image
                  src="/images/artist_portrait.jpg"
                  alt="Aurelia Vance in studio"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Studio Info Card */}
              <div
                className="glass-panel-gold"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    Atelier Montmartre // 14 Rue Lepic, Paris
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Housed in a preserved 19th-century timber-framed atelier overlooking Paris rooftops. Visitors and collectors received strictly by advance appointment.
                </p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                  <Link href="/contact" className="btn-outline" style={{ width: '100%', fontSize: '0.75rem', padding: '0.65rem' }}>
                    <span>Request Studio Visit Appointment</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Narrative Bio */}
            <div>
              <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.75rem' }}>
                THE ARTISTIC JOURNEY
              </span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.2, marginBottom: '2rem' }}>
                Between Byzantine Alchemy & Brutalist Space
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                <p>
                  Born in Lyon to a family of restorers and bookbinders, Aurelia Vance grew up surrounded by aged vellum, rabbit-skin glue, and the scent of dammar varnish. After classical training at the École Nationale Supérieure des Beaux-Arts in Paris, she rejected the prevailing trends of conceptual dematerialization to pioneer a profound physical engagement with matter.
                </p>
                <p>
                  Her signature practice involves gathering raw geological minerals from historic quarries across Europe and Central Asia: lapis lazuli from Badakhshan, green malachite, cinnabar, and volcanic ash from Mount Etna. Using heavy glass mullers on granite slabs, she grinds her own pigments by hand, preserving crystalline refractive facets that industrial factory mills destroy.
                </p>
                <p>
                  Over the past decade, Vance’s works have expanded into monumental scale: multi-paneled canvases exceeding three meters in width, freestanding blackened bronze cast partitions, and ethereal large-format botanical cyanotypes exposed under high-altitude alpine solar rays.
                </p>
                <p>
                  Her works are held in permanent collections across the world, including the Fondation Beyeler in Basel, the Mori Art Museum in Tokyo, and prestigious private estates across Zurich, London, and New York.
                </p>
              </div>

              {/* Downloadable Dossier Button */}
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="/images/hero_masterpiece.jpg"
                  download="Aurelia_Vance_Curatorial_Dossier_2026.pdf"
                  className="btn-gold"
                  style={{ display: 'inline-flex' }}
                >
                  <Download size={15} />
                  <span>Download Complete Artist Dossier & CV (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Timeline */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', backgroundColor: '#ffffff', borderTop: '1px solid var(--border-light)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '640px', marginBottom: '4rem' }}>
            <span className="font-display" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>
              CHRONOLOGY
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
              Milestones & Residencies
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}>
            {TIMELINE.map((item, index) => (
              <div
                key={index}
                className="glass-panel"
                style={{
                  padding: '2rem 2.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  alignItems: 'start',
                  borderLeft: '3px solid var(--accent-gold)',
                }}
              >
                <div>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold-light)',
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.year}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                    {item.location}
                  </span>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <h3 className="font-serif" style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permanent Museum Collections */}
      <section style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <Award size={28} style={{ color: 'var(--accent-gold)', margin: '0 auto 1rem', display: 'block' }} />
            <h2 className="font-serif" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
              Permanent Museum & Public Collections
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Works by Aurelia Vance are conserved in leading institutional archives and public foundations globally.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {MUSEUM_COLLECTIONS.map((museum, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <ShieldCheck size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-main)' }}>
                  {museum}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link href="/gallery" className="btn-gold" style={{ display: 'inline-flex' }}>
              <span>Explore Gallery of Works</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
