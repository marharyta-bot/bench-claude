'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { parse_duration } = require('../src/parse_duration');

test('parses "90s" as 90 seconds', () => {
  assert.equal(parse_duration('90s'), 90);
});

test('parses "2m" as 120 seconds', () => {
  assert.equal(parse_duration('2m'), 120);
});

test('parses "1h30m" as 5400 seconds', () => {
  assert.equal(parse_duration('1h30m'), 5400);
});

test('parses "1h30m15s" as 5415 seconds', () => {
  assert.equal(parse_duration('1h30m15s'), 5415);
});

test('throws on an empty string', () => {
  assert.throws(() => parse_duration(''), /Invalid duration ""/);
});

test('throws on text without digits or units ("abc")', () => {
  assert.throws(() => parse_duration('abc'), /Invalid duration "abc"/);
});

test('throws on an unknown unit ("5x")', () => {
  assert.throws(() => parse_duration('5x'), /Invalid duration "5x"/);
});

test('throws on a negative value ("-5m")', () => {
  assert.throws(() => parse_duration('-5m'), /Invalid duration "-5m"/);
});

test('throws on leftover characters after a valid prefix', () => {
  assert.throws(() => parse_duration('90s extra'), /Invalid duration/);
});

test('throws on a bare number with no unit', () => {
  assert.throws(() => parse_duration('90'), /Invalid duration "90"/);
});

test('throws on a unit with no number', () => {
  assert.throws(() => parse_duration('h'), /Invalid duration "h"/);
});

test('throws on non-string input', () => {
  assert.throws(() => parse_duration(90), TypeError);
});
