import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(p)=>fs.readFileSync(p,'utf8');

test('Patch06 wires local HD imagery into page components and styles',()=>{
  const home=read('src/components/home.tsx');
  const about=read('src/components/about-page.tsx');
  const pages=read('src/components/section-page.tsx');
  const css=read('src/styles/globals.css');
  assert.match(home,/dc-hd-curved-glass\.webp/);
  assert.match(about,/dc-hd-group-headquarters\.webp/);
  assert.match(pages,/dc-hd-strategy-workshop\.webp/);
  assert.match(css,/dc-hd-collaborative-office\.webp/);
  assert.ok(fs.existsSync('public/images/dc-hd-curved-glass.webp'));
  assert.ok(fs.existsSync('public/images/dc-hd-reception-lobby.webp'));
});

test('Patch06 hides numeric badges and adds stronger image-based card grids',()=>{
  const home=read('src/components/home.tsx');
  const pages=read('src/components/section-page.tsx');
  const css=read('src/styles/globals.css');
  assert.match(home,/industry-more-grid/);
  assert.match(css,/\.item-no\{display:none!important\}/);
  assert.match(css,/\.principle::before/);
  assert.match(css,/\.transaction-card::before/);
  assert.match(css,/\.office-entry::before/);
  assert.doesNotMatch(pages,/String\(i\+1\)\.padStart/);
  assert.doesNotMatch(pages,/String\(idx\+1\)\.padStart/);
});

test('Patch06 hero treatment keeps gradient on the copy side only',()=>{
  const css=read('src/styles/globals.css');
  assert.match(css,/\.hero::before\{content:"";position:absolute;inset-block:0;left:0;width:min\(62%,980px\)/);
  assert.match(css,/\.section-page-hero::before\{content:"";position:absolute;inset-block:0;left:0;width:min\(58%,920px\)/);
  assert.match(css,/\.about-hero-visual\{background-image:linear-gradient\(90deg/);
});
