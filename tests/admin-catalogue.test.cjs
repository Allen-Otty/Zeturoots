/* Admin Catalogue: critical-workflow test. Uses the REAL zr-cloud.js and zr-admin.js with a stubbed Supabase client,
   so it never touches live data. Run: cd tests && npm install && npm test */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/json' };
const ADMIN = '11111111-1111-1111-1111-111111111111';

// Fake Supabase client (installed in the page): records inserts, serves an admin or a fan profile.
const FAKE_SB = `window.__inserts = []; window.__deleted = [];
window.supabase = { createClient: () => {
  const role = window.__role || 'admin';
  const q = (table) => { const o = { _t: table };
    ['select','eq','in','order','limit','neq','gt'].forEach((m) => (o[m] = () => o));
    o.maybeSingle = () => Promise.resolve({ data: table === 'profiles' ? { role } : null });
    o.single = o.maybeSingle;
    o.insert = (row) => { window.__inserts.push(row); return Promise.resolve({ error: row.provider_id === 'DUPLICATE01' ? { code: '23505', message: 'dup' } : null }); };
    o.delete = () => ({ eq: (c, v) => { window.__deleted.push(v); return Promise.resolve({ error: null }); } });
    o.then = (res) => res({ data: table === 'genres' ? [{ id: 'benga', name: 'Benga' }] : [], error: null });
    return o; };
  return { from: q, rpc: () => Promise.resolve({ data: null, error: null }),
    auth: { getSession: () => Promise.resolve({ data: { session: { user: { id: '${ADMIN}' } } } }), onAuthStateChange: (cb) => { setTimeout(() => cb('INITIAL_SESSION', { user: { id: '${ADMIN}' } }), 0); return { data: { subscription: { unsubscribe() {} } } }; } },
    channel: () => ({ on() { return this; }, subscribe() { return this; } }), removeChannel() {} };
} };`.replace('${ADMIN}', ADMIN);

const results = []; const check = (name, ok, extra) => { results.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : '  -> ' + (extra || ''))); };

(async () => {
  const server = http.createServer((req, res) => {
    const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'));
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
  }).listen(0);
  const base = 'http://localhost:' + server.address().port;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });

  async function open(role) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' }); const page = await ctx.newPage();
    await page.route('**/*', (r) => {
      const u = r.request().url();
      if (u.startsWith(base)) return r.continue();
      if (u.includes('supabase-js')) return r.fulfill({ contentType: 'text/javascript', body: (role ? 'window.__role=' + JSON.stringify(role) + ';' : '') + FAKE_SB });
      if (u.includes('youtube.com/oembed')) return r.fulfill({ contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ title: 'Test Song', author_name: 'Test Channel', thumbnail_url: 'https://i.ytimg.com/t.jpg' }) });
      return r.abort();
    });
    page.on('pageerror', (e) => (page.__errs = page.__errs || []).push(String(e).slice(0, 160)));
    await page.goto(base + '/index.html'); await page.waitForFunction(() => window.ZR, null, { timeout: 8000 }); await page.waitForTimeout(500);
    return page;
  }

  // 1. A non-admin never sees the catalogue form.
  let page = await open('fan');
  check('app modules start without errors (cloud, browse, social, wallet, admin)', !(page.__errs || []).filter((e) => !/tailwind is not defined/.test(e)).length, (page.__errs || []).join(' | '));
  await page.evaluate(() => app.navigate('admin')); await page.waitForTimeout(500);
  check('fan cannot see admin tools', /for ZetuRoots admins/.test(await page.innerText('#view-admin')) && !(await page.$('#zc-form')));
  await page.close();

  // 2. Admin workflow.
  page = await open('admin');
  await page.evaluate(() => app.navigate('admin')); await page.waitForTimeout(400);
  await page.click('[data-atab="catalogue"]'); await page.waitForSelector('#zc-form');
  check('catalogue form is shown to admins', true);
  check('genres from the database are offered', (await page.innerText('#zc-genre')).includes('Benga'));

  await page.fill('#zc-urls', 'https://www.youtube.com/watch?v=AAAAAAAAAAA');
  await page.click('#zc-go');
  check('blocked until authorisation is confirmed', /confirm the links are official/.test(await page.innerText('#zc-msg')) && (await page.evaluate(() => __inserts.length)) === 0);

  await page.fill('#zc-urls', Array.from({ length: 26 }, (_, i) => 'https://youtu.be/' + String(i).padStart(11, 'x')).join('\n'));
  await page.check('#zc-ok'); await page.click('#zc-go');
  check('more than 25 links is rejected', /at most 25/.test(await page.innerText('#zc-msg')) && (await page.evaluate(() => __inserts.length)) === 0);

  await page.fill('#zc-urls', ['https://www.youtube.com/watch?v=AAAAAAAAAAA', 'https://youtu.be/BBBBBBBBBBB', 'https://example.com/not-music', 'https://youtu.be/DUPLICATE01', 'https://www.youtube.com/watch?v=AAAAAAAAAAA'].join('\n'));
  await page.fill('#zc-artist', 'Official Artist'); await page.selectOption('#zc-county', 'Vihiga').catch(() => {}); await page.selectOption('#zc-genre', 'benga');
  await page.click('#zc-go'); await page.waitForFunction(() => /Already on ZetuRoots/.test(document.querySelector('#zc-msg').innerText), null, { timeout: 8000 });
  const rows = await page.evaluate(() => __inserts);
  check('valid links are inserted (duplicates in the paste are ignored)', rows.filter((r) => r.provider_id !== 'DUPLICATE01').length === 2, JSON.stringify(rows.map((r) => r.provider_id)));
  const r0 = rows[0] || {};
  check('row has provider, canonical URL, owner, metadata', r0.provider === 'youtube' && r0.url === 'https://www.youtube.com/watch?v=AAAAAAAAAAA' && r0.added_by === ADMIN && r0.title === 'Test Song' && r0.thumbnail_url === 'https://i.ytimg.com/t.jpg' && r0.media_type === 'video', JSON.stringify(r0));
  check('artist, genre and county from the form are applied', r0.artist_name === 'Official Artist' && r0.genre_id === 'benga' && r0.county === 'Vihiga', JSON.stringify(r0));
  check('unsupported links are reported, never inserted', /Not a supported link/.test(await page.innerText('#zc-msg')) && !rows.some((r) => /example\.com/.test(r.url)));
  check('already-added links are reported', /Already on ZetuRoots/.test(await page.innerText('#zc-msg')));
  await page.close();

  await browser.close(); server.close();
  const failed = results.filter((x) => !x).length; console.log(`\n${results.length - failed}/${results.length} passed`); process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
