# CrioLab

**Herramientas abiertas de lectura crítica y análisis metodológico en criobiología y
reproducción animal.**

Cada línea se sirve como una página autocontenida: sin build, sin dependencias, sin recursos
externos y sin seguimiento. Todo corre en el navegador del visitante y nada de lo que se
introduce sale de su equipo.

🔗 **En vivo:** https://rijdho.github.io/criolab/

Interfaz solo en español, decisión deliberada: el material, su contexto y su audiencia son
hispanohablantes.

---

## Líneas

| Línea | Estado | Qué es |
|---|---|---|
| [**Simuladores críticos**](simuladores/) | Disponible | Cuatro simuladores interactivos sobre preguntas metodológicas sin resolver de cuatro manuscritos 2026: efecto Wahlund, potencial glicolítico estricto, potencia estadística y sensibilidad del VAN. |

Hay líneas de investigación en curso que se incorporarán a medida que haya resultados
publicables. Este repositorio aloja únicamente material ya publicable.

---

## Estructura del repositorio

```
index.html          Hub: qué es CrioLab y qué líneas hay.
simuladores/        Línea ①: los cuatro simuladores críticos.
  index.html        La aplicación completa (vanilla JS + SVG, sin build).
  METHODS.md        Fórmulas, supuestos y calibración de cada modelo.
  tests/            Suite: modelo puro + integridad estructural.
fonts/              Inter variable (latin + latin-ext), autohospedada y compartida
                    por todo el sitio. Nunca un CDN de fuentes.
tests/              Tests del hub.
package.json        Solo el script de test; sin dependencias.
CHANGELOG.md        Registro de cambios (Keep a Changelog + SemVer).
CITATION.cff        Metadatos de citación.
LICENSE             MIT.
.nojekyll           Evita el procesamiento Jekyll en GitHub Pages.
```

Cada línea es autónoma: su página, sus métodos y sus tests viven en su propia carpeta, y la
raíz solo aporta el hub, la tipografía compartida y los metadatos del repositorio.

---

## Tests

Runner de Node, sin dependencias. Descubre recursivamente los tests de todas las líneas:

```bash
npm test    # node --test
```

Las suites se validaron inyectando defectos deliberados y comprobando que cada uno las hace
fallar. Detalle de lo que cubre cada capa en el README de cada línea.

## Uso local

No requiere build. Sirve la raíz del repositorio:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Despliegue

GitHub Pages a través de **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)),
no el builder legacy: la suite de tests gatea cada despliegue y el árbol se sube tal cual, sin
procesamiento Jekyll.

## Diseño

Sistema visual compartido con los demás desarrollos `rijdho`: Inter (autohospedada, variable,
latin + latin-ext) para texto y display, monoespaciada para etiquetas y cifras, paleta violeta
`#6D4AFF`/`#8B7BFF`, tema claro/oscuro automático con conmutador persistente (`localStorage`).
El violeta es cromo y nunca codifica significado; el borde izquierdo de 3px se reserva para las
cajas de veredicto. Cero fuentes o scripts externos.

## Aviso

Los modelos son **reconstrucciones didácticas simplificadas** para explorar supuestos, **no
reanálisis de datos originales**. Las cifras por defecto están calibradas contra los valores
publicados; los deslizadores muestran sensibilidad, no resultados oficiales.

## Licencia

MIT, ver [`LICENSE`](LICENSE).

## Cómo citar

Si usas CrioLab, cítalo: ver [`CITATION.cff`](CITATION.cff) o el botón «Cite this repository»
de GitHub.
