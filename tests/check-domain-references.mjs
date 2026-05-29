import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const excludedDirectories = new Set([
  '.git',
  '.next',
  'node_modules',
]);
const textExtensions = new Set([
  '.cjs',
  '.css',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.sh',
  '.ts',
  '.tsx',
  '.txt',
  '.yml',
  '.yaml',
]);

const legacyReferences = [
  'm' + '-breuer.dev',
  'm' + '-breuer',
];
const expectedReferences = [
  {
    file: 'next-sitemap.config.cjs',
    reference: ['https://prompt-manager.', 'marcel-breuer.dev'].join(''),
  },
  {
    file: 'README.md',
    reference: ['https://github.com/', 'marcel-breuer', '/prompt-manager.git'].join(''),
  },
];

async function listTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        files.push(...await listTextFiles(fullPath));
      }
      continue;
    }

    if (entry.isFile() && textExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await listTextFiles(root);
const contents = await Promise.all(files.map(async (file) => ({
  file,
  text: await readFile(file, 'utf8'),
})));

const legacyMatches = [];
for (const { file, text } of contents) {
  for (const legacyReference of legacyReferences) {
    if (text.includes(legacyReference)) {
      legacyMatches.push(`${path.relative(root, file)} contains ${legacyReference}`);
    }
  }
}

if (legacyMatches.length > 0) {
  console.error(legacyMatches.join('\n'));
  process.exit(1);
}

for (const { file, reference } of expectedReferences) {
  const target = contents.find(({ file: filePath }) => path.relative(root, filePath) === file);

  if (!target?.text.includes(reference)) {
    console.error(`Missing expected reference in ${file}: ${reference}`);
    process.exit(1);
  }
}
