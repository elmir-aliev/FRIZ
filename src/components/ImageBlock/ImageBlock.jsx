import Reveal from '../Reveal/Reveal';
import './ImageBlock.css';

export default function ImageBlock({ id, src, alt, title, subtitle, href }) {
  const preventMediaMenu = (e) => e.preventDefault();

  const content = (
    <>
      <img
        className="imageBlock__image"
        src={src}
        alt={alt}
        draggable="false"
        loading="lazy"
      />

      {title ? (
        <div className="imageBlock__mobileText">
          <Reveal className="imageBlock__reveal">
            <h2>{title}</h2>
          </Reveal>
          {subtitle ? (
            <Reveal className="imageBlock__reveal" delayMs={140}>
              <p>{subtitle}</p>
            </Reveal>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <section className="imageBlock imageBlock--link" id={id} onContextMenu={preventMediaMenu}>
        <a className="imageBlock__link" href={href} aria-label={title || alt}>
          {content}
        </a>
      </section>
    );
  }

  return (
    <section className="imageBlock" id={id} onContextMenu={preventMediaMenu}>
      {content}
    </section>
  );
}
