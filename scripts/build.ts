import { build } from 'esbuild';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function main(): Promise<void> {
  const files = await readdir('src');
  await build({
    entryPoints: files.map(file => join('src', file)),
    outdir: 'dist/esm',
    minify: true,
    sourcemap: 'inline',
  });
  await build({
    entryPoints: files.map(file => join('src', file)),
    outdir: 'dist/cjs',
    format: 'cjs',
    platform: 'node',
    minify: true,
    sourcemap: 'inline',
  });
}

main();
