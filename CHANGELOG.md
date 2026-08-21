# Registro de cambios

Los cambios relevantes de este proyecto se anotan aquí. El formato sigue
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) y las versiones siguen
[Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Sin publicar]

### Cambiado

- **El repositorio pasa a ser un paraguas de varias líneas.** La raíz deja de servir los
  simuladores y estrena un hub que dice qué es CrioLab y qué líneas hay; los cuatro
  simuladores, sus métodos, su mapa conceptual y sus tests bajan a `simuladores/`. Motivo:
  CrioLab acogerá más de una línea de trabajo, y con una sola en la raíz ninguna otra podía
  entrar sin quedar subordinada.
- La URL `https://rijdho.github.io/criolab/` pasa a resolver el hub. Quien la tuviera guardada
  llega al hub con los simuladores a un clic, en la primera tarjeta. `CITATION.cff` apunta
  ahora a `https://rijdho.github.io/criolab/simuladores/`, que es la obra que describe.
- `fonts/` queda en la raíz, compartida por el hub y por cada línea. El simulador la referencia
  como `../fonts/`.
- `npm test` pasa de un glob de un solo directorio (`node --test tests/*.test.mjs`) al
  descubrimiento recursivo (`node --test`), para que los tests de cada línea entren solos. El
  workflow sube a Node 22 en consecuencia.
- El README de la raíz se reescribe como README paraguas, y el del proyecto se traslada a
  `simuladores/README.md`. De paso corrige una desactualización: el README seguía documentando
  el despliegue por «Deploy from a branch» cuando desde `fd82653` va por Actions.

### Añadido

- `tests/hub.test.mjs`: cada línea enlazada desde el hub existe, hub y líneas declaran el mismo
  idioma, sin CDN de fuentes, el conmutador `data-theme` gana en ambas direcciones, el borde
  izquierdo de 3px no aparece en el hub (no porta veredictos), enlaces externos en lista blanca
  y About presente. Validado por inyección de tres defectos deliberados.

## [1.1.0] — 2026-08-10

### Añadido

- Este registro de cambios.
- Suite de tests con el runner de Node, sin dependencias (`npm test`): valores exactos
  del modelo puro (Wahlund, GP<sub>strict</sub>, potencia, VAN con verificación
  independiente por forma cerrada y calibración contra el titular de ④), integridad
  estructural contra fallos silenciosos, y un smoke test del script completo con DOM
  simulado. El modelo puro queda delimitado por marcadores en `index.html` y los tests
  lo extraen de ahí — sin duplicar código. Suite validada por inyección de defectos.
- Inter variable autohospedada (`fonts/`, latin + latin-ext, la misma pareja woff2 que
  `fair-repo-audit`), en lugar de los stacks de sistema — la tipografía queda alineada
  con la familia visual.
- Referencias metodológicas clásicas (Wahlund, Wright, Nei, Monin & Sellier, Cohen,
  Altman & Bland) en la pestaña «Glosario y fuentes», con DOI verificado.
- Línea de autoría en el pie de página: autor · licencia MIT · código fuente · cómo
  citar, con enlaces.
- Pages despliega ahora vía GitHub Actions (`deploy.yml`) en lugar del builder legacy:
  la suite de tests gatea cada despliegue y el árbol se sube tal cual, sin
  procesamiento Jekyll.

### Corregido

- El deslizador de hectáreas (④) declaraba `step="0.1"` con `value="3.18"`; el navegador
  ajusta el valor al paso más cercano (3,2), así que el VAN inicial mostraba 16.919 en
  lugar del ≈16.813 calibrado contra el titular del manuscrito (16.796). Ahora
  `step="0.01"`. Cazado comparando la página desplegada en un navegador real contra el
  smoke test; un test de integridad nuevo cubre la clase completa (todo `range` debe
  tener un `value` alcanzable desde `min` con su `step`).

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

[Sin publicar]: https://github.com/rijdho/criolab/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/rijdho/criolab/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rijdho/criolab/releases/tag/v1.0.0
