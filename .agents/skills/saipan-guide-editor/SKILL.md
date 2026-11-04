---
name: saipan-guide-editor
description: Create and improve Saipan IVF patient guides using the egg-freezing-cost golden reference, evidence-first medical editing, answer-first UX, SEO and bilingual accessibility quality gates.
---

# Saipan IVF Guide Editor — Golden Reference Standard

## Non-negotiable baseline
The **internal golden reference** is:
- Live route: `/guides/egg-freezing-cost/`
- Source: `src/components/EggFreezingCostGuide.astro` and `src/pages/guides/egg-freezing-cost.astro`
- Traditional Chinese route: `/zh-hant/guides/egg-freezing-cost/`

For **every new guide and every major rewrite**, first inspect the **CURRENT** golden reference source, its actual rendered layout when available, and its latest route. Treat its useful qualities as a **quality floor**, not a template to duplicate. New pages should be demonstrably more helpful for their specific query; if improvement is not justified, they must at least match its relevant standards. Do not claim a page is better without evidence, comparison and human/visual review. Do not make every guide about prices or force irrelevant sections.

The golden article itself can be improved, so never rely on screenshots or stale descriptions instead of reading the current files. If live pages cannot be loaded, review the source and state that visual comparison remains unverified.

## Required context before drafting
1. Read `README.md`, `src/data/pricing.ts`, `src/pages/guides.astro`, the current golden reference, related guides, `src/layouts/SiteLayout.astro` and this skill.
2. Inspect the actual SERP/reference URLs if retrievable, and record what was actually reviewed. Never invent competitor headings, claims, performance or layouts.
3. Check current authoritative medical, entry, policy and monetary sources (HFEA, ASRM, NHS, CDC, CBP, official institutions as applicable). Record URL, date, applicability and whether primary or secondary.
4. Inspect translation generation (`src/integrations/traditional.mjs`), locale routes, canonical, hreflang and shared styles/components.

## Editorial workflow — complete in order
### 1. Search intent & page justification
- Define the user's exact question, the answer they need in five seconds, audience/country, language, primary keyword, secondary intents and canonical route.
- Check competing pages and site overlap; merge/cross-link overlapping content rather than creating thin competing URLs.
- State one **specific additional user benefit** versus the golden reference (e.g. calculator, comparison by jurisdiction, eligibility decision table, download-ready checklist), if meaningful to the topic.

### 2. Fact and source ledger — hard gate
Map every price/range, success-rate statistic, timeline, medication/procedure claim, policy/visa rule, eligibility statement and provider-specific promise to a primary/authoritative source, with URL and checked date. For each number capture units, location, period, inclusions/exclusions and evidence limitations. Clearly distinguish site planning examples from verified provider prices. No invented testimonials, client numbers, guarantees or credentials.
Do not publish unresolved high-impact claims. Any conflicting source must be resolved or disclosed.

### 3. Answer-first editorial architecture
- Exactly one meaningful H1, concise immediate answer within the first screen, and a 2–4 sentence summary of what is known, what varies and what the reader must confirm.
- Avoid giant decorative heroes, opening filler, SEO boilerplate and repetitive promotional text.
- A topic-relevant cover visual, credited and commercially usable; accurate alt text, optimized dimensions, responsive crop, no misrepresentation of real clinicians or patient treatment. Do not use an irrelevant stock photo only to satisfy a quota.
- Clear anchors or sectional navigation for long pages; scoped FAQs with actual questions and meaningful answers.
- Put compare-able values into tables; steps into timelines; choices into decision aids; action items into checklists. Short paragraphs only when prose improves comprehension.
- Label prices with currency, units, scope, inclusion/exclusion and date; display assumptions and material uncertainty next to figures.
- Add source visibility, editorial/update metadata, relevant internal guide links and a non-coercive contact path.
- Make interactions real and accessible: visible labels, keyboard handling, headings hierarchy, mobile table overflow and focus states.

