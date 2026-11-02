import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(file)=>fs.readFileSync(file,'utf8');

test('Patch04 includes asset-based flag icons and floating header',()=>{
  const shell = read('src/components/site-shell.tsx');
  const css = read('src/styles/globals.css');
  const catalog = read('src/lib/language-catalog.ts');
  assert.match(shell,/language-flag-image/);
  assert.match(shell,/flagAsset/);
  assert.match(css,/\.site-header\.floating/);
  assert.match(catalog,/flagAsset:'\/flags\/en-gb\.svg'/);
  assert.ok((catalog.match(/flagAsset:'/g)||[]).length >= 35);
});

test('Patch04 services and industries are visual and explanatory',()=>{
  const section = read('src/components/section-page.tsx');
  assert.match(section,/service-editorial-row/);
  assert.match(section,/industry-story-card-lite/);
  assert.match(section,/transaction-grid/);
});
