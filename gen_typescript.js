// Load the built module and extract the TypeScript definitions

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const input = path.resolve(process.argv[2]);
console.log('loading', input);
const dll = createRequire(import.meta.url)(input);
const ts = dll.__typescript;
if (!ts) throw new Error('No TypeScript definitions found');
const typings = path.resolve(process.argv[3]);
console.log('writing', typings);
fs.writeFileSync(typings, ts);
