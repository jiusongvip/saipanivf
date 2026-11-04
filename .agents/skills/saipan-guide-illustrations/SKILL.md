---
name: saipan-guide-illustrations
description: Add licence-clean illustrations to Saipan IVF guides — hand-drawn Open Peeps figures (CC0), Health Icons (CC0) and simple hand-built SVG diagrams — with a provenance ledger. Never AI-generated people. Use when a guide needs a cover/scene illustration, icons or an explanatory diagram.
---

# Saipan IVF Guide Illustrations

Use with `saipan-guide-editor`. Allowed sources, in order of preference:
1. **Hand-built SVG diagram** that shows the real mechanism (paths, decisions, comparisons) — best for explaining.
2. **Health Icons** (CC0, Resolve to Save Lives) — icons for steps, labels, lists.
3. **Open Peeps** (CC0, Pablo Stanley) — hand-drawn people for a scene (consultation, waiting, travel).

**Forbidden:** AI-generated images of people or clinical scenes; photos/illustrations scraped from other sites; anything that could be read as a real clinician, patient, embryo or result of this centre; mascots or brand characters. Illustrations are illustrative only and say so in alt text when ambiguity is possible.

## Setup (no API key)
```bash
bash scripts/visuals/fetch-libs.sh          # pinned commits -> /tmp/saipan-visual-libs
```

## Health Icons
```bash
python3 scripts/visuals/icon.py --search microscope     # list paths
python3 scripts/visuals/icon.py outline/devices/microscope outline/body/dna
```
Writes `src/assets/icons/outline-<name>.svg` (`currentColor`) and a ledger row in `docs/illustrations.json`. Use:
```astro
import Icon from '../../components/guide/Icon.astro';
<Icon name="outline-microscope" size={28} />
```
Icons are decorative (`aria-hidden`); the adjacent text must carry the meaning. Use outline style by default, one style per page.

## Open Peeps scenes
```bash
python3 scripts/visuals/peep.py --name <slug>-consult --ground \
  --figure "pose/standing/easing-1.svg|head/Medium Bangs.svg|face/Calm.svg" \
  --figure "pose/standing/pointing_finger-1.svg|head/Short 2.svg|face/Explaining.svg|accessories/Glasses.svg" \
  --alt "手绘插画：一人倾听，另一人讲解（示意图）" --used-on /guides/<slug>/
```
- Parts live in `/tmp/saipan-visual-libs/open-peeps/packages/open_peeps/assets/atoms/{pose/sitting,pose/standing,head,face,accessories}`.
- The script recolors to site ink `#173b60` on white, refuses unsuitable faces (Monster, Cyclops, Rage, Fear…) and playful poses, and records parts, source commit and licence in `docs/illustrations.json`.
- Place with:
```astro
import Illustration from '../../components/guide/Illustration.astro';
<Illustration name="<slug>-consult" maxWidth={380} caption="…" />
```
- Scene rules: 1–3 figures; neutral, calm expressions; vary hair/skin-tone-neutral line art across guides; never depict procedures, embryos, pregnancy outcomes or clinical gowns implying our staff. Each scene file is used on one page per locale (the image-uniqueness check enforces this).

## Hand-built SVG diagrams
Put reusable SVG in `public/images/illustrations/<name>.svg` (or inline in the page for small diagrams), add a ledger row with `"kind": "svg"`, `alt`, `width`, `height`, `aiGenerated": false`. Rules: site colors only (`#173b60` ink, `#1767a6` blue, `#7fa8c9` light, `#e1eaf0` rules), text ≥ 14px at display size, Simplified Chinese labels (Traditional is generated), every number from the ledger, `role="img"` + alt that states the takeaway.

## Acceptance
- `docs/illustrations.json` has a row for every new asset with source, licence, `aiGenerated: false`.
- Alt text states what is shown and that it is a drawing when people appear.
- Mobile 390px: illustration ≤ 60% of first screen height; never pushes the first-screen answer below the fold.
- `npm run verify` passes (image checks: file exists, unique per locale).
