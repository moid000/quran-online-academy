import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Disable the browser restoring old scroll positions (this caused the
// "footer flashes first, then jumps to home page" effect on load).
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Jump to top instantly BEFORE the browser paints, so the user never
  // sees the page start from the bottom (footer) and slide up.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  // Safety net: also ensure we are at top once the route content has loaded.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
