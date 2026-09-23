/* Rebuild the configured static hosting directory without deleting existing files. */
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function build() {
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const entries = ['index.html', ...Array.from(html.matchAll(/(?:src|href)="([^"#]+)"/g), m => m[1]).filter(p => !p.startsWith('assets/'))];
  const files = new Set(entries);
  async function walk(dir) {
    for (const entry of await fs.readdir(path.join(root, dir), {withFileTypes:true})) {
      const relative = path.posix.join(dir, entry.name);
      if (entry.isDirectory()) await walk(relative);
      else if (entry.isFile()) files.add(relative);
      else throw Error('Unexpected asset entry: ' + relative);
    }
  }
  await walk('assets');
  const manifest = {format:1, files:{}};
  let written = 0, bytes = 0;
  for (const relative of [...files].sort()) {
    if (relative.includes('..') || path.isAbsolute(relative)) throw Error('Unsafe build path: ' + relative);
    const source = path.join(root, relative), target = path.join(output, relative);
    const data = await fs.readFile(source), digest = hash(data);
    let current;
    try { current = hash(await fs.readFile(target)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (digest !== current) {
      await fs.mkdir(path.dirname(target), {recursive:true});
      await fs.writeFile(target, data); written++;
    }
    manifest.files[relative] = {bytes:data.length, sha256:digest}; bytes += data.length;
  }
  await fs.writeFile(path.join(output, 'build-manifest.json'), JSON.stringify(manifest, null, 2)+'\n');
  console.log(JSON.stringify({files:files.size, written, bytes, output}));
}
build().catch(error => {console.error(error);process.exitCode=1;});
