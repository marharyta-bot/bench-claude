'use strict';

const SECONDS_PER_UNIT = { h: 3600, m: 60, s: 1 };

/**
 * Parse a compact duration string into a total number of seconds.
 *
 * The input must consist of one or more <integer><unit> segments, where
 * the unit is one of: h (hours), m (minutes), s (seconds).
 * Examples: "90s" → 90, "2m" → 120, "1h30m" → 5400, "1h30m15s" → 5415.
 *
 * Anything else — empty input, unknown units, negative values, or leftover
 * characters — throws an Error; this function never returns 0 or a guess
 * for invalid input.
 *
 * @param {string} text
 * @returns {number} total duration in seconds
 */
function parse_duration(text) {
  if (typeof text !== 'string') {
    throw new TypeError(
      `parse_duration expected a string, got ${typeof text}`
    );
  }
  if (!/^(?:\d+[hms])+$/.test(text)) {
    throw new Error(
      `Invalid duration ${JSON.stringify(text)}: expected one or more ` +
        '<integer><unit> segments using units h, m, or s (e.g. "1h30m")'
    );
  }
  let seconds = 0;
  for (const [, value, unit] of text.matchAll(/(\d+)([hms])/g)) {
    seconds += Number(value) * SECONDS_PER_UNIT[unit];
  }
  return seconds;
}

module.exports = { parse_duration };
