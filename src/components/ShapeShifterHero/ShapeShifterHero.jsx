import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './ShapeShifterHero.css';

gsap.registerPlugin(useGSAP);

const DEFAULT_IMAGES = [
  {
    src: '/friz/blocks/furniture/furniture.webp',
    alt: 'Мебель в интерьере FRIZ',
  },
  {
    src: '/friz/blocks/kitchens/kitchens.webp',
    alt: 'Кухня FRIZ',
  },
  {
    src: '/friz/blocks/interior/interior.webp',
    alt: 'Интерьер FRIZ',
  },
];

const FIRST_IMAGE_AT = 1.05;
const IMAGE_INTERVAL = 0.7;
const LOGO_SPLIT_PERCENT = 51.75;

export default function ShapeShifterHero({ images = DEFAULT_IMAGES }) {
  const rootRef = useRef(null);
  const mediaRef = useRef(null);
  const leftLogoRef = useRef(null);
  const rightLogoRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle(
          'intro-fullscreen',
          entry.isIntersecting && entry.intersectionRatio >= 0.5 && root.dataset.introComplete !== 'true',
        );
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      document.body.classList.remove('intro-fullscreen');
    };
  }, []);

  useGSAP(
    () => {
      const frames = gsap.utils.toArray('.shapeHero__image');
      const media = mediaRef.current;
      const logoHalves = [leftLogoRef.current, rightLogoRef.current];
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        {
          mobile: '(max-width: 760px) and (orientation: portrait)',
          desktop: '(min-width: 761px), (orientation: landscape)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { mobile, reduceMotion } = context.conditions;
          const previewScale = mobile ? 0.32 : 0.24;
          const logoSplit = LOGO_SPLIT_PERCENT / 100;
          const logoWidth = leftLogoRef.current.getBoundingClientRect().width;
          const splitOffset = logoWidth * (logoSplit - 0.5);
          const previewHalfWidth = (window.innerWidth * previewScale) / 2;
          const logoGap = Math.min(32, Math.max(18, window.innerWidth * 0.02));
          const root = rootRef.current;
          const finishIntro = () => {
            root.dataset.introComplete = 'true';
            document.body.classList.remove('intro-fullscreen');
          };

          root.dataset.introComplete = 'false';
          const rect = root.getBoundingClientRect();
          document.body.classList.toggle('intro-fullscreen', rect.top <= 0 && rect.bottom > 0);

          gsap.set(frames, { autoAlpha: 0 });
          gsap.set(logoHalves, { autoAlpha: 1, x: 0, xPercent: 0, y: 0 });

          if (reduceMotion) {
            gsap.set(media, { autoAlpha: 1, scale: 1 });
            gsap.set(frames.at(-1), { autoAlpha: 1 });
            gsap.set(logoHalves, { autoAlpha: 0 });
            finishIntro();
            return undefined;
          }

          gsap.set(media, {
            autoAlpha: 0,
            scale: previewScale,
            transformOrigin: '50% 50%',
          });

          const timeline = gsap.timeline({ onComplete: finishIntro });

          timeline
            .to(
              leftLogoRef.current,
              {
                x: mobile ? 0 : -previewHalfWidth - logoGap - splitOffset,
                xPercent: mobile ? (1 - logoSplit) * 50 : 0,
                y: mobile ? '-22svh' : 0,
                duration: 0.8,
                ease: 'expo.inOut',
              },
              0.4,
            )
            .to(
              rightLogoRef.current,
              {
                x: mobile ? 0 : previewHalfWidth + logoGap - splitOffset,
                xPercent: mobile ? -logoSplit * 50 : 0,
                y: mobile ? '22svh' : 0,
                duration: 0.8,
                ease: 'expo.inOut',
              },
              0.4,
            )
            .to(
              media,
              {
                autoAlpha: 1,
                duration: 0.45,
                ease: 'power2.out',
              },
              0.65,
            );

          frames.forEach((frame, index) => {
            const cue = FIRST_IMAGE_AT + index * IMAGE_INTERVAL;

            if (index > 0) {
              timeline.to(frames[index - 1], { autoAlpha: 0, duration: 0.16 }, cue);
            }

            timeline.to(frame, { autoAlpha: 1, duration: 0.18 }, cue);
          });

          const finalCue = FIRST_IMAGE_AT + (frames.length - 1) * IMAGE_INTERVAL;

          timeline
            .to(
              media,
              {
                scale: 1,
                duration: 1.15,
                ease: 'expo.inOut',
              },
              finalCue,
            )
            .to(
              logoHalves,
              { autoAlpha: 0, duration: 0.3, ease: 'power1.out' },
              finalCue + 0.2,
            );

          return undefined;
        },
      );

      return () => matchMedia.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      className="shapeHero"
      id="home"
      ref={rootRef}
      aria-label="FRIZ"
      data-start-theme="light"
    >
      <div className="shapeHero__parallax" data-swiper-parallax="60%">
        <h1
          className="shapeHero__logo"
          aria-label="FRIZ"
          style={{ '--logo-split': `${LOGO_SPLIT_PERCENT}%` }}
        >
          <span
            className="shapeHero__logoHalf shapeHero__logoHalf--left"
            ref={leftLogoRef}
          >
            <img src="/friz/logo.svg" alt="" draggable="false" />
          </span>
          <span
            className="shapeHero__logoHalf shapeHero__logoHalf--right"
            ref={rightLogoRef}
          >
            <img src="/friz/logo.svg" alt="" draggable="false" />
          </span>
        </h1>

        <div className="shapeHero__media" ref={mediaRef} aria-hidden="true">
          {images.map((image, index) => (
            <img
              className="shapeHero__image"
              src={image.src}
              alt={image.alt}
              draggable="false"
              loading="eager"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              key={image.src}
            />
          ))}
          <div className="shapeHero__shade" />
        </div>
      </div>
      <div className="shapeHero__scrollHint">
        <span>Листайте</span>
        <span className="shapeHero__scrollArrow" aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
