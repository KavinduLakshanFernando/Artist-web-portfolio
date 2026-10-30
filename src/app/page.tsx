'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Eye,
  ChevronDown,
  ExternalLink,
  ShoppingBag,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  Layers,
  Calendar,
  Palette,
  BookOpen,
  Newspaper,
  ArrowUp,
} from 'lucide-react';
import {
  ARTWORKS_DATA,
  Artwork,
  GALLERY_IMAGES_DATA,
  GalleryItem
} from '../data/portfolioData';
import ArtworkModal from '../components/ArtworkModal';
import ImageLightbox from '../components/ImageLightbox';
import { useCart } from '../context/CartContext';

const SECTIONS = [
  { id: 'one', title: '01 // Atelier Hero', anchor: 'one', label: 'Hero', theme: 'dark', color: '#0a0a0d' },
  { id: 'two', title: '02 // Masterwork Luminescence', anchor: 'two', label: 'Luminescence', theme: 'light', color: '#f8f7f4' },
  { id: 'three', title: '03 // Masterwork Earth & Ash', anchor: 'three', label: 'Earth & Ash', theme: 'dark', color: '#363738' },
  { id: 'four', title: '04 // Reverse Scroll Gallery', anchor: 'four', label: 'Gallery', theme: 'light', color: '#f8f7f4' },
  { id: 'five', title: '05 // Philosophy & Atelier', anchor: 'five', label: 'Manifesto', theme: 'dark', color: '#191a1e' },
  { id: 'six', title: '06 // Liaison & Archive Hub', anchor: 'six', label: 'Liaison & Hub', theme: 'light', color: '#eae8e3' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const { addToCart } = useCart();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const [galleryProgress, setGalleryProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAutoGliding, setIsAutoGliding] = useState(true);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0); // Moderately fast, smooth pace
  const [rowTravel, setRowTravel] = useState({ row1: 2800, row2: 2400, row3: 2400 });

  const autoGlideDir = useRef(1); // 1 = forward, -1 = backward
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);

  // Full-page One-Scroll Controller Refs
  const isTransitioningRef = useRef(false);
  const activeSectionRef = useRef(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const scrollRafRef = useRef<number | null>(null);

  // Synchronize ref with activeSection state
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Clean up any in-flight scroll animation frame on unmount
  useEffect(() => {
    return () => {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  // Reverse Scroll 3 horizontal stream items populated from 40 gallery images
  const row1Items = GALLERY_IMAGES_DATA.filter((_, i) => i % 3 === 0);
  const row2Items = GALLERY_IMAGES_DATA.filter((_, i) => i % 3 === 1);
  const row3Items = GALLERY_IMAGES_DATA.filter((_, i) => i % 3 === 2);

  // Measure full horizontal width of tracks to ensure all 40 images scroll completely into view
  useEffect(() => {
    const updateWidths = () => {
      const containerW = gridContainerRef.current?.clientWidth || 1100;
      const w1 = row1Ref.current?.scrollWidth || (row1Items.length * 220);
      const w2 = row2Ref.current?.scrollWidth || (row2Items.length * 220);
      const w3 = row3Ref.current?.scrollWidth || (row3Items.length * 220);

      setRowTravel({
        row1: Math.max(100, w1 - containerW + 40),
        row2: Math.max(100, w2 - containerW + 40),
        row3: Math.max(100, w3 - containerW + 40),
      });
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    const timer = setTimeout(updateWidths, 350);
    return () => {
      window.removeEventListener('resize', updateWidths);
      clearTimeout(timer);
    };
  }, [row1Items.length, row2Items.length, row3Items.length]);

  // Custom Graceful Ease-InOut Smooth Scroll with adjustable slower speed (1150ms)
  const smoothScrollTo = (targetY: number, duration = 1150) => {
    if (typeof window === 'undefined') return;

    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    const startTime = performance.now();

    // Slower, graceful cubic ease-in-out curve
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        scrollRafRef.current = requestAnimationFrame(step);
      } else {
        scrollRafRef.current = null;
      }
    };

    scrollRafRef.current = requestAnimationFrame(step);
  };

  // Smoothly glide directly to a specific section by index (with slower graceful pace)
  const scrollToSection = (index: number) => {
    if (typeof window === 'undefined') return;

    const maxIndex = SECTIONS.length; // 0..5: Sections, 6: Footer
    const target = Math.max(0, Math.min(maxIndex, index));
    isTransitioningRef.current = true;

    const isMobile = window.innerWidth <= 900;
    // Slower, dignified pace: 1150ms on desktop, 650ms on mobile
    const SCROLL_DURATION = isMobile ? 650 : 1150;

    if (target < SECTIONS.length) {
      if (isMobile) {
        const targetEl = document.getElementById(SECTIONS[target].id);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - 65; // offset for fixed mobile header
          smoothScrollTo(targetY, SCROLL_DURATION);
        } else {
          smoothScrollTo(target * window.innerHeight, SCROLL_DURATION);
        }
      } else {
        const targetY = target * window.innerHeight;
        smoothScrollTo(targetY, SCROLL_DURATION);
      }
      setActiveSection(target);
      setIsAtBottom(false);
      window.history.replaceState(null, '', `#${SECTIONS[target].anchor}`);
    } else {
      // Transition to Footer
      smoothScrollTo(document.documentElement.scrollHeight, SCROLL_DURATION);
      setIsAtBottom(true);
    }

    // Cooldown duration matches smooth scroll easing curve
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, SCROLL_DURATION + 50);
  };

  // Check URL hash on initial load (e.g. #one, #two, #three...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = SECTIONS.findIndex((s) => s.anchor === hash || s.id === hash);
        if (found !== -1) {
          setTimeout(() => {
            scrollToSection(found);
          }, 200);
        }
      }
    }
  }, []);

  // Track active section on window scroll (sync fallback when user drags scrollbar or scrolls on mobile)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 180;
      setIsAtBottom(atBottom);

      if (window.innerWidth <= 900) {
        // Mobile: Detect active section based on real DOM position
        let currentIdx = 0;
        for (let i = 0; i < SECTIONS.length; i++) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
              currentIdx = i;
            }
          }
        }
        if (currentIdx !== activeSectionRef.current) {
          setActiveSection(currentIdx);
        }
      } else {
        // Desktop: 100vh calculations
        const sectionHeight = window.innerHeight;
        if (!isTransitioningRef.current && !atBottom) {
          const index = Math.min(
            SECTIONS.length - 1,
            Math.max(0, Math.round(scrollPos / sectionHeight))
          );
          if (index !== activeSectionRef.current) {
            setActiveSection(index);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Single Scroll Wheel Controller: 1 Scroll Tick = 1 Full Section Transition (Desktop only)
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      // Allow natural scrolling on touch devices or smaller viewports
      if (typeof window !== 'undefined' && window.innerWidth <= 900) return;

      // If modal or lightbox is open, allow normal scrolling inside modal
      if (selectedArtwork || selectedGalleryItem) return;

      // Ignore predominantly horizontal gestures (e.g. 2-finger sideways trackpad swipes)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) return;

      // Minimum sensitivity threshold to avoid jittery trackpad noise
      if (Math.abs(e.deltaY) < 18) return;

      // Prevent native incremental pixel-by-pixel scrolling so section doesn't get stuck halfway
      e.preventDefault();

      // If already animating to a section, ignore further momentum wheel ticks
      if (isTransitioningRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const current = activeSectionRef.current;

      if (isAtBottom) {
        if (direction < 0) {
          // Scroll up from footer back into Section 06
          scrollToSection(SECTIONS.length - 1);
        }
        return;
      }

      // If at last section (index 5) and scrolling down, glide to footer (index 6)
      // Otherwise glide to next/previous section
      const nextTarget = current + direction;
      scrollToSection(nextTarget);
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, [selectedArtwork, selectedGalleryItem, isAtBottom]);

  // Touch Gesture Controller (Desktop trackpad / large screens only; mobile uses natural native touch scroll)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
      if (selectedArtwork || selectedGalleryItem) return;
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
      if (selectedArtwork || selectedGalleryItem) return;
      if (isTransitioningRef.current) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;

      // Require significant vertical movement (45px) and mostly vertical angle
      if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2) {
        const direction = deltaY > 0 ? 1 : -1;
        const current = activeSectionRef.current;

        if (isAtBottom) {
          if (direction < 0) {
            scrollToSection(SECTIONS.length - 1);
          }
          return;
        }

        scrollToSection(current + direction);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedArtwork, selectedGalleryItem, isAtBottom]);

  // Section 04 horizontal stream scrub via trackpad horizontal gestures
  useEffect(() => {
    const grid = gridContainerRef.current;
    if (!grid) return;

    const handleGridHorizontalWheel = (e: WheelEvent) => {
      // Only process horizontal scroll gestures on Section 4
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaX * 0.0003;
        setGalleryProgress((prev) => Math.max(0, Math.min(1, prev + delta)));
      }
    };

    grid.addEventListener('wheel', handleGridHorizontalWheel, { passive: false });
    return () => grid.removeEventListener('wheel', handleGridHorizontalWheel);
  }, []);

  // Reduced Speed Auto-glide animation: slowly floats the horizontal streams in reverse directions
  // Automatically pauses when hovered so users can inspect artworks comfortably
  useEffect(() => {
    if (!isAutoGliding || isGalleryHovered || isDragging || activeSection !== 3) return;

    let rafId: number;
    // Moderately fast, smooth and lively flow pace: 0.00018
    const baseSpeed = 0.00018;
    const glideSpeed = baseSpeed * speedMultiplier;

    const tick = () => {
      setGalleryProgress((prev) => {
        let next = prev + glideSpeed * autoGlideDir.current;
        if (next >= 1) {
          next = 1;
          autoGlideDir.current = -1; // Reverse glide direction at end
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
  }, [isAutoGliding, isGalleryHovered, isDragging, activeSection, speedMultiplier]);

  // Synchronize document section theme (dark/light) and URL hash
  useEffect(() => {
    const sec = SECTIONS[activeSection];
    if (sec) {
      document.body.setAttribute('data-section-theme', sec.theme);
      if (typeof window !== 'undefined') {
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash !== sec.anchor) {
          window.history.replaceState(null, '', `#${sec.anchor}`);
        }
      }
    }
    return () => {
      document.body.removeAttribute('data-section-theme');
    };
  }, [activeSection]);

  // Keyboard navigation (ArrowDown, ArrowUp, PageDown, PageUp, Space, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (selectedArtwork || selectedGalleryItem) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        if (!isTransitioningRef.current) {
          const current = activeSectionRef.current;
          if (!isAtBottom) {
            scrollToSection(current + 1);
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        if (!isTransitioningRef.current) {
          const current = activeSectionRef.current;
          if (isAtBottom) {
            scrollToSection(SECTIONS.length - 1);
          } else {
            scrollToSection(current - 1);
          }
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(SECTIONS.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtwork, selectedGalleryItem, isAtBottom]);

  // Pointer drag support for touch and mouse horizontal gliding
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartProgress.current = galleryProgress;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = dragStartX.current - e.clientX;
    const travel = rowTravel.row1 || 2400;
    const deltaProgress = deltaX / travel;
    setGalleryProgress(Math.max(0, Math.min(1, dragStartProgress.current + deltaProgress)));
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
  const row1Offset = -galleryProgress * rowTravel.row1;
  const row2Offset = -(1 - galleryProgress) * rowTravel.row2;
  const row3Offset = -galleryProgress * rowTravel.row3;

  // Track scroll progress percent for vertical rail
  const progressPercent = (activeSection / (SECTIONS.length - 1)) * 100;

  return (
    <>
      {/* ========================================================
          VERTICAL PROGRESS RAIL (Right Edge)
         ======================================================== */}
      <nav
        className="snap-progress-rail"
        aria-label="Section navigation rail"
        style={{
          opacity: isAtBottom || activeSection === 5 ? 0 : 1,
          pointerEvents: isAtBottom || activeSection === 5 ? 'none' : 'auto',
          transition: 'opacity 0.35s ease',
        }}
      >
        <div className="snap-track">
          <div className="snap-track-fill" style={{ height: `${progressPercent}%` }} />
        </div>

        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === idx;
          return (
            <a
              key={sec.id}
              href={`#${sec.anchor}`}
              className={`snap-nav-item ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(idx);
              }}
              aria-label={`Jump to ${sec.title}`}
            >
              <span className="snap-nav-label">
                #{sec.anchor} • {sec.label}
              </span>
              <div className="snap-nav-dot">
                <div className="snap-nav-dot-inner" />
              </div>
            </a>
          );
        })}
      </nav>

      {/* Floating Bottom Section Counter Badge */}
      <div
        className="bottom-counter-badge desktop-only"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2.5rem',
          zIndex: 850,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: SECTIONS[activeSection].theme === 'dark' ? 'rgba(15, 15, 19, 0.88)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '0.45rem 1.1rem',
          borderRadius: '9999px',
          border: SECTIONS[activeSection].theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid var(--border-light)',
          boxShadow: SECTIONS[activeSection].theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.45)' : '0 4px 16px rgba(0, 0, 0, 0.06)',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: SECTIONS[activeSection].theme === 'dark' ? '#d1d1d6' : 'var(--text-muted)',
          opacity: isAtBottom || activeSection === 5 ? 0 : 1,
          pointerEvents: isAtBottom || activeSection === 5 ? 'none' : 'auto',
          transition: 'all 0.35s ease',
        }}
      >
        <span style={{ color: '#d4af37' }}>0{activeSection + 1} / 0{SECTIONS.length}</span>
        <span>•</span>
        <span style={{ color: SECTIONS[activeSection].theme === 'dark' ? '#ffffff' : 'var(--text-main)' }}>
          {SECTIONS[activeSection].title.split('//')[1]}
        </span>
      </div>

      {/* ========================================================
          OVERLAPPING SECTION STACKING CONTAINER
         ======================================================== */}
      <div className="overlap-container" ref={wrapperRef}>

        {/* ========================================================
            SECTION 01 (#one): ATELIER HERO (Pencil Art Background)
            Theme: Dark (#0a0a0d)
           ======================================================== */}
        <section
          className={`overlap-section ${activeSection === 0 ? 'is-active' : ''}`}
          id="one"
          style={{
            position: 'sticky',
            backgroundImage: `linear-gradient(180deg, rgba(10, 10, 14, 0.75) 0%, rgba(12, 12, 16, 0.58) 45%, rgba(8, 8, 12, 0.8) 100%), url('/images/architectural_hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0a0a0d',
            color: '#ffffff',
          }}
        >
          <div className="site-container section-content-wrap hero-site-container" style={{ width: '100%' }}>
            
            {/* Top atelier badge */}
            <div className="reveal-content reveal-delay-1 hero-top-badge-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '0.75rem' }}>
              <span className="art-badge" style={{ background: 'rgba(212, 175, 55, 0.14)', borderColor: 'rgba(212, 175, 55, 0.45)', color: '#f3e5ab' }}>
                <Sparkles size={12} />
                <span>SOLO RETROSPECTIVE 2026–2027 • PALAIS DE TOKYO, PARIS</span>
              </span>
              <span className="hero-top-badge-sub" style={{ fontSize: '0.78rem', color: '#e6cb78', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                Contemporary Fine Art Atelier
              </span>
            </div>

            {/* Centered Main Headline & Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '920px',
                margin: '0 auto',
                padding: '1rem 0',
              }}
            >
              <h1
                className="font-serif reveal-content reveal-delay-2"
                style={{
                  fontSize: 'clamp(2.3rem, 5.2vw, 4.8rem)',
                  lineHeight: 1.08,
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginBottom: '1.25rem',
                  textShadow: '0 2px 28px rgba(0, 0, 0, 0.85)',
                }}
              >
                The Architecture of <span style={{ color: '#e6cb78', fontWeight: 600, textShadow: '0 0 35px rgba(230, 203, 120, 0.65)' }}>Light</span> & Raw Pigment.
              </h1>

              <p
                className="reveal-content reveal-delay-3"
                style={{
                  fontSize: 'clamp(0.92rem, 1.4vw, 1.15rem)',
                  lineHeight: 1.65,
                  color: '#e4e4e7',
                  maxWidth: '720px',
                  marginBottom: '2rem',
                  textShadow: '0 1px 16px rgba(0, 0, 0, 0.8)',
                }}
              >
                Monumental oil paintings, Florentine gold leaf, and mineral volcanic ash. Exploring the tension between geological permanence and atmospheric transience.
              </p>

              {/* Centered Call-To-Action Buttons */}
              <div
                className="reveal-content reveal-delay-4 hero-cta-group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={() => setSelectedArtwork(ARTWORKS_DATA[0])}
                  className="btn-gold"
                  style={{
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  <Eye size={16} />
                  <span>Inspect Masterworks</span>
                </button>

                <Link
                  href="/gallery"
                  className="btn-outline"
                  style={{
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.88rem',
                    color: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Scroll down indicator */}
              <div
                className="reveal-content reveal-delay-4"
                style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#e6cb78',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                }}
                onClick={() => scrollToSection(1)}
              >
                <span>Scroll Down to Masterpiece I</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 02 (#two): MASTERWORK SHOWCASE I - SALON EXHIBITION
            Palette: Pale Slate Linen (#ccd2d9)
            Concept: Palais de Tokyo Salon Wall, Stretched Canvas & Curatorial Placard
           ======================================================== */}
        <section
          className={`overlap-section ${activeSection === 1 ? 'is-active' : ''}`}
          id="two"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.65) 45%, rgba(255, 255, 255, 0.45) 80%, rgba(255, 255, 255, 0.65) 100%), url('/images/section2_paint_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#ffffff',
            color: '#1a1918',
          }}
        >
          <div className="site-container section-content-wrap">
            <div className="museum-salon-grid">
              {/* Left: Monumental Stretched Canvas & Authentic Museum Placard */}
              <div className="museum-canvas-wrap reveal-content reveal-delay-1">
                <div
                  className="museum-canvas-frame"
                  onClick={() => setSelectedArtwork(ARTWORKS_DATA[0])}
                  title="Click to explore 4K pigment surface in high resolution"
                >
                  <div className="museum-spotlight" />
                  
                  <Image
                    src="/images/hero_masterpiece.jpg"
                    alt="Luminescence No. VIII by Aurelia Vance"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />

                  {/* Top Left Gallery Exhibition Marker */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      background: 'rgba(20, 22, 26, 0.88)',
                      backdropFilter: 'blur(10px)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '2px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#e6cb78',
                      border: '1px solid rgba(230, 203, 120, 0.3)',
                      zIndex: 3,
                    }}
                  >
                    Salon d’Automne // Palais de Tokyo
                  </div>

                  {/* Interactive 4K Loupe Reticle Pin */}
                  <div className="museum-reticle-trigger">
                    <span className="reticle-pulse-dot" />
                    <span>Inspect 4K Pigment Detail</span>
                    <Eye size={13} style={{ color: '#e6cb78', marginLeft: '0.2rem' }} />
                  </div>

                  {/* Canvas Base Gilt Footnote */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(10,12,16,0.92), transparent)',
                      padding: '1.25rem 1rem 0.65rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      zIndex: 3,
                    }}
                  >
                    <span style={{ color: '#e6cb78', letterSpacing: '0.06em', fontWeight: 600 }}>
                      180 × 220 cm • Florentine 24K Leaf & Lapis Lazuli
                    </span>
                    <span style={{ opacity: 0.8, fontSize: '0.72rem' }}>
                      Tap to enter 4K viewing room
                    </span>
                  </div>
                </div>

                {/* Authentic Museum Gallery Cartouche / Placard */}
                <div className="museum-wall-placard reveal-content reveal-delay-2">
                  <div>
                    <span style={{ fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#855f10', fontWeight: 700, display: 'block' }}>
                      AURELIA VANCE (FRENCH, B. 1988)
                    </span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: '#121215' }}>
                      Luminescence No. VIII: The Architecture of Gold, 2024
                    </span>
                    <span style={{ display: 'block', fontSize: '0.74rem', color: '#55524c', marginTop: '0.15rem' }}>
                      Prussian oil impasto & 24k gold leaf on Belgian linen
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ display: 'block', fontSize: '0.68rem', color: '#7a766e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Cat. AV-2024-08
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#855f10', display: 'block' }}>
                      Rs. 38,000
                    </strong>
                  </div>
                </div>
              </div>

              {/* Right: Curatorial Monograph & Linear Spec Matrix */}
              <div>
                <div className="reveal-content reveal-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ width: '28px', height: '1px', backgroundColor: '#855f10' }} />
                  <span className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: '#855f10', fontWeight: 700, textTransform: 'uppercase' }}>
                    N° 01 • Masterwork Retrospective
                  </span>
                </div>

                <h2
                  className="font-serif reveal-content reveal-delay-2"
                  style={{
                    fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
                    lineHeight: 1.1,
                    fontWeight: 300,
                    color: '#121215',
                    marginBottom: '0.85rem',
                  }}
                >
                  Luminescence No. VIII
                  <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 400, color: '#383633', fontSize: '0.88em', marginTop: '0.15rem' }}>
                    The Architecture of Gold
                  </span>
                </h2>

                <p className="reveal-content reveal-delay-2" style={{ color: '#3d3a36', lineHeight: 1.65, fontSize: '0.92rem', marginBottom: '1rem' }}>
                  An exploration of subterranean light and celestial mineral strata. Using cold-pressed linseed oils and pure 24-karat Florentine gold leaf, the work shifts dynamically across daylight hours, capturing atmospheric luminescence.
                </p>

                {/* Curatorial Specification Matrix (Linear Gallery Style) */}
                <div className="museum-spec-sheet reveal-content reveal-delay-3">
                  <div className="monograph-spec-row">
                    <span style={{ color: '#6a6660', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Dimensions</span>
                    <strong style={{ color: '#16171a', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>180 × 220 cm (70.8 × 86.6 in)</strong>
                  </div>
                  <div className="monograph-spec-row">
                    <span style={{ color: '#6a6660', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Technique</span>
                    <strong style={{ color: '#16171a', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>24K Florentine Gold & Prussian Impasto</strong>
                  </div>
                  <div className="monograph-spec-row">
                    <span style={{ color: '#6a6660', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Acquisition</span>
                    <strong style={{ color: '#855f10', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>{ARTWORKS_DATA[0].price} • Available</strong>
                  </div>
                </div>

                {/* Curator Citation */}
                <div className="reveal-content reveal-delay-3" style={{ position: 'relative', paddingLeft: '1.25rem', borderLeft: '2px solid #855f10', marginBottom: '1.5rem' }}>
                  <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.96rem', color: '#383633', lineHeight: 1.5 }}>
                    “Vance commands raw pigment with volcanic urgency while maintaining an almost devotional reverence for classical gilding techniques.”
                  </p>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: '#7a766e', marginTop: '0.35rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    — Dr. Genevieve Laurent, Palais de Tokyo Curator
                  </span>
                </div>

                {/* Actions */}
                <div className="reveal-content reveal-delay-4 section-actions-row">
                  <button
                    onClick={() => setSelectedArtwork(ARTWORKS_DATA[0])}
                    className="btn-gold"
                    style={{
                      background: '#16171a',
                      color: '#ffffff',
                      border: '1px solid rgba(133, 95, 16, 0.4)',
                      padding: '0.75rem 1.6rem',
                    }}
                  >
                    <Eye size={15} style={{ color: '#e6cb78' }} />
                    <span>Inspect Masterwork in 4K</span>
                  </button>
                  <Link
                    href="/gallery"
                    className="btn-outline"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                      color: '#16171a',
                      padding: '0.75rem 1.4rem',
                    }}
                  >
                    <span>View Gallery Artworks</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 03 (#three): VOLCANIC STRATA GEOLOGICAL DOSSIER
            Palette: Mineral Charcoal (#26272b)
            Concept: Geological Field Research, Mineral Swatches & Deep Tectonic Shadowbox
           ======================================================== */}
        <section
          className={`overlap-section ${activeSection === 2 ? 'is-active' : ''}`}
          id="three"
          style={{ backgroundColor: '#14151a', color: '#f0f0f2', position: 'relative' }}
        >
          {/* Subtle Painting Background Video */}
          <div className="section-video-bg-container">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/painting_video_poster.jpg"
              className="section-video-bg"
            >
              <source src="/videos/painting_bg.mp4" type="video/mp4" />
            </video>
            <div className="section-video-overlay" />
          </div>

          <div className="site-container section-content-wrap" style={{ position: 'relative', zIndex: 2 }}>
            <div className="geological-dossier-grid">
              {/* Left: Geological Research Dossier & Mineral Stratum Swatches */}
              <div>
                {/* Geolocation & Archival Stamp */}
                <div className="geological-archive-stamp reveal-content reveal-delay-1">
                  <Compass size={13} style={{ color: '#e6cb78' }} />
                  <span>Sicily Field Research // Caldera Strata 37°45'N 14°59'E</span>
                </div>

                <h2
                  className="font-serif reveal-content reveal-delay-2"
                  style={{
                    fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
                    lineHeight: 1.1,
                    fontWeight: 300,
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                  }}
                >
                  Earth Tremors & Saffron Vespers
                </h2>

                <p className="reveal-content reveal-delay-2" style={{ color: '#cfcfd6', lineHeight: 1.6, fontSize: '0.9rem', marginBottom: '0.85rem' }}>
                  Layered with volcanic sediments gathered during field research along Mount Etna’s caldera, this tactile square composition juxtaposes violent ochre impasto with whisper-thin 24k gilded fault lines.
                </p>

                {/* Geological Materiality Matrix (3 Mineral Swatches) */}
                <div className="strata-swatches-grid reveal-content reveal-delay-3">
                  <div className="strata-swatch-card">
                    <div className="strata-swatch-indicator" style={{ backgroundColor: '#5c524c' }} />
                    <strong style={{ display: 'block', fontSize: '0.78rem', color: '#ffffff', marginBottom: '0.15rem' }}>
                      Etna Basalt Ash
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#9e9ea7', lineHeight: 1.3, display: 'block' }}>
                      Raw caldera sediment field collection
                    </span>
                  </div>

                  <div className="strata-swatch-card">
                    <div className="strata-swatch-indicator" style={{ backgroundColor: '#e6cb78' }} />
                    <strong style={{ display: 'block', fontSize: '0.78rem', color: '#ffffff', marginBottom: '0.15rem' }}>
                      24K Florentine Leaf
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#9e9ea7', lineHeight: 1.3, display: 'block' }}>
                      Subterranean gilded tectonic fissures
                    </span>
                  </div>

                  <div className="strata-swatch-card">
                    <div className="strata-swatch-indicator" style={{ backgroundColor: '#8b3426' }} />
                    <strong style={{ display: 'block', fontSize: '0.78rem', color: '#ffffff', marginBottom: '0.15rem' }}>
                      Venetian Red & Wax
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#9e9ea7', lineHeight: 1.3, display: 'block' }}>
                      High-relief impasto on cradled oak
                    </span>
                  </div>
                </div>

                {/* Archival Provenance & Valuation Bar */}
                <div
                  className="reveal-content reveal-delay-3"
                  style={{
                    padding: '0.8rem 1.1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#a0a0aa', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                      Provenance & Dimensions
                    </span>
                    <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>
                      Aurelia Vance Studio Archive • 120 × 120 cm
                    </strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.68rem', color: '#a0a0aa', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                      Studio Valuation
                    </span>
                    <strong style={{ color: '#e6cb78', fontSize: '0.98rem', fontFamily: 'var(--font-sans)' }}>
                      {ARTWORKS_DATA[1].price}
                    </strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="reveal-content reveal-delay-4 section-actions-row">
                  <button
                    onClick={() => setSelectedArtwork(ARTWORKS_DATA[1])}
                    className="btn-gold"
                    style={{
                      background: 'linear-gradient(135deg, #e6cb78 0%, #aa8222 100%)',
                      color: '#101114',
                      fontWeight: 700,
                      border: 'none',
                      padding: '0.75rem 1.6rem',
                    }}
                  >
                    <Eye size={15} />
                    <span>Inspect Mineral Relief in 4K</span>
                  </button>
                  <Link
                    href="/gallery"
                    className="btn-outline"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderColor: 'rgba(255, 255, 255, 0.22)',
                      color: '#ffffff',
                      padding: '0.75rem 1.4rem',
                    }}
                  >
                    <span>Explore Volcanic Strata</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right: Tectonic Deep Shadowbox & Overlapping Macro Specimen Badge */}
              <div className="tectonic-artwork-wrap reveal-content reveal-delay-2">
                <div
                  className="tectonic-shadowbox"
                  onClick={() => setSelectedArtwork(ARTWORKS_DATA[1])}
                  title="Click to inspect volcanic ash relief and gold leaf fissures"
                >
                  <Image
                    src="/images/painting_square.jpg"
                    alt="Earth Tremors & Saffron Vespers by Aurelia Vance"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />

                  {/* Geological Archive Code Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      background: 'rgba(12, 13, 16, 0.88)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '2px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#e6cb78',
                      border: '1px solid rgba(230, 203, 120, 0.3)',
                    }}
                  >
                    Archival Specimen #02
                  </div>

                  {/* Bottom Inspect Strip */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(10,12,16,0.92), transparent)',
                      padding: '1.25rem 1rem 0.65rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                    }}
                  >
                    <span style={{ color: '#e6cb78', fontWeight: 600 }}>Cradled Architectural Oak Panel</span>
                    <span style={{ opacity: 0.8, fontSize: '0.72rem' }}>Click to examine impasto</span>
                  </div>
                </div>

                {/* Overlapping Macro Specimen Callout Badge */}
                <div className="tectonic-macro-badge">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <Layers size={13} style={{ color: '#e6cb78' }} />
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#e6cb78', fontWeight: 700 }}>
                      Stratum Analysis
                    </span>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: '#e2e2e8', lineHeight: 1.35, margin: 0 }}>
                    Volcanic sediments cold-bonded with 24k gold leaf along tectonic fracture lines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 04 (#four): REVERSE-SCROLL GALLERY (Light Gallery Linen)
            Contrasting Light Theme: #f8f7f4 (Distinct from Section 03 Dark Charcoal)
           ======================================================== */}
        <section
          className={`overlap-section ${activeSection === 3 ? 'is-active' : ''}`}
          id="four"
          style={{
            backgroundColor: '#f8f7f4',
            color: '#1a1918',
            paddingTop: '2.5rem',
            paddingBottom: '1.5rem',
          }}
          ref={galleryRef}
        >
          <div className="site-container section-content-wrap">
            
            {/* Redesigned Gallery Section Header */}
            <div className="section4-editorial-header reveal-content reveal-delay-1">
              <div className="section4-header-text">
                <div className="section4-badge-row">
                  <span className="art-badge" style={{ background: 'rgba(133, 95, 16, 0.12)', borderColor: 'rgba(133, 95, 16, 0.35)', color: '#855f10' }}>
                    <Sparkles size={11} />
                    <span>04 // LIVING ATELIER REVERSE STREAM</span>
                  </span>
                  <span className="section4-count-pill">
                    40 Curated Masterworks
                  </span>
                </div>
                
                <h2 className="font-serif section4-title">
                  Atelier Reverse-Scroll Gallery
                </h2>
                
                <p className="section4-desc">
                  Opposing continuous kinetic streams spanning fine pencil art, 24K gold impasto, and studio photography.
                </p>
              </div>

              <div className="section4-header-actions">
                <Link
                  href="/gallery"
                  className="section4-catalog-btn"
                  title="Explore categorized masterworks collection"
                >
                  <span>Filter by Category</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>

            {/* Redesigned Haute Gallery Stream Toolbar */}
            <div className="reveal-content reveal-delay-2 gallery-stream-toolbar">
              {/* Left: Motion Status & Play/Pause Interactive Pill */}
              <div className="stream-toolbar-status">
                <button
                  type="button"
                  onClick={() => setIsAutoGliding((prev) => !prev)}
                  className={`stream-motion-pill ${isAutoGliding ? 'is-playing' : 'is-paused'}`}
                  title={isAutoGliding ? 'Pause stream glide' : 'Resume automatic stream flow'}
                >
                  <span className="stream-pulse-dot" />
                  {isAutoGliding ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isAutoGliding ? 'Auto-Flow Active' : 'Flow Paused'}</span>
                </button>

                <div className="stream-flow-indicator">
                  <span className="stream-flow-label">Flow</span>
                  <span className="stream-flow-val">{Math.round(galleryProgress * 100)}%</span>
                </div>
              </div>

              {/* Center: Sleek luxury progress bar / scrub track */}
              <div className="stream-scrub-wrap">
                <span className="stream-scrub-bound">START</span>
                <div className="stream-scrub-track-container">
                  <input
                    type="range"
                    className="stream-luxury-scrubber"
                    min="0"
                    max="1"
                    step="0.001"
                    value={galleryProgress}
                    onChange={(e) => setGalleryProgress(parseFloat(e.target.value))}
                    aria-label="Art stream position slider"
                  />
                  <div
                    className="stream-scrub-fill"
                    style={{ width: `${Math.round(galleryProgress * 100)}%` }}
                  />
                </div>
                <span className="stream-scrub-bound">END (40)</span>
              </div>

              {/* Right: Fine-tuning Controls (Desktop and Tablet) */}
              <div className="stream-toolbar-controls">
                <button
                  type="button"
                  className="stream-ctrl-btn desktop-only"
                  onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 0.6 : 1))}
                  title="Toggle flow speed"
                >
                  Speed: {speedMultiplier === 1 ? '1.0x' : speedMultiplier === 1.5 ? '1.5x' : '0.6x'}
                </button>

                <button
                  type="button"
                  className="stream-ctrl-btn stream-step-btn"
                  onClick={() => setGalleryProgress((p) => Math.max(0, p - 0.1))}
                  title="Glide stream backward"
                  aria-label="Glide backward"
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  type="button"
                  className="stream-ctrl-btn stream-step-btn"
                  onClick={() => setGalleryProgress((p) => Math.min(1, p + 0.1))}
                  title="Glide stream forward"
                  aria-label="Glide forward"
                >
                  <ChevronRight size={14} />
                </button>

                <button
                  type="button"
                  className="stream-ctrl-btn desktop-only"
                  onClick={() => setGalleryProgress(0)}
                  title="Reset to beginning"
                  aria-label="Reset position"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            {/* 3 Horizontal Stream Tracks - Gliding in Alternating Reverse Directions */}
            <div
              className="horizontal-streams-container"
              ref={gridContainerRef}
              onMouseEnter={() => setIsGalleryHovered(true)}
              onMouseLeave={() => setIsGalleryHovered(false)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                touchAction: 'pan-y',
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
                {row1Items.map((item) => (
                  <div
                    key={item.id}
                    className="horizontal-art-card"
                    onClick={() => setSelectedGalleryItem(item)}
                  >
                    <div className="horizontal-art-imgwrap">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        style={{ objectFit: 'cover' }}
                        sizes="210px"
                      />
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
                {row2Items.map((item) => (
                  <div
                    key={item.id}
                    className="horizontal-art-card"
                    onClick={() => setSelectedGalleryItem(item)}
                  >
                    <div className="horizontal-art-imgwrap">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        style={{ objectFit: 'cover' }}
                        sizes="210px"
                      />
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
                {row3Items.map((item) => (
                  <div
                    key={item.id}
                    className="horizontal-art-card"
                    onClick={() => setSelectedGalleryItem(item)}
                  >
                    <div className="horizontal-art-imgwrap">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        style={{ objectFit: 'cover' }}
                        sizes="210px"
                      />
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

            {/* Bottom info caption */}
            <div className="section4-footer-caption">
              <span>
                Displaying <strong>40 Artworks</strong> across 3 continuous reverse streams.
              </span>
              <span className="desktop-only">
                Tranquil kinetic pace • Hover artwork to pause • Click any image to view 4K full-screen
              </span>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 05 (#five): HAUTE EDITORIAL MANIFESTO & PARIS ATELIER
            Palette: Midnight Atelier (#131418)
            Concept: Monumental Centerpiece Manifesto, Atelier Monograph Plate & Heritage Pillars
           ======================================================== */}
        <section
          className={`overlap-section ${activeSection === 4 ? 'is-active' : ''}`}
          id="five"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(12, 13, 16, 0.78) 0%, rgba(16, 17, 21, 0.65) 50%, rgba(10, 11, 14, 0.82) 100%), url('/images/section5_atelier_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#101114',
            color: '#ffffff',
          }}
        >
          <div className="site-container section-content-wrap">
            <div className="manifesto-editorial-container">
              {/* Monumental Centered Typographic Manifesto Statement */}
              <div className="manifesto-monumental-quote reveal-content reveal-delay-1">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <span style={{ width: '24px', height: '1px', backgroundColor: '#e6cb78' }} />
                  <span className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: '#e6cb78', fontWeight: 700, textTransform: 'uppercase' }}>
                    The Artistic Creed
                  </span>
                  <span style={{ width: '24px', height: '1px', backgroundColor: '#e6cb78' }} />
                </div>

                <h2 className="manifesto-quote-text">
                  “I reject synthetic flat pigment. Paint must possess weight, geology, and mortality.”
                </h2>

                <div style={{ marginTop: '0.45rem', fontSize: '0.76rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9d9ea6' }}>
                  — Aurelia Vance, Montmartre Atelier Notes
                </div>
              </div>

              {/* Editorial Split Spread: Atelier Monograph Plate + Material Philosophy & Heritage */}
              <div className="manifesto-split-layout">
                {/* Left: Atmospheric Atelier Photo Plate */}
                <div className="reveal-content reveal-delay-2">
                  <div className="atelier-monograph-card">
                    <Image
                      src="/images/artist_portrait.jpg"
                      alt="Aurelia Vance in Paris studio"
                      fill
                      sizes="(max-width: 900px) 100vw, 42vw"
                      style={{ objectFit: 'cover' }}
                    />

                    <div className="atelier-location-stamp">
                      <span style={{ fontSize: '0.68rem', color: '#e6cb78', display: 'block', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.2rem' }}>
                        Atelier Montmartre // 14 Rue Lepic, Paris
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#f0f0f3', lineHeight: 1.35, display: 'block' }}>
                        Mineral extraction, hand-ground lapis lazuli & daily studio discipline.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Material Alchemy Prose & 3 Heritage Pillars */}
                <div>
                  <p className="reveal-content reveal-delay-2" style={{ color: '#ceced6', lineHeight: 1.65, fontSize: '0.92rem', marginBottom: '0.75rem' }}>
                    Every canvas created in the atelier begins with raw stone: lapis lazuli imported from the Hindu Kush, volcanic ashes collected along Mount Etna’s caldera, and cold-pressed walnut oil clarified in the winter sun.
                  </p>

                  {/* 3 Monumental Heritage Pillars */}
                  <div className="heritage-pillars-grid reveal-content reveal-delay-3">
                    <div className="heritage-pillar-item">
                      <span className="heritage-pillar-num">10+</span>
                      <strong className="heritage-pillar-title">Years Discipline</strong>
                      <span className="heritage-pillar-sub">Daily studio practice in Montmartre</span>
                    </div>

                    <div className="heritage-pillar-item">
                      <span className="heritage-pillar-num">06</span>
                      <strong className="heritage-pillar-title">Museums</strong>
                      <span className="heritage-pillar-sub">Permanent collections across Europe</span>
                    </div>

                    <div className="heritage-pillar-item">
                      <span className="heritage-pillar-num">24K</span>
                      <strong className="heritage-pillar-title">Florentine Gold</strong>
                      <span className="heritage-pillar-sub">Traditional water-gilding mastery</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="reveal-content reveal-delay-4 section-actions-row">
                    <Link href="/about" className="btn-gold" style={{ padding: '0.75rem 1.6rem' }}>
                      <span>Read Biography & CV</span>
                      <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => scrollToSection(5)}
                      className="btn-outline"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        borderColor: 'rgba(255, 255, 255, 0.22)',
                        padding: '0.75rem 1.4rem',
                      }}
                    >
                      <span>Next: Liaison & Archives Hub</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 06 (#six): LIAISON & COMPREHENSIVE ARCHIVES HUB (Warm Stone)
            Contrasting Light Theme: #eae8e3
           ======================================================== */}
        <section
          className={`overlap-section ${activeSection === 5 ? 'is-active' : ''}`}
          id="six"
          style={{
            backgroundImage: `url('/images/section6_brushes_bg.jpg')`,
            backgroundSize: 'contain',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f5f5f5',
            color: '#1a1918',
          }}
        >
          <div className="site-container section-content-wrap">
            <div className="archive-hub-grid">
              {/* Press Highlights & Natural-Scroll Archives Directory */}
              <div>
                <span className="font-display reveal-content reveal-delay-1" style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: '#855f10', fontWeight: 700 }}>
                  CRITICAL DISCOURSE & GLOBAL ARCHIVES
                </span>
                <h2
                  className="font-serif reveal-content reveal-delay-2"
                  style={{
                    fontSize: 'clamp(1.75rem, 2.7vw, 2.4rem)',
                    lineHeight: 1.15,
                    fontWeight: 300,
                    marginTop: '0.35rem',
                    marginBottom: '1rem',
                    color: '#1a1918',
                  }}
                >
                  Documented in Global Monographs
                </h2>

                {/* Press Quotes */}
                <div className="reveal-content reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {[
                    { publication: 'Artforum International', snippet: '“A rare visual alchemist capable of bridging raw mineral weight with incandescent luminosity.”', badge: 'Review' },
                    { publication: 'Frieze Magazine', snippet: '“Vance’s retrospective redefines materiality in twenty-first-century European painting.”', badge: 'Critical Essay' },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: '#ffffff',
                        borderLeft: '3px solid #855f10',
                        borderRadius: '0 6px 6px 0',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <span style={{ fontSize: '0.7rem', color: '#855f10', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                        {p.publication} • {p.badge}
                      </span>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.92rem', fontStyle: 'italic', color: '#27272a', lineHeight: 1.45 }}>
                        {p.snippet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Haute Curatorial Archives Directory */}
                <div className="reveal-content reveal-delay-3 curatorial-directory-container">
                  <div className="curatorial-dir-header-bar">
                    <span className="curatorial-dir-eyebrow">
                      Archives Directory & Study:
                    </span>
                    <span className="curatorial-dir-count-pill">
                      5 Portals
                    </span>
                  </div>

                  <div className="curatorial-directory-grid">
                    {[
                      {
                        title: 'Exhibitions Archive',
                        subtitle: 'Solo & Retrospective Shows',
                        href: '/exhibition',
                        icon: Calendar,
                      },
                      {
                        title: 'Master Workshops',
                        subtitle: 'Mineral & Gilding Sessions',
                        href: '/workshops',
                        icon: Palette,
                      },
                      {
                        title: 'Editions & Shop',
                        subtitle: 'Signed Catalog & Lithographs',
                        href: '/shop',
                        icon: ShoppingBag,
                      },
                      {
                        title: 'Publications & Books',
                        subtitle: 'Curatorial Catalogues Raisonnés',
                        href: '/publications',
                        icon: BookOpen,
                      },
                      {
                        title: 'Press & Critical Discourse',
                        subtitle: 'Artforum, Frieze & Reviews',
                        href: '/press',
                        icon: Newspaper,
                      },
                    ].map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="curatorial-dir-card"
                        >
                          <div className="curatorial-dir-icon">
                            <IconComp size={15} />
                          </div>
                          <div className="curatorial-dir-text">
                            <div className="curatorial-dir-row">
                              <span className="curatorial-dir-title">{item.title}</span>
                              <ExternalLink size={12} className="curatorial-dir-arrow" />
                            </div>
                            <span className="curatorial-dir-sub">{item.subtitle}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bespoke Return to Atelier Action */}
                <div className="reveal-content reveal-delay-4 section-return-wrap">
                  <button
                    onClick={() => scrollToSection(0)}
                    className="atelier-return-btn"
                    aria-label="Return to Atelier Entrance"
                  >
                    <ArrowUp size={14} className="return-icon" />
                    <span>Return to Atelier Entrance</span>
                  </button>
                </div>
              </div>

              {/* Direct Inquiry Contact Card */}
              <div className="glass-panel contact-card-glass reveal-content reveal-delay-2">
                <span className="art-badge" style={{ marginBottom: '0.75rem', background: 'rgba(133, 95, 16, 0.12)', borderColor: 'rgba(133, 95, 16, 0.35)', color: '#855f10' }}>
                  DIRECT INQUIRY DOSSIER
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.65rem', color: '#1a1918', marginBottom: '0.65rem' }}>
                  Connect with the Atelier
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#52525b', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  For original artwork acquisitions, private commissions, institutional museum loans, or studio visit appointments in Paris.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: '#1a1918', display: 'block' }}>Paris Atelier</strong>
                    <span style={{ color: '#52525b' }}>14 Rue Lepic, 75018 Montmartre, Paris</span>
                  </div>
                  <div>
                    <strong style={{ color: '#1a1918', display: 'block' }}>Liaison Email</strong>
                    <span style={{ color: '#855f10', fontWeight: 600 }}>atelier@aureliavance.art</span>
                  </div>
                  <div>
                    <strong style={{ color: '#1a1918', display: 'block' }}>Registrar Line</strong>
                    <span style={{ color: '#52525b' }}>+33 1 42 68 90 20 (Mon–Fri)</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="btn-gold"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #d4af37, #9d7219)',
                    color: '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  <span>Open Contact & Acquisition Form</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Modal Dialog for 4K Artwork Inspection */}
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Pure Image Lightbox for Gallery Showcase */}
      <ImageLightbox
        item={selectedGalleryItem}
        items={GALLERY_IMAGES_DATA}
        onClose={() => setSelectedGalleryItem(null)}
        onNavigate={(newItem) => setSelectedGalleryItem(newItem)}
      />
    </>
  );
}
