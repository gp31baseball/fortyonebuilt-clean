'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GenesisIntro({ onFinish }) {
  const [showText, setShowText] = useState(false);
  const [fadeWhite, setFadeWhite] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 5000);   // show at 5s
    const fadeTimer = setTimeout(() => setFadeWhite(true), 6060);  // start fade 1s after video end
    const doneTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 7100); // fade takes ~1s now before showing site

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-colors duration-1000 ${
        fadeWhite ? 'bg-white' : 'bg-black'
      }`}
    >
      <video
        src="/videos/genesis.mp4"
        autoPlay
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          fadeWhite ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {showText && (
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: fadeWhite ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl md:text-6xl tracking-widest"
        >
          FORTYONEBUILT.COM
        </motion.h1>
      )}
    </div>
  );
}
