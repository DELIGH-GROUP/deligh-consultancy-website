import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const config = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
test('Typescript includes source and Next generated types without scanning local-tools backups',()=>{
  assert.ok(config.include.includes('src/**/*.ts'));
  assert.ok(config.include.includes('src/**/*.tsx'));
  assert.ok(config.include.includes('.next/types/**/*.ts'));
  assert.ok(config.include.includes('.next/dev/types/**/*.ts'));
  assert.ok(!config.include.includes('**/*.ts'));
  assert.ok(!config.include.includes('**/*.tsx'));
  assert.ok(config.exclude.includes('local-tools'));
});
test('No unintended deletions or modifications to Patch 01 base component files',()=>{
  for(const file of ['src/components/arrow.tsx','src/lib/data.ts','src/lib/sections.ts']) {
    assert.ok(fs.existsSync(file), `Missing expected base project file: ${file}`);
  }
});
