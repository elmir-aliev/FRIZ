import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import ImageBlock from '../../components/ImageBlock/ImageBlock';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import VideoHero from '../../components/VideoHero/VideoHero';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INTRO_VIDEO = '/friz/intro.mp4';
const IMG_INTERIOR = '/friz/blocks/interior/interior.webp';
const IMG_FURNITURE = '/friz/blocks/furniture/furniture.webp';
const IMG_KITCHENS = '/friz/blocks/kitchens/kitchens.webp';
const IMG_PROJECTS = '/friz/blocks/projects/projects.webp';

export default function Home() {
  const stackRef = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.imageBlock');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion || panels.length < 2) return;

      panels.forEach((panel) => {
        const image = panel.querySelector('.imageBlock__parallax');

        gsap.fromTo(
          image,
          { yPercent: -60 },
          {
            yPercent: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const media = gsap.matchMedia();

      media.add(
        '(max-width: 760px) and (prefers-reduced-motion: no-preference)',
        () => {
          const snapPoints = panels.map((_, index) => index / (panels.length - 1));

          ScrollTrigger.create({
            trigger: stackRef.current,
            start: 'top top',
            end: 'bottom bottom',
            snap: {
              snapTo: snapPoints,
              directional: true,
              inertia: false,
              duration: { min: 0.24, max: 0.42 },
              delay: 0.05,
              ease: 'power2.inOut',
            },
            invalidateOnRefresh: true,
          });
        },
      );

      return () => media.revert();
    },
    { scope: stackRef },
  );

  return (
    <>
      <VideoHero src={INTRO_VIDEO} title="FRIZ" />

      <div className="homeStack" ref={stackRef}>
        <ImageBlock
          id="interior"
          src={IMG_INTERIOR}
          alt="Дизайн интерьера и ремонт под ключ"
          title="Выход за рамки привычного. Искусство создавать пространство"
          subtitle="Дизайн интерьера | Ремонт под ключ"
          href="#/services/interior"
        />

        <ImageBlock
          id="furniture"
          src={IMG_FURNITURE}
          alt="Мягкая и корпусная мебель"
          title="Архитектура уюта, где каждая деталь имеет смысл"
          subtitle="Мягкая мебель | Корпусная мебель"
          href="#/services/furniture"
        />

        <ImageBlock
          id="kitchens"
          src={IMG_KITCHENS}
          alt="Кухни"
          title="Бескомпромиссное качество в самом сердце дома"
          subtitle="Кухни"
          href="#/kitchens"
        />

        <ImageBlock
          id="projects"
          src={IMG_PROJECTS}
          alt="Галерея завершённых проектов"
          title="Погрузись в галерею наших завершённых объектов"
          subtitle="Проекты"
          href="#/projects"
        />
      </div>

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
