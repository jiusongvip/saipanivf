"""Copy Health Icons (CC0) into the site as recolorable inline icons.

Usage:
  python3 scripts/visuals/icon.py outline/devices/microscope outline/body/dna ...
  python3 scripts/visuals/icon.py --search embryo     # list matching icon paths

Writes src/assets/icons/<style>-<name>.svg with fill="currentColor" so the icon
takes the surrounding text color, and records provenance in docs/illustrations.json.
Use them through src/components/guide/Icon.astro. Run scripts/visuals/fetch-libs.sh first.
"""
import json, os, re, subprocess, sys, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LIB = Path(os.environ.get('VISUAL_LIBS', '/tmp/saipan-visual-libs')) / 'healthicons'
ICONS = LIB / 'public/icons/svg'


def main(argv):
    if not ICONS.is_dir():
        raise SystemExit('Run: bash scripts/visuals/fetch-libs.sh')
    if argv[:1] == ['--search']:
        term = argv[1].lower()
        for f in sorted(ICONS.glob('outline/**/*.svg')):
            if term in f.stem.lower() or term in f.parent.name.lower():
                print(f.relative_to(ICONS).with_suffix(''))
        return
    commit = subprocess.run(['git', '-C', str(LIB), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    ledger = ROOT / 'docs/illustrations.json'
    items = json.loads(ledger.read_text()) if ledger.exists() else []
    out_dir = ROOT / 'src/assets/icons'
    out_dir.mkdir(parents=True, exist_ok=True)
    for rel in argv:
        src = ICONS / (rel + '.svg')
        if not src.is_file():
            raise SystemExit(f'Not found: {rel}  (try --search)')
        style = rel.split('/')[0]
        name = f'{style}-{src.stem}'
        s = src.read_text(encoding='utf-8')
        s = re.sub(r'\s(width|height)="[^"]*"', '', s, count=2)
        s = re.sub(r'fill="(?!none)[^"]*"', 'fill="currentColor"', s)
        s = re.sub(r'stroke="(?!none)[^"]*"', 'stroke="currentColor"', s)
        s = s.replace('<svg', '<svg aria-hidden="true" focusable="false"', 1)
        s = re.sub(r'>\s+<', '><', s).strip()
        (out_dir / f'{name}.svg').write_text(s + '\n', encoding='utf-8')
        record = {'name': name, 'src': f'src/assets/icons/{name}.svg', 'kind': 'health-icon', 'aiGenerated': False,
                  'source': f'https://github.com/resolvetosavelives/healthicons@{commit} public/icons/svg/{rel}.svg',
                  'license': 'CC0 1.0', 'created': datetime.date.today().isoformat()}
        items = [i for i in items if i['name'] != name] + [record]
        print('src/assets/icons/' + name + '.svg')
    ledger.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    try:
        main(sys.argv[1:])
    except BrokenPipeError:
        pass
