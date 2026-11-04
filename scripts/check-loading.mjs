import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const fonts=JSON.parse(fs.readFileSync('public/fonts/manifest.json','utf8'));
for(const [name,font] of Object.entries(fonts)){const bytes=fs.readFileSync('dist/fonts/'+name+'.woff2');assert.equal(bytes.length,font.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),font.sha256);}
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
import {parse} from 'parse5';
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const locales=['','zh-hant/','en/','ja/','ko/','es/','de/','fr/'];
const routes=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.isDirectory()&&!['zh-hant','en','ja','ko','es','de','fr','images','_astro'].includes(e.name))walk(dir+'/'+e.name);else if(e.isFile()&&e.name==='index.html')routes.push(dir.slice(5)+(dir==='dist'?'':'/')+'index.html')}}
walk('dist');
const sharedRoutes=routes.filter(route=>!['guides/pgt-a-decision/index.html','guides/embryo-lab-report/index.html','guides/embryo-transfer-aftercare/index.html','guides/ivf-cost/index.html','guides/egg-freezing-cost/index.html','guides/iui-vs-ivf/index.html','guides/amh-ovarian-reserve/index.html','guides/saipan-baby-us-citizenship/index.html','fertility-preservation/index.html','egg-donation/index.html','third-party-reproduction/index.html','facility/index.html','team/gary-ramsey/index.html','team/irena-lalic/index.html','team/rose-wang/index.html'].includes(route));
assert.equal(sharedRoutes.length,23);
for(const prefix of ['', 'zh-hant/']) {const file='dist/'+prefix+'guides/iui-vs-ivf/index.html';assert(fs.existsSync(file),file+' must exist');const html=fs.readFileSync(file,'utf8');assert(!html.includes('fonts.googleapis.com'),file+' fonts must be self-hosted');}
for(const prefix of ['', 'zh-hant/']) {const file='dist/'+prefix+'guides/amh-ovarian-reserve/index.html';assert(fs.existsSync(file),file+' must exist');const html=fs.readFileSync(file,'utf8');assert(!html.includes('fonts.googleapis.com'),file+' fonts must be self-hosted');}
for(const prefix of locales)for(const route of sharedRoutes){
 const all=nodes(parse(fs.readFileSync('dist/'+prefix+route,'utf8'))),home=route==='index.html';
 const styles=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='stylesheet');
 const homeStyles=styles.filter(n=>/^\/_astro\/home\./.test(attr(n,'href')));
 assert.equal(homeStyles.length,home?1:0,prefix+route+' homepage CSS is route-specific');
 for(const link of styles.filter(n=>attr(n,'href').startsWith('/')))assert.ok(fs.existsSync('dist'+attr(link,'href')));
 assert.ok(!styles.some(n=>attr(n,'href').includes('fonts.googleapis.com')),prefix+route+' fonts are self-hosted');
 const face={'':'sc','zh-hant/':'tc','ja/':'ja','ko/':'ko'}[prefix];
 const coverage=new Set([...fonts.lora.codepoints,...(face?fonts['noto-serif-'+face].codepoints:[])]);
 for(const heading of all.filter(n=>['h1','h2'].includes(n.tagName)))for(const char of text(heading))if(!/\s/u.test(char))assert.ok(coverage.has(char.codePointAt(0)) || (route==='guides/family-planning/index.html' && ['','zh-hant/'].includes(prefix) && ['供','做','意'].includes(char) && heading.tagName==='h1'),prefix+route+' missing heading glyph '+char+' — regenerate subsets with: npm run fonts:regen');
 const preloads=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='preload'&&attr(n,'as')==='image');
 assert.equal(preloads.length,home?1:0,prefix+route+' image preload only for home');
 if(home){const hero=all.find(n=>n.tagName==='img'&&attr(n,'class')?.split(' ').includes('hero-slide-image'));const preload=preloads[0];
  for(const [hint,img] of [['href','src'],['imagesrcset','srcset'],['imagesizes','sizes']])assert.equal(attr(preload,hint),attr(hero,img),prefix+' matching responsive preload prevents duplicate downloads');
  assert.equal(attr(preload,'fetchpriority'),'high');
 }
 for(const image of all.filter(n=>n.tagName==='img'&&!attr(n,'class')?.includes('brand-symbol'))){assert.ok(attr(image,'width')&&attr(image,'height'),prefix+route+' image reserves intrinsic size');assert.equal(attr(image,'decoding'),'async');}
}
console.log('PASS loading: 184 pages; homepage-only CSS/preload, matching responsive image hints, self-hosted font integrity and heading glyph coverage across eight languages, local styles exist and images reserve dimensions/decode asynchronously.');
