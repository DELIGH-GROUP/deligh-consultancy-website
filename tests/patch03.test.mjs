import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(file)=>fs.readFileSync(file,'utf8');
test('Patch03 generated assets exist locally, not reused external hero/team URLs',()=>{
 for(const file of ['dc-generated-hero.webp','dc-generated-group.webp','dc-generated-meeting.webp','dc-generated-service-1.webp','dc-generated-service-2.webp','dc-generated-service-3.webp','dc-generated-service-4.webp']) {
   const path='public/images/'+file;
   assert.ok(fs.statSync(path).size > 10000,`${path} missing or too small`);
 }
 const css=read('src/styles/globals.css');
 assert.match(css,/\.hero\{position:relative;min-height:490px;background:#c9e8ff url\('\/images\/dc-generated-hero.webp'\)/);
 assert.match(css,/\.group-story-photo\{min-height:520px;position:relative;background:#dfeafa url\('\/images\/dc-generated-group.webp'\)/);
 assert.match(css,/\.about-hero-visual\{background:linear-gradient[^\n]+dc-hd-strategy-workshop\.webp/);
 assert.doesNotMatch(css,/dc-generated-meeting\.webp/);
});
test('Patch03 language dropdown is flag-based and does not link incomplete translations',()=>{
 const source=read('src/components/site-shell.tsx');
 const catalog=read('src/lib/language-catalog.ts');
 assert.match(source,/language-panel/);
 assert.match(source,/disabled=\{!l\.available\}/);
 assert.match(source,/switchLocale\(l\.code as Locale\)/);
 assert.match(source,/language-flag/);
 assert.ok((catalog.match(/code:'/g)||[]).length >= 35);
 assert.match(catalog,/code:'zh'.+available:false/);
 assert.match(catalog,/code:'ja'.+available:false/);
 assert.match(catalog,/code:'ko'.+available:false/);
});
test('Patch03 does not claim an illustrated DELIGH GROUP building is a real office',()=>{
 const about=read('src/components/about-page.tsx');
 assert.match(about,/Concept visual — not an existing office/);
 assert.match(about,/ITSDELIGH PRIVATE LIMITED/);
 assert.match(about,/DELIGH CONSULTANCY/);
});
test('Directory, team, and work pages retain distinct locally bundled imagery',()=>{
 const source=read('src/components/section-page.tsx');
 const style=read('src/styles/globals.css');
 // Current HD assets supersede the older dc-generated-service-* names.
 assert.match(source,/meeting:\s*'\/images\/dc-hd-executive-meeting\.webp'/);
 assert.match(source,/teamwork:\s*'\/images\/dc-hd-collaborative-office\.webp'/);
 assert.match(source,/work:\s*IMG\.workHero/);
 assert.match(source,/'teams-offices':\s*IMG\.teamsReceptionHero/);
 assert.match(source,/dc-hero-teams-reception\.webp/);
 assert.match(source,/servicePhotos\s*=\s*\[IMG\.meeting,\s*IMG\.analytics,\s*IMG\.bridge/);
 assert.match(style,/\.teams-visual-photo/);
 for (const file of ['dc-hd-executive-meeting.webp','dc-hd-collaborative-office.webp','dc-hd-financial-analytics.webp']) {
   const path='public/images/'+file;
   assert.ok(fs.statSync(path).size > 100000, `${path} must be an actual local HD asset`);
 }
});
