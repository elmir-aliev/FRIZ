import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import Reveal from '../../components/Reveal/Reveal';
import './Collection.css';

export default function Collection({ heroTitle, heroSubtitle, heroImage, items = [] }) {
  const preventMediaMenu = (e) => e.preventDefault();

  return (
    <>
      <section className="collectionHero" onContextMenu={preventMediaMenu}>
        {heroImage ? (
          <img className="collectionHero__photo" src={heroImage} alt={heroTitle} draggable="false" />
        ) : (
          <div className="collectionHero__media" aria-hidden="true" />
        )}
        <div className="collectionHero__overlay">
          <Reveal>
            <h1 className="collectionHero__title">{heroTitle}</h1>
            {heroSubtitle ? (
              <p className="collectionHero__sub">{heroSubtitle}</p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <div className="collectionGrid">
        {items.map((item) => (
          <article
            key={item.name}
            className="collectionCard"
            onContextMenu={preventMediaMenu}
          >
            {item.src ? (
              <img
                className="collectionCard__media"
                src={item.src}
                alt={item.name}
                draggable="false"
                loading="lazy"
              />
            ) : (
              <div className="collectionCard__media collectionCard__media--placeholder" aria-hidden="true" />
            )}
            <div className="collectionCard__shade" aria-hidden="true" />
            <div className="collectionCard__label">{item.name}</div>
          </article>
        ))}
      </div>

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
