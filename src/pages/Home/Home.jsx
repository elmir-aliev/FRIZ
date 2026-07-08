import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import ImageBlock from '../../components/ImageBlock/ImageBlock';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import VideoHero from '../../components/VideoHero/VideoHero';

const INTRO_VIDEO = '/friz/intro.mp4';
const IMG_INTERIOR = '/friz/blocks/interior/interior.webp';
const IMG_FURNITURE = '/friz/blocks/furniture/furniture.webp';
const IMG_KITCHENS = '/friz/blocks/kitchens/kitchens.webp';
const IMG_PROJECTS = '/friz/blocks/projects/projects.webp';

export default function Home() {
  return (
    <>
      <VideoHero src={INTRO_VIDEO} title="FRIZ" />

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

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
