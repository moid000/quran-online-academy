import { useEffect } from 'react';

// Updates the browser tab title + meta description + canonical URL per page.
// Invisible to the design - purely for Google/search results.
const SITE = 'Quran Online Academia';
const BASE_URL = 'https://www.quranonlineacademia.com';

export default function useSeo(title, description, path = '') {
  useEffect(() => {
    if (title) document.title = title.includes(SITE) ? title : `${title} | ${SITE}`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }

    // Set canonical URL dynamically per page (was previously hardcoded to homepage for every route).
    // Skip while path is not yet known (e.g. blog post still loading) to avoid a flash of the wrong canonical.
    if (!path) return;
    const canonicalHref = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalHref);
  }, [title, description, path]);
}
