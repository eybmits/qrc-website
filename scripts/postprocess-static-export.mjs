import { promises as fs } from 'node:fs';
import path from 'node:path';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : '';
const outputDir = path.resolve('out');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(target);
      }

      return target;
    })
  );

  return files.flat();
}

async function main() {
  if (!basePath) {
    return;
  }

  const htmlFiles = (await walk(outputDir)).filter((file) => file.endsWith('.html'));
  const duplicateSitePrefix = `${basePath}${basePath}/`;

  await Promise.all(
    htmlFiles.map(async (file) => {
      const original = await fs.readFile(file, 'utf8');
      const updated = original
        .replaceAll('href="/manifest.webmanifest"', `href="${basePath}/manifest.webmanifest"`)
        .replaceAll(duplicateSitePrefix, `${basePath}/`);

      if (updated !== original) {
        await fs.writeFile(file, updated);
      }
    })
  );
}

await main();
