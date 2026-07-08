import Reveal from '../Reveal/Reveal';
import './Panel.css';

export default function Panel({
  id,
  variant = 'panel',
  title,
  subtitle,
  meta,
  cta,
  image,
  align = 'bl',
}) {
  const bgStyle = image ? { '--panel-image': `url(${image})` } : undefined;

  return (
    <section
      className={`panel panel--${variant} panel--align-${align}`}
      id={id}
      style={bgStyle}
    >
      <div className="panel__bg" aria-hidden="true" />

      <div className="panel__inner">
        <div className="panel__content">
          {meta ? (
            <Reveal delayMs={120}>
              <p className="panel__meta">{meta}</p>
            </Reveal>
          ) : null}

          {title ? (
            <Reveal delayMs={200}>
              {variant === 'hero' ? (
                <h1 className="panel__title panel__title--hero">{title}</h1>
              ) : (
                <h2 className="panel__title">{title}</h2>
              )}
            </Reveal>
          ) : null}

          {subtitle ? (
            <Reveal delayMs={320}>
              <p className="panel__subtitle">{subtitle}</p>
            </Reveal>
          ) : null}

          {cta ? (
            <Reveal delayMs={440}>
              <div className="panel__ctaRow">{cta}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

