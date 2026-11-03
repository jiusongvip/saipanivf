from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json, os, xml.etree.ElementTree as ET

ORIGIN=os.environ.get('SITE_ORIGIN','https://www.ivfsaipan.com').rstrip('/')
class Head(HTMLParser):
 def __init__(self):
  super().__init__();self.meta={};self.canonical=None;self.ld=[];self.in_ld=False;self.buf='';self.images=[];self.alternate_locales=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':
   self.meta[a.get('name',a.get('property',''))]=a.get('content')
   if a.get('property')=='og:locale:alternate':self.alternate_locales.append(a.get('content'))
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='script' and a.get('type')=='application/ld+json':self.in_ld=True;self.buf=''
  if tag=='img':self.images.append(a)
 def handle_data(self,data):
  if self.in_ld:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.in_ld:self.ld.append(json.loads(self.buf));self.in_ld=False

titles=set();expected=set()
for path in Path('dist').rglob('index.html'):
 page=Head();page.feed(path.read_text(encoding='utf-8'));route='/'+path.parent.relative_to('dist').as_posix().strip('.')
 if route not in ['/','/en/','/ja/','/ko/','/es/','/de/','/fr/','/zh-hant/']:route+='/'
 expected.add(ORIGIN+route)
 assert page.canonical==ORIGIN+route,(path,'canonical')
 for key in ['description','og:title','og:description','og:image','twitter:card']:
  assert page.meta.get(key),(path,key)
 assert page.meta['og:url']==page.canonical
 share=Path('dist')/urlparse(page.meta['og:image']).path.lstrip('/')
 assert share.is_file(),(path,'share image')
 graph=page.ld[0]['@graph'];types=[node['@type'] for node in graph]
 assert 'WebSite' in types and 'WebPage' in types
 website=next(node for node in graph if node['@type']=='WebSite');webpage=next(node for node in graph if node['@type']=='WebPage')
 assert website['@id']==ORIGIN+'/#website' and website['url']==ORIGIN+'/' and website['name']=='Saipan IVF',(path,'shared website identity')
 assert webpage['isPartOf']['@id']==website['@id'],(path,'website reference')
 assert set(website['inLanguage'])=={'zh-CN','zh-TW','en','ja','ko','es','de','fr'},(path,'website languages')
 assert len(page.alternate_locales)==7 and set(page.alternate_locales)=={'zh_CN','zh_TW','en_US','ja_JP','ko_KR','es_ES','de_DE','fr_FR'}-{page.meta['og:locale']},(path,'sharing locales')
 assert page.meta['og:site_name']=='Saipan IVF',(path,'sharing site name')
 if route not in ['/','/en/','/ja/','/ko/','/es/','/de/','/fr/','/zh-hant/']:
  crumbs=next(node['itemListElement'] for node in graph if node['@type']=='BreadcrumbList')
  assert crumbs[-1]['item']==page.canonical
  parts=[part for part in route.split('/') if part]
  if parts and parts[0] in ['zh-hant','en','ja','ko','es','de','fr']:parts=parts[1:]
  if len(parts)==2 and parts[0] in ['guides','treatments']:
   assert len(crumbs)==3 and crumbs[1]['item']==page.canonical.rsplit(parts[-1]+'/',1)[0],(path,'parent breadcrumb')
 for image in page.images:
  if (image.get('data-src') or image.get('src','')).startswith('/'):
   if urlparse(image.get('data-src') or image['src']).path.endswith('.svg'):
    assert (Path('dist')/urlparse(image.get('data-src') or image['src']).path.lstrip('/')).is_file(),(path,'vector image')
    continue
   assert (image.get('data-srcset') or image.get('srcset')) and image.get('sizes'),(path,'responsive image')
   for candidate in (image.get('data-srcset') or image['srcset']).split(','):
    assert (Path('dist')/candidate.strip().split()[0].lstrip('/')).is_file(),(path,candidate)
root=ET.parse('dist/sitemap.xml').getroot();ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[node.text for node in root.findall('s:url/s:loc',ns)]
assert len(urls)==len(set(urls)) and set(urls)==expected,('sitemap mismatch',set(urls)^expected)
hero=Head();hero.feed(Path('dist/index.html').read_text(encoding='utf-8'))
slides=[im for im in hero.images if 'hero-slide-image' in im.get('class','')]
assert len(slides)==4 and slides[0]['loading']=='eager' and slides[0]['fetchpriority']=='high'
assert all(im.get('data-src','').startswith('/images/') and not im.get('src') and im.get('fetchpriority')=='low' for im in slides[1:])
assert slides[0]['src'].startswith('/images/')
print(f'PASS SEO: {len(expected)} indexable pages, sitemap coverage, canonical, JSON-LD, sharing, responsive sources; complete multilingual pages; hero priority.')

not_found=Path('dist/404.html')
assert not_found.is_file(),'Missing Cloudflare Pages 404 document'
error=Head();error.feed(not_found.read_text(encoding='utf-8'))
assert 'noindex' in error.meta.get('robots','')
assert ORIGIN+'/404/' not in urls and ORIGIN+'/404.html' not in urls
print('PASS custom 404: generated, noindex and excluded from sitemap')
