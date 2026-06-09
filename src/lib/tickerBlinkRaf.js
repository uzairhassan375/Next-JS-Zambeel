import { useLayoutEffect } from 'react';

/**
 * Opacity blink via requestAnimationFrame.
 * CSS @keyframes on .ticker-blink fail inside react-fast-marquee's transformed subtree.
 */
export function startBlinkOnElement(el, { periodMs = 1200, min = 0.25, max = 1 } = {}) {
  if (!el) return () => {};

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    el.style.opacity = '1';
    el.style.animation = 'none';
    return () => {
      el.style.opacity = '';
    };
  }

  el.style.animation = 'none';

  const start = performance.now();
  let frameId;
  let cancelled = false;

  const tick = (now) => {
    if (cancelled) return;
    const t = (now - start) % periodMs;
    const phase = (t / periodMs) * Math.PI * 2;
    const opacity = min + (max - min) * (0.5 + 0.5 * Math.cos(phase));
    el.style.opacity = String(opacity);
    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(frameId);
    el.style.opacity = '';
  };
}

export function attachTickerBlinkRaf(container) {
  if (!container) return () => {};

  const elements = container.querySelectorAll('.ticker-blink');
  const cleanups = Array.from(elements).map((el) => startBlinkOnElement(el));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

export function useTickerBlink(containerRef, dependency) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    return attachTickerBlinkRaf(container);
  }, [dependency]);
}

const BLINK_BOUND_ATTR = 'data-ticker-blink-bound';

/**
 * Watches a subtree for .ticker-blink nodes (including react-fast-marquee clones)
 * and attaches rAF blink after mount / HTML updates.
 */
export function useTickerBlinkSubtree(rootRef, dependency) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cleanups = new Map();

    function pruneCleanups() {
      cleanups.forEach((cleanup, el) => {
        if (!root.contains(el)) {
          cleanup();
          cleanups.delete(el);
        }
      });
    }

    function scan() {
      pruneCleanups();
      root.querySelectorAll(`.ticker-blink:not([${BLINK_BOUND_ATTR}])`).forEach((el) => {
        el.setAttribute(BLINK_BOUND_ATTR, 'true');
        cleanups.set(el, startBlinkOnElement(el));
      });
    }

    scan();

    const retryTimers = [0, 50, 150, 400].map((ms) => setTimeout(scan, ms));

    const observer = new MutationObserver(scan);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', BLINK_BOUND_ATTR],
    });

    return () => {
      retryTimers.forEach(clearTimeout);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      cleanups.clear();
      root.querySelectorAll(`[${BLINK_BOUND_ATTR}]`).forEach((el) => {
        el.removeAttribute(BLINK_BOUND_ATTR);
      });
    };
  }, [dependency]);
}
