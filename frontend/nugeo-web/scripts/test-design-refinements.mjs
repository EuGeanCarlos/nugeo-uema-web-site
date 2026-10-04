import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const context=await browser.newContext({baseURL:'http://127.0.0.1:9400',reducedMotion:'reduce',viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 await page.goto('/laboratorios/labmet/');
 const products=page.locator('.nugeo-lab-nav a[href="#produtos"]');
 await products.click();
 await page.waitForFunction(()=>document.querySelector('.nugeo-lab-nav a[href="#produtos"]').getAttribute('aria-current')==='location');
 assert.equal(await page.locator('.nugeo-lab-nav [aria-current="location"]').count(),1);
 const heading=await page.locator('#produtos h2').boundingBox();
 const nav=await page.locator('.nugeo-lab-nav').boundingBox();
 assert.ok(heading.y>=nav.y+nav.height,'Título não pode ficar sob a navegação fixa');
 await page.locator('#equipe').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('.nugeo-lab-nav a[href="#equipe"]').getAttribute('aria-current')==='location');
 const cdp=await context.newCDPSession(page);
 for (const [transparency,contrast] of [['reduce','no-preference'],['no-preference','more']]) {
  await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'},{name:'prefers-reduced-transparency',value:transparency},{name:'prefers-contrast',value:contrast}]});
  assert.equal(await page.locator('#site-header').evaluate(el=>getComputedStyle(el).backdropFilter),'none');
 }
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const overflow=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(0,10).map(el=>({tag:el.tagName,cls:el.className}))}));
 assert.ok(overflow.width<=overflow.viewport,JSON.stringify(overflow));
 await page.evaluate(()=>document.documentElement.style.fontSize='');
 await page.goto('/');
 const button=page.locator('[data-search-toggle]');
 await button.hover();
 await page.mouse.down();
 assert.equal(await button.evaluate(el=>getComputedStyle(el).transform),'none','Sem escala com movimento reduzido');
 await page.mouse.up();
 assert.equal(await button.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');
 assert.equal(await button.getAttribute('aria-expanded'),'false');
 console.log('PASS: seção ativa, âncoras sem obstrução, contraste, transparência reduzida, texto a 200% e resposta dos controles.');
} finally {await browser.close();}
