'use strict';

/**
 * Convert a string into a URL-friendly slug.
 *
 * Letters are lowercased, every run of non-alphanumeric characters is
 * replaced by a single hyphen, and leading/trailing hyphens are stripped.
 * Empty or symbols-only input yields "".
 *
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = { slugify };
