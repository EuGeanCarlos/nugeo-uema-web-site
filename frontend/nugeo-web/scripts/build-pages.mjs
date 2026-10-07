// Export only a disposable WordPress installation seeded from repository files.
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const base = process.env.PAGES_BASE_PATH || '/nugeo-uema-web-site/';
if (!/^\/(?:[\w-]+\/)*$/.test(base)) throw new Error('Invalid PAGES_BASE_PATH');
const origin = 'http://127.0.0.1:9401';
await mkdir(path.join(root, 'releases'), { recursive: true });
const output = await mkdtemp(path.join(root, 'releases/pages-'));
const temp = await mkdtemp(path.join(tmpdir(), 'nugeo-pages-'));
const seeds = path.join(temp, 'seeds');
await mkdir(seeds);
for (const file of ['seed-local.php', 'seed-navigation.php', 'seed-laboratories.php']) {
  await copyFile(path.join(root, 'wordpress', file), path.join(seeds, file));
}
const blueprint = path.join(temp, 'blueprint.json');
await writeFile(blueprint, JSON.stringify({ steps: [
  { step: 'defineWpConfigConsts', consts: { SQLITE_JOURNAL_MODE: 'DELETE' } },
  { step: 'runPHP', code: "<?php require '/wordpress/wp-load.php'; update_option('nugeo_local_locale_initialized', 1); update_option('WPLANG', 'pt_BR'); require '/nugeo-tools/seed-local.php'; require '/nugeo-tools/seed-navigation.php';" },
] }));
const server = spawn(process.execPath, [path.join(root, '.playground/node_modules/@wp-playground/cli/wp-playground.js'),
  'server', '--wp=7.1.2', '--php=8.3', '--port=9401', `--site-url=${origin}`, '--workers=6',
  '--mount-dir', path.join(root, 'wordpress/nugeo'), '/wordpress/wp-content/themes/nugeo',
  '--mount-dir', seeds, '/nugeo-tools', `--blueprint=${blueprint}`], { stdio: ['ignore', 'pipe', 'pipe'] });
let ready = false;
server.stdout.on('data', data => { process.stdout.write(data); if (/server is running|server running|ready/i.test(String(data))) ready = true; });
server.stderr.on('data', data => process.stderr.write(data));
const pages = new Map();
const assets = new Set();
const queue = ['/'];
const index = [];
const local = value => { try { const url = new URL(value, origin); return url.origin === origin ? url : null; } catch { return null; } };
const target = pathname => base + pathname.replace(/^\//, '');
async function save(name, data) {
  const destination = path.resolve(output, '.' + name);
  if (!destination.startsWith(output + path.sep)) throw new Error('Unsafe output path');
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, data);
}
try {
  for (let attempt = 0; attempt < 240; attempt++) {
    if (server.exitCode !== null) throw new Error('WordPress build server exited');
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  if (!ready) throw new Error('WordPress startup timeout');
  while (queue.length) {
    const pathname = queue.shift();
    if (pages.has(pathname)) continue;
    const response = await fetch(origin + pathname);
    if (!response.ok) throw new Error(`Page ${pathname}: ${response.status}`);
    const dom = new JSDOM(await response.text());
    const doc = dom.window.document;
    doc.querySelectorAll('link[rel="dns-prefetch"], link[rel="https://api.w.org/"], link[rel="EditURI"], link[rel="shortlink"], link[type="application/json"], link[type="application/rss+xml"], meta[name="generator"]').forEach(el => el.remove());
    for (const el of doc.querySelectorAll('[href], [src], [action]')) {
      for (const attr of ['href', 'src', 'action']) {
        const value = el.getAttribute(attr);
        if (!value || value.startsWith('#')) continue;
        const url = local(value);
        if (!url) continue;
        if (/wp-admin|wp-login|wp-json|xmlrpc/.test(url.pathname)) { el.removeAttribute(attr); continue; }
        if (el.tagName === 'A' && attr === 'href') {
          if (url.search) throw new Error(`Unexported query link: ${value}`);
          if (!queue.includes(url.pathname) && !pages.has(url.pathname)) queue.push(url.pathname);
        } else if (attr === 'src' || (el.tagName === 'LINK' && el.rel === 'stylesheet')) assets.add(url.pathname);
        el.setAttribute(attr, target(url.pathname) + url.hash);
      }
    }
    const main = doc.querySelector('main');
    index.push({ title: doc.querySelector('h1')?.textContent.trim() || doc.title, url: target(pathname), text: main.textContent.replace(/\s+/g, ' ').trim().slice(0, 12000) });
    const notice = doc.createElement('aside');
    notice.className = 'nugeo-pages-notice';
    notice.textContent = 'Demonstração do novo tema NUGEO/UEMA. Conteúdos ilustrativos sujeitos à validação. Portal oficial: ';
    const official = doc.createElement('a'); official.href = 'https://www.nugeo.uema.br/'; official.textContent = 'nugeo.uema.br'; notice.append(official);
    main.prepend(notice);
    const style = doc.createElement('style'); style.textContent = '.nugeo-pages-notice{padding:12px 24px;background:#eaf3fa;color:#17324d;font-size:14px;text-align:center}.nugeo-pages-notice a{text-decoration:underline}.nugeo-pages-results{max-width:960px;margin:auto;padding:48px 24px}.nugeo-pages-results li{margin:24px 0}.nugeo-pages-results a{text-decoration:underline}'; doc.head.append(style);
    const script = doc.createElement('script'); script.src = base + 'pages-search.js'; script.defer = true; doc.body.append(script);
    const html = dom.serialize().replaceAll(origin, base.replace(/\/$/, ''));
    pages.set(pathname, html);
    await save(pathname.endsWith('/') ? pathname + 'index.html' : pathname + '/index.html', html);
    dom.window.close();
  }
  // Dependencies referenced by stylesheets (fonts and images) are exported recursively.
  for (const asset of assets) {
    if (!/\.(css|js|svg|png|jpe?g|webp|gif|ico|woff2?|ttf)$/i.test(asset)) throw new Error(`Unexpected asset ${asset}`);
    const response = await fetch(origin + asset);
    if (!response.ok) throw new Error(`Asset ${asset}: ${response.status}`);
    if (asset.endsWith('.css')) {
      let css = await response.text();
      css = css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g, (all, quote, value) => {
        if (value.startsWith('data:') || value.startsWith('#')) return all;
        const url = new URL(value, origin + asset);
        if (url.origin !== origin) return all;
        assets.add(url.pathname); return `url("${target(url.pathname)}")`;
      });
      await save(asset, css);
    } else await save(asset, Buffer.from(await response.arrayBuffer()));
  }
  await save('/search-index.json', JSON.stringify(index));
  await copyFile(path.join(root, 'frontend/nugeo-web/scripts/pages-search.js'), path.join(output, 'pages-search.js'));
  const notFound = new JSDOM(pages.get('/'));
  notFound.window.document.querySelector('main').innerHTML = `<div class="nugeo-pages-results"><h1>Página não encontrada</h1><p>Este endereço não faz parte da demonstração.</p><a href="${base}">Voltar ao início</a></div>`;
  await save('/404.html', notFound.serialize()); notFound.window.close();
  await save('/.nojekyll', '');
  await writeFile(path.join(root, 'releases/pages-output.txt'), output);
  console.log(`Exported ${pages.size} pages and ${assets.size} assets to ${output}`);
} finally { server.kill(); }
