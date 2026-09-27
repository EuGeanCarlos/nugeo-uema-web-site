import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const tree = JSON.parse(await readFile(new URL('../../../wordpress/nugeo/inc/site-tree.json', import.meta.url), 'utf8').then(t => t.replace(/^\uFEFF/, '')));
const flatten = items => items.flatMap(item => [item, ...flatten(item.children)]);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
 const context = await browser.newContext({ baseURL: 'http://127.0.0.1:9400', reducedMotion: 'reduce' });
 const page = await context.newPage();
 await page.goto('/');
 const labels = await page.locator('#primary-navigation a').allTextContents();
 for (const item of flatten(tree)) assert.ok(labels.includes(item.label), `Menu ausente: ${item.label}`);
 for (const [slug, index] of [['labmet',2],['labhidro',3],['labgeo',4]]) {
  for (const width of [390,1440]) {
   await page.setViewportSize({width,height:900});
   assert.equal((await page.goto(`/laboratorios/${slug}/`)).status(),200);
   assert.match(await page.locator('h1').innerText(), /Laboratório/);
   const links = await page.locator('.nugeo-lab-resources a').evaluateAll(nodes => nodes.map(a=>({label:a.textContent.trim(),url:a.href})));
   for(const item of flatten(tree[index].children)) assert.ok(links.some(a=>a.label===item.label && a.url===item.url), `${slug}: ${item.label}`);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   const audit = await new AxeBuilder({page}).analyze();
   assert.deepEqual(audit.violations.map(v=>v.id),[]);
   await page.screenshot({path:`../../releases/audit/${slug}-${width}.png`,fullPage:true});
  }
 }
 await page.goto('/');
 const toggle=page.getByRole('button',{name:'Seções de Meteorologia',exact:true});
 await toggle.click();
 const nested = page.locator('#primary-navigation').getByRole('link',{name:'Dados das PCDs',exact:true});
 assert.ok(await nested.isVisible());
 await nested.focus();
 await page.keyboard.press('Escape');
 assert.equal(await toggle.getAttribute('aria-expanded'),'false');
 assert.equal(await toggle.evaluate(el=>el===document.activeElement),true);
 assert.equal(await nested.isVisible(),false);
 console.log(`PASS: ${flatten(tree).length} itens originais preservados; 3 laboratórios em 390/1440px; axe; terceiro nível e Escape.`);
} finally { await browser.close(); }
