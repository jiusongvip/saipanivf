"""Import ONE photo supplied by the hospital / clinic (or another rights holder) into the site.

Usage:
  python3 scripts/visuals/import-photo.py --file ~/Downloads/clinic-reception.jpg \
     --name clinic-reception --alt "诊所接待区" --provided-by "Saipan IVF Center" \
     --rights-confirmed --people none --reviewer "姓名"

--people: none | staff-consented | patients-consented
  Refuses to run unless --rights-confirmed is given (the supplier owns the photo or may
  license it for this website) and, when people are identifiable, written consent exists.
Writes 1200px stock + 400/800 responsive WebP (EXIF/GPS stripped), updates
src/data/image-variants.json, src/data/image-dimensions.json and docs/stock-images.json.
Requires Pillow.
"""
import argparse, json, datetime
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]


def save(im, path, width):
    im = im.copy()
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, 'WEBP', quality=78, method=6)  # re-encoding drops EXIF/GPS metadata
    return im.size


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--file', required=True)
    ap.add_argument('--name', required=True, help='lowercase-kebab file name, e.g. clinic-reception')
    ap.add_argument('--alt', required=True, help='Simplified Chinese alt text describing the photo')
    ap.add_argument('--provided-by', required=True)
    ap.add_argument('--reviewer', required=True)
    ap.add_argument('--rights-confirmed', action='store_true')
    ap.add_argument('--people', required=True, choices=['none', 'staff-consented', 'patients-consented'])
    ap.add_argument('--note', default='')
    a = ap.parse_args()
    if not a.rights_confirmed:
        raise SystemExit('Refusing: confirm the supplier owns or may license this photo for the website (--rights-confirmed).')
    stock = f'/images/stock/{a.name}.webp'
    if (ROOT / 'public' / stock.lstrip('/')).exists():
        raise SystemExit(f'{stock} already exists; choose another --name')
    im = ImageOps.exif_transpose(Image.open(a.file)).convert('RGB')
    w, h = save(im, ROOT / 'public' / stock.lstrip('/'), 1200)
    srcset = []
    for size in (400, 800):
        if w > size:
            save(im, ROOT / f'public/images/responsive/{a.name}-{size}.webp', size)
            srcset.append(f'/images/responsive/{a.name}-{size}.webp {size}w')
    srcset.append(f'{stock} {w}w')
    for file, value in (('src/data/image-variants.json', ', '.join(srcset)), ('src/data/image-dimensions.json', [w, h])):
        p = ROOT / file
        d = json.loads(p.read_text())
        d[stock] = value
        p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    ledger = ROOT / 'docs/stock-images.json'
    items = json.loads(ledger.read_text())
    items.append({
        'name': a.name, 'title': a.alt, 'alt': a.alt, 'src': stock,
        'source': f'Provided by {a.provided_by}', 'license': 'Supplied by rights holder for this website',
        'people': a.people, 'retrieved': datetime.date.today().isoformat(),
        'width': w, 'height': h, 'bytes': (ROOT / 'public' / stock.lstrip('/')).stat().st_size, 'placements': [],
        'aiGenerated': False, 'reviewer': a.reviewer, 'note': a.note
    })
    ledger.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {stock} ({w}x{h}) with {len(srcset) - 1} responsive variants.')


if __name__ == '__main__':
    main()
