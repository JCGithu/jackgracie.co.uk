#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const redirectsPath = resolve(dirname(fileURLToPath(import.meta.url)), '../src/lib/redirects.ts');
const { default: redirects } = await import(`file://${redirectsPath}`);

const buildConfig = `[build]
command = "bun run build"
publish = "build"

[build.environment]
  NODE_VERSION = "22"
`;

const redirectsSection = Object.entries(redirects).map(([from, to]) => 
  `[[redirects]]
  from = "${from}"
  to = "${to}"
  status = 301
`).join('\n');

// Add catch-all redirect for 404 handling
const catchAllRedirect = `[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
`;

writeFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../netlify.toml'), buildConfig + '\n' + redirectsSection + '\n' + catchAllRedirect);
console.log(`✅ Synced ${Object.keys(redirects).length} redirects to netlify.toml (+ catch-all for 404)`);