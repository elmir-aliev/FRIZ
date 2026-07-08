import { useEffect, useRef } from 'react';
import './VideoHero.css';

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function VideoHero({ src, title = 'FRIZ' }) {
  const sectionRef = useRef(null);
  const preventMediaMenu = (e) => e.preventDefault();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      section.style.setProperty('--video-progress', '1');
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const nextProgress = clamp01(-rect.top / scrollDistance);
      section.style.setProperty('--video-progress', String(nextProgress));
      document.body.classList.toggle('intro-fullscreen', nextProgress < 0.98);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      document.body.classList.remove('intro-fullscreen');
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <section
      className="videoHero"
      id="home"
      ref={sectionRef}
    >
      <div className="videoHero__sticky">
        <div className="videoHero__frame">
          <video
            className="videoHero__media"
            src={src}
            autoPlay
            muted
            playsInline
            preload="auto"
            draggable="false"
            onContextMenu={preventMediaMenu}
          />
          <div className="videoHero__shade" aria-hidden="true" />
          <div className="videoHero__brand" aria-label={title}>
            <img src="/friz/logo.svg" alt={title} className="videoHero__brandImg" />
          </div>
        </div>
      </div>
    </section>
  );
}
