# saipanivf 技术 SEO 审计报告（本地代码 + 构建产物）

**审计日期：** 2026-11-02
**审计对象：** `d:\workspaces\website\saipanivf`（Astro 5 静态站，`output: "static"`，Cloudflare Pages + Functions/D1）
**审计方式：** `npm install` → `npm run build` → 对 `dist/`（198 个 HTML，含 404）全量静态解析 + 本地 Chrome Lighthouse 13.6
**说明：** 未做线上正式域名检查（尚未绑定域名）。仅作参考：`https://saipanivf.pages.dev` 默认预览域名当前可访问（HTTP 200），其 sitemap 为 201 条 URL，与本地构建的 197 条不一致，说明线上部署版本落后于当前代码，正式复测需在下述 P0 处理完并部署后再跑一次本 skill。

> **✅ 修复状态（同日追补）：** 域名已定为 `https://www.ivfsaipan.com`，该 skill 列出的全部 P0 / P1 / P2 与 P3-3 已执行完毕；title 超标 33 页亦已压回档内（均见第七节）。两轮均复验通过：`npm run build` EXIT=0、`npm run check` **15 个门禁全绿**、196/197 页 description 在档、**197 页 title 零超标零重复**。第四节为修复前的原始审计结论，保留不改。

---

## 一、结论摘要

| 维度 | 判定 |
|---|---|
| 技术 SEO 骨架（canonical / hreflang / sitemap / robots / OG / JSON-LD / 404 / noindex） | **非常扎实**，197 页全量自洽，0 断链、0 非互指、0 重复 title/desc |
| 内容型信号（title/description 长度、正文体量） | ~~**明显偏弱**~~ → **已修**：description 在档页 19 → 196/197；title 超标 33 → **0**（第七节）；仅正文体量 P3-1 未动 |
| 上线准备（域名、构建环境变量） | ~~**未就绪**~~ → **已处理**：域名定为 `https://www.ivfsaipan.com`，`SITE_ORIGIN` / `_redirects` / `trailingSlash` 均已落实（第七节） |
| 性能（本地 Lighthouse） | 首页 Perf 98 / A11y 100 / BP 100 / SEO 100；/fees/（最重内容页）Perf 100；LCP 2.3s / 1.2s，CLS 0，TBT 0ms |

---

## 二、达标项（本地实测）

| 检查项 | 实测 | 判定 |
|---|---|---|
| H1 唯一性 | 197/197 页恰好 1 个 | ✅ |
| H2 ≥ 2 | 不达标 0 页 | ✅ |
| H3 不跳级（首个 H3 不早于 H2） | 违规 0 页（14 页 H3=0，均为工具/枢纽页，可接受） | ✅ |
| `<img>` alt | 全部有 alt；仅首页 hero 轮播 4 张为 `alt=""`（源码 `HeroCarousel.astro:17` 显式装饰性） | ✅（见 P3 建议） |
| OG 三件套 + twitter:card | 197/197 齐备 | ✅ |
| canonical | 197/197 = `ORIGIN + route`，无手写硬编码残留 | ✅ |
| canonical ↔ hreflang 自引用一致 | 不一致 0 页；无自引用 0 页 | ✅ |
| 双 locale 前缀 URL（`/en/en/…`） | 0 | ✅ |
| sitemap.xml ↔ dist | 197 条 = 197 个可索引页，集合完全相同，无重复、无 404、非 ORIGIN 前缀 0 | ✅ |
| sitemap 尾斜杠 | 无尾斜杠 URL 0（含首页；见 P2 说明） | ⚠️ 内部自洽 |
| 内部链接尾斜杠 | 不带尾斜杠的内链 0 个 | ✅ |
| robots.txt | `User-agent: * / Allow: / / Sitemap: <origin>/sitemap.xml`，无 Disallow | ✅ |
| 404 | `dist/404.html` 存在、`noindex`、不在 sitemap（Cloudflare Pages 自定义 404） | ✅ |
| noindex 隔离 | 仅 404 一页，无误伤 | ✅ |
| `_redirects` 尾斜杠 301 规则 | 无该文件 → 不会与 CF Pages 的 308 形成 301↔308 死循环 | ✅（实测 `/guides/ivf-cost` → **308** → `/guides/ivf-cost/`） |
| title 唯一性 | 完全重复 0 组 | ✅ |
| description 唯一性 | 完全重复 0 组 | ✅ |
| 第三方脚本阻塞 | 全站 0 外部 `<script src>`（CF Insights beacon 仅在配置 `CF_BEACON_TOKEN` 时注入） | ✅ |
| 响应头 | `_headers`：nosniff / Referrer-Policy / Permissions-Policy / X-Frame-Options | ✅（缺 Cache-Control，见 P2） |
| 智能体浏览 Agentic Browsing（本地 Lighthouse 13.6） | 类目得分 1（fraction），`agent-accessibility-tree` 通过；`llms-txt`、`webmcp-*` 为未评分项 | ✅ |
| 项目自有 CI 门禁 | `python scripts/check-seo.py` 本地跑通：`PASS SEO: 197 indexable pages …` + `PASS custom 404` | ✅ |

