"""Capture replica screenshots at key scenes and viewports.
Usage: python3 tests/capture.py [base_url] [out_dir]
"""
import sys, json
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173/'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'shots'
VIEWPORTS = [(1920,1080),(1440,900),(1366,768),(1280,656),(768,1024),(390,844),(320,700)]
SCENES = [
  ('s0-hero',0,0),('s0-video',0,1),('s1-about',1,0.05),('s1-cards',1,0.55),
  ('s2-word',2,0.0),('s2-desktop',2,0.36),('s2-art',2,0.31),('s2-phone',2,0.8),
  ('s3-text',3,0.02),('s3-pill',3,0.5),('s3-cover',3,0.97),
  ('s4-quote',4,0.2),('s4-slider',4,0.42),('s4-wave',4,0.7),('s4-cube',4,0.97),
  ('s5-line',5,0.15),('s5-window',5,0.8),('s6-form',6,0),('s6-footer',6,1),
]
only = set(sys.argv[3].split(',')) if len(sys.argv) > 3 else None
errors = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for (w,h) in VIEWPORTS:
        ctx = b.new_context(viewport={'width':w,'height':h}, device_scale_factor=1, has_touch=w<768, is_mobile=w<768)
        pg = ctx.new_page()
        pg.on('console', lambda m: errors.append(f'{w}x{h} {m.type}: {m.text}') if m.type in ('error','warning') else None)
        pg.on('pageerror', lambda e: errors.append(f'{w}x{h} pageerror: {e}'))
        pg.goto(BASE); pg.wait_for_timeout(1800)
        for name,i,prog in SCENES:
            if only and name not in only: continue
            pg.evaluate(f'window.__ctl.debugSet({i},{prog})')
            pg.wait_for_timeout(1300)
            pg.screenshot(path=f'{OUT}/{w}x{h}-{name}.png')
        ov = pg.evaluate('document.documentElement.scrollWidth > innerWidth')
        if ov: errors.append(f'{w}x{h} horizontal overflow')
        ctx.close()
    b.close()
print(json.dumps(errors[:40], indent=1))
