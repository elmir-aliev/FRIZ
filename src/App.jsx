import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Interior from './pages/Interior/Interior';
import Furniture from './pages/Furniture/Furniture';
import FurnitureCategory from './pages/Furniture/FurnitureCategory';
import Collection from './pages/Collection/Collection';
import ProjectDetail from './pages/Project/ProjectDetail';
import { useHashRoute } from './router/hashRouter';

const KITCHENS = [
  { name: 'Harizma', src: '/friz/kitchens/harizma.webp' },
  { name: 'Chloe', src: '/friz/kitchens/chloe.webp' },
  { name: 'Alpa', src: '/friz/kitchens/alpa.webp' },
];

const HARIZMA_PHOTOS = Array.from(
  { length: 11 },
  (_, i) => `/friz/projects/harizma/harizma-${i + 1}.webp`,
);

function ScrollTo({ id }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(t);
  }, [id]);

  return null;
}

export default function App() {
  const route = useHashRoute();

  let page;
  let scrollTarget;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route]);

  if (route === '/interior') {
    page = <Interior />;
  } else if (route === '/services/interior') {
    page = <Interior initialTab="interior" />;
  } else if (route === '/services/repair') {
    page = <Interior initialTab="repair" />;
  } else if (route === '/furniture/soft') {
    page = (
      <FurnitureCategory
        title="Мягкая мебель"
        subtitle="Подбираем и изготавливаем мягкую мебель, которая сочетает комфорт, качество и современный дизайн. Диваны, кровати, кресла, пуфы и другие элементы подбираются индивидуально под интерьер, размеры помещения и ваши предпочтения, создавая уютное пространство для отдыха."
        heroImage="/friz/furniture/soft/hero.webp"
        images={[
          '/friz/furniture/soft/soft-1.webp',
          '/friz/furniture/soft/soft-2.webp',
          '/friz/furniture/soft/soft-3.webp',
          '/friz/furniture/soft/soft-4.webp',
          '/friz/furniture/soft/soft-5.webp',
        ]}
      />
    );
  } else if (route === '/furniture/case') {
    page = (
      <FurnitureCategory
        title="Корпусная мебель"
        subtitle="Проектируем и изготавливаем корпусную мебель на заказ: кухни, шкафы, гардеробные, прихожие, тумбы, стеллажи и другие решения. Каждое изделие создается по индивидуальным размерам, максимально эффективно используя пространство и идеально дополняя интерьер."
        heroImage="/friz/furniture/case/case-1.webp"
        images={[
          '/friz/furniture/case/case-2.webp',
          '/friz/furniture/case/case-4.webp',
          '/friz/furniture/case/case-3.webp',
          '/friz/furniture/case/case-5.webp',
          '/friz/furniture/case/case-6.webp',
        ]}
      />
    );
  } else if (route === '/furniture' || route === '/services/furniture') {
    page = <Furniture />;
  } else if (route === '/kitchens') {
    page = (
      <Collection
        heroTitle="Бескомпромиссное качество в самом сердце дома"
        heroImage="/friz/kitchens/kitchens.webp"
        items={KITCHENS}
      />
    );
  } else if (route === '/projects/harizma') {
    page = (
      <ProjectDetail
        title="#1"
        heroImage="/friz/projects/harizma/hero.webp"
        photos={HARIZMA_PHOTOS}
      />
    );
  } else if (route === '/projects') {
    page = (
      <FurnitureCategory
        title="Проекты"
        heroCaption="Погрузись в галерею наших завершенных объектов"
        framed
        heroImage="/friz/projects/project-1.webp"
        images={['/friz/projects/harizma/hero.webp']}
        captions={['#1']}
        links={['/projects/harizma']}
      />
    );
  } else if (route === '/contacts') {
    page = <Home />;
    scrollTarget = 'contacts';
  } else if (route === '/about') {
    page = <Home />;
  } else {
    page = <Home />;
  }

  return (
    <>
      <Navbar />
      <main>{page}</main>
      {scrollTarget ? <ScrollTo id={scrollTarget} /> : null}
    </>
  );
}
