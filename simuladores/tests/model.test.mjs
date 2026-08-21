// Tests del MODELO PURO de index.html. El bloque se extrae del propio archivo
// (entre los marcadores «MODELO PURO» y «FIN MODELO PURO»), de modo que se
// testea exactamente el código que se sirve — sin duplicarlo.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const m = html.match(/MODELO PURO[\s\S]*?=====\s*\*\/([\s\S]*?)\/\*\s*=====\s*FIN MODELO PURO/);
assert.ok(m, 'los marcadores MODELO PURO / FIN MODELO PURO deben existir en index.html');
const api = new Function(`${m[1]};
  return {wahlundModel, stressCouple, phFromGP, gpValues, tcrit, power, econModel, GPTHR, DFD, LOGI, INIT, Y6, Y12};`)();

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} ≉ ${b}`);

// ---------- ① Wahlund ----------

test('Wahlund: dos rebaños distintos (0.8, 0.2, 50%) dan el valor exacto FIS = FST = 0.36', () => {
  const r = api.wahlundModel(0.8, 0.2, 0.5);
  close(r.Ho, 0.32);
  close(r.He, 0.5);
  close(r.Fis, 0.36);
  close(r.Fst, 0.36);
});

test('Wahlund: sin estructura (pA = pB) no hay déficit', () => {
  const r = api.wahlundModel(0.5, 0.5, 0.5);
  assert.equal(r.Fis, 0);
  assert.equal(r.Fst, 0);
});

test('Wahlund: simétrico en (pA, pB) y nunca negativo sobre una rejilla', () => {
  close(api.wahlundModel(0.2, 0.8, 0.5).Fis, api.wahlundModel(0.8, 0.2, 0.5).Fis);
  for (let pa = 0.05; pa <= 0.95; pa += 0.15)
    for (let pb = 0.05; pb <= 0.95; pb += 0.15)
      for (let w = 0.1; w <= 0.9; w += 0.2)
        assert.ok(api.wahlundModel(pa, pb, w).Fis >= -1e-12);
});

test('Wahlund: la magnitud del manuscrito (FIS ≈ +0.18) es alcanzable sin endogamia', () => {
  const r = api.wahlundModel(0.71, 0.29, 0.5);
  assert.ok(r.Fis > 0.17 && r.Fis < 0.19, `Fis=${r.Fis}`);
});

// ---------- ② GPstrict ----------

test('GP: acople de estrés — extremos y caso agudo exactos', () => {
  assert.deepEqual(api.stressCouple(0), { gly: 100, lac: 6 });
  assert.deepEqual(api.stressCouple(100), { gly: 8, lac: 58 });
  assert.deepEqual(api.stressCouple(92), { gly: 15, lac: 54 });
});

test('GP: regla de pH — anclas exactas y clamp', () => {
  close(api.phFromGP(api.GPTHR), 5.5);   // sustrato de sobra → pH mínimo
  close(api.phFromGP(0), 6.4);           // sin sustrato → pH máximo
  close(api.phFromGP(180), 5.5);         // clamp inferior
  close(api.phFromGP(45), 5.95);         // punto medio
});

test('GP: el estrés agudo (92%) produce el falso negativo que el simulador afirma', () => {
  const { gly, lac } = api.stressCouple(92);
  const v = api.gpValues(gly, lac);
  assert.equal(v.gpS, 30);
  assert.equal(v.gpC, 84);
  close(v.phTrue, 6.1);
  close(v.phPred, 5.56);
  assert.ok(v.phTrue > api.DFD, 'el pH real debe caer en zona DFD');
  assert.ok(v.phPred <= api.DFD, 'la fórmula clásica debe predecir acidificación normal');
});

test('GP: descansado (estrés 10%) — ambas métricas coinciden en pH normal', () => {
  const { gly, lac } = api.stressCouple(10);
  const v = api.gpValues(gly, lac);
  close(v.phTrue, 5.5);
  close(v.phPred, 5.5);
});

// ---------- ③ potencia ----------

test('t crítica: valores exactos de tabla, interpolación y asíntota', () => {
  assert.equal(api.tcrit(2), 4.303);
  assert.equal(api.tcrit(6), 2.447);
  assert.equal(api.tcrit(60), 2.0);
  close(api.tcrit(11), 2.2035);          // interpolado entre df=10 y df=12
  assert.equal(api.tcrit(61), 1.98);     // asíntota (por debajo de tcrit(60): peculiaridad documentada)
});

test('potencia: n<2 es 0, y bajo H0 el rechazo ≈ α', () => {
  assert.equal(api.power(1, 10, 8, 100), 0);
  const alpha = api.power(8, 0, 8, 4000);
  assert.ok(alpha > 0.02 && alpha < 0.09, `α̂=${alpha}`);
});

test('potencia: el diseño del manuscrito (n=4, Δ=10, SD=8) queda muy por debajo del 80%', () => {
  const p4 = api.power(4, 10, 8, 4000);
  assert.ok(p4 > 0.15 && p4 < 0.55, `p4=${p4}`);   // teórica ≈ 0.34
  const p16 = api.power(16, 10, 8, 4000);
  assert.ok(p16 > p4, 'la potencia debe crecer con n');
  assert.ok(p16 > 0.8, `p16=${p16}`);              // teórica ≈ 0.93
});

// ---------- ④ VAN ----------

test('VAN: coincide con la forma cerrada de anualidad (implementación independiente)', () => {
  const [crop, r, ha, diesel, maint] = [635.89, 0.06, 3.18, 1, 262];
  const { disc, npv } = api.econModel(crop, r, ha, diesel, maint);
  const annual = crop * ha * diesel + api.LOGI - maint;
  const AF = (1 - (1 + r) ** -12) / r;
  const expected = -api.INIT + annual * AF + api.Y6 / (1 + r) ** 6 + api.Y12 / (1 + r) ** 12;
  close(npv, expected, 1e-6);
  assert.equal(disc.length, 13);
  close(disc[0], -api.INIT);
});

test('VAN: la calibración por defecto reproduce el titular del manuscrito (16.796 USD ± 100)', () => {
  const { npv } = api.econModel(635.89, 0.06, 3.18, 1, 262);
  assert.ok(Math.abs(npv - 16796) < 100, `npv=${npv}`);
});

test('VAN: sensibilidad — sube la tasa y baja el VAN; hay escenarios negativos alcanzables', () => {
  const base = api.econModel(635.89, 0.06, 3.18, 1, 262).npv;
  assert.ok(api.econModel(635.89, 0.12, 3.18, 1, 262).npv < base);
  assert.ok(api.econModel(156.53, 0.06, 0.5, 1, 450).npv < 0, 'trigo + baja intensidad + mantención alta debe dar VAN negativo');
});
