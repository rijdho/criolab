# CrioLab · Simuladores críticos

Cuatro simuladores interactivos que convierten en algo **manipulable y visible** las preguntas metodológicas sin resolver de cuatro manuscritos 2026 del grupo A. Ramírez-Reveco (Instituto de Ciencia Animal / Programa Équidos, Universidad Austral de Chile).

En varios casos la herramienta construye, de forma didáctica, una validación que las versiones consultadas de los manuscritos no reportan. Las observaciones críticas se refieren a esas versiones (2026, sin publicar) y pueden no aplicar a versiones posteriores.

**En vivo:** https://rijdho.github.io/criolab/

Interfaz solo en español — decisión deliberada: los manuscritos, su contexto y su audiencia
son hispanohablantes.

---

## Los cuatro simuladores

| # | Paper | Lo que el simulador demuestra |
|---|-------|-------------------------------|
| ① | **Burro criollo chileno** (manuscrito 2026, destinado a JABG) — morfometría + microsatélites | **Efecto Wahlund.** Dos subpoblaciones en perfecto equilibrio Hardy-Weinberg, al mezclarse, producen un F<sub>IS</sub> positivo idéntico a "endogamia" sin una sola cruza consanguínea. Muestra por qué el estudio no puede separar endogamia de estructura. |
| ② | **Potencial glicolítico estricto (GP<sub>strict</sub>)** — nota teórica | **El falso negativo.** Con estrés pre-faena, la fórmula clásica de Monin & Sellier predice acidificación normal mientras la carne real se va a DFD. Reproduce el caso que el paper afirma pero nunca muestra con datos. |
| ③ | **Enantiómeros de glucosa en semen equino** (n=4) | **Potencia estadística.** Un Monte Carlo muestra que, con 4 sementales, un resultado "sin diferencias" es esperable por diseño aunque exista un efecto real — no es evidencia de ausencia de efecto. |
| ④ | **Tracción animal vs mecanización (PNFE)** — Ulloa et al. | **Sensibilidad del VAN.** El titular de +16.796 USD colapsa al mover la tasa de descuento, el precio del diésel o la intensidad de uso de suelo (108%, simulada). El resultado es un supuesto, no un dato. |

La página incluye además una pestaña **Panorama** (introducción + el hilo que conecta los cuatro trabajos) y **Glosario y fuentes**: 14 términos, los cuatro manuscritos con su estatus de publicación declarado (a 2026-08-10 ninguno consta publicado ni tiene DOI), y las referencias metodológicas clásicas (Wahlund 1928, Wright 1951, Nei 1977, Monin & Sellier 1985, Cohen 1988, Altman & Bland 1995) con DOI verificado contra CrossRef.

Las fórmulas, entradas y calibración de cada modelo están documentadas en **[`METHODS.md`](METHODS.md)**.

---

## Estructura del repositorio

```
index.html          La aplicación completa: 4 simuladores en un solo HTML,
                    vanilla JS + SVG, sin build ni dependencias externas.
fonts/              Inter variable (latin + latin-ext), autohospedada — nunca
                    un CDN de fuentes.
tests/              Suite (node --test): modelo puro + integridad estructural.
package.json        Solo el script de test; sin dependencias.
METHODS.md          Fórmulas, supuestos y calibración de cada simulador.
README.md           Este archivo.
CITATION.cff        Metadatos de citación.
LICENSE             MIT.
mapa-critico.drawio Mapa conceptual de los cuatro papers (abrir con diagrams.net).
.nojekyll           Evita el procesamiento Jekyll en GitHub Pages.
```

Todo el proyecto es autocontenido: mover la carpeta a cualquier ubicación no rompe nada, y el historial `git` viaja con ella.

---

## Tests

Runner de Node, sin dependencias:

```bash
npm test    # node --test tests/*.test.mjs
```

Dos capas. `tests/model.test.mjs` fija con valores exactos el modelo puro — Wahlund,
GP<sub>strict</sub>, potencia, VAN — extrayendo el bloque marcado del propio `index.html`
(una sola fuente de verdad), e incluye la calibración contra el titular del manuscrito ④
(16.796 USD ± 100) y una comprobación independiente del VAN por forma cerrada de
anualidad. `tests/integrity.test.mjs` caza fallos silenciosos (ids muertos, pestañas sin
panel, clases de veredicto sin CSS, enlaces externos fuera de lista blanca, reglas de la
familia visual) y ejecuta el script completo con un DOM simulado. La suite se validó
inyectando defectos deliberados y comprobando que cada uno la hace fallar.

## Uso local

No requiere build. Doble clic en `index.html`, o sirve la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar en GitHub Pages

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`. El archivo `.nojekyll` evita el procesamiento Jekyll. Por CLI:

```bash
gh api --method POST repos/<owner>/<repo>/pages -f "source[branch]=main" -f "source[path]=/"
```

---

## Diseño

Sistema visual compartido con los demás desarrollos `rijdho`: Inter (autohospedada, variable, latin + latin-ext) para texto y display + monoespaciada para etiquetas y cifras, paleta violeta `#6D4AFF`/`#8B7BFF`, tema claro/oscuro automático con conmutador persistente (`localStorage`). El borde izquierdo de 3px se reserva para las cajas de veredicto (estado); las tarjetas sin veredicto llevan el hairline de 1px. Cero fuentes o scripts externos.

## Aviso

Los modelos son **reconstrucciones didácticas simplificadas** para explorar los supuestos de cada trabajo, **no reanálisis de los datos originales**. Las cifras por defecto están calibradas contra los valores publicados; los deslizadores muestran sensibilidad, no resultados oficiales. Detalle y limitaciones de cada modelo en [`METHODS.md`](METHODS.md).

## Licencia

MIT — ver [`LICENSE`](LICENSE).

## Cómo citar

Ver [`CITATION.cff`](CITATION.cff).