**结构化数据分布**（全站 JSON-LD 解析无错误）：WebSite ×198、WebPage ×198、BreadcrumbList ×190、Article ×3、FAQPage ×2。

---

## 三、问题清单（按优先级）

### P0-1 站点正式域名与 `SITE_ORIGIN` 未定，URL 权威信号会整体错绑

`src/data/origin.mjs:1`
```js
const value = process.env.SITE_ORIGIN || 'https://saipanivf.pages.dev';
```
`.github/workflows/verify.yml:25` 与 Cloudflare Pages 构建均未设置 `SITE_ORIGIN`。因此 canonical、hreflang、sitemap `<loc>`、og:url、JSON-LD `@id`、robots 的 `Sitemap:` 行**全部指向 pages.dev 预览域名**。

按站内统一规范（`www` 前缀 + 裸域 301 → www），绑定域名时必须一次性做三件事，缺一条就会把 pages.dev 当成规范版本被 Google 收录，后期迁移要重跑全套：

1. 确定正式域名（按「文件夹名 + .com」的既有命名决策，建议 `https://www.saipanivf.com`；注意 `saipan-ivf.com` 已被"接诊机构官网"占用，代码里作为外链/邮箱域名出现，勿混淆）
2. Cloudflare Pages 构建环境变量加 `SITE_ORIGIN=https://www.saipanivf.com`（`origin.mjs` 会校验必须是纯 https origin）
3. 裸域 `saipanivf.com` 用 Cloudflare「从根重定向到 WWW」模板 301 → `https://www.saipanivf.com/${1}`，并确认裸域 DNS 为橙色云朵

> 现有 `check-seo.py` 用 `ORIGIN` 环境变量做断言，改域名后 CI 不会失败，但**线上审计必须在部署后重跑**才能验证 www、301、IndexNow 等只有线上才能确认的信号。

### P1-1 `hreflang` 语言码在页面与 sitemap 之间不一致（`zh-Hant` vs `zh-TW`）

实测：

| 位置 | 繁体码使用次数 |
|---|---|
| 页面 `<head>` | `zh-TW` ×190、**`zh-Hant` ×7**、`zh-CN` ×197 |
| `sitemap.xml` | `zh-TW` ×197、`zh-Hant` ×**0** |

同一个 URL `https://…/zh-hant/guides/ivf-cost/`，页面里声明为 `hreflang="zh-Hant"`，sitemap 里声明为 `hreflang="zh-TW"`。Google 会把两者当作**不同的语言目标**，同一集群的两套注解互相抵消，最坏情况是繁体页被判为"备用网页（有适当的规范标记）"而不参与国际版分流。

涉及 3 个自带 `<head>` 的独立指南模板（不走 SiteLayout/LocalizedLayout）：
- `src/components/IVFCostGuide.astro:36` → `/guides/ivf-cost/`、`/zh-hant/guides/ivf-cost/`
- `src/components/EggFreezingCostGuide.astro:62,68` → 冻卵费用 2 页
- `src/components/SaipanCitizenshipGuide.astro:11-12,19` → 塞班出生公民 3 页（`tw:{lang:'zh-Hant'}` 同时被 `<html lang>` 和 hreflang 复用）

修复：把这 3 个组件输出的 hreflang 繁体码统一成 `zh-TW`（`<html lang>` 保留 `zh-Hant` 更准确，两者分开取值）。

### P1-2 3 个高价值指南缺 `twitter:title / twitter:description / twitter:image`

`twitter:card` 全站齐备，但以下 7 页只有 card 一项：

```
/guides/ivf-cost/                        /zh-hant/guides/ivf-cost/
/guides/egg-freezing-cost/               /zh-hant/guides/egg-freezing-cost/
/guides/saipan-baby-us-citizenship/      /zh-hant/guides/saipan-baby-us-citizenship/
/en/guides/saipan-baby-us-citizenship/
```

即上条同一批自带 head 的模板。修复：与 `SiteLayout.astro:32` 一致补齐三项（复用 `searchTitle/searchDescription` + `og:image` 同一个 URL）。

### P1-3 description 普遍过短，197 页里只有 19 页落在 140–160

