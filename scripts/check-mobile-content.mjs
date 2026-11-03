import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const origin=(process.env.SITE_ORIGIN||'https://www.ivfsaipan.com').replace(/\/$/,'');
const locales=['','zh-hant/','en/','ja/','ko/','es/','de/','fr/'];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
const hasClass=(n,c)=>attr(n,'class')?.split(' ').includes(c);
for(const prefix of locales){
 const fees=nodes(parse(fs.readFileSync(`dist/${prefix}fees/index.html`,'utf8')));
 const itemized=fees.find(n=>attr(n,'data-budget-items')!==undefined);assert.ok(itemized,prefix+' itemized component');
 const all=nodes(itemized),table=all.find(n=>n.tagName==='table'),body=nodes(table).find(n=>n.tagName==='tbody');
 const rows=body.childNodes.filter(n=>n.tagName==='tr').map(n=>n.childNodes.filter(n=>['th','td'].includes(n.tagName)).map(text));
 const mobile=all.find(n=>hasClass(n,'budget-items-mobile'));
 const list=nodes(mobile).find(n=>n.tagName==='dl');
 const cards=list.childNodes.filter(n=>n.tagName==='div').map(n=>{
  const children=nodes(n),term=children.find(n=>n.tagName==='dt'),amount=children.find(n=>n.tagName==='strong'),note=children.find(n=>n.tagName==='p');
  return [text(term),text(amount),...(note?[text(note)]:[])];
 });
 assert.equal(rows.length,11,prefix+' all 11 cost items retained');
 assert.deepEqual(cards,rows,prefix+' mobile costs, ranges and scope must match desktop');
 const contact=nodes(parse(fs.readFileSync(`dist/${prefix}contact/index.html`,'utf8')));
 const layout=contact.find(n=>hasClass(n,'contact-layout'));
 const children=layout.childNodes.filter(n=>n.tagName==='div');
 assert.ok(hasClass(children[0],'form-card'),prefix+' form first in reading and mobile layout order');
 assert.ok(hasClass(children[1],'consult-intro'),prefix+' explanatory content retained');
 assert.equal(nodes(layout).filter(n=>attr(n,'required')!==undefined).length,1,prefix+' one required field');
 assert.ok(contact.some(n=>n.tagName==='meta'&&attr(n,'name')==='viewport'&&!/maximum-scale|user-scalable=no/.test(attr(n,'content'))),prefix+' zoom allowed');
 console.log('PASS responsive content: '+(prefix||'zh-CN/')+' all 11 mobile costs match desktop; form first, guidance retained and zoom allowed');
}

// Follow the actual project/guide CTA, rather than testing only hand-written contact URLs.
const slugs=['ivf','icsi','egg-freezing','frozen-embryo-transfer'];
for(const prefix of locales){
 for(const slug of slugs){
  const all=nodes(parse(fs.readFileSync(`dist/${prefix}treatments/${slug}/index.html`,'utf8')));
  const aside=all.find(n=>hasClass(n,'treatment-aside'));
  const link=nodes(aside).find(n=>n.tagName==='a'&&hasClass(n,'button'));
  const target=new URL(attr(link,'href'),origin);
  assert.equal(target.pathname,`/${prefix}contact/`);
  assert.equal(target.searchParams.get('topic'),slug,prefix+slug+' must pass a stable project code');
 }
 for(const [guide,slug] of [['egg-freezing','egg-freezing'],['ivf-steps','ivf']]){
  const all=nodes(parse(fs.readFileSync(`dist/${prefix}guides/${guide}/index.html`,'utf8')));
  assert.ok(all.some(n=>n.tagName==='a'&&attr(n,'href')===`/${prefix}contact/?topic=${slug}`),prefix+guide+' guide project prefill');
 }
}
console.log('PASS inbound consultation: 32 treatment CTAs and 16 guide pages use stable project codes across eight languages.');

const {default:vm}=await import('node:vm');
const switchCode=nodes(parse(fs.readFileSync('dist/contact/index.html','utf8'))).find(n=>n.tagName==='script'&&text(n).includes('.language-switcher'));
assert.ok(switchCode,'Language switch code present');
for(const requested of ['egg-freezing','冻卵与生育力保存','凍卵與生育力保存','unrecognised']){
 const anchors=locales.map(prefix=>{let href=`${origin}/${prefix}contact/`;return {get href(){return href},set href(value){href=new URL(value,origin).href}}});
 const listeners={};const switcher={querySelectorAll:()=>anchors,addEventListener(){},contains(){return false}};
 vm.runInNewContext(text(switchCode),{URL,URLSearchParams,window:{location:{pathname:'/contact/',search:'?topic='+encodeURIComponent(requested)+'&email=private@example.com'}},document:{querySelectorAll:()=>[switcher],addEventListener(type,fn){listeners[type]=fn}}});
 for(const link of anchors){const url=new URL(link.href);assert.equal(url.searchParams.get('topic'),requested==='unrecognised'?null:'egg-freezing');assert.ok(!url.searchParams.has('email'));}
 listeners.change({target:{matches:()=>true,selectedOptions:[{dataset:{slug:'ivf'}}]}});
 for(const link of anchors)assert.equal(new URL(link.href).searchParams.get('topic'),'ivf','Switch language with the current selection, not the old incoming project');
 listeners.change({target:{matches:()=>true,selectedOptions:[{dataset:{}}]}});
 for(const link of anchors)assert.equal(new URL(link.href).searchParams.get('topic'),null,'Clearing the project clears it from language links');
}
console.log('PASS language handoff: stable and legacy projects, changed/cleared selection, unknown values ignored, no personal query propagation.');
