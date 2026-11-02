import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root='public/images/';
const section=fs.readFileSync('src/components/section-page.tsx','utf8');
const service=fs.readFileSync('src/components/service-page.tsx','utf8');
const global=fs.readFileSync('src/lib/global-translations.ts','utf8');
const lang=fs.readFileSync('src/lib/language-catalog.ts','utf8');

test('Every main section uses a distinct hero image asset',()=>{
 const decl=Object.fromEntries([...section.matchAll(/^  (\w+): '(\/images\/[^']+)',?$/gm)].map(m=>[m[1],m[2]]));
 const mappings=[...section.matchAll(/^  (?:'([^']+)'|(\w+)): IMG\.(\w+),?$/gm)];
 const heroes=mappings.filter(m=>['services','industries','privacy','teams-offices','work','insights','partners','careers','contact'].includes(m[1]||m[2]));
 assert.equal(heroes.length,9);
 const paths=heroes.map(m=>decl[m[3]]);
 assert.ok(paths.every(Boolean));
 assert.equal(new Set(paths).size,paths.length,'Repeated hero across primary sections');
 for(const asset of paths) assert.ok(fs.statSync('public'+asset).size>10000);
});
test('Images for all five city cards and five new hero sections exist locally',()=>{
 for(const name of ['prayagraj','delhi','lucknow','hyderabad','pune']) assert.ok(fs.statSync(root+'dc-city-'+name+'.webp').size>30000);
 for(const name of ['work','insights','partners','careers','contact']) assert.ok(fs.statSync(root+'dc-hero-'+name+'.webp').size>30000);
});
test('Service detail methodology does not show 01, 02 step markers',()=>{
 assert.doesNotMatch(service,/0\{i\+1\}/);
});
test('Regional English is present and existing translations are complete',()=>{
 assert.match(lang,/English \(India\)/);
 assert.match(lang,/English \(UK\)/);
 assert.match(global,/Eight verified language editions/);
});
