import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const output = path.join(root, 'wordpress/migration');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage();
  await page.goto('https://www.nugeo.uema.br/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const inventory = await page.evaluate(() => ({
    title: document.title,
    api: document.querySelector('link[rel="https://api.w.org/"]')?.href,
    tree: (() => {
      const walk = (list) => [...list.children].filter((node) => node.tagName === 'LI').map((node) => {
        const anchor = node.querySelector(':scope > a');
        const children = node.querySelector(':scope > ul');
        return { id: node.id, label: anchor?.textContent.trim(), url: anchor?.href, children: children ? walk(children) : [] };
      });
      const menu = document.querySelector('#menu-menu-de-navegacao');
      return menu ? walk(menu) : [];
    })(),
    links: [...document.querySelectorAll('a')].map((anchor) => ({ text: anchor.textContent.trim() || anchor.querySelector('img')?.alt || '', href: anchor.href, parent: anchor.parentElement.className })),
  }));
  inventory.links = inventory.links.map((link) => ({ ...link, href: link.href.replace(/;jsessionid=[^?/#]+/gi, '') }));
  await writeFile(path.join(output, 'homepage-inventory.json'), JSON.stringify({ fetchedAt: new Date().toISOString(), source: page.url(), ...inventory }, null, 2));
  console.log(JSON.stringify({ tree: inventory.tree, api: inventory.api }, null, 2));
  if (inventory.api) {
    for (const type of ['pages', 'categories']) {
      const items = [];
      let totalPages = 1;
      for (let current = 1; current <= totalPages; current++) {
        const url = new URL(inventory.api);
        url.searchParams.set('rest_route', `/wp/v2/${type}`);
        url.searchParams.set('per_page', '100');
        url.searchParams.set('page', String(current));
        if (type === 'pages') url.searchParams.set('_fields', 'id,slug,parent,link,title,content,template,featured_media,modified');
        const response = await page.request.get(url.href, { timeout: 60000 });
        if (!response.ok()) { console.log(`${type}: HTTP ${response.status()}`); break; }
        const batch = await response.json();
        if (!Array.isArray(batch)) throw new Error(`Resposta inesperada para ${type}`);
        items.push(...batch);
        totalPages = Number(response.headers()['x-wp-totalpages'] || 1);
      }
      await writeFile(path.join(output, `${type}.json`), JSON.stringify(items, null, 2));
      console.log(`${type}: ${items.length} itens públicos inventariados`);
    }
    const postsURL = new URL(inventory.api);
    postsURL.searchParams.set('rest_route', '/wp/v2/posts');
    postsURL.searchParams.set('per_page', '1');
    postsURL.searchParams.set('_fields', 'id,link');
    const posts = await page.request.get(postsURL.href, { timeout: 60000 });
    console.log('Publicações públicas:', posts.headers()['x-wp-total'] || `HTTP ${posts.status()}`);
  }
} finally { await browser.close(); }
