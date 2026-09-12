import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const component = readFileSync(new URL('./ImageBlock.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('./ImageBlock.css', import.meta.url), 'utf8');

test('keeps every block caption centered in the viewport without scroll-driven transforms', () => {
  assert.match(component, /className="imageBlock__textClip"/);
  assert.match(styles, /\.imageBlock__textClip\s*\{[^}]*clip-path:\s*inset\(0\)/s);
  assert.match(styles, /\.imageBlock \.imageBlock__mobileText\s*\{[^}]*position:\s*fixed/s);
  assert.doesNotMatch(styles, /\.imageBlock \.imageBlock__mobileText\s*\{[^}]*transform\s*:/s);
});
