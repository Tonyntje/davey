import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2670&auto=format&fit=crop", // Kitchen splash
    alt: "Kitchen backsplash"
  },
  {
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2669&auto=format&fit=crop", // Bathroom tiles
    alt: "Bathroom shower marble"
  },
  {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop", // Floor tiles
    alt: "Floor tiles pattern"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-brand-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[current].image} 
            alt={slides[current].alt} 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 z-10">
         <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-white uppercase tracking-wider leading-none mb-6 drop-shadow-xl"
            >
              PASSIE &<br />
              PRECISIE
            </motion.h1>
         </div>
         
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center space-x-4"
         >
             <button aria-label="Previous Slide" onClick={handlePrev} className="bg-white/20 hover:bg-white p-2 transition-colors group">
                 <ChevronLeft className="text-white group-hover:text-black w-6 h-6" />
             </button>
             <button aria-label="Next Slide" onClick={handleNext} className="bg-white/20 hover:bg-white p-2 transition-colors group">
                 <ChevronRight className="text-white group-hover:text-black w-6 h-6" />
             </button>
             <a href="#intro" className="flex items-center space-x-2 border-b border-white hover:border-transparent text-white pb-1 ml-4 uppercase text-sm font-bold tracking-widest transition-all hover:opacity-80">
                <span>Lees meer</span>
                <ArrowRight size={16} />
             </a>
         </motion.div>
      </div>
    </div>
  );
}
