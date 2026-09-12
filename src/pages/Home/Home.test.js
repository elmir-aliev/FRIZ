import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('./Home.css', import.meta.url), 'utf8');

test('keeps the shape-shifter hero and every image panel in one mobile Swiper', () => {
  assert.match(source, /import Swiper from 'swiper'/);
  assert.match(source, /import \{ Mousewheel, Parallax \} from 'swiper\/modules'/);
  assert.match(source, /gsap\.matchMedia\(\)/);
  assert.match(
    source,
    /\(max-width:\s*760px\) and \(orientation:\s*portrait\) and \(prefers-reduced-motion:\s*no-preference\)/,
  );
  assert.match(source, /new Swiper\(showcaseRef\.current/);
  assert.match(source, /direction:\s*'vertical'/);
  assert.match(source, /speed:\s*500/);
  assert.match(source, /threshold:\s*5/);
  assert.match(source, /resistanceRatio:\s*0/);
  assert.match(source, /touchReleaseOnEdges:\s*true/);
  assert.match(
    source,
    /className="homeShowcase__slides swiper-wrapper"[\s\S]*?<ShapeShifterHero[\s\S]*?<ImageBlock/,
  );
  assert.match(source, /import ShapeShifterHero from '.+ShapeShifterHero'/);
  assert.doesNotMatch(source, /<VideoHero/);
  assert.match(source, /className="homeShowcase__slide swiper-slide"/);
  assert.match(styles, /\.homeShowcase\.swiper-initialized\s*\{[^}]*height:\s*100svh/s);
  assert.match(styles, /\.homeShowcase\.swiper-initialized \.shapeHero\s*\{[^}]*height:\s*100%/s);
  assert.doesNotMatch(source, /snap:\s*\{/);
});
