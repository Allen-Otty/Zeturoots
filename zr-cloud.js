/* ZetuRoots cloud module: Supabase auth + "Add a link" (YouTube) + player. */
(function () {
  const SB_URL = 'https://crnxvsejmnfgutvyiesx.supabase.co';
  const SB_KEY = 'sb_publishable_1LzWRTo5JaeYBylcrj2IGw_bK0mVXdv';
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (id) => document.getElementById(id);
  const sess = (() => { let k = sessionStorage.getItem('zr_sess'); if (!k) { k = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now()); sessionStorage.setItem('zr_sess', k); } return k; })();
  let playTimer = null;
  let sb, user = null, queue = [], lib = [], qi = -1, yt = null;

  const SUPPORTED = 'YouTube, Spotify, SoundCloud, Audiomack, Mixcloud or Vimeo';
  function parseLink(raw) {
    let x; try { x = new URL(String(raw).trim()); } catch { return null; }
    const h = x.hostname.replace(/^(www|m|open|music)\./, ''), p = x.pathname.replace(/\/+$/, '');
    if (h === 'youtu.be') return p.length > 1 ? { provider: 'youtube', id: p.slice(1, 12) } : null;
    if (h === 'youtube.com') {
      const v = x.searchParams.get('v'); if (v) return { provider: 'youtube', id: v.slice(0, 11) };
      const m = p.match(/^\/(shorts|embed|live)\/([\w-]{11})/); return m ? { provider: 'youtube', id: m[2] } : null;
    }
    if (h === 'spotify.com') { const m = p.match(/\/(track|album|playlist|episode|show)\/(\w{22})/); return m ? { provider: 'spotify', id: m[1] + '/' + m[2] } : null; }
    if (h === 'soundcloud.com') return /^\/[^/]+\/[^/]+/.test(p) ? { provider: 'soundcloud', id: p.slice(1) } : null;
    if (h === 'audiomack.com') { const m = p.match(/^\/([^/]+)\/(song|album|playlist)\/([^/]+)/); return m ? { provider: 'audiomack', id: m[1] + '/' + m[2] + '/' + m[3] } : null; }
    if (h === 'mixcloud.com') return /^\/[^/]+\/[^/]+/.test(p) ? { provider: 'mixcloud', id: p } : null;
    if (h === 'vimeo.com') { const m = p.match(/^\/(\d+)/); return m ? { provider: 'vimeo', id: m[1] } : null; }
    return null;
  }
  const canon = (l) => ({ youtube: 'https://www.youtube.com/watch?v=' + l.id, spotify: 'https://open.spotify.com/' + l.id, soundcloud: 'https://soundcloud.com/' + l.id,
    audiomack: 'https://audiomack.com/' + l.id, mixcloud: 'https://www.mixcloud.com' + l.id, vimeo: 'https://vimeo.com/' + l.id }[l.provider]);
  const OEMBED = { youtube: 'https://www.youtube.com/oembed?format=json&url=', spotify: 'https://open.spotify.com/oembed?url=', soundcloud: 'https://soundcloud.com/oembed?format=json&url=',
    mixcloud: 'https://app.mixcloud.com/oembed/?format=json&url=', vimeo: 'https://vimeo.com/api/oembed.json?url=' };
  const metaCache = {};
  async function fetchMeta(l) {
    const u = canon(l); if (metaCache[u]) return metaCache[u];
    const out = { title: '', artist: '', thumb: l.provider === 'youtube' ? `https://i.ytimg.com/vi/${l.id}/hqdefault.jpg` : '' };
    if (OEMBED[l.provider]) {
      try { const r = await fetch(OEMBED[l.provider] + encodeURIComponent(u)); if (r.ok) { const j = await r.json(); out.title = j.title || ''; out.artist = j.author_name || ''; out.thumb = j.thumbnail_url || out.thumb; } } catch {}
    }
    return (metaCache[u] = out);
  }
  function embedUrl(m) {
    switch (m.provider) {
      case 'spotify': return 'https://open.spotify.com/embed/' + m.provider_id + '?theme=0';
      case 'soundcloud': return 'https://w.soundcloud.com/player/?auto_play=true&url=' + encodeURIComponent('https://soundcloud.com/' + m.provider_id);
      case 'audiomack': { const [a, ty, s] = m.provider_id.split('/'); return 'https://audiomack.com/embed/' + ty + '/' + a + '/' + s; }
      case 'mixcloud': return 'https://www.mixcloud.com/widget/iframe/?autoplay=1&feed=' + encodeURIComponent(m.provider_id + '/');
      case 'vimeo': return 'https://player.vimeo.com/video/' + m.provider_id + '?autoplay=1';
    }
    return 'about:blank';
  }
  let urlT;
  function onUrl() {
    clearTimeout(urlT);
    urlT = setTimeout(async () => {
      const l = parseLink($('zr-url').value);
      $('zr-hint').textContent = l ? 'Detected: ' + l.provider : $('zr-url').value.trim() ? 'Supported: ' + SUPPORTED : '';
      if (!l) return;
      $('zr-type').value = l.provider === 'youtube' || l.provider === 'vimeo' ? 'video' : 'audio';
      const mt = await fetchMeta(l);
      if (mt.title) $('zr-title').value = mt.title;
      if (mt.artist) $('zr-artist').value = mt.artist;
    }, 450);
  }
  const toast = (m) => (window.app && app.showToast ? app.showToast(m) : alert(m));

  function card() {
    return `<div id="zr-link-card" class="surface-card rounded-2xl p-4 mb-4 border border-primary-gold/30">
      <h3 class="font-display font-black text-base text-white mb-1">Add a link</h3>
      <p class="text-xs text-text-muted mb-3">Share music, mixes and videos from other platforms. ZetuRoots plays them from the original source.</p>
      <div id="zr-auth"></div>
      <div id="zr-stats" class="hidden rounded-xl bg-white/5 p-3 mb-3 text-xs text-white"></div>
      <div id="zr-add" class="hidden space-y-2">
        <input id="zr-url" placeholder="Paste a link from ${SUPPORTED}" class="w-full rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/>
        <p id="zr-hint" class="px-1 text-[11px] text-text-muted"></p>
        <div class="flex gap-2"><input id="zr-title" placeholder="Title" class="min-w-0 flex-1 rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/><input id="zr-artist" placeholder="Artist" class="min-w-0 flex-1 rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/></div>
        <div class="flex gap-2">
          <select id="zr-kind" class="rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"><option value="track">Track</option><option value="mixtape">DJ mixtape</option><option value="episode">Podcast</option></select>
          <select id="zr-genre" class="min-w-0 flex-1 rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"><option value="">Genre</option></select>
          <select id="zr-type" class="rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"><option value="video">Video</option><option value="audio">Audio</option></select>
        </div>
        <input id="zr-county" placeholder="County (optional)" class="w-full rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/>
        <div class="flex items-center justify-between"><button id="zr-out" class="text-[11px] text-text-muted hover:text-white">Sign out</button><button id="zr-save" class="bg-primary-gold text-black font-bold rounded-full px-4 py-1.5 text-xs">Add link</button></div>
        <p class="px-1 text-[10px] text-text-muted">By adding a link you confirm it is your music or you have permission to share it.</p>
      </div>
      <h4 class="font-bold text-sm text-white mt-5 mb-2">Linked library</h4>
      <div id="zr-list" class="space-y-2"></div>
      <h4 class="font-bold text-sm text-white mt-5 mb-2">Playlists</h4>
      <div id="zr-pl-make" class="hidden flex gap-2 mb-2"><input id="zr-pl-name" placeholder="New playlist name" class="flex-1 rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/><button id="zr-pl-new" class="bg-primary-gold text-black font-bold rounded-full px-3.5 py-1.5 text-xs">Create</button></div>
      <select id="zr-pl-target" class="hidden w-full rounded-full bg-black border border-white/10 px-2 py-2 text-xs text-white mb-2"></select>
      <div id="zr-pls" class="space-y-2"></div>
    </div>`;
  }

  function renderAuth() {
    $('zr-add').classList.toggle('hidden', !user);
    $('zr-auth').innerHTML = user ? '' : `<div class="space-y-2">
      <input id="zr-email" type="email" placeholder="Email" class="w-full rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/>
      <input id="zr-pass" type="password" placeholder="Password (6+ characters)" class="w-full rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white"/>
      <button id="zr-in" class="bg-primary-gold text-black font-bold rounded-full px-4 py-1.5 text-xs">Sign in</button>
      <button id="zr-up" class="ml-1 px-2 text-xs text-white/80 hover:text-white">Create account</button></div>`;
    if (!user) {
      const go = async (up) => {
        const cred = { email: $('zr-email').value.trim(), password: $('zr-pass').value };
        const { data, error } = up ? await sb.auth.signUp(cred) : await sb.auth.signInWithPassword(cred);
        if (error) return toast(error.message);
        if (up && !data.session) return toast('Check your email to confirm your account, then sign in.');
      };
      $('zr-in').onclick = () => go(false);
      $('zr-up').onclick = () => go(true);
    }
  }

  async function loadList() {
    const { data, error } = await sb.from('media_items').select('id,provider,provider_id,title,artist_name,thumbnail_url,media_type').order('created_at', { ascending: false }).limit(30);
    if (error) return ($('zr-list').textContent = 'Could not load library.');
    lib = data;
    $('zr-list').innerHTML = data.length ? data.map((m, i) => `<button data-i="${i}" class="w-full flex items-center gap-3 text-left rounded-xl bg-white/5 p-2">
      ${m.thumbnail_url ? `<img src="${esc(m.thumbnail_url)}" alt="" class="w-14 h-14 rounded-lg object-cover"/>` : '<div class="w-14 h-14 rounded-lg bg-white/10"></div>'}
      <span class="min-w-0"><span class="block text-sm text-white truncate">${esc(m.title)}</span><span class="block text-xs text-text-muted truncate">${esc(m.artist_name)} · ${esc(m.provider)}</span></span><span data-add="${i}" class="ml-auto px-2 text-lg text-primary-gold">+</span></button>`).join('') : '<p class="text-xs text-text-muted">No links yet. Be the first to add one.</p>';
    $('zr-list').querySelectorAll('button').forEach((b) => (b.onclick = (e) => (e.target.dataset.add ? addToPl(lib[+e.target.dataset.add].id) : play(+b.dataset.i, lib))));
  }

  async function save() {
    const l = parseLink($('zr-url').value);
    if (!l) return toast('Paste a link from ' + SUPPORTED + '.');
    const meta = await fetchMeta(l);
    const { error } = await sb.from('media_items').insert({
      provider: l.provider, provider_id: l.id, url: canon(l), kind: $('zr-kind').value, media_type: $('zr-type').value,
      title: $('zr-title').value.trim() || meta.title || 'Untitled', artist_name: $('zr-artist').value.trim() || meta.artist || null,
      thumbnail_url: meta.thumb || null, genre_id: $('zr-genre').value || null, county: $('zr-county').value.trim() || null, added_by: user.id,
    });
    if (error) return toast(error.code === '23505' ? 'That link is already on ZetuRoots.' : error.message);
    ['zr-url', 'zr-title', 'zr-artist'].forEach((id) => ($(id).value = '')); $('zr-hint').textContent = '';
    toast('Link added 🎶'); loadList();
  }

  function playerShell() {
    if ($('zr-player')) return;
    const d = document.createElement('div');
    d.id = 'zr-player';
    d.className = 'fixed bottom-16 right-2 left-2 sm:left-auto sm:w-96 z-[80] hidden rounded-2xl bg-black border border-primary-gold/40 p-2 shadow-2xl';
    d.innerHTML = '<div class="flex justify-between items-center px-1 pb-1"><span id="zr-now" class="text-xs text-white truncate"></span><span class="flex items-center"><button id="zr-prev" class="text-white px-2">‹</button><button id="zr-next" class="text-white px-2">›</button><button id="zr-x" class="text-white text-lg leading-none px-2">×</button></span></div><div id="zr-frame"><div id="zr-yt-wrap"><div id="zr-yt"></div></div><iframe id="zr-emb" class="hidden w-full rounded-xl" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Player"></iframe></div><div id="zr-gifts" class="flex flex-wrap justify-center gap-1.5 pt-2"></div>';
    document.body.appendChild(d);
    fillGifts();
    $('zr-x').onclick = () => { if (yt && yt.stopVideo) yt.stopVideo(); $('zr-emb').src = 'about:blank'; d.classList.add('hidden'); };
    $('zr-prev').onclick = () => play((qi - 1 + queue.length) % queue.length);
    $('zr-next').onclick = () => play((qi + 1) % queue.length);
  }

  async function fillGifts() {
    const { data } = await sb.from('gifts').select('id,name,coins,icon').order('coins');
    $('zr-gifts').innerHTML = (data || []).map((g) => `<button data-g="${esc(g.id)}" class="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] leading-tight text-white">${esc(g.icon)}<br>${g.coins}</button>`).join('');
    $('zr-gifts').querySelectorAll('button').forEach((b) => (b.onclick = async () => {
      if (!user) return toast('Sign in to send gifts.');
      const m = queue[qi];
      const { error } = await sb.rpc('send_gift', { p_gift: b.dataset.g, p_media: m.id });
      toast(error ? (/not enough/.test(error.message) ? 'Not enough coins yet.' : /cannot gift/.test(error.message) ? 'You can\'t gift your own track.' : error.message) : 'Gift sent 🎁');
      loadStats();
    }));
  }
  async function loadStats() {
    const box = $('zr-stats');
    if (!user) return box.classList.add('hidden');
    const { data } = await sb.rpc('artist_stats');
    if (!data) return;
    box.classList.remove('hidden');
    box.innerHTML = `<div class="flex justify-between"><span>Coins: <b>${data.balance}</b></span><span>Earned: <b>${data.earned}</b></span><span>Plays: <b>${data.plays}</b></span><span>Gifts: <b>${data.gifts}</b></span></div>` +
      (data.top.length ? '<div class="mt-2 text-text-muted">Top tracks: ' + data.top.map((x) => esc(x.title) + ' (' + x.plays + ')').join(' · ') + '</div>' : '') +
      (data.earned >= 1000 ? '<div class="mt-3 flex gap-2"><input id="zr-co-coins" type="number" min="1000" placeholder="Coins (1000+)" class="w-1/3 rounded-lg bg-black border border-white/10 px-2 py-1 text-white"/><input id="zr-co-phone" placeholder="2547XXXXXXXX" class="flex-1 rounded-lg bg-black border border-white/10 px-2 py-1 text-white"/><button id="zr-co-go" class="bg-primary-gold text-black font-bold rounded-full px-3">Cash out</button></div>' : '<div class="mt-2 text-text-muted">Cash-out opens at 1000 earned coins.</div>');
    const go = $('zr-co-go');
    if (go) go.onclick = async () => {
      const { error } = await sb.rpc('request_cashout', { p_coins: +$('zr-co-coins').value, p_phone: $('zr-co-phone').value.trim() });
      toast(error ? error.message : 'Request sent. We review payouts by hand before paying.');
      loadStats();
    };
  }

  function loadYT(cb) {
    if (window.YT && YT.Player) return cb();
    window.onYouTubeIframeAPIReady = cb;
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  }

  function play(i, list) {
    if (list) queue = list;
    if (!queue[i]) return;
    qi = i; const m = queue[i]; playerShell();
    $('zr-player').classList.remove('hidden'); $('zr-now').textContent = m.title;
    const emb = $('zr-emb'), isYT = m.provider === 'youtube';
    $('zr-yt-wrap').classList.toggle('hidden', !isYT); emb.classList.toggle('hidden', isYT);
    if (!isYT) {
      if (yt && yt.pauseVideo) yt.pauseVideo();
      emb.style.height = m.provider === 'spotify' ? '152px' : m.provider === 'vimeo' ? '210px' : '166px';
      emb.src = embedUrl(m);
      return;
    }
    emb.src = 'about:blank';
    const h = m.media_type === 'audio' ? 200 : 210;
    loadYT(() => {
      if (yt && yt.loadVideoById) { yt.loadVideoById(m.provider_id); return; }
      yt = new YT.Player('zr-yt', { width: '100%', height: h, videoId: m.provider_id, playerVars: { playsinline: 1, autoplay: 1 },
        events: { onReady: (e) => e.target.playVideo(), onStateChange: (e) => { clearTimeout(playTimer); if (e.data === 1) { const id = queue[qi] && queue[qi].id; playTimer = setTimeout(() => id && sb.rpc('record_play', { p_media: id, p_session: sess }), 30000); } if (e.data === 0) play((qi + 1) % queue.length); } } });
    });
  }

  async function loadPlaylists() {
    $('zr-pl-make').classList.toggle('hidden', !user);
    const { data } = await sb.from('playlists').select('id,title,owner_id,playlist_items(count)').order('created_at', { ascending: false }).limit(20);
    const all = data || [];
    $('zr-pls').innerHTML = all.length ? all.map((p) => `<button data-p="${esc(p.id)}" class="w-full text-left rounded-xl bg-white/5 p-3 text-sm text-white">${esc(p.title)} <span class="text-xs text-text-muted">· ${p.playlist_items[0] ? p.playlist_items[0].count : 0} items</span></button>`).join('') : '<p class="text-xs text-text-muted">No playlists yet.</p>';
    $('zr-pls').querySelectorAll('button').forEach((b) => (b.onclick = () => playPl(b.dataset.p)));
    const mine = user ? all.filter((p) => p.owner_id === user.id) : [];
    const sel = $('zr-pl-target');
    sel.classList.toggle('hidden', !mine.length);
    sel.innerHTML = '<option value="">Add tracks to…</option>' + mine.map((p) => `<option value="${esc(p.id)}">${esc(p.title)}</option>`).join('');
  }
  async function playPl(id) {
    const { data, error } = await sb.from('playlist_items').select('added_at,media_items(id,provider,provider_id,title,media_type)').eq('playlist_id', id).order('added_at');
    if (error || !data.length) return toast('This playlist is empty.');
    play(0, data.map((r) => r.media_items).filter(Boolean));
  }
  async function addToPl(mediaId) {
    if (!user) return toast('Sign in to build playlists.');
    const pid = $('zr-pl-target').value;
    if (!pid) return toast('Pick one of your playlists first.');
    const { error } = await sb.from('playlist_items').insert({ playlist_id: pid, media_id: mediaId });
    toast(error ? (error.code === '23505' ? 'Already in that playlist.' : error.message) : 'Added to playlist ✅');
    if (!error) loadPlaylists();
  }
  async function newPl() {
    const title = $('zr-pl-name').value.trim();
    if (!title) return;
    const { error } = await sb.from('playlists').insert({ title, owner_id: user.id });
    if (error) return toast(error.message);
    $('zr-pl-name').value = ''; loadPlaylists();
  }

  function mount() {
    const v = $('view-studio');
    if (!v || $('zr-link-card')) return;
    const banner = $('studio-role-banner');
    if (banner) banner.insertAdjacentHTML('afterend', card()); else v.insertAdjacentHTML('afterbegin', card());
    const sub = [...v.querySelectorAll('#studio-role-banner *')].find((e) => !e.children.length && /Direct upload/i.test(e.textContent));
    if (sub) sub.textContent = 'Share your music from YouTube, Spotify, SoundCloud and more';
    $('zr-url').addEventListener('input', onUrl);
    $('zr-save').onclick = save;
    $('zr-pl-new').onclick = newPl;
    $('zr-out').onclick = () => sb.auth.signOut();
    sb.from('genres').select('id,name').order('name').then(({ data }) => (data || []).forEach((g) => $('zr-genre').insertAdjacentHTML('beforeend', `<option value="${esc(g.id)}">${esc(g.name)}</option>`)));
    renderAuth(); loadList(); loadPlaylists(); loadStats();
  }

  function init() {
    sb = supabase.createClient(SB_URL, SB_KEY);
    sb.auth.getSession().then(({ data }) => { user = data.session ? data.session.user : null; mount(); });
    sb.auth.onAuthStateChange((_e, s) => { user = s ? s.user : null; if ($('zr-auth')) { renderAuth(); loadPlaylists(); loadStats(); } });
    if (window.app && app.navigate) { const n = app.navigate.bind(app); app.navigate = (v) => { n(v); if (v === 'studio') setTimeout(mount, 0); }; }
  }

  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  s.onload = () => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : setTimeout(init, 0));
  document.head.appendChild(s);
})();
