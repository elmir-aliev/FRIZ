import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8');

test('snaps directionally between full-screen home panels on mobile only', () => {
  assert.match(source, /gsap\.matchMedia\(\)/);
  assert.match(
    source,
    /\(max-width:\s*760px\) and \(prefers-reduced-motion:\s*no-preference\)/,
  );
  assert.match(source, /ScrollTrigger\.create\(\{[\s\S]*trigger:\s*stackRef\.current/);
  assert.match(source, /start:\s*'top top'/);
  assert.match(source, /end:\s*'bottom bottom'/);
  assert.match(source, /snap:\s*\{[\s\S]*directional:\s*true/);
});
