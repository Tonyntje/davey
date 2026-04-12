import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GalleryLightbox({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);
  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, close, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {images.map((img, idx) => (
          <div key={img.src} className="break-inside-avoid">
            <button
              type="button"
              className="block w-full text-left cursor-pointer border-0 p-0 bg-transparent overflow-hidden"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Foto openen: ${img.alt}`}
            >
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full block object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed mt-[112px] inset-0 z-[999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${activeIndex + 1} van ${images.length}: ${images[activeIndex].alt}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 z-20 right-4 z-10 text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-2"
            aria-label="Sluiten"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-roboto tracking-wider">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-6 z-10 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 transition-all cursor-pointer border-0 rounded-sm"
            aria-label="Vorige foto"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Next button */}
          <button
            onClick={next}
            className="absolute right-3 md:right-6 z-10 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 transition-all cursor-pointer border-0 rounded-sm"
            aria-label="Volgende foto"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Image */}
          <div className="relative z-[1] flex items-center justify-center w-full h-full px-16 py-20">
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-w-full max-h-full object-contain select-none animate-fade-in"
              draggable="false"
            />
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-wrap gap-1 py-2 px-1">
            {images.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 overflow-hidden border-2 transition-all cursor-pointer p-0 ${idx === activeIndex
                  ? 'border-white opacity-100 scale-110'
                  : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                aria-label={`Ga naar foto ${idx + 1}`}
                aria-current={idx === activeIndex ? 'true' : undefined}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
