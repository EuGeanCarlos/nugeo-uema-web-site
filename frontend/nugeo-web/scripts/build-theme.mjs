import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArrowRight, ArrowUpRight, ArrowUp, ArrowDown, CloudSun, CloudRain, Database, Droplets, ExternalLink, FlaskConical, Gauge, Mail, MapPin, MapPinned, Menu, Newspaper, Phone, Satellite, Search, Wind } from 'lucide-react';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.resolve(root, '../../wordpress/nugeo/assets');
await mkdir(assets, { recursive: true });
const result = await build({
  root,
  base: './',
  configFile: false,
  plugins: [tailwindcss()],
  build: { write: false, rollupOptions: { input: path.join(root, 'theme-entry.css') } },
});
const outputs = (Array.isArray(result) ? result : [result]).flatMap((item) => item.output);
const css = outputs.find((item) => item.type === 'asset' && item.fileName.endsWith('.css'));
if (!css) throw new Error('O build não produziu o CSS do tema.');
await writeFile(path.join(assets, 'site.css'), css.source);
for (const asset of outputs.filter((item) => item.type === 'asset' && !item.fileName.endsWith('.css'))) {
  await writeFile(path.join(assets, path.basename(asset.fileName)), asset.source);
}
const licenses = path.resolve(assets, '../licenses');
await mkdir(licenses, { recursive: true });
await copyFile(path.join(root, 'node_modules/lucide-react/LICENSE'), path.join(licenses, 'lucide.txt'));
await copyFile(path.join(root, 'node_modules/@fontsource-variable/geist/LICENSE'), path.join(licenses, 'geist.txt'));
for (const [source, target] of [
  ['src/assets/brand/nugeo-logo.svg', 'nugeo-logo.svg'],
  ['src/assets/brand/logo-branca.svg', 'nugeo-logo-white.svg'],
  ['src/assets/images/hero/nugeo-hero.webp', 'nugeo-hero.webp'],
]) await copyFile(path.join(root, source), path.join(assets, target));

const icons = { 'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, 'arrow-up': ArrowUp, 'arrow-down': ArrowDown, 'cloud-sun': CloudSun, 'cloud-rain': CloudRain, database: Database, droplets: Droplets, 'external-link': ExternalLink, 'flask-conical': FlaskConical, gauge: Gauge, mail: Mail, 'map-pin': MapPin, 'map-pinned': MapPinned, menu: Menu, newspaper: Newspaper, phone: Phone, satellite: Satellite, search: Search, wind: Wind };
const symbols = Object.entries(icons).map(([name, Icon]) => {
  const svg = renderToStaticMarkup(createElement(Icon));
  return `<symbol id="${name}" viewBox="0 0 24 24">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</symbol>`;
});
await writeFile(path.join(assets, 'icons.svg'), `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`);
console.log(`Tema compilado em ${assets}. JavaScript React não é incluído no tema.`);
