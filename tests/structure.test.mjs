import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=(p)=>fs.readFileSync(p,'utf8');
test('Correct group/company identities',()=>{const s=read('src/lib/i18n.ts');assert.ok(s.includes('DELIGH GROUP'));assert.ok(!s.includes('ITSDELIGH GROUP'));});
test('Pure-white background and restrained palette',()=>{const s=read('src/styles/globals.css');assert.match(s,/--white:\s*#ffffff/i);assert.match(s,/--navy:\s*#10273e/i);});
test('All 9 top-level navigation entries',()=>{const s=read('src/lib/i18n.ts');for(const n of ['about','services','industries','work','insights','teams-offices','partners','careers','contact'])assert.ok(s.includes('slug: "'+n+'"'));});
test('Language support includes English, Hindi and Arabic',()=>{const s=read('src/lib/i18n.ts');for(const l of ['"en"','"hi"','"ar"']) assert.ok(s.includes(l));});
test('Preview prevents public indexing',()=>{assert.ok(read('src/app/robots.ts').includes("disallow: '/'"));assert.ok(read('src/app/layout.tsx').includes('index: false'));});
