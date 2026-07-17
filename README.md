# CrioLab · Simuladores críticos

Cuatro simuladores interactivos que convierten en algo **manipulable y visible** las preguntas metodológicas sin resolver de cuatro manuscritos 2026 del grupo A. Ramírez-Reveco (Instituto de Ciencia Animal / Programa Équidos, Universidad Austral de Chile).

En varios casos la herramienta hace, de forma didáctica, la validación que los propios artículos no incluyen.

## Los cuatro simuladores

| # | Paper | Lo que el simulador demuestra |
|---|-------|-------------------------------|
| ① | **Burro criollo chileno** (JABG 2026) — morfometría + microsatélites | **Efecto Wahlund.** Dos subpoblaciones en perfecto equilibrio Hardy-Weinberg, al mezclarse, producen un F<sub>IS</sub> positivo idéntico a "endogamia" sin una sola cruza consanguínea. Muestra por qué el estudio no puede separar endogamia de estructura. |
| ② | **Potencial glicolítico estricto (GP<sub>strict</sub>)** — nota teórica | **El falso negativo.** Con estrés pre-faena, la fórmula clásica de Monin & Sellier predice acidificación normal mientras la carne real se va a DFD. Reproduce el caso que el paper afirma pero nunca muestra con datos. |
| ③ | **Enantiómeros de glucosa en semen equino** (n=4) | **Potencia estadística.** Un Monte Carlo muestra que, con 4 sementales, un resultado "sin diferencias" es esperable por diseño aunque exista un efecto real — no es evidencia de ausencia de efecto. |
| ④ | **Tracción animal vs mecanización (PNFE)** — Ulloa et al. | **Sensibilidad del VAN.** El titular de +16.796 USD colapsa al mover la tasa de descuento, el precio del diésel o la intensidad de uso de suelo (108%, simulada). El resultado es un supuesto, no un dato. |

## Uso

Es una sola página autocontenida, **sin dependencias ni build**.

- **Abrir localmente:** doble clic en `index.html`, o servir la carpeta:
  ```bash
  python3 -m http.server 8000
  # http://localhost:8000
  ```
- **Publicar en GitHub Pages:** Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`. El archivo `.nojekyll` evita el procesamiento Jekyll.

## Diseño

Sistema visual compartido con los demás desarrollos `rijdho`: tipografía display (Helvetica Neue 800) + mono para etiquetas y cifras, paleta violeta, tema claro/oscuro automático con conmutador persistente. Cero fuentes o scripts externos.

## Aviso

Los modelos son **reconstrucciones didácticas simplificadas** para explorar los supuestos de cada trabajo, **no reanálisis de los datos originales**. Las cifras por defecto están calibradas contra los valores publicados; los deslizadores muestran sensibilidad, no resultados oficiales.

## Licencia

MIT — ver [`LICENSE`](LICENSE).
