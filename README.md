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

The apex host is not attached to the Pages project. `https://ivfsaipan.com/*` reaches `https://www.ivfsaipan.com/:splat` with a 301 through a Cloudflare zone `http_request_dynamic_redirect` rule plus a proxied apex A record; `www.ivfsaipan.com` is the only custom hostname on the project, so Cloudflare adds no extra hop. Binding the apex to Pages instead would let `public/_redirects` do the same job, but it also makes the Pages hostname-activation check depend on that redirect, so the zone rule is the shipped mechanism. `/_redirects` and `/_headers` themselves return 404 because they are configuration, not published pages; the `Cache-Control` values they declare are visible in live responses, which confirms the file is honored. If the zone rules are ever replaced, re-check the apex 301 before publishing.

## Consultation and evidence

The consultation form generates an email draft. Users review and send it in their email application. No consultation intake endpoint is enabled. Keep this behavior unless explicitly requested otherwise.

Budget figures are planning inputs, not a verified current provider fee schedule. Client counts supplied by the project owner are distinct from treatment, pregnancy or birth outcomes. Provider details cite the institution’s published information.

See `docs/engagement-setup.md` for optional analytics configuration, `docs/integrations/consultation-feishu.md` for future integration notes, and `public/fonts/README.md` for heading font regeneration after copy changes.