| locale | 页数 | title 均长 | desc 均长 | desc 落在 140–160 |
|---|---|---|---|---|
| zh-CN | 29 | 25 | **48** | 0 |
| zh-hant | 29 | 25 | **47** | 0 |
| ja | 23 | 29 | **45** | 0 |
| ko | 23 | 30 | **53** | 0 |
| en | 24 | 54 | 118 | 9 |
| de | 23 | 56 | 117 | 8 |
| es | 23 | 55 | 116 | 9 |
| fr | 23 | 58 | 111 | 5 |
| 合计 | 197 | — | — | **19** |

分布：**178 页 < 140**，19 页 140–160，**0 页 > 160**。全站只有 19 页达标，说明 `src/data/search-metadata.ts` 的覆盖范围（仅 7 个 route × 6 locale = 42 条）是"哪里痛医哪里"的补丁，其余页面全部直接用 i18n 字典里的页面副标题当 description。

最短：`/guides/` desc 21 字、`/editorial-policy/` 27 字、`/team/` 34 字；`/faq/` 仅 42 字。**没有一页超长**，可以放心整体加长。

> CJK 的展示预算与拉丁文不同（Google 中文摘要约截断在 80–90 个汉字），所以中文页不必硬凑到 140–160，但当前 40–50 字连"半屏摘要"都填不满，白白丢掉 CTR。建议：**拉丁语系 140–160 字符、zh/ja/ko 80–95 字符**。

### P2-1 首页 canonical 与 sitemap 首页带尾斜杠，与站内统一规范不一致

实测首页 canonical = `https://saipanivf.pages.dev/`，sitemap 首页 `<loc>` 同样带斜杠；196/196 内页 canonical 带斜杠（✅ 符合 always 规范）。站内规范（记忆《站点URL尾斜杠统一规范》）明确 **`trailingSlash: "always"` + 首页 canonical 不带尾斜杠**，而 `astro.config.mjs` 里 `trailingSlash` 根本没有声明（走默认 `ignore`）。

- 影响可控：内部链接、canonical、hreflang、sitemap 四者完全一致，Cloudflare Pages 对无斜杠目录返回 308（已实测），不会形成重定向循环；Google 也把根路径 `/` 与空路径视为等价。
- 但它是**唯一一处偏离站内既定框架的地方**，后续上线后若按规范配置裸域 301 规则，很容易踩到 301↔308 死循环（框架记忆里的已知坑）。
- 建议：绑域名时一并加 `trailingSlash: "always"` + 首页 canonical 特例去尾斜杠，与其余站点保持一致。**这是可选对齐项，不是当前缺陷。**

### P2-2 `_headers` 缺 `Cache-Control`

