import React, { useEffect, useState } from 'react';

interface GeologyMotionProps {
  src?: string;
  poster: string;
  alt?: string;
  className?: string;
  decorative?: boolean;
}

export function GeologyMotion({
  src,
  poster,
  alt = '',
  className = '',
  decorative = true,
}: GeologyMotionProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reducedMotion || hasError || !src) {
    return (
      <div className={`overflow-hidden relative ${className}`}>
        <img
          src={poster}
          alt={decorative ? '' : alt}
          aria-hidden={decorative ? 'true' : undefined}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        onError={() => setHasError(true)}
        aria-hidden={decorative ? 'true' : undefined}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support video motion.
      </video>
    </div>
  );
}
