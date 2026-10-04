import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const tree = JSON.parse(await readFile(new URL('../../../wordpress/nugeo/inc/site-tree.json', import.meta.url), 'utf8').then(t => t.replace(/^\uFEFF/, '')));
const flatten = items => items.flatMap(item => [item, ...flatten(item.children)]);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
await mkdir(new URL('../../../releases/audit/', import.meta.url), { recursive: true });
try {
 const context = await browser.newContext({ baseURL: 'http://127.0.0.1:9400', reducedMotion: 'reduce' });
 const page = await context.newPage();
 await page.goto('/');
 const labels = await page.locator('#primary-navigation a').allTextContents();
 for (const item of flatten(tree)) assert.ok(labels.includes(item.label), `Menu ausente: ${item.label}`);
 for (const [slug, index] of [['labmet',2],['labhidro',3],['labgeo',4]]) {
  for (const width of [320,390,768,1440,1920]) {
   await page.setViewportSize({width,height:900});
   assert.equal((await page.goto(`/laboratorios/${slug}/`)).status(),200);
   assert.match(await page.locator('h1').innerText(), /Laboratório/);
   assert.equal(await page.locator('h1').count(),1);
   for (const section of ['sobre','areas','produtos','equipe','acervo']) assert.equal(await page.locator(`#${section}`).count(),1);
   const anchors=await page.locator('.nugeo-laboratory a[href^="#"]').evaluateAll(nodes=>nodes.filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));
   assert.deepEqual(anchors,[]);
   await page.locator('.nugeo-footer').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>[...document.querySelectorAll('.nugeo-laboratory img')].every(img=>img.complete));
   assert.deepEqual(await page.locator('.nugeo-laboratory img').evaluateAll(nodes=>nodes.filter(img=>!img.naturalWidth).map(img=>img.src)),[]);
   if(slug==='labmet') {
    assert.equal(await page.locator('#monitoramento').count(),1);
    assert.equal(await page.locator('.nugeo-lab-person').count(),6);
    assert.equal(await page.locator('.nugeo-lab-person a[href^="mailto:"]').count(),6);
    assert.equal(await page.locator('.nugeo-lab-person a[href*="lattes.cnpq.br/"]').count(),6);
    assert.match(await page.locator('.nugeo-lab-facts').innerText(),/30\/06\/2026/);
    assert.equal(await page.locator('.nugeo-lab-product').count(),5);
   } else {
    assert.match(await page.locator('.nugeo-lab-notice').innerText(),/Conteúdo ilustrativo/);
    assert.equal(await page.locator('.nugeo-lab-person a').count(),0);
   }
   const links = await page.locator('.nugeo-lab-resources a').evaluateAll(nodes => nodes.map(a=>({label:a.textContent.trim(),url:a.href})));
   for(const item of flatten(tree[index].children)) assert.ok(links.some(a=>a.label===item.label && a.url===item.url), `${slug}: ${item.label}`);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), `${slug}: overflow em ${width}px`);
   if([390,1440].includes(width)) {
    const audit = await new AxeBuilder({page}).analyze();
    assert.deepEqual(audit.violations.map(v=>v.id),[]);
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`../../releases/audit/${slug}-${width}.png`,fullPage:true});
    await page.locator('.nugeo-lab-hero').screenshot({path:`../../releases/audit/${slug}-hero-${width}.png`});
   }
  }
 }
 await page.setViewportSize({width:1440,height:900});
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
 const noJS=await browser.newContext({baseURL:'http://127.0.0.1:9400',javaScriptEnabled:false});
 const basic=await noJS.newPage();
 await basic.goto('/laboratorios/labmet/');
 assert.equal(await basic.locator('.nugeo-lab-person').count(),6);
 assert.ok(await basic.locator('#produtos').isVisible());
 await noJS.close();
 console.log(`PASS: ${flatten(tree).length} itens originais; 3 laboratórios em 5 larguras; conteúdo, imagens, âncoras, equipe, axe, teclado e sem JS.`);
} finally { await browser.close(); }