### 4. Golden-reference comparison — REQUIRED BEFORE ACCEPTANCE
Complete the comparison for the new page **and** the current `egg-freezing-cost` page. Use `Better / Equal / Worse / Not applicable / Not verified` and cite observable evidence for each:
1. Five-second answer: meaningful takeaway appears without hunting or scrolling excessively.
2. Information density: no junk copy, answer-first heading, specific/useful content in every block.
3. Visual clarity: purposeful cover image, restrained editorial aesthetic, coherent type and white space, easy mobile scanning.
4. Structured usefulness: topic-appropriate tables, comparisons, timelines, checklists or other decision tools.
5. Specificity: quantified, clearly scoped, accurately sourced data when appropriate; uncertainty visible.
6. Trust: source links, checked dates, editorial/update identity and health/policy/price caution where relevant.
7. User journey: next decision, helpful related guide and non-pressuring consultation path.
8. Accessibility and responsive behavior: mobile, long tables, keyboard navigation, image attribution.
9. Technical SEO: correct title/description, URL, canonical, hreflang, indexability, schema that matches visible content.
10. Localization: real region-appropriate language, not mechanical conversion only.

**Release rule:** No relevant dimension may be Worse than the golden reference without written, topic-specific justification. Not verified is not the same as passed. A page with an unjustified Worse outcome is a draft, not approved. Superior content requires an explicit explanation of what the reader can do or learn better, not more words, more cards or an inflated self-score. Some dimensions may be Not applicable with reasons.

### 5. Score and blocker gate
Use the existing 100-point rubric:
- Answer usefulness, intent coverage and clarity: 25
- Evidence quality and medical/fee/policy accuracy: 25
- Visual reading experience and mobile/a11y: 20
- Unique decision-making utility: 15
- Technical SEO/localization: 15

Release target >= 85/100 **and** no blocking source, medical safety, indexability, or comparison issues. This score is an internal QA heuristic, not a Google ranking factor or objective promise of superiority. A passing numeric score never overrides a golden-reference comparison failure.

### 6. Localization and build
- Use shared site components/styles where feasible; preserve existing navigation/footer, not a new standalone design system per article.
- Simplified/Traditional region terminology and expectations must be checked separately. Verify locale generation before adding routes.
- One primary intent per canonical. No dead links or incorrect alternate languages; structured data only for matching visible content.
- Run `npm ci` and `npm run verify` in a suitable environment, inspect generated routes, internal links, mobile, language pages, images and CI. Verify deploy separately; GitHub push is not confirmation of live rollout.
- Prefer a PR for review; do not claim QA complete if visual inspection or verification was not actually run.

## Required acceptance report for EACH guide
Provide a compact, auditable record:
- New URL / comparison reference URL / source commit and review date
- Exact primary user question + answer shown in first screen
- Golden-reference matrix covering all 10 dimensions, with evidence; highlight Worse and Not verified
- Source ledger with dated URLs and scope of all high-impact assertions
- Internal score out of 100 and any unresolved hard blockers
- Test/build results, mobile screenshot/preview evidence if available, both locale checks
- Changed files and PR/deployment links; label each of `code committed`, `CI passed`, `deployment observed` separately

**If review does not clear the gates, revise the page rather than declaring it complete.** Do not claim every future AI-written page is automatically better merely because the skill exists.

## Visual companion skills (in this repo)
- `saipan-guide-tables` — tables, range/budget bars, evidence ratings, step flows (shared components in `src/components/guide/`).
- `saipan-guide-illustrations` — Open Peeps / Health Icons (CC0) and hand-built SVG, provenance in `docs/illustrations.json`. Never AI-generated people.
- `saipan-guide-photos` — import photos supplied by the hospital with rights/consent recorded (no stock-site sourcing for now).
Each new guide should have at least one visual that explains (table, chart, flow or diagram), not only a decorative cover.

## Optional reference skills
- inhouseseo/superseo-skills: content-brief, improve-content, eeat-audit, semantic-gap-analysis
- Leonxlnx/taste-skill: redesign-existing-projects, minimalist-ui
- gaguero/seo-agent-skills: seo-quality-gates

These are reference frameworks, not proof of installation or execution. Read them before claiming to have used them.
