import { useEffect } from 'react';

// Updates the browser tab title + meta description per page.
// Invisible to the design - purely for Google/search results.
const SITE = 'Quran Online Academia';

export default function useSeo(title, description) {
  useEffect(() => {
    if (title) document.title = `${title} | ${SITE}`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
  }, [title, description]);
}
