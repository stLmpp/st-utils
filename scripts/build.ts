import { build, BuildOptions } from 'esbuild';
import { readdir, rm } from 'fs/promises';
import { join } from 'path';
import { spawn } from 'child_process';

function emitDeclarations(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const child = spawn('npm', ['run', 'build-types'], {
        shell: true,
        env: process.env,
      });
      child.on('close', () => {
        resolve();
      });
      child.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function apiExtractor(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const child = spawn('npm', ['run', 'api-extractor'], {
        shell: true,
        env: process.env,
      });
      child.on('close', () => {
        resolve();
      });
      child.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteTypesFolder(): Promise<void> {
  await rm('dist/types', { recursive: true });
}

async function main(): Promise<void> {
  const files = await readdir('src');
  const filePaths = files.map((file) => join('src', file));
  const defaultOptions: BuildOptions = {
    entryPoints: filePaths,
    minify: true,
    sourcemap: 'inline',
  };
  await Promise.all([
    build({
      ...defaultOptions,
      outdir: 'dist/esm',
    }),
    build({
      ...defaultOptions,
      outdir: 'dist/cjs',
      format: 'cjs',
      platform: 'node',
    }),
    emitDeclarations(),
  ]);
  await apiExtractor();
  await deleteTypesFolder();
}

main();
