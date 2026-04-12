import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/image3.webp",
    alt: "Kitchen backsplash"
  },
  {
    image: "/image2.webp",
    alt: "Bathroom shower marble"
  },
  {
    image: "/image22.webp",
    alt: "Floor tiles pattern"
  }
];

const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const startProgress = () => {
    // Clear any existing intervals
    if (progressRef.current) cancelAnimationFrame(progressRef.current);

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      }
    };

    progressRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    startProgress();

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(intervalRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [current]);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    setCurrent(index);
  };

  const handlePrev = () => goTo((current - 1 + slides.length) % slides.length);
  const handleNext = () => goTo((current + 1) % slides.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative w-full aspect-[16/7] md:aspect-[16/7] overflow-hidden shadow-xl bg-brand-black">
        {/* Images */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Gradient overlay — dark bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

        {/* Text overlay — relies on gradient, no bg */}
        <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-14 z-10">
          <h1 className="border-t-4 border-b-4 font-bold pt-2 pb-4 text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-playfair font-900 text-white uppercase tracking-wider leading-[0.9] mb-4 md:mb-6 drop-shadow-lg">
            PASSIE &<br />
            PRECISIE
          </h1>

          <div className="flex items-center space-x-3 mt-4 md:mt-6">
            <button aria-label="Previous Slide" onClick={handlePrev} className="bg-white text-black cursor-pointer border border-white/40 transition-colors p-1.5 md:p-2">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button aria-label="Next Slide" onClick={handleNext} className="bg-white text-black cursor-pointer border border-white/40 transition-colors p-1.5 md:p-2">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <a href="#intro" className="bg-black py-3 px-4 flex items-center space-x-2 text-white ml-3 uppercase text-xs md:text-sm font-bold tracking-widest transition-all hover:opacity-80">
              <span>Lees meer</span>
              <svg className="w-4 h-4 -mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
          </div>
        </div>

        {/* Thin progress bar at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
