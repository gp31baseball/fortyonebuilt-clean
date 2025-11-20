'use client';
import { useEffect, useState } from 'react';

export default function SparkleOverlay() {
  const [fadeOut, setFadeOut] = useState(false);
  const [remove, setRemove] = useState(false);

  // Timeline: 4s of life, last 1s fading away
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    const removeTimer = setTimeout(() => setRemove(true), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (remove) return null;

  // 60 sparkles, random color + lifetime variation
  const sparkles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    color: ['#FFFFFF', '#E4B343', '#C21F1F', '#0A1A2F'][Math.floor(Math.random() * 4)],
    duration: 3 + Math.random() * 2.5, // 3–5.5s each
  }));

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-40 overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            backgroundColor: s.color,
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}
