# Saipan newborn citizenship — golden-reference acceptance
Golden reference: /guides/egg-freezing-cost/
Primary question: Is a Baby Born in Saipan a U.S. Citizen?
First-screen answer: Generally, yes. Section 303 of the CNMI Covenant provides citizenship at birth for people born in the CNMI on or after November 4, 1986; diplomatic exceptions and specific circumstances require attention.
Sources: U.S. Department of State 8 FAM 302.2-6, 2026 Supreme Court Trump v. Barbara opinion, DOS Visitor Visa rules, CBP pregnancy entry FAQ, DOS child passport, USCIS petitions.
Comparison: Compared both actual screenshot outputs from PR visual-review action #4, desktop 1440×900 and mobile 390×844, all three locales against egg-freezing-cost golden reference; reviewed 2026-10-28.
Score: 89/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: ChatGPT editorial and visual QA — screenshots manually inspected 2026-10-28

| Dimension | Result | Evidence |
|---|---|---|
| Five-second answer | Better | Mobile screenshot begins with H1 and teal answer immediately after header; unlike the golden reference its image and navigation do not precede the direct answer. |
| Information density | Equal | Decision cards replace repetitive prose; the legal update has its own short notice next to the answer. |
| Visual clarity | Equal | Desktop screenshot shows responsive two-column photo/text hero, clean serif headlines and restrained spacing; mobile screenshot shows single-column layout without clipping. |
| Structured usefulness | Better | Four decisions, three-step newborn documentation path, four-item predeparture checklist and five expandable FAQs directly serve citizenship intent. |
| Specificity | Equal | Section 303 date, US Supreme Court ruling date and petition age 21 are explicitly scoped, primary-sourced; no invented fees or clinic success figures. |
| Trust | Equal | DOS, CBP, USCIS and Supreme Court sources; Pexels photographer/source/license retained in internal provenance records; editorial update metadata and clear nonlegal-advice caution. |
| User journey | Equal | Localized all-guides navigation, existing family-planning internal link and visible email contact in the footer. |
| Accessibility and responsive behavior | Equal | Actual mobile screenshots of all three languages; image dimensions, alt, semantic heading order, responsive cards and keyboard-native FAQ details. |
| Technical SEO | Equal | One H1, canonical per language, three real alternate routes, x-default English, sitemap special-guide mapping, shared Website/WebPage/Breadcrumb schema. |
| Localization | Better | Independent English, Simplified Chinese and Taiwan-oriented Traditional Chinese text; Taiwan guidance distinguishes nationality from passport and household registration. |

## Score rationale
- Answer, intent and clarity: 23/25
- Evidence and law/medical accuracy: 23/25
- Visual mobile/a11y: 18/20
- Unique decision utility: 13/15
- SEO and localization: 12/15
- Total: 89/100. Internal heuristic only, not a Google ranking promise.

## High-impact fact and source ledger — checked 2026-10-28
- Citizenship acquired at birth for CNMI births on/after 1986-11-04 Saipan time, parent status immaterial under Section 303: https://fam.state.gov/FAM/08FAM/08FAM030202.html (DOS primary; 8 FAM 302.2-6, updated 2026-01-09). Certain children of accredited foreign diplomats remain a special circumstance.
- Restriction of birthright citizenship under Executive Order 14160 rejected by the Supreme Court June 30, 2026 in Trump v. Barbara: https://www.law.cornell.edu/supremecourt/text/25-365 (primary court opinion reproduced by Cornell LII).
- Visitor visas cannot be issued for the primary purpose of giving birth to obtain a child's U.S. citizenship: https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html (DOS primary).
- Pregnancy entry discretion, insurance, planned length of stay, due date and travel home: https://www.help.cbp.gov/s/article/Article1838?language=en_US (CBP primary, published 2025-11-18).
- U.S. under-16 passport identity, consent and parent/guardian evidence: https://travel.state.gov/en/passports/apply/child/under-16.html (DOS primary).
- U.S. citizens may petition for parents aged 21 or older, subject to further requirements: https://www.uscis.gov/family/family-of-us-citizens/bringing-parents-to-live-in-the-united-states-as-permanent-residents (USCIS primary).
- Cover: new unique real-photo cover `public/images/stock/saipan-citizenship-cover.webp` by Prabin Basnet, https://www.pexels.com/photo/hand-holding-baby-s-feet-in-close-up-photography-14937147/ under https://www.pexels.com/license/; downloaded from Pexels, optimized to 929 × 960 WebP, and added in commit 3aea7b583e3d6f0b6561d6f2a3d98bdb5b2f902c.

## Screenshot and test evidence
- GitHub Actions visual-review run #4: https://github.com/COLDDCC/saipanivf/actions/runs/40619093894
- Artifact `guide-visual-review`, ID 12786153674, screenshots: `en-desktop.png`, `en-mobile.png`, `zh-cn-desktop.png`, `zh-cn-mobile.png`, `zh-hant-desktop.png`, `zh-hant-mobile.png`, `golden-desktop.png`, `golden-mobile.png`.
- I inspected both new and golden reference mobile and desktop screenshots. The first mobile screenshot surfaced an image-first issue; this was corrected in commit 1ba6a3db89ca62fd716dd53dec03cb081af0e9cb and visually checked using the above artifact.
- Build and CI results must be checked separately against this review's head SHA; code and screenshot acceptance do not establish production deployment.

- Updated browser screenshots inspected after the unique Pexels newborn cover was added: clear face-free real photograph, mobile answer still visible above photo and no horizontal clipping in English/Chinese. Link and sitemap audits are enforced by `npm run verify`.


## 2026-10-28 customer-copy follow-up
Removed the stock-photo caption on owner request; image provenance retained in customer-copy-cleanup-20261028.md and stock-images.json. No medical/legal claims changed. This removes a production note while preserving existing layout and useful source links; verify and focused mobile/desktop rendering are rerun for this correction.

## 2026-11-03 technical SEO follow-up
Head/meta-only correction shipped with the Cloudflare Pages deployment (commit d110c41, live on https://www.ivfsaipan.com). In `SaipanCitizenshipGuide.astro` the cover now declares `og:image:width` 929 and `og:image:height` 960 plus `og:image:alt`, matching the actual served `saipan-citizenship-cover.webp`; `og:locale:alternate` was completed and the Twitter card set (`twitter:card`/`title`/`description`/`image`) is emitted in full. Canonical, `og:url`, breadcrumb `item` values and alternate links all resolve through `site.origin`, i.e. the `www` production origin, and the Traditional `lang`/`hreflang` codes now resolve to `zh-TW` via the shared metadata source rather than `zh-Hant`.
Legal and medical statements, citations, dates, the answer text and the layout are unchanged; the Article/WebPage schema still mirrors the same published `title`/`desc` strings. The rows above sign off the 2026-10-28 release; this follow-up records a later metadata correction against the same release, not a fresh editorial or legal certification.
Evidence: `npm run build` and the full `npm run check` gate pass locally, and the live re-audit of the production domain returned 200 on all three locales with compliant title/description widths, trailing-slash `www` canonicals, `hreflang zh-TW` ×2 plus `x-default`, and image dimensions matching the served files.
