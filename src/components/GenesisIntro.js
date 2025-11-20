'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GenesisIntro({ onFinish }) {
  const [showText, setShowText] = useState(false);
  const [fadeWhite, setFadeWhite] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    if (typeof window !== 'undefined') {
      const mobile = /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);

      // If mobile, skip the video and run a shortened sequence
      if (mobile) {
        const quickText = setTimeout(() => setShowText(true), 600);   // show almost instantly
        const quickFade = setTimeout(() => setFadeWhite(true), 1300); // quick fade to white
        const quickDone = setTimeout(() => onFinish?.(), 1800);       // then show site
        return () => {
          clearTimeout(quickText);
          clearTimeout(quickFade);
          clearTimeout(quickDone);
        };
      }
    }

    // === Desktop / Laptop Timing ===
    const textTimer = setTimeout(() => setShowText(true), 5000);
    const fadeTimer = setTimeout(() => setFadeWhite(true), 6060);
    const doneTimer = setTimeout(() => onFinish?.(), 7100);

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
      {/* Only render the video on non-mobile devices */}
      {!isMobile && (
        <video
          src="/videos/genesis.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            fadeWhite ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

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
