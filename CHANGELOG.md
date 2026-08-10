# Registro de cambios

Los cambios relevantes de este proyecto se anotan aquí. El formato sigue
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) y las versiones siguen
[Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Sin publicar]

### Añadido

- Este registro de cambios.
- Inter variable autohospedada (`fonts/`, latin + latin-ext, la misma pareja woff2 que
  `fair-repo-audit`), en lugar de los stacks de sistema — la tipografía queda alineada
  con la familia visual.
- Referencias metodológicas clásicas (Wahlund, Wright, Nei, Monin & Sellier, Cohen,
  Altman & Bland) en la pestaña «Glosario y fuentes», con DOI verificado.
- Línea de autoría en el pie de página: autor · licencia MIT · código fuente · cómo
  citar, con enlaces.

### Cambiado

- `## Cómo citar` pasa a ser la última sección, después de `## Licencia`, siguiendo la
  convención del resto de repositorios.
- El borde izquierdo de 3px queda reservado a las cajas de veredicto (estado); las
  tarjetas del Panorama, que no portan veredicto, vuelven al hairline de 1px — regla de
  la familia visual.
- Hero, Panorama y veredictos en registro académico: cada afirmación sobre un manuscrito
  se atribuye a la versión consultada («el manuscrito reporta / no reporta»), y las
  observaciones transversales se marcan como lectura propia, no como afirmaciones de los
  textos.
- Las referencias de los cuatro manuscritos declaran su estatus (en preparación o
  revisión, sin DOI) y la fecha de la versión consultada.
- La interfaz permanece deliberadamente solo en español — excepción explícita
  (2026-08-10) al piso trilingüe EN/DE/ES de la familia: los manuscritos, su contexto y
  su audiencia son hispanohablantes. El README lo declara junto al enlace En vivo.

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
