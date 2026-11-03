# Saipan IVF

Astro static website for fertility information and consultation coordination, with Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Spanish, German and French pages.

## Development and validation

```sh
npm ci
npm run dev
npm run verify
```

Edit `src/pages` and shared components; do not edit generated `dist` files. All languages use `FeesExperience.astro` and `LocalizedBudget.astro`, with amounts sourced from `src/data/pricing.ts`. Homepage decision links share `HomeDecisions.astro`.

## Cloudflare Pages

- Production branch: `main`
- Framework: Astro
- Build: `npm run build`
- Output: `dist`
- Optional `SITE_ORIGIN`: the final HTTPS site origin, without path or query; defaults to `https://www.ivfsaipan.com`.

The Astro site URL, canonical links, sharing URLs, JSON-LD, Traditional Chinese generation, sitemap and robots use the same origin configuration. Do not switch to an unconfigured domain. After a domain change, run `SITE_ORIGIN=https://your-domain.example npm run verify` and inspect the deployed sitemap and redirects.

`public/_redirects` sends the apex host `https://ivfsaipan.com/*` to `https://www.ivfsaipan.com/:splat` with a 301. It only takes effect once the apex hostname is attached to the same Cloudflare Pages project and DNS resolves it; `www.ivfsaipan.com` must be the project primary hostname so Cloudflare does not add another hop.

## Consultation and evidence

The consultation form generates an email draft. Users review and send it in their email application. No consultation intake endpoint is enabled. Keep this behavior unless explicitly requested otherwise.

Budget figures are planning inputs, not a verified current provider fee schedule. Client counts supplied by the project owner are distinct from treatment, pregnancy or birth outcomes. Provider details cite the institution’s published information.

See `docs/engagement-setup.md` for optional analytics configuration, `docs/integrations/consultation-feishu.md` for future integration notes, and `public/fonts/README.md` for heading font regeneration after copy changes.
