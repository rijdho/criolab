# Registro de cambios

Los cambios relevantes de este proyecto se anotan aquí. El formato sigue
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) y las versiones siguen
[Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Sin publicar]

### Añadido

- Este registro de cambios.

### Cambiado

- `## Cómo citar` pasa a ser la última sección, después de `## Licencia`, siguiendo la
  convención del resto de repositorios.

## [1.0.0] — 2026-07-17

Primera versión pública. Cuatro simuladores interactivos que vuelven manipulables las
preguntas metodológicas sin resolver de cuatro manuscritos de 2026 del grupo de
A. Ramírez-Reveco (Instituto de Ciencia Animal / Programa Équidos, Universidad Austral
de Chile).

### Añadido

- **① Burro criollo chileno** — efecto Wahlund: dos subpoblaciones en equilibrio
  Hardy-Weinberg producen, al mezclarse, un F<sub>IS</sub> positivo idéntico a
  «endogamia» sin una sola cruza consanguínea.
- **② Potencial glicolítico estricto** — el falso negativo: con estrés pre-faena, la
  fórmula clásica de Monin & Sellier predice acidificación normal mientras la carne real
  se va a DFD.
- **③ Enantiómeros de glucosa en semen equino** — potencia estadística: un Monte Carlo
  muestra que con 4 sementales un resultado «sin diferencias» es esperable por diseño.
- **④ Tracción animal frente a mecanización** — sensibilidad del VAN: el titular de
  +16.796 USD colapsa al mover la tasa de descuento, el precio del diésel o la intensidad
  de uso de suelo.
- Pestañas **Panorama** (introducción y el hilo que conecta los cuatro trabajos) y
  **Glosario y fuentes** (14 términos y las referencias).
- `METHODS.md` con las fórmulas, entradas, calibración y **limitaciones de cada modelo**.
- `mapa-critico.drawio`, mapa conceptual de los cuatro artículos.
- Aplicación completa en un solo `index.html`: JavaScript sin dependencias y SVG, sin
  build ni recursos externos. Tema claro/oscuro persistente.
- `CITATION.cff` con los metadatos de citación y licencia MIT.
- Publicación en GitHub Pages (`.nojekyll`).

[Sin publicar]: https://github.com/rijdho/criolab/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/rijdho/criolab/releases/tag/v1.0.0
