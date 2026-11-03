import { site } from '../data/site';
import { searchMetadata } from '../data/search-metadata';

// llms.txt gives language-model crawlers one plain-text map of the site. The
// entries are read from the same searchMetadata table the <meta> tags use, so
// this file cannot drift from the pages themselves. Traditional Chinese pages
// are the OpenCC derivative of the zh-CN entries and are listed as one section.
const core = ['', 'about', 'team', 'treatments', 'process', 'fees', 'guides', 'birth-planning', 'contact', 'faq', 'service-scope', 'editorial-policy', 'privacy'];
const guides = ['guides/first-visit', 'guides/ivf-steps', 'guides/quotation', 'guides/egg-freezing', 'guides/travel-checklist', 'guides/family-planning', 'guides/iui-vs-ivf', 'guides/embryo-transfer-aftercare', 'guides/amh-ovarian-reserve', 'guides/ivf-cost', 'guides/egg-freezing-cost', 'guides/saipan-baby-us-citizenship'];
const treatments = ['treatments/ivf', 'treatments/icsi', 'treatments/egg-freezing', 'treatments/frozen-embryo-transfer'];
const url = (key: string) => new URL(`/${key ? key + '/' : ''}`, site.origin).href;
// The three cost and citizenship guides render their own <head>, so they are not
// in the searchMetadata table; their titles and summaries are restated here.
const standalone: Record<string, [string, string]> = {
  'guides/ivf-cost': ['塞班试管婴儿费用 2026：IVF预算与额外项目', '按取卵培养、促排药物、麻醉、移植与冷冻逐项拆解规划预算，并说明表内未包含的费用与书面报价核对事项。'],
  'guides/egg-freezing-cost': ['塞班冻卵费用 2026：全部下来要多少钱？', '按单周期医疗费与在岛两周的机票住宿拆算总预算，附三档预算、在岛天数与多年保存费。'],
  'guides/saipan-baby-us-citizenship': ['在塞班出生的宝宝是美国公民吗？', '依《北马里亚纳群岛盟约》第 303 节说明出生公民身份的适用与例外，并核对父母入境资格、出生登记、护照与返程证件。']
};
const line = (key: string) => {
  const meta = searchMetadata('zh-CN', key) ?? standalone[key];
  const title = key === '' ? '塞班生殖中心（Saipan IVF）首页' : meta?.[0] ?? key;
  return `- [${title}](${url(key)}): ${meta?.[1] ?? ''}`;
};
const body = [
  '# 塞班生殖中心 Saipan IVF',
  '',
  '> 面向中文与多语言来访者的塞班（北马里亚纳群岛）辅助生殖信息与就诊协调站点。提供试管婴儿 IVF、ICSI 单精子注射、冻卵、冻胚移植的费用构成、流程说明与就诊指南；医疗检查与治疗由当地接诊机构负责，费用以机构书面报价为准。',
  '',
  '本站为信息与治疗协调内容，不提供诊断、处方或在线问诊，也不承诺治疗结果。文中金额为规划参考预算，不是机构公开报价。',
  '',
  '## 语言版本',
  '',
  `- 简体中文（默认）: ${url('')}`,
  `- 繁体中文: ${url('').replace(site.origin, site.origin + '/zh-hant')}`,
  ...['en', 'ja', 'ko', 'es', 'de', 'fr'].map(code => `- ${code.toUpperCase()}: ${site.origin}/${code}/`),
  '',
  '## 核心页面',
  '',
  ...core.map(line),
  '',
  '## 治疗项目',
  '',
  ...treatments.map(line),
  '',
  '## 就诊指南',
  '',
  ...guides.map(line),
  '',
  '## 可选数据',
  '',
  `- Sitemap: ${site.origin}/sitemap.xml`,
  `- Robots: ${site.origin}/robots.txt`,
  ''
].join('\n');

export const GET = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
