"""Functional checks driven through real input events.
Usage: python3 tests/interactions.py [base_url]
"""
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173/'
results, errors = [], []

def check(name, ok, detail=''):
    results.append(('PASS' if ok else 'FAIL', name, detail))

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    pg.goto(BASE); pg.wait_for_timeout(1500)
    idx = lambda: pg.evaluate('window.__ctl.index')

    # 1. wheel through every section
    pg.mouse.move(700, 450)
    seen = [idx()]
    for _ in range(900):
        pg.mouse.wheel(0, 120); pg.wait_for_timeout(16)
        if idx() != seen[-1]:
            seen.append(idx()); pg.wait_for_timeout(1600)
        if idx() == 6 and pg.evaluate('window.__ctl.current >= window.__ctl.len - 1'):
            break
    check('wheel reaches every section in order', seen == [0, 1, 2, 3, 4, 5, 6], str(seen))

    # 2. wheel back up swaps to previous section
    for _ in range(400):
        pg.mouse.wheel(0, -120); pg.wait_for_timeout(16)
        if idx() == 5: break
    pg.wait_for_timeout(1300)
    check('reverse wheel returns to previous section', idx() == 5, str(idx()))

    # 3. header nav jump
    pg.locator('.header__nav').get_by_role('button', name='About', exact=True).click()
    pg.wait_for_timeout(1700)
    check('header "About" jumps to section 1', idx() == 1, str(idx()))

    # 4. keyboard navigation
    pg.evaluate('window.__ctl.debugSet(0,0)'); pg.wait_for_timeout(300)
    for _ in range(6):
        pg.keyboard.press('PageDown'); pg.wait_for_timeout(250)
    pg.wait_for_timeout(1200)
    check('keyboard PageDown advances sections', idx() >= 1, str(idx()))

    # 5. menu open / escape / item jump
    pg.get_by_role('button', name='Open menu').click(); pg.wait_for_timeout(900)
    opened = pg.evaluate("document.querySelector('.menu').classList.contains('is-open')")
    pg.keyboard.press('Escape'); pg.wait_for_timeout(900)
    closed = not pg.evaluate("document.querySelector('.menu').classList.contains('is-open')")
    check('menu opens and closes with Escape', opened and closed)
    pg.get_by_role('button', name='Open menu').click(); pg.wait_for_timeout(900)
    pg.locator('.menu').get_by_role('button', name='Contact Us', exact=True).click(); pg.wait_for_timeout(2000)
    check('menu "Contact Us" jumps to form', idx() == 6, str(idx()))

    # 6. form validation + unconfigured state (no endpoint in this build)
    pg.get_by_role('button', name='Submit the request').click(); pg.wait_for_timeout(300)
    errs = pg.locator('.field__err').count()
    check('empty submit shows 2 validation errors', errs == 2, str(errs))
    pg.get_by_placeholder('Jane from Acme').fill('Test Co')
    pg.get_by_placeholder('jane@acme.com').fill('test@example.com')
    pg.get_by_role('checkbox', name='Branding').click()
    pg.get_by_role('radio', name='$10K–$20K').click()
    sel = pg.locator('.chip.is-on').count()
    check('chips toggle selection', sel == 2, str(sel))
    pg.get_by_role('button', name='Submit the request').click(); pg.wait_for_timeout(300)
    txt = pg.locator('.form__status').inner_text()
    check('valid submit without endpoint reports "not configured" (no fake success)', 'VITE_FORM_ENDPOINT' in txt, txt[:80])

    # 7. slider bullet click
    pg.evaluate('window.__ctl.debugSet(4,0.4)'); pg.wait_for_timeout(1000)
    pg.get_by_role('tab', name='Parlay branding').click(); pg.wait_for_timeout(1200)
    cnt = pg.locator('.slider__count').inner_text()
    check('slider bullet selects project 7', cnt.startswith('07'), cnt)

    # 8. showreel lightbox
    pg.evaluate('window.__ctl.debugSet(0,0)'); pg.wait_for_timeout(800)
    pg.get_by_role('button', name='Play showreel').click(); pg.wait_for_timeout(400)
    lb = pg.locator('.lightbox').count()
    pg.get_by_role('button', name='Close showreel').click(); pg.wait_for_timeout(300)
    check('showreel lightbox opens and closes', lb == 1 and pg.locator('.lightbox').count() == 0)

    # 9. external links are real and open in new tab
    hrefs = pg.eval_on_selector_all('.fixed-controls a', 'els => els.map(e => [e.href, e.target])')
    check('fixed controls link out in new tab', all(h.startswith('http') and t == '_blank' for h, t in hrefs), str(hrefs))

    b.close()

for r in results: print(*r, sep=' | ')
print('console/page errors:', errors[:10])
sys.exit(0 if all(r[0] == 'PASS' for r in results) and not errors else 1)
