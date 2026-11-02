import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(path)=>fs.readFileSync(path,'utf8');
const languages=['en','hi','ar','fr','de','es','pt'];
const dictionary=JSON.parse(read('src/lib/global-translations.ts').split('= ',2)[1].trim().replace(/;\s*$/,''));

test('Patch 02 provides seven selectable languages and no unsupported language claims',()=>{
 const source=read('src/lib/i18n.ts');
 for(const lang of languages)assert.match(source,new RegExp('"'+lang+'"'));
 for(const lang of ['fr','de','es','pt'])assert.ok(Object.keys(dictionary[lang]).length>=206);
});

test('Global translation pack covers static English copy on main components',()=>{
 const files=['src/lib/i18n.ts','src/lib/data.ts','src/lib/sections.ts','src/components/home.tsx','src/components/about-page.tsx','src/components/section-page.tsx','src/components/site-shell.tsx','src/components/service-page.tsx'];
 const found=new Set();
 for(const file of files){const s=read(file);
  for(const re of [/\ben\s*:\s*(["'])(.*?)\1/g,/"en"\s*:\s*"([^"]+)"/g,/\b(?:copy|tr)\(\s*'((?:[^'\\]|\\.)*)'\s*,/g]){
   for(const match of s.matchAll(re)){
    const phrase=match[2]??match[1]; if(phrase!=='English')found.add(phrase);
   }
  }
 }
 for(const lang of ['fr','de','es','pt']){
  const missing=[...found].filter(value=>!dictionary[lang][value]);
  assert.deepEqual(missing,[],`${lang} missing locale strings: ${missing.join(' | ')}`);
 }
});

test('Homepage: editorial full-width hero, image-led cards and no decorative line',()=>{
 const home=read('src/components/home.tsx');const css=read('src/styles/globals.css');
 assert.ok(home.includes('feature-cards'));
 assert.ok(home.includes('sector-photo-grid'));
 assert.ok(!home.includes('eyebrow-line'));
 assert.match(css,/\.hero-grid\s*\{max-width:none;padding:0/);
 assert.match(css,/\.nav-link\s*\{font-size:15px/);
});

test('About page has substantial company copy and standalone visual sections',()=>{
 const about=read('src/components/about-page.tsx');
 for(const label of ['about-hero','about-introduction','about-principles','group-story','about-outro'])assert.ok(about.includes(label));
 assert.ok(about.includes('ITSDELIGH PRIVATE LIMITED'));
});
