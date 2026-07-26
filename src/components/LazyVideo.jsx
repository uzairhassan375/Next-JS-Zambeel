'use client';

import { useEffect, useRef } from 'react';

/**
 * Autoplaying background video that only downloads once it scrolls into view.
 *
 * The section videos sit below the fold; with a plain `autoPlay` attribute the
 * browser starts fetching them during initial page load (3pl-landscape.webm is
 * 13 MB), which competes with the LCP resources. `preload="none"` plus an
 * IntersectionObserver defers the fetch until the video is actually visible.
 */
export default function LazyVideo({ src, poster, className = '', type = 'video/webm' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // No IntersectionObserver (very old browsers): just load it normally.
    if (typeof IntersectionObserver === 'undefined') {
      video.load();
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.load();
            video.play().catch(() => {});
            observer.unobserve(video);
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
