import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const shell = fs.readFileSync(new URL('../src/components/site-shell.tsx', import.meta.url), 'utf8');
const i18n = fs.readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8');
const section = fs.readFileSync(new URL('../src/components/section-page.tsx', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../src/styles/globals.css', import.meta.url), 'utf8');

test('Patch 07 exposes Indian and UK English variants', () => {
  assert.match(i18n, /"en-gb"/);
  assert.match(i18n, /English \(India\)/);
  assert.match(shell, /GB:\['en-gb'\]/);
});

test('Patch 07 includes spaced city cards with dedicated imagery', () => {
  for (const key of ['dc-city-prayagraj.webp','dc-city-delhi.webp','dc-city-lucknow.webp','dc-city-hyderabad.webp','dc-city-pune.webp']) {
    assert.ok(fs.existsSync(new URL(`../public/images/${key}`, import.meta.url)));
  }
  assert.match(section, /office-grid--spaced/);
  assert.match(css, /office-entry-image/);
});


test('Patch 08 includes dedicated non-repetitive hero images', () => {
  for (const key of ['dc-hero-work.webp','dc-hero-insights.webp','dc-hero-partners.webp','dc-hero-careers.webp','dc-hero-contact.webp']) {
    assert.ok(fs.existsSync(new URL(`../public/images/${key}`, import.meta.url)));
  }
  assert.match(section, /dc-hero-work\.webp/);
  assert.match(section, /dc-hero-insights\.webp/);
  assert.match(section, /dc-hero-partners\.webp/);
  assert.match(section, /dc-hero-careers\.webp/);
  assert.match(section, /dc-hero-contact\.webp/);
});
