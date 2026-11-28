/* ZetuRoots admin page: overview, payouts, reports. Server-side rules enforce admin-only access. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let Z, sb, tab = 'overview', names = {}, isAdmin = false;
  const me = () => Z.user(), toast = (m) => Z.toast(m);
  const PILL = 'rounded-full bg-ink/[0.07] px-3 py-1 text-xs font-semibold text-ink';
  const GOLD = 'bg-primary-gold text-black font-bold rounded-full px-3 py-1 text-xs';
  const num = (n) => Number(n || 0).toLocaleString('en-KE');
  const when = (d) => new Date(d).toLocaleString('en-KE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const stat = (l, v) => `<div class="surface-card rounded-2xl p-4"><p class="text-[11px] text-text-muted">${l}</p><p class="font-display font-black text-2xl text-ink">${v}</p></div>`;

  async function nm(ids) {
    const need = [...new Set(ids)].filter((i) => i && !names[i]); if (!need.length) return;
    const { data } = await sb.from('profiles').select('id,display_name').in('id', need);
    (data || []).forEach((p) => (names[p.id] = p.display_name || 'User')); need.forEach((i) => (names[i] = names[i] || 'User'));
  }


  // ── Catalogue: admins add official links (YouTube, Spotify, SoundCloud, Audiomack, Mixcloud, Vimeo). Nothing is hosted or downloaded; players use the provider's own embed. ──
  const FIELD = 'w-full rounded-xl bg-white/70 border border-ink/10 px-3 py-2 text-sm text-ink';
  const MAX_LINES = 25;
  async function catalogue(B) {
    const [{ data: genres }, { data: mine }] = await Promise.all([
      sb.from('genres').select('id,name').order('name'),
      sb.from('media_items').select('id,provider,title,artist_name,county,status,created_at').eq('added_by', me().id).order('created_at', { ascending: false }).limit(30),
    ]);
    const counties = typeof KENYA_COUNTIES !== 'undefined' ? KENYA_COUNTIES : [];
    B.innerHTML = `<form id="zc-form" class="surface-card rounded-2xl p-4 space-y-2" novalidate>
      <p class="text-sm font-bold text-ink">Add official links</p>
      <p class="text-[11px] text-text-muted">Paste one link per line (up to ${MAX_LINES}). Titles and artwork are filled in from the provider. Supported: ${esc(Z.SUPPORTED)}.</p>
      <textarea id="zc-urls" rows="4" class="${FIELD}" placeholder="https://www.youtube.com/watch?v=..." aria-label="Links, one per line"></textarea>
      <div class="grid grid-cols-2 gap-2">
        <input id="zc-artist" class="${FIELD}" maxlength="80" placeholder="Artist name (optional)" aria-label="Artist name"/>
        <select id="zc-kind" class="${FIELD}" aria-label="Type"><option value="track">Track</option><option value="mixtape">Mixtape</option><option value="episode">Podcast episode</option></select>
        <select id="zc-genre" class="${FIELD}" aria-label="Genre"><option value="">Genre (optional)</option>${(genres || []).map((g) => `<option value="${esc(g.id)}">${esc(g.name)}</option>`).join('')}</select>
        <select id="zc-county" class="${FIELD}" aria-label="County"><option value="">County (optional)</option>${counties.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
      </div>
      ${(genres || []).length ? '' : '<p class="text-[11px] text-text-muted">Genres will appear here once they have been added to the database.</p>'}
      <label class="flex items-start gap-2 text-xs text-ink"><input id="zc-ok" type="checkbox" class="mt-0.5"/><span>I confirm these are the official links published by the artist or rights holder, or that I am authorised to share them. ZetuRoots only embeds the provider's own player.</span></label>
      <div class="flex items-center gap-2"><button id="zc-go" type="submit" class="${GOLD}">Add links</button><span id="zc-msg" class="text-xs text-text-muted" role="status"></span></div>
    </form>
    <p class="text-xs font-bold text-ink pt-2">Added by you</p>
    <div id="zc-list" class="space-y-1.5">${(mine || []).length ? (mine || []).map((m) => `<div class="surface-card rounded-xl p-2.5 flex items-center justify-between gap-2"><div class="min-w-0"><p class="text-sm text-ink truncate">${esc(m.title)}</p><p class="text-[11px] text-text-muted truncate">${esc(m.artist_name || 'Unknown artist')} · ${esc(m.provider)}${m.county ? ' · ' + esc(m.county) : ''}${m.status !== 'active' ? ' · ' + esc(m.status) : ''}</p></div><button data-del="${m.id}" class="${PILL}" aria-label="Remove ${esc(m.title)}">Remove</button></div>`).join('') : '<p class="text-xs text-text-muted">Nothing added yet.</p>'}</div>`;

    B.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
      if (!window.confirm('Remove this link from ZetuRoots?')) return;
      const { error } = await sb.from('media_items').delete().eq('id', b.dataset.del);
      toast(error ? error.message : 'Removed.'); render();
    }));

    $('#zc-form').onsubmit = async (ev) => {
      ev.preventDefault();
      const msg = $('#zc-msg'), btn = $('#zc-go');
      const lines = [...new Set($('#zc-urls').value.split(/\r?\n/).map((x) => x.trim()).filter(Boolean))];
      if (!lines.length) return (msg.textContent = 'Paste at least one link.');
      if (lines.length > MAX_LINES) return (msg.textContent = `Please add at most ${MAX_LINES} links at a time.`);
      if (!$('#zc-ok').checked) return (msg.textContent = 'Please confirm the links are official or authorised.');
      btn.disabled = true; let ok = 0; const problems = [];
      for (let i = 0; i < lines.length; i++) {
        msg.textContent = `Adding ${i + 1} of ${lines.length}…`;
        const l = Z.parseLink(lines[i]);
        if (!l) { problems.push(`Not a supported link: ${lines[i].slice(0, 40)}`); continue; }
        const meta = await Z.fetchMeta(l);
        const { error } = await sb.from('media_items').insert({
          provider: l.provider, provider_id: l.id, url: Z.canon(l), kind: $('#zc-kind').value,
          media_type: l.provider === 'youtube' || l.provider === 'vimeo' ? 'video' : 'audio',
          title: meta.title || 'Untitled', artist_name: $('#zc-artist').value.trim() || meta.artist || null,
          thumbnail_url: meta.thumb || null, genre_id: $('#zc-genre').value || null, county: $('#zc-county').value || null, added_by: me().id,
        });
        if (error) problems.push(error.code === '23505' ? `Already on ZetuRoots: ${lines[i].slice(0, 40)}` : error.message); else ok++;
      }
      btn.disabled = false;
      toast(ok ? `${ok} link${ok > 1 ? 's' : ''} added.` : 'No links were added.');
      if (problems.length) { msg.textContent = problems.slice(0, 3).join(' · '); if (ok) setTimeout(render, 1800); } else render();
    };
  }

  async function render() {
    const v = $('#view-admin');
    if (!isAdmin) { v.innerHTML = '<h2 class="font-display font-black text-2xl text-ink mb-3">Admin</h2><div class="surface-card rounded-2xl p-6 text-center text-sm text-text-muted">This page is for ZetuRoots admins.</div>'; return; }
    v.innerHTML = `<div class="flex items-center justify-between mb-3"><h2 class="font-display font-black text-2xl text-ink">Admin</h2><div class="flex gap-1 rounded-full bg-ink/[0.04] p-0.5">${[['overview', 'Overview'], ['catalogue', 'Catalogue'], ['payouts', 'Payouts'], ['reports', 'Reports']].map(([k, l]) => `<button data-atab="${k}" class="rounded-full px-3 py-1 text-xs font-semibold ${k === tab ? 'bg-primary-gold text-black' : 'text-text-muted'}">${l}</button>`).join('')}</div></div><div id="za-body" class="space-y-2 max-w-3xl"></div>`;
    v.querySelectorAll('[data-atab]').forEach((b) => (b.onclick = () => { tab = b.dataset.atab; render(); }));
    const B = $('#za-body');
    if (tab === 'overview') {
      const { data, error } = await sb.rpc('admin_overview'); if (error) return (B.textContent = error.message);
      B.className = 'grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl';
      B.innerHTML = stat('Users', num(data.users)) + stat('Links', num(data.links)) + stat('Plays', num(data.plays)) + stat('Open reports', num(data.open_reports)) +
        stat('Payouts waiting', num(data.pending_cashouts)) + stat('Waiting (KES)', num(data.pending_kes)) + stat('Coins in wallets', num(data.coins_in_wallets)) + stat('Earned, unpaid', num(data.earned_unpaid));
    } else if (tab === 'catalogue') {
      B.className = 'space-y-2 max-w-3xl'; await catalogue(B);
    } else if (tab === 'payouts') {
      const { data } = await sb.from('cashout_requests').select('id,user_id,coins,kes_amount,phone,status,note,created_at').order('created_at', { ascending: false }).limit(40);
      const rows = data || []; await nm(rows.map((r) => r.user_id));
      B.innerHTML = (rows.length ? '<p class="text-[11px] text-text-muted mb-1">Pay by M-Pesa yourself, then press Paid. Reject returns the coins to the artist.</p>' : '') + (rows.length ? rows.map((r) => `<div class="surface-card rounded-xl p-3"><div class="flex items-center justify-between gap-2"><div class="min-w-0"><p class="text-sm text-ink truncate">${esc(names[r.user_id])} · KES ${num(r.kes_amount)}</p><p class="text-[10px] text-text-muted">${num(r.coins)} coins · ${esc(r.phone)} · ${when(r.created_at)}</p></div>
        ${r.status === 'pending' ? `<div class="flex gap-1.5 shrink-0"><button data-pay="${r.id}" class="${GOLD}">Paid</button><button data-rej="${r.id}" class="${PILL}">Reject</button></div>` : `<span class="text-xs ${r.status === 'paid' ? 'text-secondary-green' : 'text-red-600'}">${esc(r.status)}</span>`}</div>${r.note ? `<p class="mt-1 text-[10px] text-text-muted">${esc(r.note)}</p>` : ''}</div>`).join('') : '<p class="text-xs text-text-muted">No payout requests.</p>');
      const act = (attr, status, ask) => B.querySelectorAll(`[${attr}]`).forEach((b) => (b.onclick = async () => {
        const note = window.prompt(ask); if (note === null) return;
        const { error } = await sb.rpc('review_cashout', { p_id: b.getAttribute(attr), p_status: status, p_note: note.trim() || null });
        toast(error ? error.message : status === 'paid' ? 'Marked as paid.' : 'Rejected. Coins returned.'); render();
      }));
      act('data-pay', 'paid', 'M-Pesa receipt number (optional):'); act('data-rej', 'rejected', 'Reason for rejecting:');
    } else {
      const { data } = await sb.from('reports').select('id,reporter_id,target_type,target_id,reason,snapshot,status,note,created_at').order('created_at', { ascending: false }).limit(40);
      const rows = data || []; await nm(rows.map((r) => r.reporter_id));
      B.innerHTML = rows.length ? rows.map((r) => `<div class="surface-card rounded-xl p-3"><div class="flex items-start justify-between gap-2"><div class="min-w-0"><p class="text-sm text-ink">${esc({ media: 'Link', message: 'Room message', dm_message: 'Direct message' }[r.target_type])} · <span class="text-text-muted">${esc(r.reason)}</span></p>
        <p class="text-[10px] text-text-muted">by ${esc(names[r.reporter_id])} · ${when(r.created_at)}</p>${r.snapshot ? `<p class="mt-1 rounded-lg bg-white/60 p-2 text-xs text-ink">${esc(r.snapshot)}</p>` : ''}</div>
        ${r.status === 'open' ? `<div class="flex gap-1.5 shrink-0"><button data-rm="${r.id}" class="${GOLD}">Remove</button><button data-dm="${r.id}" class="${PILL}">Dismiss</button></div>` : `<span class="text-xs text-text-muted">${esc(r.status)}</span>`}</div></div>`).join('') : '<p class="text-xs text-text-muted">No reports.</p>';
      const act = (attr, action) => B.querySelectorAll(`[${attr}]`).forEach((b) => (b.onclick = async () => {
        const { error } = await sb.rpc('resolve_report', { p_id: b.getAttribute(attr), p_action: action });
        toast(error ? error.message : action === 'remove' ? 'Content removed.' : 'Report dismissed.'); render();
      }));
      act('data-rm', 'remove'); act('data-dm', 'dismiss');
    }
  }

  function nav(on) {
    document.querySelectorAll('[data-zr-admin]').forEach((e) => e.remove());
    if (!on) return;
    document.querySelectorAll('a[onclick*="navigate(\'liked-songs\')"]').forEach((a) => {
      const c = a.cloneNode(true); c.dataset.zrAdmin = '1'; c.setAttribute('onclick', a.getAttribute('onclick').replace('liked-songs', 'admin')); if (c.dataset.view) c.dataset.view = 'admin';
      const ic = c.querySelector('.material-symbols-outlined'); if (ic) ic.textContent = 'admin_panel_settings';
      [...c.childNodes].forEach((n) => { if (n !== ic) n.remove(); }); c.insertAdjacentHTML('beforeend', '<span>Admin</span>'); a.insertAdjacentElement('afterend', c);
    });
    const tn = $('.topnav-btn');
    if (tn) { const c = tn.cloneNode(true); c.dataset.zrAdmin = '1'; c.dataset.topnav = 'admin'; c.setAttribute('onclick', "app.navigate('admin')"); c.title = 'Admin'; c.classList.remove('active'); c.classList.add('topnav-icon'); c.querySelector('.material-symbols-outlined').textContent = 'admin_panel_settings'; tn.parentElement.appendChild(c); }
  }
  async function check() {
    isAdmin = false;
    if (me()) { const { data } = await sb.from('profiles').select('role').eq('id', me().id).maybeSingle(); isAdmin = !!data && data.role === 'admin'; }
    nav(isAdmin); if (window.app.currentView === 'admin') render();
  }

  function start() {
    Z = window.ZR; sb = Z.sb(); if (!$('#view-home')) return;
    $('#view-home').parentElement.insertAdjacentHTML('beforeend', '<section id="view-admin" class="app-view hidden"></section>');
    const go = window.app.navigate.bind(window.app);
    window.app.navigate = function (v) { const r = go.apply(null, arguments); if (v === 'admin') render(); return r; };
    document.addEventListener('zr:auth', () => { names = {}; check(); });
    check();
  }
  if (window.ZR) start(); else document.addEventListener('zr:ready', start);
})();
