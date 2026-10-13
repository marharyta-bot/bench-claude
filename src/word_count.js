'use strict';

/**
 * Count how often each word appears in a text.
 *
 * Matching is case-insensitive and result keys are lowercase. Runs of
 * punctuation and whitespace separate words, except apostrophes inside a
 * word, which are kept ("don't" is one word). Leading/trailing apostrophes
 * are stripped, so "'hello'" counts as "hello". Empty or punctuation-only
 * input yields an empty object.
 *
 * @param {string} text
 * @returns {Object<string, number>} map of lowercase word → occurrence count
 */
function word_count(text) {
  const counts = new Map();
  const words = String(text)
    .toLowerCase()
    .match(/[a-z0-9]+(?:'[a-z0-9]+)*/g);
  if (words) {
    for (const word of words) {
      counts.set(word, (counts.get(word) || 0) + 1);
    }
  }
  return Object.fromEntries(counts);
}

module.exports = { word_count };
