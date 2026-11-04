import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { treatments } from '../data/treatments';
import { site } from '../data/site';
import { team } from '../data/team';
// Static Astro pages are discovered at build time. Dynamic treatment URLs come
// from the same data as getStaticPaths; archived public translations stay out.
function discover(dir: URL, prefix=''): string[] {
 return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  if(entry.isDirectory()) return discover(new URL(entry.name+'/',dir),prefix+entry.name+'/');
  if(!entry.name.endsWith('.astro')||entry.name.includes('[')||entry.name==='404.astro') return [];
  return [prefix+(entry.name==='index.astro'?'':entry.name.slice(0,-6)+'/')];
 });
}
export const GET = () => {
 const generatedGuideLocales=['en','ja','ko','es','de','fr'].flatMap(locale=>['ivf-cost','egg-freezing-cost'].map(slug=>`${locale}/guides/${slug}/`));
 const routes=[...new Set([...discover(pathToFileURL(resolve('src/pages')+'/')),...treatments.map(item=>'treatments/'+item.slug+'/'),...team.map(person=>'team/'+person.id+'/'),...generatedGuideLocales])].sort();
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(route=>`<url><loc>${new URL(route,site.origin+'/').href}</loc></url>`).join('')+'</urlset>',{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
