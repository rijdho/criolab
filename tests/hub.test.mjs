// Integridad del hub (index.html de la raíz): que enlace a líneas que existen, que
// respete las reglas de la familia visual y que no filtre nada a un tercero.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];

test('cada línea enlazada desde el hub existe en el repositorio', () => {
  const links = [...html.matchAll(/href="\.\/([^"#?]+)\/"/g)].map(m => m[1]);
  assert.ok(links.length >= 1, 'el hub debe enlazar al menos una línea');
  for (const l of links)
    assert.ok(existsSync(new URL(`${l}/index.html`, root)), `línea sin index.html: ${l}`);
});

test('el hub y cada línea declaran el mismo idioma', () => {
  assert.match(html, /<html lang="es">/);
  const sim = readFileSync(new URL('simuladores/index.html', root), 'utf8');
  assert.match(sim, /<html lang="es">/);
});

test('sin CDN de fuentes; las woff2 declaradas existen en el repo', () => {
  assert.ok(!/fonts\.googleapis|fonts\.gstatic|use\.typekit|fonts\.bunny/i.test(html));
  const files = [...css.matchAll(/url\(\.\/(fonts\/[^)]+\.woff2)\)/g)].map(m => m[1]);
  assert.equal(files.length, 2, 'deben declararse los dos subsets (latin + latin-ext)');
  for (const f of files) assert.ok(existsSync(new URL(f, root)), `falta ${f}`);
});

test('el conmutador data-theme gana a prefers-color-scheme en ambas direcciones', () => {
  assert.ok(css.includes(':root[data-theme="dark"]'));
  assert.ok(css.includes(':root[data-theme="light"]'));
});

test('el borde izquierdo de 3px no se usa en el hub: no hay veredictos que señalar', () => {
  assert.ok(!/border-left:\s*3px/.test(css),
    'el borde izquierdo de 3px pertenece al estado/veredicto, y el hub no porta ninguno');
});

test('todo enlace externo del hub está en la lista blanca', () => {
  const allow = /^(https:\/\/doi\.org\/|https:\/\/github\.com\/rijdho\/criolab)/;
  for (const [, url] of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g))
    assert.ok(allow.test(url), `enlace externo fuera de la lista blanca: ${url}`);
});

test('el hub lleva su About: autor, licencia y código fuente', () => {
  assert.match(html, /Ricardo Hartley Belmar/);
  assert.match(html, /LICENSE/);
  assert.match(html, /github\.com\/rijdho\/criolab/);
});
