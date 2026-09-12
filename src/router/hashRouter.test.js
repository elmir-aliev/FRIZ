import assert from 'node:assert/strict';
import test from 'node:test';

test('navigateWithTransition keeps immediate hash navigation working', async () => {
  const { navigateWithTransition } = await import('./hashRouter.js');
  const previousWindow = globalThis.window;

  globalThis.window = {
    location: { hash: '#/' },
    dispatchEvent() {},
    scrollTo() {},
  };

  try {
    const navigation = navigateWithTransition('#/projects');

    assert.equal(navigation, null);
    assert.equal(globalThis.window.location.hash, '#/projects');
  } finally {
    globalThis.window = previousWindow;
  }
});

test('navigateWithTransition waits for the clicked panel to fill the viewport', async () => {
  const { navigateWithTransition } = await import('./hashRouter.js');
  const previousWindow = globalThis.window;
  let releasePanel;

  globalThis.window = {
    location: { hash: '#/' },
    dispatchEvent() {},
    scrollTo() {},
  };

  try {
    const navigation = navigateWithTransition('#/projects', {
      beforeNavigate: () => new Promise((resolve) => {
        releasePanel = resolve;
      }),
    });

    assert.equal(globalThis.window.location.hash, '#/');

    releasePanel();
    await navigation;

    assert.equal(globalThis.window.location.hash, '#/projects');
  } finally {
    globalThis.window = previousWindow;
  }
});
