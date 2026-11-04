# egg-freezing-cost — limited customer-copy acceptance

Golden reference: /guides/egg-freezing-cost/
Primary question: 塞班冻卵需要准备多少预算？
First-screen answer: 医疗与旅行预算合计约 US$15,600–22,600，最终以书面报价为准。
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
88/100 is a narrow release-maintenance heuristic (answer 23/25, preserved evidence/qualification 22/25, reading/mobile 18/20, retained decision utility 13/15, technical/localization 12/15), not a clinical evidence rating or ranking promise. The golden article is compared against its own pre-cleanup release; no redesign is being certified.

## Verification
See customer-copy-results.json for the 195-page visible-text audit and actual browser measurements of the changed guides. Screenshots were inspected in the working session. Full npm run verify must pass before publishing this correction. CI and live deployment are reported separately.

## 2026-11-03 technical SEO follow-up
Head/meta-only correction shipped with the Cloudflare Pages deployment (commit d110c41, live on https://www.ivfsaipan.com). In `EggFreezingCostGuide.astro` the document `lang` and the Traditional alternate `hreflang` now carry `zh-TW` instead of `zh-Hant`; `og:image:width`, `og:image:height` and `og:image:alt` were declared and re-checked against the served cover file; `og:locale:alternate` was completed; the meta description was rebalanced into the 130–160 half-width band; canonical and `og:url` resolve to the `www` origin through `src/data/origin.mjs`.
Visible body copy, layout, heading structure, budget figures and source links are unchanged — no medical or price claim was introduced. The rows above (including `Technical SEO: Equal`) sign off the 2026-10-28 release; this follow-up records a later metadata correction against the same release, not a fresh editorial or clinical certification.
Evidence: `npm run build` and the full `npm run check` gate pass locally, and a live re-audit of 17 sampled production URLs returned 200 with title width ≤62, description width 130–152, trailing-slash canonicals on `www`, `hreflang zh-TW` ×2 plus `x-default`, and a sitemap of 197 on-domain `<loc>` entries.

## 2026-11-03 addendum — outbound clinic links replaced with in-page references
Scope: links to other clinics' websites (HKU IVF, MedPark Hospital, a US private clinic timeline page) were removed at the owner's request so traffic stays on this site. Inline markers [4], [5], [7] now jump to `#ref-4`, `#ref-5`, `#ref-7` in the reference list; each entry keeps the institution name, document title and description, so provenance is still stated in text. Regulator/professional-body links (HFEA, ASRM, Singapore MOH) are unchanged. No prices, ranges, dates or copy outside the reference labels changed.
Evidence: CI Chromium full-page screenshots at 390px for `/guides/egg-freezing-cost/` and `/zh-hant/guides/egg-freezing-cost/` (workflow "Internal pages visual review", PR #26) inspected by Claude (AI agent): comparison table markers and reference list render without overflow; CI check:site confirms the new anchors resolve. Trade-off recorded: readers can no longer click through to verify those three third-party price pages; the dimension ratings above are otherwise unaffected.
