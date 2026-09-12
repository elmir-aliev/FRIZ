const noop = () => {};

export function createDesktopSmoothScroll({
  Lenis,
  gsap,
  ScrollTrigger,
  isDesktop,
  reduceMotion,
}) {
  if (!isDesktop || reduceMotion) return noop;

  const lenis = new Lenis({
    lerp: 0.15,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  });
  const updateScrollTrigger = ScrollTrigger.update;
  const updateLenis = (time) => lenis.raf(time * 1000);

  lenis.on('scroll', updateScrollTrigger);
  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off('scroll', updateScrollTrigger);
    gsap.ticker.remove(updateLenis);
    lenis.destroy();
  };
}
