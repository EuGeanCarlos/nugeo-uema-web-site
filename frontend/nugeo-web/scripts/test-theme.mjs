import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.NUGEO_TEST_URL || 'http://127.0.0.1:9400';
const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..', 'releases/audit');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
const results = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  for (const width of [320, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto('/', { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.locator('#hero-title').waitFor();
    await page.locator('.nugeo-footer').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].every((image) => image.complete));
    await page.evaluate(() => window.scrollTo(0, 0));
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      missingImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter((link) => !document.getElementById(link.hash.slice(1))).map((link) => link.hash),
    }));
    assert.ok(layout.scrollWidth <= width, `Overflow at ${width}: ${layout.scrollWidth}`);
    assert.deepEqual(layout.missingImages, []);
    assert.deepEqual(layout.missingAnchors, []);
    results.push(layout);
    if ([390, 1440].includes(width)) {
      const accessibility = await new AxeBuilder({ page }).analyze();
      results.push({ width, violations: accessibility.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target) })) });
      assert.deepEqual(accessibility.violations, [], `Acessibilidade: ${accessibility.violations.map((item) => item.id).join(', ')}`);
      await page.screenshot({ path: path.join(output, `home-${width}.png`), fullPage: true });
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Abrir menu principal', exact: true }).click();
  assert.equal(await page.locator('#primary-navigation').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#primary-navigation').isVisible(), false);
  assert.equal(await page.locator('[data-menu-toggle]').evaluate((element) => element === document.activeElement), true);
  await page.locator('[data-menu-toggle]').click();
  await page.setViewportSize({ width: 1440, height: 900 });
  assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden');
  assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'false');
  await page.evaluate(() => window.scrollTo(0, 600));
  assert.ok(Math.abs((await page.locator('#site-header').boundingBox()).y) < 2, 'Header deve permanecer sticky');

  await page.getByRole('button', { name: 'Abrir pesquisa', exact: true }).click();
  await page.locator('#site-search input').fill('publicação');
  await Promise.all([page.waitForURL(/\?s=/), page.locator('#site-search form button').click()]);
  assert.match(await page.locator('h1').innerText(), /Resultados/);
  assert.ok(await page.locator('.nugeo-news-card').count() > 0, 'A busca deve retornar o conteúdo demonstrativo');
  await page.goto('/?s=termo-inexistente-nugeo-987654');
  assert.equal(await page.getByText('Nenhum resultado encontrado', { exact: true }).isVisible(), true);
  await page.goto('/sobre/');
  assert.equal(await page.locator('h1').innerText(), 'O NUGEO');
  await page.goto('/noticias/');
  const article = await page.locator('.nugeo-news-body h3 a').first().getAttribute('href');
  await page.goto(article);
  assert.equal(await page.locator('.nugeo-prose').count(), 1);
  const missing = await page.goto('/pagina-inexistente-nugeo-987654/');
  assert.equal(missing.status(), 404);
  assert.equal(await page.getByRole('heading', { name: 'Não encontramos esta página' }).isVisible(), true);

  const noJS = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJS.newPage();
  await fallback.goto('/');
  assert.equal(await fallback.locator('#primary-navigation').isVisible(), true);
  assert.equal(await fallback.locator('#laboratorios').isVisible(), true);
  await noJS.close();

  const animatedContext = await browser.newContext({ baseURL, reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } });
  const animated = await animatedContext.newPage();
  await animated.goto('/');
  assert.ok(await animated.locator('.nugeo-reveal-pending').count() > 0);
  const card = animated.locator('.nugeo-lab-card').first();
  await card.scrollIntoViewIfNeeded();
  await card.evaluate((element) => new Promise((resolve) => {
    if (element.classList.contains('nugeo-reveal-visible')) return resolve();
    const observer = new MutationObserver(() => { if (element.classList.contains('nugeo-reveal-visible')) { observer.disconnect(); resolve(); } });
    observer.observe(element, { attributes: true, attributeFilter: ['class'] });
  }));
  await animated.emulateMedia({ reducedMotion: 'reduce' });
  await animated.waitForFunction(() => document.querySelectorAll('.nugeo-reveal-pending').length === 0);
  assert.equal(await animated.locator('.nugeo-reveal-pending').count(), 0);
  await animatedContext.close();
  assert.deepEqual(errors, []);
  console.log('PASS: 7 larguras, axe em mobile/desktop, menu, Escape, resize, sticky, pesquisa, páginas, posts, 404, sem JS e movimento reduzido.');
} finally {
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ baseURL, results, errors }, null, 2));
  await browser.close();
}
