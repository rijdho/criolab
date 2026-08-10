// Integridad estructural de index.html: fallos silenciosos (ids muertos,
// pestañas sin panel, clases sin CSS, enlaces fuera de la lista blanca) y un
// smoke test que ejecuta el script completo con un DOM simulado.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const htmlURL = new URL('../index.html', import.meta.url);
const html = readFileSync(htmlURL, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(s => s[1]);
const script = scripts.reduce((a, b) => (a.length >= b.length ? a : b)); // el bloque principal
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];

// ---------- estructura ----------

test('cada pestaña tiene panel y cada panel tiene pestaña', () => {
  const tabs = [...html.matchAll(/<button class="subtab[^"]*" data-t="([^"]+)"/g)].map(m => m[1]);
  const panels = [...html.matchAll(/<section class="panel[^"]*" id="p-([^"]+)"/g)].map(m => m[1]);
  assert.ok(tabs.length >= 6, 'debe haber al menos 6 pestañas');
  for (const t of tabs) assert.ok(panels.includes(t), `pestaña sin panel: ${t}`);
  for (const p of panels) assert.ok(tabs.includes(p), `panel sin pestaña: ${p}`);
});

test('todo getElementById literal apunta a un id que existe en el HTML', () => {
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
  const refs = [...script.matchAll(/getElementById\('([^'+]+)'\)/g)].map(m => m[1]);
  assert.ok(refs.length > 30, 'la extracción de referencias no puede estar vacía');
  for (const r of refs) assert.ok(ids.has(r), `id referenciado pero inexistente: ${r}`);
});

test('toda clase de veredicto asignada por JS existe en el CSS', () => {
  const used = new Set([...script.matchAll(/verdict (v-\w+)/g)].map(m => m[1]));
  assert.ok(used.size >= 3);
  for (const c of used) assert.ok(css.includes(`.${c}{`), `clase sin CSS: ${c}`);
});

test('el glosario tiene los 14 términos que el README anuncia', () => {
  const count = [...html.matchAll(/class="gterm"/g)].length;
  assert.equal(count, 14);
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.ok(readme.includes('14 términos'), 'el README debe seguir anunciando 14 términos');
});

test('fuentes: 10 referencias, 5 con DOI, y todo enlace externo en lista blanca', () => {
  assert.equal([...html.matchAll(/class="ref"/g)].length, 10);
  assert.equal([...html.matchAll(/href="https:\/\/doi\.org\//g)].length, 5);
  const allow = /^(https:\/\/doi\.org\/|https:\/\/github\.com\/rijdho\/criolab|http:\/\/www\.w3\.org\/)/;
  for (const [, url] of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g))
    assert.ok(allow.test(url), `enlace externo fuera de la lista blanca: ${url}`);
});

// ---------- familia visual ----------

test('sin CDN de fuentes; las woff2 declaradas existen en el repo', () => {
  assert.ok(!/fonts\.googleapis|fonts\.gstatic|use\.typekit|fonts\.bunny/i.test(html));
  const files = [...css.matchAll(/url\(\.\/(fonts\/[^)]+\.woff2)\)/g)].map(m => m[1]);
  assert.equal(files.length, 2, 'deben declararse los dos subsets (latin + latin-ext)');
  for (const f of files) assert.ok(existsSync(new URL(`../${f}`, import.meta.url)), `falta ${f}`);
});

test('el borde izquierdo de 3px pertenece al veredicto, no a las tarjetas', () => {
  assert.ok(/\.verdict\{[^}]*border-left:3px solid currentColor/.test(css));
  assert.ok(!/\.ov\{[^}]*border-left/.test(css), '.ov no debe llevar border-left (regla de familia)');
});

test('el conmutador data-theme gana a prefers-color-scheme en ambas direcciones', () => {
  assert.ok(css.includes(':root[data-theme="dark"]'));
  assert.ok(css.includes(':root[data-theme="light"]'));
});

// ---------- smoke: el script completo corre sin DOM real ----------

test('smoke: init completo con DOM simulado y valores por defecto reales', () => {
  const defaults = {};
  for (const tag of html.matchAll(/<input[^>]*>/g)) {
    const id = /id="([^"]+)"/.exec(tag[0]);
    const value = /value="([^"]+)"/.exec(tag[0]);
    if (id && value) defaults[id[1]] = value[1];
  }
  assert.equal(defaults.n, '4', 'el HTML debe declarar n=4 por defecto (el n del manuscrito)');

  const els = {};
  const makeEl = id => ({
    id, value: defaults[id] ?? '0', textContent: '', innerHTML: '', className: '',
    style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, setAttribute() {}, getAttribute: () => null,
  });
  const doc = {
    getElementById: id => (els[id] ??= makeEl(id)),
    documentElement: makeEl('root'),
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  new Function('document', 'window', 'matchMedia', 'getComputedStyle', script)(
    doc, {}, () => ({ matches: false }), () => ({ getPropertyValue: () => '#000000' })
  );

  assert.equal(els['m-fis'].textContent, '+0.360');            // Wahlund por defecto
  assert.equal(els['ver-gp'].className, 'verdict v-good');     // estrés 10% → pH normal
  assert.match(els['m-pow'].textContent, /^\d+%$/);            // potencia calculada
  const van = parseInt(els['m-van'].textContent.replace(/\D/g, ''), 10);
  assert.ok(Math.abs(van - 16796) < 100, `VAN por defecto fuera de calibración: ${van}`);
});
