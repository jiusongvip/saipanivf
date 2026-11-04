"""Compose Open Peeps figures (CC0) into one optimized SVG for a guide.

Usage (one or more figures side by side, left to right):
  python3 scripts/visuals/peep.py --name pgt-a-consult \
    --figure "pose/standing/easing-1.svg|head/Medium Bangs.svg|face/Calm.svg" \
    --figure "pose/standing/pointing_finger-1.svg|head/Short 2.svg|face/Explaining.svg|accessories/Glasses.svg" \
    --alt "手绘插画：一人倾听，另一人讲解（示意图）" --used-on /guides/pgt-a/

Writes public/images/illustrations/<name>.svg and records provenance in
docs/illustrations.json. Run scripts/visuals/fetch-libs.sh first.
"""
import argparse, json, os, re, subprocess, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ANCHORS = json.loads((ROOT / 'scripts/visuals/peep-anchors.json').read_text())
INK, FILL, ACCENT = '#173b60', '#ffffff', '#1767a6'  # site --ink / paper / --blue
# Faces suited to a medical information site. Others (Monster, Cyclops, Rage,
# Angry with Fang, Very Angry, Fear, Hectic, Suspicious, Contempt, Cheeky...) are refused.
FACES = {'Calm', 'Smile', 'Solemn', 'Serious', 'Concerned', 'Explaining', 'Cute', 'Eyes Closed', 'Old', 'Tired', 'Awe', 'Driven', 'Blank'}
NO_POSES = {'robot_dance-1', 'robot_dance-2', 'robot_dance-3', 'bike'}
# Seated poses have no chair in the artwork and look like floating; only the wheelchair carries its seat.
SEATED_OK = {'wheelchair'}
FACE_OFFSET = (133.0, 186.0)       # from open_peeps PeepAvatar (13.5, 15.75 @48px box, native units)
ACCESSORY_OFFSET = (39.4, 242.2)     # from PeepAvatar (4, 20.5 relative to head @48px box)
NECK_OVERLAP = 30


def body(lib, rel):
    s = (lib / rel).read_text(encoding='utf-8')
    vb = [float(x) for x in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
    inner = s[s.find('>', s.find('<svg')) + 1:s.rfind('</svg>')]
    inner = re.sub(r'<\?xml[^>]*>|<!--.*?-->|<title>.*?</title>|<desc>.*?</desc>|\s(id|data-name)="[^"]*"', '', inner, flags=re.S)
    return re.sub(r'>\s+<', '><', inner).strip(), vb[2], vb[3]


def figure(lib, spec):
    parts = spec.split('|')
    pose, head, face = parts[:3]
    accessory = parts[3] if len(parts) > 3 else None
    fname = Path(face).stem
    if fname not in FACES:
        raise SystemExit(f'Face "{fname}" is not allowed on this site. Allowed: {sorted(FACES)}')
    if Path(pose).stem in NO_POSES or ('/sitting/' in pose and Path(pose).stem not in SEATED_OK):
        raise SystemExit(f'Pose "{pose}" is not allowed (playful, cropped, or seated without a chair). Use standing poses or sitting/wheelchair.')
    pb, _, _ = body(lib, pose)
    hb, _, _ = body(lib, head)
    fb, _, _ = body(lib, face)
    a, h = ANCHORS[pose], ANCHORS[head]
    hx, hy = a['x'] - h['x'], a['y'] - h['y'] + NECK_OVERLAP
    g = f'<g>{pb}</g><g transform="translate({hx:.1f} {hy:.1f})">{hb}<g transform="translate({FACE_OFFSET[0]} {FACE_OFFSET[1]})">{fb}</g>'
    if accessory and not accessory.endswith('* None.svg'):
        ab, _, _ = body(lib, accessory)
        g += f'<g transform="translate({ACCESSORY_OFFSET[0]} {ACCESSORY_OFFSET[1]})">{ab}</g>'
    g += '</g>'
    box = (min(a['minx'], hx + h['minx']), hy + h['miny'], max(a['maxx'], hx + h['maxx']), a['maxy'])
    return g, box, parts


def recolor(svg):
    for black in ('#000000', '#000', 'black'):
        svg = re.sub(rf'(fill|stroke)="{black}"', rf'\1="{INK}"', svg, flags=re.I)
    for white in ('#FFFFFF', '#FFF', 'white'):
        svg = re.sub(rf'(fill|stroke)="{white}"', rf'\1="{FILL}"', svg, flags=re.I)
    return svg


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--name', required=True)
    ap.add_argument('--figure', action='append', required=True, help='pose|head|face[|accessory] paths relative to atoms/')
    ap.add_argument('--alt', required=True, help='Simplified Chinese alt text describing the drawing (not a real person)')
    ap.add_argument('--used-on', action='append', default=[])
    ap.add_argument('--gap', type=float, default=80)
    ap.add_argument('--ground', action='store_true', help='draw a soft accent ellipse under the figures')
    args = ap.parse_args()
    if not re.fullmatch(r'[a-z0-9-]+', args.name):
        raise SystemExit('name must be lowercase-kebab')
    lib = Path(os.environ.get('VISUAL_LIBS', '/tmp/saipan-visual-libs')) / 'open-peeps/packages/open_peeps/assets/atoms'
    if not lib.is_dir():
        raise SystemExit('Run: bash scripts/visuals/fetch-libs.sh')
    figs = [figure(lib, spec) for spec in args.figure]
    ground_y = max(b[3] for _, b, _ in figs)
    groups, x, top, specs = [], 0.0, 0.0, []
    for g, (x0, y0, x1, y1), parts in figs:
        dx, dy = x - x0, ground_y - y1          # sit every figure on one ground line
        groups.append(f'<g transform="translate({dx:.1f} {dy:.1f})">{g}</g>')
        top = min(top, y0 + dy)
        x += (x1 - x0) + args.gap
        specs.append(parts)
    width = x - args.gap
    pad = 40
    bottom = ground_y + 70
    ground = f'<ellipse cx="{width/2:.0f}" cy="{ground_y+10:.0f}" rx="{width*0.5:.0f}" ry="55" fill="{ACCENT}" fill-opacity=".08"/>' if args.ground else ''
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {top-pad:.0f} {width+2*pad:.0f} {bottom-top+pad:.0f}" role="img">'
           f'{ground}{"".join(groups)}</svg>')
    width, top = width + 2 * pad, top - pad
    svg = recolor(svg)
    out = ROOT / 'public/images/illustrations' / f'{args.name}.svg'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(svg, encoding='utf-8')
    commit = subprocess.run(['git', '-C', str(lib.parents[3]), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    record = {
        'name': args.name, 'src': f'/images/illustrations/{args.name}.svg', 'kind': 'open-peeps',
        'width': round(width), 'height': round(bottom - top), 'bytes': out.stat().st_size,
        'alt': args.alt, 'figures': specs, 'usedOn': args.used_on,
        'source': 'https://www.openpeeps.com/ (Pablo Stanley), parts via https://github.com/jenshor/open-peeps@' + commit,
        'license': 'CC0 1.0 (artwork); repackaging repository MIT', 'aiGenerated': False,
        'created': datetime.date.today().isoformat()
    }
    ledger = ROOT / 'docs/illustrations.json'
    items = json.loads(ledger.read_text()) if ledger.exists() else []
    items = [i for i in items if i['name'] != args.name] + [record]
    ledger.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{out.relative_to(ROOT)} {record["bytes"]} bytes, {record["width"]}x{record["height"]}')


if __name__ == '__main__':
    main()
