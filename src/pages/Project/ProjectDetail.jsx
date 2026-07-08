import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import './ProjectDetail.css';

const GAP = 12;
const ROW = 8;
const BASE_COLS = 2;
const BIG_COLS = 3;

export default function ProjectDetail({ title, heroImage, photos = [] }) {
  const preventMediaMenu = (e) => e.preventDefault();
  const gridRef = useRef(null);
  const [ratios, setRatios] = useState([]);
  const [active, setActive] = useState(null);
  const [gridW, setGridW] = useState(0);
  const [cols, setCols] = useState(6);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const ro = new ResizeObserver(() => {
      const cs = getComputedStyle(grid);
      const padL = parseFloat(cs.paddingLeft) || 0;
      const padR = parseFloat(cs.paddingRight) || 0;
      setGridW(grid.clientWidth - padL - padR);
      setCols(window.matchMedia('(max-width: 768px)').matches ? 4 : 6);
    });
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  const colUnit = gridW > 0 ? (gridW - (cols - 1) * GAP) / cols : 0;
  const cellWidth = (sc) => sc * colUnit + (sc - 1) * GAP;
  const rowSpan = (i, sc) => {
    const ratio = ratios[i] || 0.75;
    const height = cellWidth(sc) * ratio;
    return Math.max(1, Math.round((height + GAP) / (ROW + GAP)));
  };

  const toggle = (i) => {
    const run = () => flushSync(() => setActive((cur) => (cur === i ? null : i)));
    if (document.startViewTransition) {
      document.startViewTransition(run);
    } else {
      run();
    }
  };

  const onLoad = (i, e) => {
    const img = e.currentTarget;
    if (img.naturalWidth) {
      const ratio = img.naturalHeight / img.naturalWidth;
      setRatios((prev) => {
        if (prev[i] === ratio) return prev;
        const next = prev.slice();
        next[i] = ratio;
        return next;
      });
    }
  };

  return (
    <>
      <section className="projectHero" onContextMenu={preventMediaMenu}>
        {heroImage ? (
          <img className="projectHero__photo" src={heroImage} alt={title} draggable="false" />
        ) : (
          <div className="projectHero__media" aria-hidden="true" />
        )}
        <div className="projectHero__shade" aria-hidden="true" />
        <div className="projectHero__label">{title}</div>
      </section>

      <div className="bento" ref={gridRef} onContextMenu={preventMediaMenu}>
        {photos.map((src, i) => {
          const sc = Math.min(active === i ? BIG_COLS : BASE_COLS, cols);
          return (
            <figure
              key={i}
              className={`bento__cell ${active === i ? 'is-active' : ''}`}
              style={{
                gridColumn: `span ${sc}`,
                gridRowEnd: `span ${rowSpan(i, sc)}`,
                viewTransitionName: `bento-${i}`,
              }}
              onClick={() => toggle(i)}
            >
              <img
                className="bento__img"
                src={src}
                alt={`${title} ${i + 1}`}
                draggable="false"
                onLoad={(e) => onLoad(i, e)}
              />
            </figure>
          );
        })}
      </div>

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
