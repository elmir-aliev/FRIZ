import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Swiper from 'swiper';
import { Mousewheel, Parallax } from 'swiper/modules';
import 'swiper/css';
import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import ImageBlock from '../../components/ImageBlock/ImageBlock';
import ShapeShifterHero from '../../components/ShapeShifterHero/ShapeShifterHero';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMG_INTERIOR = '/friz/blocks/interior/interior.webp';
const IMG_FURNITURE = '/friz/blocks/furniture/furniture.webp';
const IMG_KITCHENS = '/friz/blocks/kitchens/kitchens.webp';
const IMG_PROJECTS = '/friz/blocks/projects/projects.webp';

export default function Home() {
  const showcaseRef = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.imageBlock');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion || panels.length < 2) return;

      const media = gsap.matchMedia();

      media.add('(min-width: 761px), (orientation: landscape)', () => {
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
      });

      media.add(
        '(max-width: 760px) and (orientation: portrait) and (prefers-reduced-motion: no-preference)',
        () => {
          const swiper = new Swiper(showcaseRef.current, {
            modules: [Mousewheel, Parallax],
            direction: 'vertical',
            slidesPerView: 1,
            speed: 500,
            threshold: 5,
            resistanceRatio: 0,
            parallax: true,
            touchReleaseOnEdges: true,
            mousewheel: {
              forceToAxis: true,
              releaseOnEdges: true,
            },
            on: {
              slideChange(instance) {
                const introComplete = showcaseRef.current
                  ?.querySelector('.shapeHero')?.dataset.introComplete === 'true';
                document.body.classList.toggle('intro-fullscreen', instance.activeIndex === 0 && !introComplete);
              },
            },
          });

          ScrollTrigger.refresh();

          return () => {
            swiper.destroy(true, true);
            ScrollTrigger.refresh();
          };
        },
      );

      return () => media.revert();
    },
    { scope: showcaseRef },
  );

  return (
    <>
      <div className="homeShowcase swiper" ref={showcaseRef}>
        <div className="homeShowcase__slides swiper-wrapper">
          <div className="homeShowcase__slide swiper-slide">
            <ShapeShifterHero />
          </div>

          <div className="homeShowcase__slide swiper-slide">
            <ImageBlock
              id="interior"
              src={IMG_INTERIOR}
              alt="Дизайн интерьера и ремонт под ключ"
              title="Выход за рамки привычного. Искусство создавать пространство"
              subtitle="Дизайн интерьера | Ремонт под ключ"
              href="#/services/interior"
            />
          </div>

          <div className="homeShowcase__slide swiper-slide">
            <ImageBlock
              id="furniture"
              src={IMG_FURNITURE}
              alt="Мягкая и корпусная мебель"
              title="Архитектура уюта, где каждая деталь имеет смысл"
              subtitle="Мягкая мебель | Корпусная мебель"
              href="#/services/furniture"
            />
          </div>

          <div className="homeShowcase__slide swiper-slide">
            <ImageBlock
              id="kitchens"
              src={IMG_KITCHENS}
              alt="Кухни"
              title="Бескомпромиссное качество в самом сердце дома"
              subtitle="Кухни"
              href="#/kitchens"
            />
          </div>

          <div className="homeShowcase__slide swiper-slide">
            <ImageBlock
              id="projects"
              src={IMG_PROJECTS}
              alt="Галерея завершённых проектов"
              title="Погрузись в галерею наших завершённых объектов"
              subtitle="Проекты"
              href="#/projects"
            />
          </div>
        </div>
      </div>

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
