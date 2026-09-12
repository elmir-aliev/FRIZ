import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('renders the original FRIZ logo as two animated halves', async (context) => {
  const server = await createServer({
    appType: 'custom',
    optimizeDeps: { noDiscovery: true },
    server: { middlewareMode: true },
  });

  context.after(() => server.close());

  const { default: ShapeShifterHero } = await server.ssrLoadModule(
    '/src/components/ShapeShifterHero/ShapeShifterHero.jsx',
  );
  const markup = renderToStaticMarkup(createElement(ShapeShifterHero));
  const logoSources = markup.match(/src="\/friz\/logo\.svg"/g) ?? [];

  assert.equal(logoSources.length, 2);
  assert.match(markup, /data-start-theme="light"/);
  assert.match(markup, /--logo-split:51\.75%/);
  assert.match(markup, /shapeHero__logoHalf shapeHero__logoHalf--left/);
  assert.match(markup, /shapeHero__logoHalf shapeHero__logoHalf--right/);
  assert.doesNotMatch(markup, />FR<|>IZ</);
});
