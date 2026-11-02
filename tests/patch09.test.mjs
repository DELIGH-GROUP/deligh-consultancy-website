import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(file)=>fs.readFileSync(file,'utf8');
const css=read('src/styles/globals.css');
const sections=read('src/components/section-page.tsx');
const home=read('src/components/home.tsx');
const catalog=read('src/lib/language-catalog.ts');

test('09: office and partner cards contain exactly one authored image and old CSS overlay is disabled',()=>{
 assert.match(sections,/office-grid office-grid--spaced/);
 assert.match(sections,/office-entry-image/);
 assert.match(css,/\.office-grid--spaced \.office-entry--media::before\{content:none!important;display:none!important/);
 assert.match(css,/\.office-grid--spaced \.office-entry--media\{padding:0!important/);
});

test('09: mobile hero image is background with content overlaid, not an image beneath',()=>{
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/\.hero-visual\{display:none!important\}/);
 assert.match(css,/\.hero-content\{position:relative!important;z-index:2!important/);
 assert.match(css,/\.hero::before\{content:""!important;display:block!important/);
 assert.match(css,/\.hero\{isolation:isolate;min-height:625px!important/);
 assert.match(home,/className="hero-content"/);
});

test('09: a unique, valid reception image serves Teams & Offices hero',()=>{
 assert.match(sections,/'teams-offices': IMG\.teamsReceptionHero/);
 assert.match(sections,/teamsReceptionHero: '\/images\/dc-hero-teams-reception\.webp'/);
 const raw=fs.readFileSync('public/images/dc-hero-teams-reception.webp');
 assert.ok(raw.length > 100000);
 assert.equal(raw.subarray(0,4).toString(),'RIFF');
 assert.equal(raw.subarray(8,12).toString(),'WEBP');
});

test('09: blurry former meeting image no longer referenced anywhere in source',()=>{
 assert.doesNotMatch(css,/dc-generated-meeting\.webp/);
 assert.doesNotMatch(sections,/dc-generated-meeting\.webp/);
 assert.doesNotMatch(home,/dc-generated-meeting\.webp/);
});

test('09: Indian and UK English exist and mobile language label is not truncated',()=>{
 assert.match(catalog,/English \(India\)/);
 assert.match(catalog,/English \(UK\)/);
 assert.match(css,/\.language-trigger strong,\.language-trigger \.trigger-language\{max-width:none!important/);
 assert.match(css,/\.utility-inner\{display:flex!important;align-items:center;justify-content:space-between/);
});

test('09: narrow viewport is protected against horizontal overflow',()=>{
 assert.match(css,/html,body\{width:100%;max-width:100%;overflow-x:clip\}/);
 assert.match(css,/\.hero-grid\{position:relative!important;z-index:1!important;min-width:0!important;width:100%!important/);
 assert.match(css,/\.office-grid--spaced\{grid-template-columns:minmax\(0,1fr\)!important/);
});