`public/_headers` 目前只有 4 个安全头。`_astro/*.css|js` 全部带内容哈希（13 个 CSS 共 101KB），却没有 immutable 长缓存；`/images/` 下的 400/800/1200 响应式 webp 同样没有缓存策略。

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/images/*
  Cache-Control: public, max-age=604800
```

（本次 Lighthouse 是本地 `python -m http.server` 跑的，无缓存头不影响实验室分数，但真实站点复访会吃亏。）

### P2-3 各语言收录范围不均（5 篇核心指南未本地化）

`en` 24 页，`ja/ko/es/de/fr` 各 23 页，`zh-CN/zh-hant` 各 29 页。zh-CN 独有 5 个指南尚未本地化：
`guides/amh-ovarian-reserve`、`guides/egg-freezing-cost`、`guides/embryo-transfer-aftercare`、`guides/iui-vs-ivf`、`guides/ivf-cost`。

这些页 head 里只声明 3 条 hreflang（zh-CN / zh-Hant / x-default），**与 sitemap 完全一致，不构成断链或非互指**（全站断链 0、非互指 0），属于有意的收录范围收缩。只是这 5 篇正是最新、竞争价值最高的内容，多语言缺口 = 放弃 ja/ko/es/de/fr 五个市场的对应长尾。

另：`en` 比 `ja/ko/es/de/fr` 多出的 1 页是 `/en/guides/saipan-baby-us-citizenship/`。

### P3 建议项（不阻塞上线）

1. **`/guides/ivf-cost/` 正文体量偏薄**：可见文本约 662 词（`/guides/egg-freezing-cost/` 2750、`/guides/iui-vs-ivf/` 2423、`/birth-planning/` 2967）。对照站内既定的「正文词数 5500+」标准，这是全站最短的一篇，而它恰好承担 "saipan ivf cost" 这类核心商业词。补充方向：费用构成逐项展开、分年历史、保险/分期、报价单字段核对示例。
2. **首页 hero 4 张图 `alt=""`**：技术上是合规的装饰性 alt，但从图片搜索角度浪费了 `saipan-lagoon-aerial.webp` 这类带地理词的信号。可以给首图（LCP 图）补描述性 alt，其余保持空 alt。
3. **缺 `llms.txt`**：Lighthouse 13.6 把 `llms-txt` 列为未评分项（当前不报错），但 AI 搜索引用（GEO）已在站内规范里被强调。绑域名后补一份 `public/llms.txt` 成本很低。
4. **FAQPage schema 只有 2 页**（`/guides/egg-freezing-cost/` 与其 zh-hant 版），而 `/faq/` 8 个语言版本、citizenship 指南、其他 4 篇指南同样有 `details/summary` 折叠问答结构却未标注 FAQPage。按既有「HowTo 移除而 FAQPage 保留」的清理决策，这批页面是可以直接补 FAQPage 的存量。
5. **`og:image` 全站单一**：除 citizenship 3 页外都用同一张 22KB `share-card.png`。社交/AI 卡片展示无差异化，可后续按治疗项目分卡。

---

## 四、性能与质量（本地 dist，Chrome Lighthouse 13.6.0，mobile）

| 页面 | Performance | 无障碍 | 最佳做法 | SEO | LCP | FCP | TBT | CLS | SI | console 错误 |
|---|---|---|---|---|---|---|---|---|---|---|
| `/`（首页） | **98** | 100 | 100 | 100 | 2.3s | 1.4s | 0ms | 0 | 1.4s | 0 |
| `/fees/`（最重内容页） | **100** | 100 | 100 | 100 | 1.2s | 1.2s | 0ms | 0 | 1.2s | 0 |
| 智能体浏览（首页） | 得分 1（fraction），全部通过 | | | | | | | | | |

阈值对照：LCP ≤ 2.5s ✅、CLS ≤ 0.10 ✅、Perf/无障碍 ≥ 90 ✅。TTFB 为本地静态服务器（0ms），**不代表线上真实 TTFB，CrUX 字段数据在绑定域名前也无法取到**。

HTML 体量：平均 32.8KB，最大 55KB（`/fr/`）；`_astro/` 资源 13 个文件 101KB；`/en/`、`/de/` 等本地化页每页 8 个 `<link rel="stylesheet">`（其余 7 个），无 preconnect/dns-prefetch。

---

## 五、修复动作清单（建议顺序）

1. **定域名 + 设 `SITE_ORIGIN` + 裸域 301**（P0-1）——唯一必须在首次收录前做完的事
2. **统一繁体 hreflang 码为 `zh-TW`**（P1-1）——3 个组件各 1 处
3. **补齐 7 页 twitter:title/description/image**（P1-2）——与 P1-1 同一批文件，可一次提交
4. **description 批量加长**（P1-3）——统一按**显示宽度 130–160 半角单位**（全角计 2，即拉丁 130–160 字符 / CJK 65–80 字符）；从 `/guides/`、`/team/`、`/faq/`、`/editorial-policy/`、`/privacy/`、`/service-scope/` 这些 20–40 字的最短页开始；`0 页超长`，不必担心里程碑截断
5. **`_headers` 加 Cache-Control**（P2-2）
6. **`trailingSlash: "always"`**（P2-1，对齐站内规范，可与第 1 步同时做）。~~首页 canonical 去尾斜杠~~ → **执行时否决**，见第七节第 6 条
7. **补 `/guides/ivf-cost/` 内容厚度**（P3-1）+ **llms.txt**（P3-3）+ **FAQPage schema 扩展**（P3-4）
8. 部署到正式域名后**重跑本 skill 做线上复测**：www 301 链路、裸域重定向、robots/sitemap 线上可达、CrUX/PSI、404 遗留、双 locale 前缀、重定向循环

---

## 六、审计方法与产物

- 构建：`npm install` + `npm run build` → 172 个 Astro 路由 / 198 个 HTML 文件
- 解析脚本（全部为本轮自写，产物已归档）：
  - `_analysis_tmp/saipanivf-seo-audit.cjs` → 14 类基础信号全量统计
  - `_analysis_tmp/saipanivf-seo-audit2.cjs` → hreflang 断链/互指、体积、脚本、路由集合差异
  - `_analysis_tmp/saipanivf-audit3.cjs` → citizenship 集群 head 逐条导出、样式表分布、语言切换器
  - `_analysis_tmp/saipanivf-audit4.cjs` → 内链入度、twitter/OG 齐备性、hreflang 码统计、正文文本量
  - `_analysis_tmp/saipanivf-audit5.cjs` → 可见词数与折叠块统计
- 项目自有门禁复跑：`python scripts/check-seo.py` → PASS（197 页）
- Lighthouse：本地 Chrome 13.6.0 mobile，`--form-factor=mobile`，静态服务器 4173（审计结束已停止该进程）
- 未做（本地无法验证，需部署后补测）：重定向链路（http/裸域/www）、robots 与 sitemap 线上可达性、CrUX 字段数据、PSI 线上得分、IndexNow

---

## 七、修复执行记录（2026-11-02，域名定为 `ivfsaipan.com`）

全部 P0/P1/P2 与可顺手做的 P3 已执行完毕并通过三重验证：`npm run build` EXIT=0（172 Astro 路由 / 198 HTML）、`npm run check` **EXIT=0（15 个门禁全绿）**、自建复验脚本实测。复验器为 `_analysis_tmp/saipanivf-refix-check.cjs`（输出 `saipanivf-refix-check.md`）——原 `saipanivf-seo-audit.cjs` / `audit2.cjs` 硬编码 `ORIGIN='https://saipanivf.pages.dev'`，改域名后它们的域名断言必然报旧值，不适合作为复验器。

### 1. P0-1 域名（已修）

改动：`src/data/origin.mjs` 的默认值 `SITE_ORIGIN || 'https://saipanivf.pages.dev'` → `'https://www.ivfsaipan.com'`（`site.ts` / `astro.config.mjs` 的 `site` 均仍由此派生，无硬编码）；`astro.config.mjs` 加 `trailingSlash: "always"`；新建 `public/_redirects`（裸域 301 → www）。

同步改动（否则门禁会因断言旧域名而失败）：`scripts/check-seo.py`、`scripts/check-i18n.mjs`、`scripts/check-mobile-content.mjs` 三处的默认 `ORIGIN` / `SITE_ORIGIN` 同步为新域名；`README.md` 环境变量默认值与部署说明更新。

复验实测：canonical 非 `https://www.ivfsaipan.com` 或缺尾斜杠 **0**；`pages.dev` 残留 **0**；`_redirects` 存在；`robots.txt` 的 `Sitemap: https://www.ivfsaipan.com/sitemap.xml`；sitemap `<loc>` **197** 条全部本站。

### 2. P1-1 繁体 hreflang 码（已修）

改动：`SaipanCitizenshipGuide.astro`、`IVFCostGuide.astro`、`EggFreezingCostGuide.astro` 三个自带 `<head>` 的模板将 `lang:'zh-Hant'` 统一为 `'zh-TW'`（BCP-47 中 `zh-Hant` 是脚本码不是语言码）；`scripts/check-i18n.mjs` 对 citizenship 页的 `['zh-hant/','zh-Hant']` 断言同步改为 `'zh-TW'`（`LocalizedLayout.astro` 的 hreflang 表原本就已是 `zh-TW`，无需改）。

复验实测：dist `hreflang="zh-Hant"` 页面 **0**、`hreflang="zh-TW"` 出现 **388**；源码大小写敏感 `zh-Hant` 残留 **0**（URL 前缀 `/zh-hant/` 为路径，不在汇报范围）。

### 3. P1-2 社交标签（已修）

改动：三个独立模板补齐 `twitter:title` / `twitter:description` / `twitter:image`，并为 `og:image` 补 `og:image:width=929` / `og:image:height=960` / `og:image:alt`；**其余 194 个主站页在 `src/layouts/LocalizedLayout.astro` 统一补** `og:image:width=1200` / `og:image:height=630` / `og:image:alt`（`share-card.png` 的实际尺寸）。

复验实测：缺 twitter 三项 **7 页 → 0**；缺 og:image 宽高/alt **145 页 → 0**。

### 4. P1-3 description 加长（已修，工作量最大的一项）

**标准修正**：原计划的“分语言字符数档（zh 72–86 / en 140–160 / ja 88–112 / ko 82–105）”改为**按显示宽度统一 130–160 半角单位**（全角计 2）。依据：Google 桌面端约在 160 半角宽度处截断，与站内既有“title ≤62 半角、中文按 2 倍算”的规范同构。

入口选择（关键架构约束）：
- `src/data/search-metadata.ts` 是 `metadata[locale][key] = [title, description]` 表，**只喂 meta/OG/Twitter/JSON-LD，不影响可见正文**，是加长 description 的唯一零风险入口。已全量重写（7 语种 × 23→26 key）。
- `src/layouts/SiteLayout.astro` L18 `searchDescription = search?.[1] ?? description`，L35 可见正文 `<p>{description}</p>` 用的是 prop。⇒ 对未被表覆盖的页面（`iui-vs-ivf` / `embryo-transfer-aftercare` / `amh-ovarian-reserve`）**只新增 3 个 zh-CN 条目**，零可见改动。
- 3 个自带 head 的独立模板逐个 grep 确认 `description` 变量是否兼作可见正文：**`IVFCostGuide.astro` 是**（L38 可见 lead）→ 新增 `metaDescription` 变量，head 三处 + schema 换引用，可见 lead 不动；`SaipanCitizenshipGuide.astro`（正文用 `d.lead`/`d.answer`）和 `EggFreezingCostGuide.astro`（`summary` 仅 meta/schema/twitter/og）不是 → 直接改。
- zh-hant 无需单独写：`src/integrations/traditional.mjs` L49 会把非 `src/srcset/href/style/class/id` 的属性值（含 `<meta name="description">`）过一遍 OpenCC，繁体 description 自动派生自 zh-CN。

复验实测（页面数 197，修复前仅 **19 页在档**）：

| locale | n | min | max | avg | 命中 130–160 |
|---|---|---|---|---|---|
| zh-CN | 30 | 62 | 156 | 134 | 29 |
| zh-hant | 29 | 130 | 156 | 136 | 29 |
| en | 24 | 140 | 160 | 151 | 24 |
| ja | 23 | 133 | 156 | 146 | 23 |
| ko | 23 | 130 | 160 | 150 | 23 |
| es | 23 | 134 | 159 | 144 | 23 |
| de | 23 | 141 | 152 | 147 | 23 |
| fr | 23 | 138 | 160 | 147 | 23 |

共 **196/197 在档**；唯一越界是 `/404.html`（宽 62，noindex 页，合理）。`description 缺失/极短` 从大量降到 **1**（即该 404 页）。

顺手清掉的数据层缺陷（本表自身引入的多语混杂）：ja 混入韩文 `안내`、混入简体 `书面`、混入英文 `together`、`代送`/`入境` 用词、`塞班での出生と市民権`；ko ` 하나는면`、以及 about/guides/first-visit/fees/treatments-ivf 五条超宽。title 全部沿用改写前 dist 渲染出的基础 title（**零 title 变化**），故 ja/ko title 里的全角 `｜` 属存量、刻意不改。

### 5. P2-1 / P2-2（已修）

- `trailingSlash: "always"` 实测对 canonical / hreflang / sitemap 零副作用（三者与实际服务 URL 自洽）。
- `public/_headers` 补三段 `Cache-Control`：`/_astro/*` `public, max-age=31536000, immutable`、`/fonts/*` 7 天、`/images/*` 30 天。复验三段均存在。

### 6. 首页 canonical 尾斜杠（原计划第 6 步后半，**执行时否决**）

首页 canonical 保留尾斜杠。理由：`scripts/check-seo.py:25-28` 硬断言 `canonical == ORIGIN + route`、`check-i18n.mjs:30` 断言 hreflang `href === origin + mainRoute`，目前 canonical / hreflang / sitemap / 实际服务 URL 四者完全自洽。去掉尾斜杠需要在 4 处做首页特例化并削弱门禁，而 `trailingSlash:"always"` 下服务 URL 本身就带斜杠——收益为负。**本条为对第五节原表述的更正。**

### 7. P3 项执行情况

| 项 | 状态 | 理由 |
|---|---|---|
| P3-3 `llms.txt` | **已做** | 新建 `src/pages/llms.txt.ts`（仿 `robots.txt.ts` 的 `export const GET`），数据源直接复用 `searchMetadata` + `site.origin`，保证不与 meta 漂移；3 个自带 head 的指南用本地 `standalone` 兜底表。`dist/llms.txt` 已正常生成。 |
| P3-4 FAQPage schema | **不做** | Google 已于 2023-08 全面下线 FAQ rich results（HowTo 亦同），新增无 SERP 收益；改动面覆盖 8 语言且触及 check-faq 门禁。`docs/seo-implementation.md:28` 只禁 MedicalClinic/Offer/评分/虚构作者，不禁止 FAQPage——不做纯粹是收益判断。 |
| P3-1 `/guides/ivf-cost/` 内容厚度 | **不做** | 属编辑工作，需业务侧提供数据与来源，不适合自动修复。 |
| P3-2 首页 hero `alt=""` | **不改** | 源码显式标记为装饰性图，已合规。 |
| P2-3 5 篇指南未本地化 | **不改** | hreflang 集群与 sitemap 完全自洽（0 断链 / 0 非互指），属有意收录收缩；扩展等于新写 30 个整页。 |

### 8. title 显示宽度超标（第二轮已修，33 页）

复验脚本新发现 `title` 宽度超标。首先修正了**测量口径 bug**：脚本把 HTML 实体 `&amp;` 按 5 个字符计，造成虚高（每个 `&` 多计 4），真实超标页数为 **33**（非最初报的 35）。解码实体后重测，目标定为 **含品牌后缀 ≤ 62 半角单位**（LocalizedLayout 自动拼接 ` · Saipan IVF` 宽 13；SiteLayout/中文页拼接 ` · 塞班生殖中心` 宽 15）⇒ 拉丁基础 title ≤ 49、中文 ≤ 47。

修复入口与 description 同一个：**只改 `search-metadata.ts` 的 title 位（数组首项）**，可见 `<h1>` 与卡片标题一律不动（LocalizedLayout L16 `searchTitle=search?.[0]??title`，L27 `<h1>{title}</h1>` 用的是 prop）。33 页分布：de 7、es 9、fr 10（含 `/fr/` 首页）、en 5、zh-CN 1（同时带下 zh-hant/birth-planning，由 OpenCC 自动派生）；**ja / ko 零超标**。

缩短原则：只削连接词与冗余后缀（`und`/`y`/`et` → 逗号、去掉 `praktische`/`première`/`指南` 类修饰），**核心关键词（术式名 + Saipan/塞班 + 费用/流程）全部保留**，例如：
- `IVF-Kosten auf Saipan: Behandlung, Medikamente und Transfer`（59）→ `IVF-Kosten auf Saipan: Medikamente und Transfer`（47）
- `Transfert d’embryons congelés à Saipan : TEC, coûts et suivi`（60）→ `Transfert d’embryons congelés à Saipan : TEC`（45）
- `Frozen Embryo Transfer in Saipan: FET Process & Costs`（53）→ `FET in Saipan: Frozen Embryo Transfer Costs`（43）
- `在塞班出生的孩子是美国公民吗？国籍、护照与入境指南`（50）→ `在塞班出生的孩子是美国公民吗？国籍、护照与入境`（44）

改后实测（`saipanivf-title-uniq.cjs`）：**title 宽度 >62 = 0 页**，**完全重复 title = 0 组**（198 页 198 个唯一 title）；各 locale max：de 62、en 62、fr 62、ja 62、es 60、ko 61、zh-CN 61、zh-hant 61。`npm run build` EXIT=0、`npm run check` 再次 **EXIT=0**（15 门禁全绿）。

> 项目自有门禁不断言 title 长度与唯一性（`scripts/` 全目录 grep `search-metadata|searchTitle|<title` 零命中），所以改 title 不会碰门禁；OG:title / twitter:title / JSON-LD `WebPage.name` 会跟着 base title 变，属预期。

### 9. 本轮实际改动文件清单（`git status` 快照，写就当时未提交；提交结果见第 11 节）

```
 M README.md                                    域名默认值 + _redirects 部署说明
 M astro.config.mjs                             trailingSlash: "always"
 M public/_headers                              三段 Cache-Control
 M scripts/check-i18n.mjs                       默认 origin + zh-Hant→zh-TW 断言
 M scripts/check-mobile-content.mjs             默认 origin
 M scripts/check-seo.py                         默认 ORIGIN
 M src/components/EggFreezingCostGuide.astro    zh-Hant→zh-TW、twitter 三项、og 宽高 alt、desc 裁宽
 M src/components/IVFCostGuide.astro            同上 + 新增 metaDescription
 M src/components/SaipanCitizenshipGuide.astro  同上 + desc 加长
 M src/data/origin.mjs                          SITE_ORIGIN 默认值
 M src/data/search-metadata.ts                  P1-3 description 全量重写 + 第二轮 33 页 title 压宽度（本轮改动主体）
 M src/layouts/LocalizedLayout.astro            og:image 宽高/alt（覆盖 194 页）
?? docs/audits/2026-11-02-technical-seo.md      本报告归档副本
?? public/_redirects                            裸域 301 → www
?? src/pages/llms.txt.ts                        P3-3
```

### 10. 部署前置条件（尚无法本地验证）

`_redirects` 里的裸域→www 301 需要：① 先把 `ivfsaipan.com`（apex）挂到同一 Cloudflare Pages 项目并解析 DNS；② `www.ivfsaipan.com` 必须设为**主主机名**，否则会产生多一跳重定向。部署后可用 `technology-seo-check` / `performance-check` skill 做线上复测（www 解析、裸域 301、308 链路、CrUX、IndexNow）。

### 11. 部署与线上复验记录（2026-11-03）

前置条件已全部满足，本节替代上面「尚无法本地验证」的悬空状态。

**通道与账号**：Cloudflare Pages **Direct Upload**（`jiusongok` 账号），构建由 GitHub Actions 负责。`package.json` 的 `build` 改为 `npx astro build`（CI 环境裸 `astro` 会 `not found`）。仓库新增 `.github/workflows/deploy.yml`（push main + workflow_dispatch → `npm ci && npm run build` → `cloudflare/wrangler-action@v3` `pages deploy dist --project-name=saipanivf --branch=main`），Actions Secrets 写入 `CF_API_TOKEN` / `CF_ACCOUNT_ID`（公钥 + SealedBox 加密，`total_count=2` 校验通过）。

**项目与域名**：`saipanivf.pages.dev` 这个名字已被第三个账号下的旧项目占用，新项目 subdomain 为 **`saipanivf-9ej.pages.dev`**。CF zone `ivfsaipan.com` = `4a51733efa5e1d8e485872f0b17150f0`；NS 由 Spaceship（`launch1/launch2.spaceship.net`，`provider=basic`）经 API 改为 `provider=custom` + `kayden/tina.ns.cloudflare.com`，切 NS 前用 `nslookup` 向权威 NS 取现有解析存档（Spaceship 无 records 读取端点）；zone 约 40 秒转 `active`。绑定 `www.ivfsaipan.com`（现 `status=active`）；裸域不绑 Pages，改用 apex proxied A `192.0.2.1` + `http_request_dynamic_redirect` 规则集 `3bda3bc6c57348d8aca43f52a67041eb` 做 301 → www。注意 Pages **没有**自动创建 `www` CNAME，需手工补 `CNAME www → saipanivf-9ej.pages.dev`。

**提交与流水线**：
- `d110c41`「SEO fixes from 2026-11-02 technical audit + Cloudflare Pages deploy workflow」→ `Deploy to Cloudflare Pages` success（部署 `936ba162`，production），但 `Site verification` **failure**：`scripts/check-guide-review.mjs` 断言「改了 `src/components/*.astro` 就必须在同一 commit 更新 `docs/guide-reviews/{slug}.md`」。本地 `npm run check` 跑在 commit 之前（比对的 `HEAD^ HEAD` 还不含组件改动），故本地绿、CI 红。
- `151e8f4`「docs(guide-reviews): record 2026-11-03 technical SEO follow-up…」为 egg-freezing-cost / ivf-cost / saipan-baby-us-citizenship 三份审阅各追加 `## 2026-11-03 technical SEO follow-up`（只记录 head/meta 层修正，声明可见正文、价格与医疗/法律表述未动）→ `Site verification` **success**、`Deploy to Cloudflare Pages` **success**（部署 `838e11b1.saipanivf-9ej.pages.dev`，production，`created_on` 晚于 push）、`Production guide smoke test` success。

**线上复验**（`_analysis_tmp/sipan-online-check2.mjs`，走 `curl --resolve` 固定 CF 边缘 IP，绕开本机路由器旧 NS 缓存）：
- 17 个抽样页全 **200**；`title` 宽 23–61（≤62）、`description` 宽 130–152；`canonical` = `https://www.ivfsaipan.com` + 路径带尾斜杠；`/zh-hant/` `lang=zh-TW`；`og:image:width=1200`（指南页封面声明值与真实文件尺寸一致）。
- `hreflang`：旧 `zh-Hant` = 0、`zh-TW` = 2、`x-default` = 1，首页共 17 个 alternate；twitter 三项、og 五项、`og:image:width/height/alt` 齐；JSON-LD `WebSite,WebPage`；首页 `pages.dev` 残留 0。
- `/robots.txt` 200（`Sitemap: https://www.ivfsaipan.com/sitemap.xml`）、`/llms.txt` 200、`/sitemap.xml` 200（`<loc>=197`，非本站 0、缺尾斜杠 0、`xhtml:link` 1698）；`/_headers`、`/_redirects`、`/sitemap-index.xml` 404 属预期（前两个是配置文件、不对外作为页面，且项目自带 sitemap 而非 @astrojs/sitemap）；而 `_headers` 声明的 `Cache-Control` 值在线上一字不差地生效，说明 Pages 确实读了该文件（`_redirects` 同理会被读，只是裸域根本没绑到 Pages，所以由 zone 规则接手）。
- `/api/engagement` 200 `{"configured":false}` ⇒ 证明 Direct Upload 确实打包了根目录 `functions/`；D1 按用户决定**未绑定**，此状态为预期。
- 缓存：`/_astro/*` 31536000 immutable、`/images/*` 2592000、`/favicon.svg` 14400。跳转：apex http/https → 301 `https://www.ivfsaipan.com`（路径与 query 保留）、www http → 301 https、无尾斜杠 → 308 → 带斜杠 200、随机路径 404 且 `noindex`。

**待办 / 已知项**：① `strict-transport-security` 与 `content-security-policy` 线上缺失（`public/_headers` 本就未写），是否加固待定；② 三个自带 `<head>` 的指南模板硬编码拉丁品牌后缀 `| Saipan IVF` / `og:site_name`，与主站中文页 `· 塞班生殖中心` 不统一；③ Google Search Console 提交 `https://www.ivfsaipan.com/sitemap.xml` 与 IndexNow 需人工执行；④ GA 代码待提供；⑤ 第三账号下的旧 `saipanivf.pages.dev` 仍在（canonical 已指向 www，无重复内容风险），可选清理。
