---
name: saipan-guide-photos
description: Import real photos supplied by the hospital/clinic (or another rights holder) into Saipan IVF guides with rights, consent and provenance recorded. No stock-site scraping and no AI-generated images. Use when someone provides photos for the website.
---

# Saipan IVF Guide Photos (supplied by the hospital)

Use with `saipan-guide-editor`. The site does not source stock photos automatically (the team decided to wait for the hospital's own photos). Until photos arrive, use `saipan-guide-illustrations` and `saipan-guide-tables` for visuals and keep existing licensed covers.

## Before importing — confirm with the supplier
1. **Rights:** the supplier took the photo or may license it for this website (and for translated pages).
2. **People:** if anyone is identifiable, written consent for website use exists (staff or patient). Prefer rooms, equipment, hands, documents, the building and Saipan scenery. Never patients' faces without consent; never minors.
3. **Accuracy:** the photo really shows this centre / provider, or the caption says what it shows. Do not present a photo of one place as another.
4. **No AI:** not generated or materially altered by AI; ordinary crop/exposure edits are fine.
5. **Privacy:** no screens, charts, names, wristbands, documents or labels with patient data visible. Crop or decline.

## Import
```bash
python3 -m pip install pillow   # if needed
python3 scripts/visuals/import-photo.py --file /path/to/photo.jpg --name clinic-reception \
  --alt "诊所接待区" --provided-by "Saipan IVF Center" --rights-confirmed --people none --reviewer "姓名"
```
- `--people`: `none` | `staff-consented` | `patients-consented`.
- Writes `public/images/stock/<name>.webp` (≤1200px) and `-400/-800` responsive variants, strips EXIF/GPS, updates `src/data/image-variants.json`, `src/data/image-dimensions.json` and a ledger row in `docs/stock-images.json` (supplier, people, reviewer, `aiGenerated: false`).
- Keep the original files and the supplier's written permission outside the repo (shared drive); note where in `--note`.

## Use
- Page header: add `"guides/<slug>": ["/images/stock/<name>.webp", "<alt>"]` to `heads` in `src/layouts/SiteLayout.astro`.
- In content: `<ResponsiveImage src="/images/stock/<name>.webp" alt="…" loading="lazy" sizes="(max-width: 700px) 100vw, 700px" />`.
- Update `placements` in `docs/stock-images.json`. Each photo appears once per page per locale (image-uniqueness check).
- Real clinic photos may replace generic stock covers; record the swap in the guide's review file.

## Acceptance
- Ledger row complete (supplier, rights, people/consent, reviewer).
- Mobile first screen still shows the answer box (cover strip ≈112px on 390px).
- `npm run verify` passes.
