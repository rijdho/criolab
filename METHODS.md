# Métodos y supuestos

Documentación técnica de los cuatro simuladores de `index.html`. Toda la lógica está en el bloque `<script>` del propio archivo (sin dependencias). Los modelos son **reconstrucciones didácticas simplificadas** para explorar los supuestos de cada trabajo, no reanálisis de los datos originales.

Convención: los identificadores entre paréntesis (`m-fis`, `updGP`, …) corresponden a los `id`/funciones en `index.html`.

---

## ① Burros — efecto Wahlund (`updBurro`)

Un locus bialélico, dos subpoblaciones A y B, **cada una en equilibrio Hardy-Weinberg** (sin endogamia).

| Entrada | Rango | Significado |
|---|---|---|
| `pa` | 0.05–0.95 | frecuencia alélica en A |
| `pb` | 0.05–0.95 | frecuencia alélica en B |
| `w` | 0.05–0.95 | fracción de la muestra que proviene de A |

```
Ho  = w·2·pA(1−pA) + (1−w)·2·pB(1−pB)      (heterocigosis observada = media dentro de subpobl.)
p̄   = w·pA + (1−w)·pB                        (frecuencia agrupada)
He  = 2·p̄(1−p̄)                              (esperada si fuese una sola población)
FIS = (He − Ho) / He
FST = w(1−w)(pA−pB)² / [p̄(1−p̄)]
```

**Idea:** con `pA ≠ pB`, `FIS > 0` aparece **solo por mezclar**, sin ninguna cruza consanguínea. Reproduce por qué un déficit de heterocigotos (el `FIS = +0,18` del paper) no distingue endogamia de estructura poblacional.

**Limitaciones:** un solo locus bialélico (el estudio usa 13 STR multialélicos); es ilustrativo, no ajustado a los genotipos reales.

---

## ② GPstrict — falso negativo de DFD (`updGP`)

```
GP_clásico = 2·(glucógeno + G6P + glucosa) + lactato        [µmol/g]
GP_strict  = 2·(glucógeno + G6P + glucosa)
pH_u(GP)   = clamp( 5.5 + (6.4 − 5.5)·(1 − GP / GPTHR), 5.5, 6.4 )   con GPTHR = 90
```

- **pH real** = `pH_u(GP_strict)` — sólo el sustrato transformable acidifica.
- **pH predicho (clásico)** = `pH_u(GP_clásico)` — la misma relación, pero alimentada con el GP inflado por el lactato basal.
- **DFD** si `pH_u > 5.9`.

El deslizador de estrés (`stress` ∈ 0–100) acopla las reservas:
```
glucógeno = 100 − 92·(stress/100)
lactato   = 6 + 52·(stress/100)
```

**Idea:** con estrés agudo el `GP_strict` cae (pH real → DFD) mientras el `GP_clásico`, sostenido por el lactato, predice acidificación normal → **falso negativo**. Es el caso que la nota teórica afirma pero no muestra con datos.

**Limitaciones:** `GPTHR`, el rango de pH (5.5–6.4) y el mapeo del estrés son constantes ilustrativas elegidas para que un animal descansado dé ~5.5 y el estrés agudo dé DFD; **no** son valores ajustados. La relación GP↔pH real es más ruidosa y depende de especie/músculo.

---

## ③ Semen — potencia estadística (`updPow`, `power`)

Test *t* de dos muestras, varianzas iguales, α = 0,05 bilateral. Monte Carlo:

```
por iteración:
  control    ~ N(0,   sd²)   (n valores)
  tratamiento~ N(delta, sd²) (n valores)
  t  = (m₂ − m₁) / (sp · √(2/n)),   df = 2n − 2
  rechazo si |t| > t_crit(df)
potencia = rechazos / iteraciones      (1400 iter/punto de la curva)
```

- `t_crit(df)` sale de una tabla incrustada (interpolada; asíntota 1.98 para df ≥ 60).
- **n para 80%**: el menor `n` con potencia ≥ 0,80.

| Entrada | Rango | Significado |
|---|---|---|
| `n` | 2–24 | n por grupo (el paper usó 4) |
| `delta` | 2–25 | diferencia real asumida (% motilidad) |
| `sd` | 3–18 | desviación estándar (% ≈ la del paper) |

**Idea:** con n = 4 la potencia es baja (~30%), así que un resultado "sin diferencias" es esperable por diseño y no evidencia de ausencia de efecto.

**Limitaciones:** modela una comparación de 2 grupos (el diseño real es ANOVA de 4 tratamientos); asume normalidad e igual SD; al ser estocástico varía ±pocos % entre corridas.

---

## ④ Economía — sensibilidad del VAN (`updEcon`, `econFlows`)

Flujo de caja descontado a 12 años.

```
anual   = CROP·ha·diesel + LOGI − maint
CF[0]   = −INIT
CF[t]   = anual  (+ Y6 en t=6;  + Y12 en t=12),   t = 1..12
VAN     = Σ CF[t] / (1 + r)^t
```

Constantes (de los componentes declarados en el paper): `LOGI = 93,63` (ahorro logístico/año), `INIT = 391,32` (inversión en aperos), `Y6 = 978,30` (venta yegua madre), `Y12 = 1957` (liquidación final).

| Entrada | Por defecto | Significado |
|---|---|---|
| `CROP` | 635,89 (maíz) | ahorro USD/ha del cultivo (presets: arroz 348,67 · porotos 228,92 · trigo 156,53) |
| `r` | 6,0% | Tasa Social de Descuento |
| `ha` | 3,18 | ha trabajadas con tracción/año |
| `diesel` | 1,00× | factor de precio del diésel |
| `maint` | 262 | costo de mantención anual (USD) |

**Calibración:** con los valores por defecto, `VAN ≈ 16.8k`, que reproduce el titular del paper (16.796 USD, maíz). El `ha` por defecto (3,18) se eligió para igualar esa cifra.

**Idea:** subir `r`, bajar `ha` o cambiar el `diesel` muestra cuán frágil es ese titular — es un supuesto, no un dato.

**Limitaciones:** los montos únicos (venta en año 6, liquidación en año 12) están simplificados; no se calcula TIR; se omiten las partidas de economía informal que el propio paper señala.

---

## Reproducir / editar

Todo vive en `index.html`. Para servir localmente:

```bash
python3 -m http.server 8000    # luego http://localhost:8000
```

Para cambiar un modelo, edita la función correspondiente en el `<script>`; las constantes de calibración están al inicio de cada bloque (`GPTHR`, `LOGI`, `INIT`, la tabla `TCRIT`, etc.).
