import assert from 'node:assert/strict';
import test from 'node:test';

const smoothScrollModule = await import('./smoothScrollController.js').catch(() => null);

test('runs desktop Lenis through the GSAP ticker and cleans it up', () => {
  assert.ok(smoothScrollModule, 'desktop smooth-scroll controller should exist');

  const calls = [];
  let instance;

  class FakeLenis {
    constructor(options) {
      this.options = options;
      this.handlers = new Map();
      this.rafTimes = [];
      instance = this;
    }

    on(event, handler) {
      this.handlers.set(event, handler);
    }

    off(event, handler) {
      calls.push(['off', event, handler]);
    }

    raf(time) {
      this.rafTimes.push(time);
    }

    destroy() {
      calls.push(['destroy']);
    }
  }

  const ticker = {
    add(handler) {
      calls.push(['add', handler]);
      this.handler = handler;
    },
    remove(handler) {
      calls.push(['remove', handler]);
    },
    lagSmoothing(value) {
      calls.push(['lagSmoothing', value]);
    },
  };
  const update = () => {};

  const cleanup = smoothScrollModule.createDesktopSmoothScroll({
    Lenis: FakeLenis,
    gsap: { ticker },
    ScrollTrigger: { update },
    isDesktop: true,
    reduceMotion: false,
  });

  assert.deepEqual(instance.options, {
    lerp: 0.15,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  });
  assert.equal(instance.handlers.get('scroll'), update);
  assert.deepEqual(calls.find(([name]) => name === 'lagSmoothing'), ['lagSmoothing', 0]);

  ticker.handler(1.25);
  assert.deepEqual(instance.rafTimes, [1250]);

  cleanup();
  assert.deepEqual(calls.at(-2), ['remove', ticker.handler]);
  assert.deepEqual(calls.at(-1), ['destroy']);
});

test('leaves mobile and reduced-motion scrolling native', () => {
  assert.ok(smoothScrollModule, 'desktop smooth-scroll controller should exist');

  let instances = 0;
  class FakeLenis {
    constructor() {
      instances += 1;
    }
  }

  const dependencies = {
    Lenis: FakeLenis,
    gsap: { ticker: {} },
    ScrollTrigger: { update() {} },
  };

  const mobileCleanup = smoothScrollModule.createDesktopSmoothScroll({
    ...dependencies,
    isDesktop: false,
    reduceMotion: false,
  });
  const reducedCleanup = smoothScrollModule.createDesktopSmoothScroll({
    ...dependencies,
    isDesktop: true,
    reduceMotion: true,
  });

  assert.equal(instances, 0);
  assert.equal(typeof mobileCleanup, 'function');
  assert.equal(typeof reducedCleanup, 'function');
});
