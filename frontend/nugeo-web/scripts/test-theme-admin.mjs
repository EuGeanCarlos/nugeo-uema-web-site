import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const access = JSON.parse(await readFile(path.join(root, 'wordpress/.local-access.json'), 'utf8'));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const context = await browser.newContext({ baseURL: 'http://127.0.0.1:9400', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/wp-login.php');
  await page.locator('#user_login').fill(access.username);
  await page.locator('#user_pass').fill(access.password);
  await Promise.all([page.waitForURL('**/wp-admin/**'), page.locator('#wp-submit').click()]);
  await page.goto('/wp-admin/themes.php');
  assert.match(await page.locator('.theme.active').innerText(), /NUGEO UEMA/);
  await page.goto('/wp-admin/customize.php');
  await page.locator('#accordion-section-nugeo_home').click();
  await page.locator('#_customize-input-nugeo_hero_title').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#_customize-input-nugeo_hero_title').inputValue(), 'Ciência, monitoramento e inovação para o');
  await page.goto('/');
  assert.equal(await page.locator('#wpadminbar').isVisible(), true);
  assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
  await page.evaluate(() => window.scrollTo(0, 500));
  const header = await page.locator('#site-header').boundingBox();
  const admin = await page.locator('#wpadminbar').boundingBox();
  assert.ok(header.y >= admin.y + admin.height - 1, 'Header deve respeitar a barra administrativa');
  console.log('PASS: login local, tema ativo, controles do Personalizador, idioma e header com barra administrativa.');
} finally { await browser.close(); }
