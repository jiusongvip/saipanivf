---
name: saipan-guide-tables
description: Turn guide content into accessible tables and simple data charts (ranges, budgets, evidence ratings, step flows) using the site's shared guide components. Use whenever a Saipan IVF guide compares options, lists prices or timelines, or reports evidence.
---

# Saipan IVF Guide Tables & Data Charts

Use with `saipan-guide-editor`. Every number shown must already be in that guide's source ledger; a chart never introduces a figure the text cannot cite.

## 1. Pick the form from the content (not for decoration)
| Content | Use | Component |
|---|---|---|
| Options compared on the same attributes (tests, treatments, regions) | Table, one row per option | `DataTable` |
| Prices, budgets, counts with units; ranges | Table for exact values **plus** bars when relative size matters | `DataTable` + `RangeBars` |
| Graded evidence (HFEA traffic lights, guideline strength) | Rating cards with words + shapes | `RatingGrid` |
| Ordered process, timeline | Numbered steps (optional icons) | `StepFlow` |
| "If you are X, ask Y" | Table with situation as row header | `DataTable` |
| Two or three short alternatives | Plain cards in prose — no chart |  |

Skip a chart when it repeats a table exactly, has fewer than 3 values, or would need invented scale. Do not use pie/donut charts or 3D. One visual idea per figure.

## 2. Components (`src/components/guide/`)
```astro
import DataTable from '../../components/guide/DataTable.astro';
import RangeBars from '../../components/guide/RangeBars.astro';
import RatingGrid from '../../components/guide/RatingGrid.astro';
import StepFlow from '../../components/guide/StepFlow.astro';

<DataTable label="三种检测对照表" columns={['检测','查什么','适合谁']} rows={rows} numeric={[1]} total caption="来源：…" />
<RangeBars title="PGT-A 相关预算（USD）" prefix="US$" items={[{label:'PGT-A 检测',min:3000,max:6000,emphasis:true},{label:'冻胚移植',min:4500}]} caption="本站规划预算，非诊所报价。" />
<RatingGrid title="HFEA 证据评级" source="HFEA" sourceHref={hfea} items={[{outcome:'活产机会',group:'大多数患者',rating:'red',verdict:'未显示有效',note:'…'}]} />
<StepFlow label="流程" steps={[{icon:'outline-microscope',title:'取卵与培养',text:'…'}]} />
```
- `DataTable`: first cell of each row is the row header; `numeric` = column indexes (right-aligned, no wrap); `total` styles the last row; scroll region is focusable and labelled; mobile swipe hint is built in.
- `RangeBars`: `min` alone = single value; `min`+`max` = range. Values are printed as text, so the chart works without color. Use the same `scaleMax` when two charts are meant to be compared.
- `RatingGrid`: `rating` ∈ green/amber/red/grey; each card shows a shape + verdict word. Use the issuer's own scale words; do not convert one body's grade into another's.
- `StepFlow`: icons come from `saipan-guide-illustrations` (`src/assets/icons`). Do not put numbers in steps that the ledger does not support.
- Prices: always import from `src/data/pricing.ts` (never retype), label currency, unit, scope and "规划预算，非诊所报价".

## 3. Writing rules
- Column headers are nouns with units (`规划价 · USD`). Row headers are the thing compared.
- Each cell ≤ 2 short sentences. Put caveats in the caption, not in every cell.
- Caption = source + date + what is excluded. Keep inline `[n]`/links in the paragraph after the table, not inside cells, unless one cell has a unique source.
- Simplified Chinese source text; the Traditional build converts text automatically — add any region terms to `src/integrations/traditional.mjs` for that route.
- Never show color alone; never show a bar without its value.

## 4. Acceptance (add to the guide review)
- Rendered at 320/390/768/1440: no page overflow; tables scroll inside their region; scroll regions focusable (CI visual job or local Chromium).
- Every figure maps to a ledger row; totals recomputed in code, not by hand.
- `npm run verify` passes (headings in tables do not need font regeneration; new H1/H2 text does — see README fonts note).
