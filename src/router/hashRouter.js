import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

function commitHash(href) {
  const root = globalThis.document?.documentElement;
  const previousScrollBehavior = root?.style.scrollBehavior;

  if (root) root.style.scrollBehavior = 'auto';
  window.location.hash = href.startsWith('#') ? href : `#${href}`;
  flushSync(() => window.dispatchEvent(new Event('friz:navigate')));
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  const finish = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (root) root.style.scrollBehavior = previousScrollBehavior;
  };

  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => window.requestAnimationFrame(finish));
  } else {
    finish();
  }
}

export function navigateWithTransition(href, { beforeNavigate } = {}) {
  if (!beforeNavigate) {
    commitHash(href);
    return null;
  }

  return Promise.resolve(beforeNavigate()).then(() => commitHash(href));
}

function getHashPath() {
  const raw = window.location.hash || '#/';
  const withoutHash = raw.startsWith('#') ? raw.slice(1) : raw;
  const path = withoutHash.split('?')[0] || '/';
  return path.startsWith('/') ? path : '/';
}

export function useHashRoute() {
  const [path, setPath] = useState(() => getHashPath());

  useEffect(() => {
    const onChange = () => setPath(getHashPath());
    window.addEventListener('hashchange', onChange);
    window.addEventListener('friz:navigate', onChange);
    return () => {
      window.removeEventListener('hashchange', onChange);
      window.removeEventListener('friz:navigate', onChange);
    };
  }, []);

  return path;
}
