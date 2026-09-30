/* ZetuRoots cloud module: Supabase auth + "Add a link" (YouTube) + player. */
(function () {
  const SB_URL = 'https://crnxvsejmnfgutvyiesx.supabase.co';
  const SB_KEY = 'sb_publishable_1LzWRTo5JaeYBylcrj2IGw_bK0mVXdv';
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (id) => document.getElementById(id);
  let sb, user = null, queue = [], lib = [], qi = -1, yt = null;

  function ytId(u) {
    try {
      const x = new URL(u.trim());
      if (x.hostname === 'youtu.be') return x.pathname.slice(1, 12);
      if (!/(^|\.)youtube\.com$/.test(x.hostname)) return null;
      if (x.searchParams.get('v')) return x.searchParams.get('v');
      const m = x.pathname.match(/^\/(shorts|embed|live)\/([\w-]{11})/);
      return m ? m[2] : null;
    } catch { return null; }
  }
  const toast = (m) => (window.app && app.showToast ? app.showToast(m) : alert(m));

  function card() {
    return `<div id="zr-link-card" class="surface-card rounded-2xl p-4 mb-4 border border-primary-gold/30">
      <h3 class="font-display font-black text-base text-white mb-1">Add a link</h3>
      <p class="text-xs text-text-muted mb-3">Share music or videos from YouTube. ZetuRoots plays them from the original source.</p>
      <div id="zr-auth"></div>
      <div id="zr-add" class="hidden space-y-2">
        <input id="zr-url" placeholder="Paste a YouTube link" class="w-full rounded-xl bg-black border border-white/10 px-3 py-2 text-sm text-white"/>
        <div class="flex gap-2">
          <select id="zr-genre" class="flex-1 rounded-xl bg-black border border-white/10 px-2 py-2 text-sm text-white"><option value="">Genre</option></select>
          <select id="zr-type" class="rounded-xl bg-black border border-white/10 px-2 py-2 text-sm text-white"><option value="video">Video</option><option value="audio">Audio</option></select>
        </div>
        <input id="zr-county" placeholder="County (optional)" class="w-full rounded-xl bg-black border border-white/10 px-3 py-2 text-sm text-white"/>
        <button id="zr-save" class="bg-primary-gold text-black font-bold rounded-full px-5 py-2 text-sm">Add to ZetuRoots</button>
        <button id="zr-out" class="ml-2 text-xs text-text-muted underline">Sign out</button>
      </div>
      <h4 class="font-bold text-sm text-white mt-5 mb-2">Linked library</h4>
      <div id="zr-list" class="space-y-2"></div>
      <h4 class="font-bold text-sm text-white mt-5 mb-2">Playlists</h4>
      <div id="zr-pl-make" class="hidden flex gap-2 mb-2"><input id="zr-pl-name" placeholder="New playlist name" class="flex-1 rounded-xl bg-black border border-white/10 px-3 py-2 text-sm text-white"/><button id="zr-pl-new" class="bg-primary-gold text-black font-bold rounded-full px-4 py-2 text-sm">Create</button></div>
      <select id="zr-pl-target" class="hidden w-full rounded-xl bg-black border border-white/10 px-2 py-2 text-xs text-white mb-2"></select>
      <div id="zr-pls" class="space-y-2"></div>
    </div>`;
  }

  function renderAuth() {
    $('zr-add').classList.toggle('hidden', !user);
    $('zr-auth').innerHTML = user ? '' : `<div class="space-y-2">
      <input id="zr-email" type="email" placeholder="Email" class="w-full rounded-xl bg-black border border-white/10 px-3 py-2 text-sm text-white"/>
      <input id="zr-pass" type="password" placeholder="Password (6+ characters)" class="w-full rounded-xl bg-black border border-white/10 px-3 py-2 text-sm text-white"/>
      <button id="zr-in" class="bg-primary-gold text-black font-bold rounded-full px-5 py-2 text-sm">Sign in</button>
      <button id="zr-up" class="ml-2 text-sm text-white underline">Create account</button></div>`;
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
    const { data, error } = await sb.from('media_items').select('id,provider_id,title,artist_name,thumbnail_url,media_type').order('created_at', { ascending: false }).limit(30);
    if (error) return ($('zr-list').textContent = 'Could not load library.');
    lib = data;
    $('zr-list').innerHTML = data.length ? data.map((m, i) => `<button data-i="${i}" class="w-full flex items-center gap-3 text-left rounded-xl bg-white/5 p-2">
      <img src="${esc(m.thumbnail_url)}" alt="" class="w-14 h-14 rounded-lg object-cover"/>
      <span class="min-w-0"><span class="block text-sm text-white truncate">${esc(m.title)}</span><span class="block text-xs text-text-muted truncate">${esc(m.artist_name)} · ${esc(m.media_type)}</span></span><span data-add="${i}" class="ml-auto px-2 text-lg text-primary-gold">+</span></button>`).join('') : '<p class="text-xs text-text-muted">No links yet. Be the first to add one.</p>';
    $('zr-list').querySelectorAll('button').forEach((b) => (b.onclick = (e) => (e.target.dataset.add ? addToPl(lib[+e.target.dataset.add].id) : play(+b.dataset.i, lib))));
  }

  async function save() {
    const url = $('zr-url').value, id = ytId(url);
    if (!id) return toast('Please paste a valid YouTube link.');
    let title = 'Untitled', author = '', thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    try {
      const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id));
      if (r.ok) { const j = await r.json(); title = j.title; author = j.author_name; thumb = j.thumbnail_url || thumb; }
    } catch {}
    const { error } = await sb.from('media_items').insert({
      provider: 'youtube', provider_id: id, url: 'https://www.youtube.com/watch?v=' + id, media_type: $('zr-type').value,
      title, artist_name: author, thumbnail_url: thumb, genre_id: $('zr-genre').value || null,
      county: $('zr-county').value.trim() || null, added_by: user.id,
    });
    if (error) return toast(error.code === '23505' ? 'That link is already on ZetuRoots.' : error.message);
    $('zr-url').value = ''; toast('Link added 🎶'); loadList();
  }

  function playerShell() {
    if ($('zr-player')) return;
    const d = document.createElement('div');
    d.id = 'zr-player';
    d.className = 'fixed bottom-16 right-2 left-2 sm:left-auto sm:w-96 z-[80] hidden rounded-2xl bg-black border border-primary-gold/40 p-2 shadow-2xl';
    d.innerHTML = '<div class="flex justify-between items-center px-1 pb-1"><span id="zr-now" class="text-xs text-white truncate"></span><button id="zr-x" class="text-white text-lg leading-none px-2">×</button></div><div id="zr-frame"></div>';
    document.body.appendChild(d);
    $('zr-x').onclick = () => { if (yt && yt.stopVideo) yt.stopVideo(); d.classList.add('hidden'); };
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
    const h = m.media_type === 'audio' ? 200 : 210;
    loadYT(() => {
      if (yt && yt.loadVideoById) { yt.loadVideoById(m.provider_id); return; }
      $('zr-frame').innerHTML = '<div id="zr-yt"></div>';
      yt = new YT.Player('zr-yt', { width: '100%', height: h, videoId: m.provider_id, playerVars: { playsinline: 1, autoplay: 1 },
        events: { onReady: (e) => e.target.playVideo(), onStateChange: (e) => { if (e.data === 0) play((qi + 1) % queue.length); } } });
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
    const { data, error } = await sb.from('playlist_items').select('added_at,media_items(id,provider_id,title,media_type)').eq('playlist_id', id).order('added_at');
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
    v.insertAdjacentHTML('afterbegin', card());
    const dz = $('studio-audio-dropzone'); // retire file upload: links only
    const up = dz && (dz.closest('.surface-card') || dz);
    if (up) up.classList.add('hidden');
    $('zr-save').onclick = save;
    $('zr-pl-new').onclick = newPl;
    $('zr-out').onclick = () => sb.auth.signOut();
    sb.from('genres').select('id,name').order('name').then(({ data }) => (data || []).forEach((g) => $('zr-genre').insertAdjacentHTML('beforeend', `<option value="${esc(g.id)}">${esc(g.name)}</option>`)));
    renderAuth(); loadList(); loadPlaylists();
  }

  function init() {
    sb = supabase.createClient(SB_URL, SB_KEY);
    sb.auth.getSession().then(({ data }) => { user = data.session ? data.session.user : null; mount(); });
    sb.auth.onAuthStateChange((_e, s) => { user = s ? s.user : null; if ($('zr-auth')) { renderAuth(); loadPlaylists(); } });
    if (window.app && app.navigate) { const n = app.navigate.bind(app); app.navigate = (v) => { n(v); if (v === 'studio') setTimeout(mount, 0); }; }
  }

  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  s.onload = () => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : setTimeout(init, 0));
  document.head.appendChild(s);
})();
