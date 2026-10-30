'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data/portfolioData';

interface ImageLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate?: (newItem: GalleryItem) => void;
}

export default function ImageLightbox({
  item,
  items,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigate) {
        const currentIndex = items.findIndex((it) => it.id === item.id);
        if (currentIndex > 0) {
          onNavigate(items[currentIndex - 1]);
        } else if (items.length > 0) {
          onNavigate(items[items.length - 1]);
        }
      } else if (e.key === 'ArrowRight' && onNavigate) {
        const currentIndex = items.findIndex((it) => it.id === item.id);
        if (currentIndex < items.length - 1) {
          onNavigate(items[currentIndex + 1]);
        } else if (items.length > 0) {
          onNavigate(items[0]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((it) => it.id === item.id);
  const hasMultiple = items.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onNavigate) return;
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else {
      onNavigate(items[items.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onNavigate) return;
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else {
      onNavigate(items[0]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 7, 10, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      {/* Top Header Controls */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '2rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1220,
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
          <span
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#d4af37',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {item.categoryLabel}
          </span>
          {currentIndex !== -1 && (
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              {currentIndex + 1} / {items.length}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="Close image preview"
          style={{
            pointerEvents: 'auto',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Prev Arrow */}
      {hasMultiple && (
        <button
          onClick={handlePrev}
          aria-label="Previous artwork"
          style={{
            position: 'absolute',
            left: '1.5rem',
            zIndex: 1210,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
            e.currentTarget.style.borderColor = '#d4af37';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next Arrow */}
      {hasMultiple && (
        <button
          onClick={handleNext}
          aria-label="Next artwork"
          style={{
            position: 'absolute',
            right: '1.5rem',
            zIndex: 1210,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
            e.currentTarget.style.borderColor = '#d4af37';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Pure Image Container - Clean, No Description, No Price */}
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '85vh',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)',
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            style={{ objectFit: 'contain' }}
            sizes="90vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
