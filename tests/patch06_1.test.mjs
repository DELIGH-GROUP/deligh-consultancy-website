import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(p)=>fs.readFileSync(p,'utf8');
const imageDirectory='public/images/';
const images=[
 'dc-hd-curved-glass.webp','dc-hd-executive-meeting.webp',
 'dc-hd-financial-analytics.webp','dc-hd-bridge-industrial.webp',
 'dc-hd-collaborative-office.webp','dc-hd-group-headquarters.webp',
 'dc-hd-reception-lobby.webp','dc-hd-strategy-workshop.webp'
];

test('06.1 image assets are valid local WebP files, no broken placeholders',()=>{
 for(const name of images){
  const path=imageDirectory+name;
  const raw=fs.readFileSync(path);
  assert.ok(raw.length>100000,`${name} unexpectedly small`);
  assert.equal(raw.subarray(0,4).toString(),'RIFF',`${name} is not WebP RIFF`);
  assert.equal(raw.subarray(8,12).toString(),'WEBP',`${name} is not a WebP image`);
 }
});

test('06.1 distinct image assignments for important corporate sections',()=>{
 const page=read('src/components/section-page.tsx');
 const expected={
  services:'analytics',industries:'bridge',work:'meeting',insights:'workshop',
  'teams-offices':'teamwork',partners:'headquarters',careers:'curved',contact:'lobby'
 };
 for(const [section,asset] of Object.entries(expected)){
  const key=section.includes('-')?`'${section}'`:section;
  assert.ok(page.includes(`${key}: IMG.${asset}`),`${section} must use distinct assigned HD image`);
 }
 assert.equal(new Set(Object.values(expected)).size,Object.keys(expected).length);
});

test('06.1 no numbered badges are rendered and left-side gradient does not overlay imagery',()=>{
 const css=read('src/styles/globals.css');
 const components=['src/components/home.tsx','src/components/about-page.tsx','src/components/section-page.tsx'];
 assert.match(css,/\.item-no\{display:none!important\}/);
 assert.match(css,/\.hero::before\{content:"";position:absolute;inset-block:0;left:0;width:min\(62%,980px\)/);
 assert.match(css,/\.section-page-hero::before\{content:"";position:absolute;inset-block:0;left:0;width:min\(58%,920px\)/);
 for(const path of components){
  const source=read(path);
  assert.doesNotMatch(source,/String\((?:i|idx|index)\s*\+\s*1\)\.padStart/);
 }
});
