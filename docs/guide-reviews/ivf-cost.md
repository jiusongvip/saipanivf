# ivf-cost — limited customer-copy acceptance

Golden reference: /guides/egg-freezing-cost/
Primary question: IVF基础预算包含什么，哪些另计？
First-screen answer: 取卵培养、药物和麻醉预算 US$18,800–23,800，移植与额外项目另计。
Sources: Existing pricing.ts planning assumptions dated 2026-10-26, not verified clinic fees; existing HFEA/ASRM references for egg-freezing-cost and NHS IVF reference for ivf-cost unchanged. No new medical or price claims introduced or independently certified by this copy review.
Comparison: Current golden source and both Chinese outputs rendered in actual Chromium at 390×900 and 1440×900 on 2026-10-28. This record accepts the limited copy cleanup relative to its existing release, not a fresh clinical or whole-site quality certification.
Score: 88/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: Codex focused editorial and rendered-page review; not a clinical professional.

| Dimension | Result | Evidence for this limited correction |
|---|---|---|
| Five-second answer | Equal | Existing first-screen budget cards and qualified amounts remain; removal of production captions brings useful content earlier. |
| Information density | Equal | Removes irrelevant production details; useful budget lines, inclusions and exclusions remain intact. |
| Visual clarity | Equal | Actual 390px and 1440px screenshots in both locales show no clipped content or document overflow; layout remains unchanged apart from deleted caption. |
| Structured usefulness | Equal | Existing budget tables, written-quote checks and FAQs remain intact. No new calculator or decision-aid claims. |
| Specificity | Equal | Currency, budget ranges, assumptions and dates unchanged; amounts still explicitly labeled estimates rather than clinic fees. |
| Trust | Equal | Clinical source links and estimate caveats unchanged; internal file paths are replaced by readable budget language. Image provenance remains in internal records, per owner's instruction. |
| User journey | Equal | Existing guide, budget and consultation links are preserved; no routes or form behavior changed. |
| Accessibility and responsive behavior | Equal | One H1 and no document overflow verified in both locales at both widths; images and existing semantic tables/FAQ retained. |
| Technical SEO | Equal | Titles, descriptions, canonicals, alternates and schema unchanged. IVF FAQ schema is generated from the same edited answer as visible text. |
| Localization | Equal | Simplified and Traditional outputs checked separately; changed copy removes technical pricing language while preserving budget uncertainty. |

## Scope and score
88/100 is a narrow release-maintenance heuristic (answer 23/25, preserved evidence/qualification 22/25, reading/mobile 18/20, retained decision utility 13/15, technical/localization 12/15), not a clinical evidence rating or ranking promise. IVF is a shorter base-cost checklist; full travel tiers and a cover are outside this correction. Their pre-existing absence is not presented as a new feature or new improvement.

## Verification
See customer-copy-results.json for the 195-page visible-text audit and actual browser measurements of the changed guides. Screenshots were inspected in the working session. Full npm run verify must pass before publishing this correction. CI and live deployment are reported separately.

## 2026-11-03 technical SEO follow-up
Head/meta-only correction shipped with the Cloudflare Pages deployment (commit d110c41, live on https://www.ivfsaipan.com). In `IVFCostGuide.astro` the document `lang` and the Traditional alternate `hreflang` now carry `zh-TW` instead of `zh-Hant`; `og:image:width`, `og:image:height` and `og:image:alt` were declared and re-checked against the served cover file; `og:locale:alternate` was completed; canonical and `og:url` resolve to the `www` origin through `src/data/origin.mjs`.
A separate `metaDescription` string was introduced for the `<head>` and the JSON-LD `WebPage.description` now points at it, so the indexed summary sits in the 130–160 half-width band while the on-page summary line keeps its original wording. Both strings describe the same base-cost scope already published; the visible answer, budget table, figures and source links are unchanged, and no medical or price claim was introduced.
The rows above (including `Technical SEO: Equal`) sign off the 2026-10-28 release; this follow-up records a later metadata correction against the same release, not a fresh editorial or clinical certification. Evidence: `npm run build` and the full `npm run check` gate pass locally, and the live re-audit returned 200 with compliant title/description widths, trailing-slash `www` canonicals, `hreflang zh-TW` ×2 plus `x-default`, and full OG/Twitter/JSON-LD sets on the production domain.
