// NusaStats — Statistics of Indonesia (make.fun best-national-statistics-site-20261126-0539).
//
// The entry is a static site: app/ holds plain HTML, CSS and ES modules that
// open in a desktop browser or on a phone with no build step and no network.
// This program hands it in: it copies app/ and screenshots/ from beside this
// file into the grader's output directory and writes /output/dossier.json,
// the summary the judge reads, with the vendored make.fun library.
//
// The site's numbers live in app/data.js, each one a published figure from
// Statistics Indonesia (BPS), the World Bank or the ministry named beside it.
// Leave vendor/makefun-frontend.ts as it is: the scorer requires dossier.json
// to be byte for byte what its own copy writes.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files). The dossier call below reads the copied
// files back, so a missing page or an oversized screenshot fails here,
// before the entry ever reaches the judge.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log(`NusaStats handed in: app/ + screenshots/ copied to ${out}, dossier.json written.`);
