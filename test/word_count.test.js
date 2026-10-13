'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { word_count } = require('../src/word_count');

test('counts words case-insensitively with lowercase keys', () => {
  assert.deepEqual(word_count('The the THE'), { the: 3 });
});

test('ignores punctuation', () => {
  assert.deepEqual(word_count('Hello, hello!'), { hello: 2 });
});

test('keeps apostrophes inside words', () => {
  assert.deepEqual(word_count("don't"), { "don't": 1 });
});

test('returns an empty result for an empty string', () => {
  assert.deepEqual(word_count(''), {});
});

test('returns an empty result for punctuation-only input', () => {
  assert.deepEqual(word_count("... !!! '"), {});
});

test('strips surrounding apostrophes but keeps internal ones', () => {
  assert.deepEqual(word_count("'hello' don't"), { hello: 1, "don't": 1 });
});

test('counts multiple distinct words', () => {
  assert.deepEqual(word_count('To be, or not to be'), {
    to: 2,
    be: 2,
    or: 1,
    not: 1,
  });
});

test('keeps digits in words', () => {
  assert.deepEqual(word_count('Top 10 tips, top 10!'), {
    top: 2,
    10: 2,
    tips: 1,
  });
});
