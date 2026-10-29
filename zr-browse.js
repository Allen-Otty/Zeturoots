/* ZetuRoots browse pages, fed by Supabase: home trending, Top 100, genres, artists, mixtapes, podcasts, labels. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (n) => Number(n || 0).toLocaleString('en-KE');
  const COLS = 'id,provider,provider_id,title,artist_name,thumbnail_url,media_type,plays,genre_id,county,added_by,kind';
  let Z, sb;

  const thumb = (m, c) => (m.thumbnail_url ? `<img src="${esc(m.thumbnail_url)}" alt="" loading="lazy" class="${c} object-cover"/>` : `<div class="${c} bg-white/10 flex items-center justify-center text-primary-gold">♪</div>`);
  const empty = (msg) => `<p class="text-xs text-text-muted p-2">${msg}</p>`;
  const addHint = 'No links yet. Artists add them from the Studio page.';
  const rows = (list, rank) => list.map((m, i) => `<button data-i="${i}" class="w-full flex items-center gap-3 rounded-xl bg-white/5 hover:bg-white/10 p-2 text-left">${rank ? `<span class="w-6 text-center font-display font-black text-sm ${i < 3 ? 'text-primary-gold' : 'text-text-muted'}">${i + 1}</span>` : ''}${thumb(m, 'w-12 h-12 rounded-lg shrink-0')}<span class="min-w-0 flex-1"><span class="block text-sm text-white truncate">${esc(m.title)}</span><span class="block text-[11px] text-text-muted truncate">${esc(m.artist_name || '')} · ${esc(m.provider)} · ${num(m.plays)} plays</span></span><span class="text-primary-gold">▶</span></button>`).join('');
  const wire = (el, list) => el.querySelectorAll('[data-i]').forEach((b) => (b.onclick = () => Z.play(+b.dataset.i, list)));
  async function media(fn, limit) {
    let r = sb.from('media_items').select(COLS).eq('status', 'active'); if (fn) r = fn(r);
    const { data } = await r.order('plays', { ascending: false }).limit(limit || 100); return data || [];
  }
  const slot = (anchor, id) => { let d = document.getElementById(id); if (!d) { d = document.createElement('div'); d.id = id; d.className = 'mt-6 space-y-2'; anchor.insertAdjacentElement('afterend', d); } return d; };

  async function home() {
    const c = $('#home-trending-container'); if (!c) return;
    const list = (await media(null, 10));
    c.innerHTML = list.length ? list.map((m, i) => `<div data-i="${i}" class="flex rounded-xl bg-white/5 cursor-pointer overflow-hidden"><div class="relative">${thumb(m, 'w-full h-full')}</div><div class="p-3 min-w-0 flex-1"><p class="text-sm text-white truncate">${esc(m.title)}</p><p class="text-[11px] text-text-muted truncate">${esc(m.artist_name || '')}</p><p class="text-[10px] text-text-muted mt-1">${num(m.plays)} plays · ${esc(m.provider)}</p></div></div>`).join('') : empty(addHint);
    wire(c, list);
  }
  async function toppers() {
    const c = $('#toppers-list-container'); if (!c) return;
    const pod = $('#leaderboard-podium'); if (pod) pod.innerHTML = '';
    const tabs = $('#toppers-period-tabs'); if (tabs) tabs.classList.add('hidden');
    const list = await media(null, 100);
    c.innerHTML = list.length ? `<div class="space-y-2">${rows(list, true)}</div>` : empty(addHint); wire(c, list);
  }
  async function genres() {
    const c = $('#genres-grid-container'); if (!c) return;
    const [{ data: gs }, { data: used }] = await Promise.all([sb.from('genres').select('*').order('name'), sb.from('media_items').select('genre_id').eq('status', 'active').not('genre_id', 'is', null).limit(2000)]);
    const n = {}; (used || []).forEach((r) => (n[r.genre_id] = (n[r.genre_id] || 0) + 1));
    c.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3';
    c.innerHTML = (gs || []).map((g) => `<button data-g="${esc(g.id)}" data-n="${esc(g.name)}" class="surface-card rounded-2xl p-4 text-left border border-white/10 hover:border-primary-gold/50"><span class="flex justify-between"><b class="text-white text-base">${esc(g.name)}</b><span class="text-[11px] text-primary-gold">${n[g.id] || 0} links</span></span><span class="block text-[11px] text-text-muted mt-1">${esc(g.county_origin)} · ${esc(g.dialect)} · ${esc(g.bpm_range)}</span><span class="block text-xs text-text-muted mt-2 line-clamp-3">${esc(g.description)}</span></button>`).join('');
    const d = slot(c, 'zb-genre-detail');
    c.querySelectorAll('[data-g]').forEach((b) => (b.onclick = async () => {
      const list = await media((r) => r.eq('genre_id', b.dataset.g));
      d.innerHTML = `<h3 class="font-display font-black text-lg text-white">${esc(b.dataset.n)}</h3>` + (list.length ? rows(list) : empty('No links in this genre yet.')); wire(d, list); d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }
  async function artists() {
    const c = $('#artists-grid-container'); if (!c) return;
    const { data } = await sb.from('artist_directory').select('id,display_name,county,links,plays').order('plays', { ascending: false }).limit(100);
    const all = data || [];
    c.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3';
    const paint = (q) => {
      const list = all.filter((a) => (a.display_name || '').toLowerCase().includes(q));
      c.innerHTML = list.length ? list.map((a) => `<button data-a="${esc(a.id)}" data-n="${esc(a.display_name)}" class="surface-card rounded-2xl p-4 text-center border border-white/10 hover:border-primary-gold/50"><span class="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary-gold text-black font-display font-black text-xl">${esc((a.display_name || '?').slice(0, 1).toUpperCase())}</span><b class="block text-sm text-white truncate">${esc(a.display_name)}</b><span class="block text-[11px] text-text-muted">${a.links} links · ${num(a.plays)} plays</span></button>`).join('') : empty('No artists yet. People who add links show up here.');
      const d = slot(c, 'zb-artist-detail');
      c.querySelectorAll('[data-a]').forEach((b) => (b.onclick = async () => {
        const list = await media((r) => r.eq('added_by', b.dataset.a));
        d.innerHTML = `<div class="flex items-center justify-between"><h3 class="font-display font-black text-lg text-white">${esc(b.dataset.n)}</h3><span class="flex gap-1.5"><button data-f class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">Follow</button><button data-m class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">💬 Message</button></span></div>` + rows(list); wire(d, list);
        const u = Z.user();
        $('[data-f]', d).onclick = async () => { if (!u) return Z.toast('Sign in first (Studio page).'); const { error } = await sb.from('follows').insert({ follower_id: u.id, followee_id: b.dataset.a }); Z.toast(error ? (error.code === '23505' ? 'Already following.' : error.message) : 'Following ✅'); };
        $('[data-m]', d).onclick = () => (Z.startDm ? Z.startDm(b.dataset.a) : Z.toast('Chat is not ready yet.'));
        d.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }));
    };
    paint('');
    const s = $('#artists-search-input'); if (s) s.oninput = () => paint(s.value.trim().toLowerCase());
  }
  async function mixtapes() {
    const c = $('#dj-mixtapes-grid'); if (!c) return;
    const list = await media((r) => r.eq('kind', 'mixtape'));
    c.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3';
    c.innerHTML = list.length ? list.map((m, i) => `<button data-i="${i}" class="surface-card rounded-2xl overflow-hidden text-left border border-white/10 hover:border-primary-gold/50">${thumb(m, 'w-full aspect-square')}<span class="block p-3"><b class="block text-sm text-white truncate">${esc(m.title)}</b><span class="block text-[11px] text-text-muted truncate">${esc(m.artist_name || 'DJ')} · ${num(m.plays)} plays</span></span></button>`).join('') : empty('No mixtapes yet. DJs add them from the Studio page (type: DJ mixtape).');
    wire(c, list);
  }
  async function podcasts() {
    const c = $('#podcasts-shows-grid'); if (!c) return;
    const eps = await media((r) => r.eq('kind', 'episode'));
    const shows = {}; eps.forEach((e) => { const k = e.artist_name || 'Unknown show'; (shows[k] = shows[k] || []).push(e); });
    c.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3';
    const names = Object.keys(shows);
    c.innerHTML = names.length ? names.map((k, i) => `<button data-s="${i}" class="surface-card rounded-2xl overflow-hidden text-left border border-white/10 hover:border-primary-gold/50">${thumb(shows[k][0], 'w-full aspect-square')}<span class="block p-3"><b class="block text-sm text-white truncate">${esc(k)}</b><span class="block text-[11px] text-text-muted">${shows[k].length} episodes</span></span></button>`).join('') : empty('No podcasts yet. Add a link and choose type: Podcast.');
    c.querySelectorAll('[data-s]').forEach((b) => (b.onclick = () => {
      const k = names[+b.dataset.s], list = shows[k], sec = $('#podcast-episodes-section'); if (sec) sec.classList.remove('hidden');
      const t = $('#podcast-selected-title'); if (t) t.textContent = k; const h = $('#podcast-selected-hosts'); if (h) h.textContent = list.length + ' episodes';
      const cv = $('#podcast-selected-cover'); if (cv && list[0].thumbnail_url) { if (cv.tagName === 'IMG') cv.src = list[0].thumbnail_url; else cv.style.backgroundImage = `url(${list[0].thumbnail_url})`; }
      const l = $('#podcast-selected-episodes-list'); if (l) { l.innerHTML = rows(list); wire(l, list); } if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }
  async function labels() {
    const c = $('#record-labels-grid'); if (!c) return;
    const { data } = await sb.from('labels').select('*').order('name'); const all = data || [];
    c.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3';
    c.innerHTML = all.length ? all.map((l, i) => `<button data-l="${i}" class="surface-card rounded-2xl p-4 text-left border border-white/10 hover:border-primary-gold/50 flex items-center gap-3"><img src="${esc(l.logo_url)}" alt="" class="h-14 w-14 rounded-xl object-cover shrink-0"/><span class="min-w-0"><b class="block text-sm text-white truncate">${esc(l.name)}</b><span class="block text-[11px] text-text-muted truncate">${esc(l.city)} · since ${l.founded_year || '—'}</span></span></button>`).join('') : empty('No labels yet.');
    c.querySelectorAll('[data-l]').forEach((b) => (b.onclick = () => {
      const l = all[+b.dataset.l], sec = $('#label-catalog-section'); if (sec) sec.classList.remove('hidden');
      const lg = $('#label-selected-logo'); if (lg) { if (lg.tagName === 'IMG') lg.src = l.logo_url; else lg.style.backgroundImage = `url(${l.logo_url})`; }
      const n = $('#label-selected-name'); if (n) n.textContent = l.name; const f = $('#label-selected-founder'); if (f) f.textContent = 'Founder: ' + (l.founder || '—') + ' · ' + (l.city || '');
      const list = $('#label-selected-catalog-list'); if (list) list.innerHTML = `<p class="text-xs text-text-muted mb-2">${esc(l.bio)}</p>` + ((l.signed_artists || []).map((a) => `<div class="rounded-xl bg-white/5 p-3"><b class="block text-sm text-white">${esc(a.name)}</b><span class="text-[11px] text-text-muted">${esc(a.role)}</span></div>`).join('') || empty('No artists listed.'));
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  const R = { home, toppers, genres, artists, 'dj-hub': mixtapes, podcasts, 'label-hub': labels };
  function start() {
    Z = window.ZR; sb = Z.sb(); const go = window.app.navigate.bind(window.app);
    window.app.navigate = function (v) { const r = go.apply(null, arguments); if (R[v]) setTimeout(() => R[v]().catch(() => {}), 150); return r; };
    setTimeout(() => home().catch(() => {}), 400);
  }
  if (window.ZR) start(); else document.addEventListener('zr:ready', start);
})();
