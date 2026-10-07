import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'node:http';
import { JSDOM } from 'jsdom';
import { chromium } from 'playwright';

const output = (await readFile(new URL('../../../releases/pages-output.txt', import.meta.url), 'utf8')).trim();
const base = '/nugeo-uema-web-site/';
const index = JSON.parse(await readFile(path.join(output, 'search-index.json'), 'utf8'));
for (const page of index) {
  const html = await readFile(path.join(output, page.url.slice(base.length), 'index.html'), 'utf8');
  assert.ok(!html.includes('127.0.0.1'), page.url);
  const dom = new JSDOM(html);
  assert.equal(dom.window.document.querySelectorAll('h1').length, 1, page.url);
  for (const node of dom.window.document.querySelectorAll('[href],[src]')) {
    const url = node.getAttribute('href') || node.getAttribute('src');
    if (!url.startsWith(base)) continue;
    let file = path.join(output, url.slice(base.length).split('#')[0]);
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    assert.ok((await stat(file)).isFile(), url);
  }
  dom.window.close();
}
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (!pathname.startsWith(base)) { res.writeHead(404).end(); return; }
    let file = path.join(output, pathname.slice(base.length));
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml' };
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(9402, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { channel: 'msedge' } : {}) });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['', 'laboratorios/labmet/', 'laboratorios/labhidro/', 'laboratorios/labgeo/']) {
      await page.goto('http://127.0.0.1:9402' + base + route);
      assert.ok(await page.locator('h1').isVisible());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      assert.deepEqual(await page.locator('img').evaluateAll(nodes => nodes.filter(img => img.complete && !img.naturalWidth).map(img => img.src)), []);
    }
  }
  await page.goto('http://127.0.0.1:9402' + base + '?s=meteorologia');
  await page.waitForFunction(() => document.querySelector('.nugeo-pages-results li a'));
  assert.ok(await page.locator('.nugeo-pages-results li').count() > 0);
  assert.deepEqual(errors, []);
  console.log(`PASS: ${index.length} páginas, links e assets; 3 laboratórios mobile/desktop; busca estática.`);
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
