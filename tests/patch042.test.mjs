import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p, 'utf8');
test('Patch 04.2 restores PageHeading named export consumed by service-page.tsx', () => {
  const target = read('src/components/section-page.tsx');
  const caller = read('src/components/service-page.tsx');
  assert.match(target, /export\s+function\s+PageHeading\s*\(/);
  assert.match(caller, /import\s*\{\s*PageHeading\s*\}\s*from\s*["']\.\/section-page["']/);
  assert.match(target, /export\s+default\s+function\s+SectionPage\s*\(/);
});
test('Patch 04.2 language flags map to real local SVG files', () => {
  const catalog = read('src/lib/language-catalog.ts');
  const matches = [...catalog.matchAll(/flagAsset:\s*['"](\/flags\/[^'" ]+\.svg)['"]/g)];
  assert.ok(matches.length >= 35, 'The language catalog needs at least 35 flag assets');
  for (const item of matches) {
    const flag = path.join('public', item[1].slice(1));
    assert.ok(fs.existsSync(flag), `Missing flag: ${flag}`);
    assert.match(read(flag), /<svg\b/);
  }
});
test('Patch 04.2 retains safe layouts and original assets', () => {
  const s = read('src/components/site-shell.tsx');
  const a = read('src/components/about-page.tsx');
  const css = read('src/styles/globals.css');
  assert.match(s, /site-header floating|site-header"/);
  assert.match(a, /group-story-photo/);
  assert.match(css, /\.section-page-hero/);
  for (const file of ['dc-generated-hero.webp','dc-generated-group.webp','dc-generated-meeting.webp']) {
    assert.ok(fs.statSync('public/images/' + file).size > 10000);
  }
});
