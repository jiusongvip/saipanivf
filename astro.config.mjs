import { siteOrigin } from './src/data/origin.mjs';
import { defineConfig } from "astro/config";

import traditional from "./src/integrations/traditional.mjs";

export default defineConfig({ site: siteOrigin, output: "static", trailingSlash: "always", integrations: [traditional()] });
