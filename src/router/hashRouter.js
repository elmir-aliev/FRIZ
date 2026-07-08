import { useEffect, useState } from 'react';

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
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}
