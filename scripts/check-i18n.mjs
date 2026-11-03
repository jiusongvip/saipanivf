import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const origin=(process.env.SITE_ORIGIN||'https://www.ivfsaipan.com').replace(/\/$/,'');
function nodes(tree){return [tree,...(tree.childNodes||[]).flatMap(nodes)]}
function attr(node,name){return node.attrs?.find(a=>a.name===name)?.value}
const base=[];function find(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.isDirectory()&&!['en','ja','ko','es','de','fr','zh-hant','images','_astro'].includes(entry.name))find(path.join(dir,entry.name));if(entry.isFile()&&entry.name==='index.html')base.push(path.relative('dist',path.join(dir,entry.name)).split(path.sep).join('/'))}}find('dist');
const standalone=['guides/embryo-transfer-aftercare/index.html','guides/ivf-cost/index.html','guides/egg-freezing-cost/index.html','guides/iui-vs-ivf/index.html','guides/amh-ovarian-reserve/index.html','guides/saipan-baby-us-citizenship/index.html'];
for(const prefix of ['', 'zh-hant/']) {const file='dist/'+prefix+'guides/iui-vs-ivf/index.html';assert(fs.existsSync(file),'Missing IUI vs IVF locale: '+file);const html=fs.readFileSync(file,'utf8');assert(html.includes('iui-guide'));assert(html.includes('href=\"'+(prefix?'/zh-hant/':'/')+'guides/iui-vs-ivf/\"'));}
for(const prefix of ['en','ja','ko','es','de','fr'])assert(!fs.existsSync('dist/'+prefix+'/guides/iui-vs-ivf/index.html'),'Undeclared guide translation: '+prefix);
for(const prefix of ['', 'zh-hant/']) {const file='dist/'+prefix+'guides/amh-ovarian-reserve/index.html';assert(fs.existsSync(file),'Missing AMH locale: '+file);const html=fs.readFileSync(file,'utf8');assert(html.includes('amh-guide'));assert(html.includes('href="'+(prefix?'/zh-hant/':'/')+'guides/amh-ovarian-reserve/"'));}
for(const prefix of ['en','ja','ko','es','de','fr'])assert(!fs.existsSync('dist/'+prefix+'/guides/amh-ovarian-reserve/index.html'),'Undeclared AMH translation: '+prefix);
for(const [prefix,lang] of [['','zh-CN'],['zh-hant/','zh-TW']]) {
 const file='dist/'+prefix+'guides/embryo-transfer-aftercare/index.html';
 assert(fs.existsSync(file),'Missing aftercare guide locale: '+file);
 const html=fs.readFileSync(file,'utf8'),all=nodes(parse(html));
 assert.equal(attr(all.find(n=>n.tagName==='html'),'lang'),lang,file);
 assert.equal(all.filter(n=>n.tagName==='h1').length,1,file);
 assert.equal(all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='alternate').length,3,file);
 assert(html.includes('transfer-guide')&&html.includes('id="checklist"'),file+' missing guide/checklist');
}
for(const prefix of ['en','ja','ko','es','de','fr'])assert(!fs.existsSync('dist/'+prefix+'/guides/embryo-transfer-aftercare/index.html'),'Undeclared aftercare translation: '+prefix);
for(const p of standalone) assert(base.includes(p),`Missing standalone guide: ${p}`);
for(const [prefix,lang] of [['','zh-CN'],['en/','en'],['zh-hant/','zh-TW']]){const name='dist/'+prefix+'guides/saipan-baby-us-citizenship/index.html';assert(fs.existsSync(name),'Missing citizenship guide locale: '+name);const tree=parse(fs.readFileSync(name,'utf8'));assert.equal(attr(nodes(tree).find(n=>n.tagName==='html'),'lang'),lang,name);const links=nodes(tree).filter(n=>n.tagName==='link'&&attr(n,'rel')==='alternate');assert.equal(links.length,4,name);}
const sharedPages=base.filter(p=>!standalone.includes(p));
assert.equal(sharedPages.length,23);
const languages=[['','zh-CN'],['zh-hant','zh-TW'],['en','en'],['ja','ja'],['ko','ko'],['es','es'],['de','de'],['fr','fr']];
for(const [prefix,lang] of languages)for(const relative of sharedPages){const file=path.join('dist',prefix,relative);assert(fs.existsSync(file),file);const html=fs.readFileSync(file,'utf8'),tree=parse(html),all=nodes(tree);assert.equal(attr(all.find(n=>n.tagName==='html'),'lang'),lang,file);assert(!all.some(n=>n.tagName==='meta'&&attr(n,'name')==='robots'&&attr(n,'content')?.includes('noindex')),file);const alts=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='alternate');assert.equal(alts.length,9,file);const mainRoute='/'+relative.replace(/index.html$/,'');for(const [code,p] of [['zh-CN',''],['zh-TW','/zh-hant'],['en','/en'],['ja','/ja'],['ko','/ko'],['es','/es'],['de','/de'],['fr','/fr'],['x-default','']])assert(alts.some(n=>attr(n,'hreflang')===code&&attr(n,'href')===origin+p+mainRoute),file+' '+code);const selected=all.find(n=>n.tagName==='a'&&attr(n,'hreflang')===lang);assert.equal(attr(selected,'aria-current'),'page',file);assert.equal(attr(selected,'href'),(prefix?'/'+prefix:'')+mainRoute,file);if(prefix==='en'||prefix==='es'||prefix==='de'||prefix==='fr'){function text(n){if(['script','style'].includes(n.tagName)||attr(n,'class')?.includes('language-switcher'))return '';return n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ')}assert(!/[\u3400-\u9fff]/.test(text(tree)),file+' untranslated Chinese text')} }
for(const locale of ['en','ja','ko','es','de','fr']){
 const expectedMoney=s=>locale==='fr'?s.replace(/^\$/,'').replaceAll(',','\u202f')+' USD':['de','es'].includes(locale)?s.replace(/^\$/,'').replaceAll(',','.')+' USD':s;
 const html=fs.readFileSync(`dist/${locale}/fees/index.html`,'utf8'),all=nodes(parse(html));const config=attr(all.find(n=>attr(n,'data-budget')!==undefined),'data-config');const script=all.find(n=>n.tagName==='script'&&n.childNodes?.some(t=>t.value?.includes('[data-budget]')))?.childNodes[0].value;assert(script);
 const el=()=>({textContent:'',listeners:{},addEventListener(k,f){this.listeners[k]=f}});
 const ids=Object.fromEntries(['budget-path','budget-total','budget-description','budget-status','budget-copy'].map(x=>[x,el()]));ids['budget-path'].value='ivf';const inputs=['medication','anesthesia','icsi','freeze','fet','pgt','storage'].map((value,i)=>({...el(),value,checked:i<5,label:{hidden:false},closest(){return this.label}}));const root={dataset:{config},querySelector:s=>ids[s.slice(1)],querySelectorAll:()=>inputs};vm.runInNewContext(script,{document:{querySelector:()=>root},navigator:{clipboard:{writeText:async()=>{}}}});
 assert.equal(ids['budget-total'].textContent,expectedMoney('$26,100–31,100'));inputs[5].checked=true;inputs[5].listeners.change();assert.equal(ids['budget-total'].textContent,expectedMoney('$29,100–37,100'));ids['budget-path'].value='egg';ids['budget-path'].listeners.change();assert.equal(ids['budget-total'].textContent,expectedMoney('$12,800–17,800'));ids['budget-path'].value='fet';ids['budget-path'].listeners.change();assert.equal(ids['budget-total'].textContent,expectedMoney('$4,500'));await ids['budget-copy'].listeners.click();assert.equal(ids['budget-status'].textContent,JSON.parse(config).b.copied);
 const faq=fs.readFileSync(`dist/${locale}/faq/index.html`,'utf8');assert.equal(nodes(parse(faq)).filter(n=>n.tagName==='details'&&attr(n,'id')).length,12);
 const contact=fs.readFileSync(`dist/${locale}/contact/index.html`,'utf8');assert(contact.includes('data-consult'));assert(contact.includes('mailto:info@saipan-ivf.com'));assert(!contact.includes('class="floating"'));
}
console.log('PASS i18n: 184 complete language routes, active language, matching hreflang, English text coverage, 12 FAQ answers per locale, localized budget calculations and copy feedback.');

for(const relative of sharedPages){
 const images=prefix=>nodes(parse(fs.readFileSync(path.join('dist',prefix,relative),'utf8'))).filter(n=>n.tagName==='img').map(n=>attr(n,'data-src')||attr(n,'src')).filter(src=>src?.startsWith('/'));
 const expected=images('');for(const prefix of ['zh-hant','en','ja','ko','es','de','fr'])assert.deepEqual(images(prefix),expected,prefix+'/'+relative+' image parity');
}
for(const prefix of ['en','ja','ko','es','de','fr']){const home=fs.readFileSync('dist/'+prefix+'/index.html','utf8');for(const cls of ['photo-cards','home-center','people-grid','home-budget','journey-panel','guide-grid','home-birth-link'])assert(home.includes(cls),prefix+' missing shared home layout '+cls);}
console.log('PASS visual parity: image sources and order match Simplified Chinese on all 161 translated routes; shared home layouts.');

for(const relative of sharedPages){
 const all=nodes(parse(fs.readFileSync(path.join('dist','zh-hant',relative),'utf8')));
 const switcher=all.find(n=>n.tagName==='details'&&attr(n,'class')?.split(' ').includes('language-switcher'));
 const summary=switcher?.childNodes.find(n=>n.tagName==='summary');
 assert.equal(summary?.childNodes.map(n=>n.value||'').join(''),'繁體中文 ▾',relative+' visible language label');
}
console.log('PASS Traditional Chinese visible language label on all 23 routes.');

function dictionaryLeaves(value,prefix=''){
 if(value&&typeof value==='object')return Object.entries(value).flatMap(([key,child])=>dictionaryLeaves(child,prefix+'/'+key));
 return [[prefix,value]];
}
const englishLeaves=new Map(dictionaryLeaves(JSON.parse(fs.readFileSync('src/i18n/en.json','utf8'))));
for(const locale of ['ja','ko','es','de','fr']){
 const leaves=new Map(dictionaryLeaves(JSON.parse(fs.readFileSync(`src/i18n/${locale}.json`,'utf8'))));
 for(const [key,value] of englishLeaves){
  assert.ok(leaves.has(key),`${locale}: missing translation ${key}`);
  assert.ok(String(leaves.get(key)).trim(),`${locale}: empty translation ${key}`);
  if(typeof value==='string'&&value.length>35)assert.notEqual(leaves.get(key),value,`${locale}: untranslated English ${key}`);
 }
}
console.log('PASS dictionary quality: complete keys, no empty values or untranslated long English strings in five non-English dictionaries.');

// Taiwan-specific content must be visible on every high-intent Traditional Chinese route.
for(const route of ['contact','fees','service-scope','guides/travel-checklist']){
 const html=fs.readFileSync('dist/zh-hant/'+route+'/index.html','utf8');
 assert(html.includes('台灣旅客'),route+' missing Taiwan-specific content');
 assert(html.includes('諮詢協調語言'),route+' missing language-service clarification');
 if(route==='fees'||route==='service-scope'||route==='guides/travel-checklist')assert(html.includes('新台幣'),route+' missing Taiwan payment details');
 if(route==='service-scope'||route==='guides/travel-checklist')assert(html.includes('G-CNMI'),route+' missing Taiwan entry guidance');
}
const taiwanFaq=fs.readFileSync('dist/zh-hant/faq/index.html','utf8');
assert(taiwanFaq.includes('台灣護照去塞班需要簽證嗎'), 'Taiwan FAQ missing Taiwan-specific entry question');
assert(taiwanFaq.includes('實際諮詢協調語言須事先確認'), 'Taiwan FAQ falsely promises Chinese-language coordination');
assert(!taiwanFaq.includes('本站提供中文諮詢和就診協調'), 'Taiwan FAQ leaked mainland service-language promise');
const taiwanChecklist=fs.readFileSync('dist/zh-hant/guides/travel-checklist/index.html','utf8');
assert(taiwanChecklist.includes('CBP：G-CNMI VWP 官方規定'), 'Taiwan checklist missing CBP entry-policy source');
assert(taiwanChecklist.includes('新台幣'), 'Taiwan checklist missing local currency guidance');
console.log('PASS Taiwan: distinct entry, documents, payments and language disclosures on four high-intent pages.');

for(const locale of ['ja','ko'])for(const route of ['contact','fees','service-scope','guides/travel-checklist']){
 const html=fs.readFileSync('dist/'+locale+'/'+route+'/index.html','utf8');
 assert(html.includes('regional-readiness'),locale+'/'+route+' missing regional guidance');
 assert(html.includes('G-CNMI'),locale+'/'+route+' missing entry guidance');
 assert(html.includes('ESTA'),locale+'/'+route+' missing distinct VWP guidance');
 assert(html.includes('USD'),locale+'/'+route+' missing payment clarification');
}
console.log('PASS JP/KR: region-specific entry, payment, documents and language guidance on four high-intent routes each.');

// Cross-region policy guard: China-only EVS-TAP language must not leak into other locales.
for(const prefix of ['zh-hant','ja','ko','es','de','fr']){
 for(const route of ['faq','guides/travel-checklist']){
  const html=fs.readFileSync('dist/'+prefix+'/'+route+'/index.html','utf8');
  assert(!/CNMI EVS-TAP|CNMI EVS.TAP/.test(html),prefix+'/'+route+' contains PRC-specific EVS-TAP');
 }
}
// Locale-specific medical coordination claims must remain separate from web translation.
for(const prefix of ['zh-hant','ja','ko']){
 const html=fs.readFileSync('dist/'+prefix+'/guides/travel-checklist/index.html','utf8');
 assert(html.includes('regional-readiness')||html.includes('台灣旅客出行資訊'),prefix+' missing regional checklist');
}
console.log('PASS regional guard: no PRC-only EVS-TAP in six translated travel/FAQ routes; English global explanation retained.');
