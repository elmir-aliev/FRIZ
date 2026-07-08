import sharp from 'sharp';
import { readdir, mkdir, rename, stat } from 'node:fs/promises';
import { join, dirname, relative, extname, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC_DIR = join(ROOT, 'public/friz');
const BACKUP_DIR = join(ROOT, 'originals-png');

const BIG = /hero|repair-works|sketch|before|after|\/blocks\/|\/hub\//;
const QUALITY = 80;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (extname(entry.name).toLowerCase() === '.png') out.push(p);
  }
  return out;
}

const files = await walk(SRC_DIR);
let before = 0, after = 0;

for (const file of files) {
  const rel = relative(SRC_DIR, file);
  const maxW = BIG.test('/' + rel) ? 1920 : 1500;
  const outFile = join(dirname(file), basename(file, '.png') + '.webp');

  const meta = await sharp(file).metadata();
  const targetW = Math.min(meta.width, maxW);

  await sharp(file)
    .resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outFile);

  const inSize = (await stat(file)).size;
  const outSize = (await stat(outFile)).size;
  before += inSize;
  after += outSize;

  // move original to backup, preserving structure
  const bak = join(BACKUP_DIR, rel);
  await mkdir(dirname(bak), { recursive: true });
  await rename(file, bak);

  console.log(
    `${rel}  ${meta.width}px→${targetW}px  ` +
    `${(inSize / 1e6).toFixed(2)}MB → ${(outSize / 1e3).toFixed(0)}KB`
  );
}

console.log(
  `\nTotal: ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB ` +
  `(−${(100 - (after / before) * 100).toFixed(0)}%), ${files.length} files`
);
