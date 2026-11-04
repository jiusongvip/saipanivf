"""Regenerate scripts/visuals/peep-anchors.json (neck anchors + ink bounding boxes).
Needs Python Playwright with Chromium; only re-run when the pinned Open Peeps commit changes."""
import base64, glob, io, json, os, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
lib = Path(os.environ.get('VISUAL_LIBS', '/tmp/saipan-visual-libs')) / 'open-peeps/packages/open_peeps/assets/atoms'
files = sorted(glob.glob(str(lib / 'pose/*/*.svg'))) + sorted(glob.glob(str(lib / 'head/*.svg')))
out, sc = {}, 0.25
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    for f in files:
        s = open(f).read(); vb = [float(x) for x in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
        w, h = int(vb[2]), int(vb[3]); pad = 600
        pg.set_viewport_size({'width': int((w + 2 * pad) * sc), 'height': int((h + 2 * pad) * sc)})
        s2 = re.sub(r'viewBox="[^"]+"', f'viewBox="{-pad} {-pad} {w+2*pad} {h+2*pad}"', s, count=1)
        s2 = re.sub(r'\swidth="[^"]+"|\sheight="[^"]+"', '', s2, count=2)
        pg.set_content(f'<body style="margin:0;background:#fff"><img src="data:image/svg+xml;base64,{base64.b64encode(s2.encode()).decode()}" style="width:{(w+2*pad)*sc}px;height:{(h+2*pad)*sc}px;display:block"></body>')
        im = Image.open(io.BytesIO(pg.screenshot())).convert('L'); px = im.load(); W, H = im.size
        ink = [(x, y) for y in range(H) for x in range(W) if px[x, y] < 128]
        xs = [x for x, _ in ink]; ys = [y for _, y in ink]
        conv = lambda v: round(v / sc - pad, 1)
        part = 'pose' if '/pose/' in f else 'head'
        edge = min(ys) if part == 'pose' else max(ys)
        band = [x for x, y in ink if abs(y - edge) <= 5]
        out[os.path.relpath(f, lib)] = {'x': conv(sum(band) / len(band)), 'y': conv(edge), 'w': w, 'h': h,
                                        'minx': conv(min(xs)), 'maxx': conv(max(xs)), 'miny': conv(min(ys)), 'maxy': conv(max(ys))}
    b.close()
Path(__file__).with_name('peep-anchors.json').write_text(json.dumps(out, indent=1) + '\n')
print(len(out))
