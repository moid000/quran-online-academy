/**
 * Converts a given string into a URL-friendly slug.
 * Supports English and Unicode / Arabic titles.
 * 
 * @param {string} text - The input text to convert to a slug
 * @returns {string} - Generated slug
 */
const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\u0600-\u06FF\-]+/g, '') // Remove non-word chars (preserving Arabic range \u0600-\u06FF)
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

module.exports = slugify;
