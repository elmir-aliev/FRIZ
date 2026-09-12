import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const component = readFileSync(new URL('./ImageBlock.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('./ImageBlock.css', import.meta.url), 'utf8');
const home = readFileSync(new URL('../../pages/Home/Home.jsx', import.meta.url), 'utf8');

test('renders only the active block caption as one unclipped fixed layer', () => {
  assert.doesNotMatch(component, /imageBlock__textClip/);
  assert.doesNotMatch(styles, /clip-path\s*:/);
  assert.match(styles, /\.imageBlock \.imageBlock__mobileText\s*\{[^}]*position:\s*fixed/s);
  assert.match(styles, /\.imageBlock \.imageBlock__mobileText\s*\{[^}]*display:\s*none/s);
  assert.match(
    styles,
    /\.imageBlock--captionActive \.imageBlock__mobileText\s*\{[^}]*display:\s*flex/s,
  );
  assert.match(home, /ScrollTrigger\.create\(\{[\s\S]*start:\s*'top center'/);
  assert.match(home, /toggleClass:\s*\{[\s\S]*className:\s*'imageBlock--captionActive'/);
  assert.doesNotMatch(styles, /\.imageBlock \.imageBlock__mobileText\s*\{[^}]*transform\s*:/s);
});
