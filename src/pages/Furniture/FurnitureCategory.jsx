import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import Reveal from '../../components/Reveal/Reveal';
import '../Interior/Interior.css';
import './FurnitureCategory.css';

export default function FurnitureCategory({
  title,
  subtitle,
  images = [],
  captions = [],
  links = [],
  heroImage,
  bakedHero = false,
  heroCaption,
  framed = false,
  gallerySize = 5,
}) 
{
  const preventMediaMenu = (e) => e.preventDefault();
  const items = images.length ? images : Array.from({ length: gallerySize }).map(() => null);

  return (
    <>
      <section
        className={`intService ${heroCaption ? 'intService--veil' : ''}`}
        onContextMenu={preventMediaMenu}
      >
        {heroImage ? (
          <img
            className={`intService__photo ${bakedHero ? 'intService__photo--baked' : ''}`}
            src={heroImage}
            alt={title}
            draggable="false"
          />
        ) : (
          <div className="intService__media" aria-hidden="true" />
        )}
        {heroCaption ? (
          <div className="intService__overlay intService__overlay--caption">
            <Reveal>
              <p className="furnHero__caption">{heroCaption}</p>
            </Reveal>
          </div>
        ) : !bakedHero ? (
          <div className="intService__overlay">
            <Reveal>
              <h2 className="intService__title">{title}</h2>
              <p className="intService__sub">{subtitle}</p>
            </Reveal>
          </div>
        ) : null}
      </section>

      <div className={`furnGallery ${framed ? 'furnGallery--framed' : ''}`}>
        {items.map((src, i) => {
          if (!src) {
            return <section key={i} className="furnGallery__item" aria-hidden="true" />;
          }
          const Tag = links[i] ? 'a' : 'section';
          const linkProps = links[i] ? { href: `#${links[i]}` } : {};
          return (
            <Tag
              key={i}
              className={`furnGallery__item ${captions[i] ? 'furnGallery__item--cap' : ''} ${links[i] ? 'furnGallery__item--link' : ''}`}
              onContextMenu={preventMediaMenu}
              {...linkProps}
            >
              <img
                className="furnGallery__img"
                src={src}
                alt={captions[i] || `${title} ${i+1}`}
                draggable="false"
                loading="lazy"
              />
              {captions[i] ? (
                <>
                  <div className="furnGallery__shade" aria-hidden="true" />
                  <div className="furnGallery__label">{captions[i]}</div>
                </>
              ) : null}
            </Tag>
          );
        })}
      </div>

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
