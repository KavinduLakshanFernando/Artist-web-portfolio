'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  LayoutGrid,
  Columns3,
  Eye,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { GALLERY_IMAGES_DATA, GalleryItem } from '../../data/portfolioData';
import ImageLightbox from '../../components/ImageLightbox';

type CategoryFilter = 'all' | 'pencil' | 'painting' | 'photography';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'reverse-scroll'>('grid');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isAutoGliding, setIsAutoGliding] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0); // Moderately fast, smooth pace

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const autoGlideDir = useRef(1);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);

  const filteredItems = GALLERY_IMAGES_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Distribute filtered items across 3 horizontal streams
  const row1 = filteredItems.filter((_, i) => i % 3 === 0);
  const row2 = filteredItems.filter((_, i) => i % 3 === 1);
  const row3 = filteredItems.filter((_, i) => i % 3 === 2);

  const [rowTravel, setRowTravel] = useState({ row1: 2800, row2: 2400, row3: 2400 });

  // Measure full horizontal width of tracks to ensure all artworks scroll completely into view
  useEffect(() => {
    const updateWidths = () => {
      const containerW = gridContainerRef.current?.clientWidth || 1100;
      const w1 = row1Ref.current?.scrollWidth || (row1.length * 220);
      const w2 = row2Ref.current?.scrollWidth || (row2.length * 220);
      const w3 = row3Ref.current?.scrollWidth || (row3.length * 220);

      setRowTravel({
        row1: Math.max(100, w1 - containerW + 40),
        row2: Math.max(100, w2 - containerW + 40),
        row3: Math.max(100, w3 - containerW + 40),
      });
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    const timer = setTimeout(updateWidths, 300);
    return () => {
      window.removeEventListener('resize', updateWidths);
      clearTimeout(timer);
    };
  }, [row1.length, row2.length, row3.length, viewMode]);

  // Wheel listener for horizontal reverse streams
  useEffect(() => {
    if (viewMode !== 'reverse-scroll') return;
    const grid = gridContainerRef.current;
    if (!grid) return;

    const handleWheel = (e: WheelEvent) => {
      const atTop = scrollProgress <= 0.005 && (e.deltaY < 0 || e.deltaX < 0);
      const atBottom = scrollProgress >= 0.995 && (e.deltaY > 0 || e.deltaX > 0);

      if (!atTop && !atBottom) {
        e.preventDefault();
        e.stopPropagation();
        const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const delta = primaryDelta * 0.0003;
        setScrollProgress((prev) => Math.max(0, Math.min(1, prev + delta)));
      }
    };

    grid.addEventListener('wheel', handleWheel, { passive: false });
    return () => grid.removeEventListener('wheel', handleWheel);
  }, [viewMode, scrollProgress]);

  // Reduced Speed Auto-Glide loop (User requested slow, tranquil gliding)
  useEffect(() => {
    if (viewMode !== 'reverse-scroll' || !isAutoGliding || isHovered || isDragging) return;

    let rafId: number;
    // Moderately fast, smooth and lively flow pace: 0.00018
    const baseSpeed = 0.00018;
    const glideSpeed = baseSpeed * speedMultiplier;

    const tick = () => {
      setScrollProgress((prev) => {
        let next = prev + glideSpeed * autoGlideDir.current;
        if (next >= 1) {
          next = 1;
          autoGlideDir.current = -1; // smoothly reverse direction
        } else if (next <= 0) {
          next = 0;
          autoGlideDir.current = 1;
        }
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [viewMode, isAutoGliding, isHovered, isDragging, speedMultiplier]);

  // Pointer drag support (Horizontal drag)
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartProgress.current = scrollProgress;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = dragStartX.current - e.clientX;
    const travel = rowTravel.row1 || 2400;
    const deltaProgress = deltaX / travel;
    setScrollProgress(Math.max(0, Math.min(1, dragStartProgress.current + deltaProgress)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // True Horizontal Reverse Offsets:
  // Row 1 & 3 glide to the LEFT: from 0px to -rowTravel
  // Row 2 glides in REVERSE to the RIGHT: from -rowTravel to 0px
  const row1Offset = -scrollProgress * rowTravel.row1;
  const row2Offset = -(1 - scrollProgress) * rowTravel.row2;
  const row3Offset = -scrollProgress * rowTravel.row3;

  const countForCategory = (cat: CategoryFilter) => {
    if (cat === 'all') return GALLERY_IMAGES_DATA.length;
    return GALLERY_IMAGES_DATA.filter((it) => it.category === cat).length;
  };

  return (
    <div style={{ paddingBottom: '7rem', backgroundColor: '#fcfbfa', minHeight: '100vh' }}>
      {/* Editorial Gallery Header */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-light)', backgroundColor: '#ffffff' }}>
        <div className="site-container">
          <div style={{ maxWidth: '880px' }}>
            <span className="art-badge" style={{ marginBottom: '1rem' }}>
              <Sparkles size={12} />
              <span>VISUAL ART CATALOGUE</span>
            </span>
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                color: 'var(--text-main)',
                marginBottom: '1rem',
              }}
            >
              Gallery Showcase
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              A pure visual exhibition of 40 fine art works across Pencil Art, Painting Art, and Fine Art Photography. Select any artwork to view in full resolution.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and View Mode Switcher */}
      <section style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-light)', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="site-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            {/* Category Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(
                [
                  { id: 'all', label: 'All Works' },
                  { id: 'pencil', label: 'Pencil Art' },
                  { id: 'painting', label: 'Painting Art' },
                  { id: 'photography', label: 'Photography' },
                ] as const
              ).map((tab) => {
                const isActive = activeCategory === tab.id;
                const count = countForCategory(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: isActive ? '1px solid #d4af37' : '1px solid var(--border-light)',
                      backgroundColor: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                      color: isActive ? '#a67c1e' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '9999px',
                        backgroundColor: isActive ? 'rgba(212, 175, 55, 0.25)' : 'rgba(0,0,0,0.06)',
                        color: isActive ? '#855f10' : 'var(--text-subtle)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: viewMode === 'grid' ? '1px solid #d4af37' : '1px solid var(--border-light)',
                  backgroundColor: viewMode === 'grid' ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  color: viewMode === 'grid' ? '#855f10' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <LayoutGrid size={16} />
                <span>Gallery Grid</span>
              </button>

              <button
                onClick={() => setViewMode('reverse-scroll')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: viewMode === 'reverse-scroll' ? '1px solid #d4af37' : '1px solid var(--border-light)',
                  backgroundColor: viewMode === 'reverse-scroll' ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  color: viewMode === 'reverse-scroll' ? '#855f10' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Columns3 size={16} />
                <span>Reverse Scroll</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Exhibition View */}
      <section style={{ paddingTop: '2.5rem' }}>
        <div className="site-container">
          
          {/* 1. GALLERY GRID VIEW - PURE IMAGES ONLY, NO DESCRIPTION, NO PRICES */}
          {viewMode === 'grid' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 5',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#e8e6df',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.16)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Subtle Category Badge on Corner */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      zIndex: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#1a1918',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.categoryLabel}
                  </div>

                  {/* Clean Hover Overlay with Inspect Eye */}
                  <div
                    className="gallery-hover-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.25s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1a1918',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Eye size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. HORIZONTAL REVERSE STREAMS VIEW - PURE VISUALS, REDUCED SPEED, NO PRICES */}
          {viewMode === 'reverse-scroll' && (
            <div style={{ position: 'relative', width: '100%', borderRadius: '16px', background: '#f5f4ef', border: '1px solid var(--border-light)', padding: '1.25rem', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
              
              {/* Interactive Control Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: '#ffffff',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '180px' }}>
                  <SlidersHorizontal size={14} style={{ color: '#855f10' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1918' }}>
                    Horizontal Flow: {Math.round(scrollProgress * 100)}%
                  </span>
                </div>

                {/* Range Scrubber */}
                <div style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.68rem', color: '#8c887b', fontWeight: 600 }}>START</span>
                  <input
                    type="range"
                    className="reverse-scrubber"
                    min="0"
                    max="1"
                    step="0.001"
                    value={scrollProgress}
                    onChange={(e) => setScrollProgress(parseFloat(e.target.value))}
                    aria-label="Horizontal gallery scrubber"
                  />
                  <span style={{ fontSize: '0.68rem', color: '#8c887b', fontWeight: 600 }}>END ({filteredItems.length})</span>
                </div>

                {/* Action buttons with Speed Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {/* Speed Selector (Reduced slow pace by default) */}
                  <button
                    type="button"
                    onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 0.6 : 1))}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: '#f6f5f0',
                      color: '#855f10',
                      border: '1px solid rgba(133, 95, 16, 0.25)',
                      cursor: 'pointer',
                    }}
                    title="Toggle flow speed"
                  >
                    Speed: {speedMultiplier === 1 ? 'Smooth' : speedMultiplier === 1.5 ? 'Fast (1.5x)' : 'Slow (0.6x)'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAutoGliding((prev) => !prev)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: isAutoGliding ? '#855f10' : '#ffffff',
                      color: isAutoGliding ? '#ffffff' : '#1a1918',
                      border: '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    title={isAutoGliding ? 'Pause flow' : 'Start auto flow'}
                  >
                    {isAutoGliding ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isAutoGliding ? 'Auto Gliding' : 'Paused'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScrollProgress((p) => Math.max(0, p - 0.12))}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: '#1a1918',
                      border: '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                    title="Glide Left"
                  >
                    <ChevronLeft size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setScrollProgress((p) => Math.min(1, p + 0.12))}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: '#1a1918',
                      border: '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                    title="Glide Right"
                  >
                    <ChevronRight size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setScrollProgress(0)}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: '#68645e',
                      border: '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                    title="Reset to Start"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>

              {/* 3 Horizontal Stream Tracks - Gliding in Alternating Reverse Directions */}
              <div
                className="horizontal-streams-container"
                ref={gridContainerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  touchAction: 'none',
                }}
              >
                {/* Track 1 (Row 1): Glides to the LEFT */}
                <div
                  ref={row1Ref}
                  className="horizontal-stream-track"
                  style={{
                    transform: `translate3d(${row1Offset}px, 0, 0)`,
                    transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {row1.map((item) => (
                    <div
                      key={item.id}
                      className="horizontal-art-card"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="horizontal-art-imgwrap">
                        <Image src={item.image} alt={item.title} fill unoptimized style={{ objectFit: 'cover' }} sizes="220px" />
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.55rem',
                            left: '0.55rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(15, 15, 20, 0.72)',
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff',
                            fontSize: '0.62rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.categoryLabel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Track 2 (Row 2): TRUE REVERSE! Glides in opposite direction to the RIGHT */}
                <div
                  ref={row2Ref}
                  className="horizontal-stream-track"
                  style={{
                    transform: `translate3d(${row2Offset}px, 0, 0)`,
                    transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {row2.map((item) => (
                    <div
                      key={item.id}
                      className="horizontal-art-card"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="horizontal-art-imgwrap">
                        <Image src={item.image} alt={item.title} fill unoptimized style={{ objectFit: 'cover' }} sizes="220px" />
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.55rem',
                            left: '0.55rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(15, 15, 20, 0.72)',
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff',
                            fontSize: '0.62rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.categoryLabel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Track 3 (Row 3): Glides to the LEFT */}
                <div
                  ref={row3Ref}
                  className="horizontal-stream-track"
                  style={{
                    transform: `translate3d(${row3Offset}px, 0, 0)`,
                    transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {row3.map((item) => (
                    <div
                      key={item.id}
                      className="horizontal-art-card"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="horizontal-art-imgwrap">
                        <Image src={item.image} alt={item.title} fill unoptimized style={{ objectFit: 'cover' }} sizes="220px" />
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.55rem',
                            left: '0.55rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(15, 15, 20, 0.72)',
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff',
                            fontSize: '0.62rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.categoryLabel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom hint */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.75rem',
                  fontSize: '0.72rem',
                  color: '#68645e',
                }}
              >
                <span>
                  Showing <strong>{filteredItems.length} Artworks</strong> across 3 horizontal reverse streams • Pure visual exhibition
                </span>
                <span>
                  Slow tranquil pace • Hover any artwork to pause • Click to open 4K lightbox
                </span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Pure Image Lightbox - No Description, No Price */}
      <ImageLightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={(newItem) => setSelectedItem(newItem)}
      />
    </div>
  );
}
