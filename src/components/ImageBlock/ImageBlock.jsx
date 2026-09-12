import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { navigateWithTransition } from '../../router/hashRouter';
import './ImageBlock.css';

gsap.registerPlugin(useGSAP);

export default function ImageBlock({ id, src, alt, title, subtitle, href }) {
  const preventMediaMenu = (e) => e.preventDefault();
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const fillViewportRef = useRef(() => Promise.resolve());

  useGSAP(
    (_context, contextSafe) => {
      fillViewportRef.current = contextSafe(() => {
        const panel = sectionRef.current;
        if (!panel) return Promise.resolve();

        const currentY = window.scrollY;
        const targetY = Math.max(0, currentY + panel.getBoundingClientRect().top);
        const distance = Math.abs(targetY - currentY);
        if (distance < 2) {
          gsap.set(mediaRef.current, { yPercent: 0 });
          return Promise.resolve();
        }

        const scroll = { y: currentY };
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';

        return new Promise((resolve) => {
          gsap.to(scroll, {
            y: targetY,
            duration: 0.3,
            ease: 'power4.in',
            overwrite: true,
            onUpdate: () => {
              window.scrollTo({ top: scroll.y, left: 0, behavior: 'auto' });
            },
            onComplete: () => {
              root.style.scrollBehavior = previousScrollBehavior;
              gsap.set(mediaRef.current, { yPercent: 0 });
              window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
            },
          });
        });
      });

      return () => {
        fillViewportRef.current = () => Promise.resolve();
      };
    },
    { scope: sectionRef },
  );

  const openWithTransition = (event) => {
    if (
      !href?.startsWith('#/') ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateWithTransition(href, {
      beforeNavigate: () => fillViewportRef.current(),
    });
  };

  const content = (
    <>
      <div className="imageBlock__parallax" ref={mediaRef}>
        <img
          className="imageBlock__image"
          src={src}
          alt={alt}
          draggable="false"
          loading="lazy"
        />
      </div>
      {title ? (
        <div className="imageBlock__mobileText">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <section
        className="imageBlock imageBlock--link"
        id={id}
        ref={sectionRef}
        onContextMenu={preventMediaMenu}
      >
        <a
          className="imageBlock__link"
          href={href}
          aria-label={title || alt}
          onClick={openWithTransition}
        >
          {content}
        </a>
      </section>
    );
  }

  return (
    <section className="imageBlock" id={id} ref={sectionRef} onContextMenu={preventMediaMenu}>
      {content}
    </section>
  );
}
