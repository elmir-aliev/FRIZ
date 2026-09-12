import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createDesktopSmoothScroll } from './smoothScrollController';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let destroySmoothScroll = () => {};

    const syncSmoothScroll = () => {
      destroySmoothScroll();
      destroySmoothScroll = createDesktopSmoothScroll({
        Lenis,
        gsap,
        ScrollTrigger,
        isDesktop: desktop.matches,
        reduceMotion: reducedMotion.matches,
      });
    };

    syncSmoothScroll();
    desktop.addEventListener('change', syncSmoothScroll);
    reducedMotion.addEventListener('change', syncSmoothScroll);

    return () => {
      desktop.removeEventListener('change', syncSmoothScroll);
      reducedMotion.removeEventListener('change', syncSmoothScroll);
      destroySmoothScroll();
    };
  }, []);

  return null;
}
