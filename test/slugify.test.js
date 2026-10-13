'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { slugify } = require('../src/slugify');

test('converts "Hello, World!" to "hello-world"', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world');
});

test('lowercases letters', () => {
  assert.equal(slugify('ABC'), 'abc');
});

test('collapses a run of non-alphanumeric characters into a single hyphen', () => {
  assert.equal(slugify('a!!b'), 'a-b');
});

test('strips leading and trailing hyphens', () => {
  assert.equal(slugify(' --Hi-- '), 'hi');
});

test('returns "" for an empty string', () => {
  assert.equal(slugify(''), '');
});

test('returns "" for a symbols-only string', () => {
  assert.equal(slugify('!!!'), '');
});

test('keeps digits in the slug', () => {
  assert.equal(slugify('Top 10 Tips!'), 'top-10-tips');
});
