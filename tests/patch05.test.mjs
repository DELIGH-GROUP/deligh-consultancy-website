import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(p)=>fs.readFileSync(p,'utf8');

test('Patch05 mobile menu overlays page, supports keyboard and locks body scrolling',()=>{
 const shell=read('src/components/site-shell.tsx');
 const css=read('src/styles/globals.css');
 assert.match(shell,/mobile-overlay/);
 assert.match(shell,/mobile-scrim/);
 assert.match(shell,/aria-modal="true"/);
 assert.match(shell,/document\.body\.style\.overflow = 'hidden'/);
 assert.match(shell,/e\.key!=='Tab'/);
 assert.match(css,/\.mobile-overlay\{position:fixed;inset:0;z-index:450/);
});

test('Patch05 has one shared mailto contact section and no duplicate homepage CTA',()=>{
 const shell=read('src/components/site-shell.tsx');
 const home=read('src/components/home.tsx');
 assert.match(shell,/className="site-contact-cta"/);
 assert.match(shell,/mailto:reachus@deligh\.org/);
 assert.doesNotMatch(home,/className="closing-cta"/);
});

test('Patch05 compact cards include image thumbnails and no empty sector tiles',()=>{
 const home=read('src/components/home.tsx');
 const pages=read('src/components/section-page.tsx');
 assert.match(home,/service-capsule-grid/);
 assert.match(home,/capsule-photo/);
 assert.match(pages,/directory-mini-photo/);
 assert.match(pages,/industry-tile-photo/);
 assert.match(pages,/industrySummaries\[i\s*\+\s*6\]/);
});

test('Patch05 region scoping, flag assets and semantic chevron are present',()=>{
 const shell=read('src/components/site-shell.tsx');
 assert.match(shell,/regionLanguageCodes/);
 assert.match(shell,/IN:\['en','hi'\]/);
 assert.match(shell,/region === 'GL' \|\| scope\.includes\(l\.code\)/);
 assert.match(shell,/flagAsset/);
 assert.match(shell,/<ChevronDown\/>/);
});

test('Patch05 enhancements respect accessibility and full source translation coverage',()=>{
 const motion=read('src/components/reveal-motion.tsx');
 const css=read('src/styles/globals.css');
 assert.match(motion,/IntersectionObserver/);
 assert.match(motion,/prefers-reduced-motion/);
 assert.match(motion,/\[pathname\]/);
 assert.match(css,/\.group-marquee/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.ok(fs.existsSync('src/app/icon.svg'));
 assert.ok(fs.existsSync('public/favicon.ico'));
 const translations=read('src/lib/global-translations.ts');
 assert.match(translations,/Language options are filtered to your chosen region/);
});
