/* ZetuRoots social module: Chat page, Following page, and the artist bar in the player. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let Z, sb, ch = null, names = {};
  const S = { tab: 'rooms', cur: null }, F = { tab: 'following' };
  const me = () => Z.user(), toast = (m) => Z.toast(m);
  const IN = 'rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white';
  const GOLD = 'bg-primary-gold text-black font-bold rounded-full px-4 py-1.5 text-xs';
  const PILL = 'rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white';

  async function nm(ids) {
    const need = [...new Set(ids)].filter((i) => i && !names[i]);
    if (!need.length) return;
    const { data } = await sb.from('profiles').select('id,display_name').in('id', need);
    (data || []).forEach((p) => (names[p.id] = p.display_name || 'Fan'));
    need.forEach((i) => (names[i] = names[i] || 'Fan'));
  }
  const gate = (what) => `<div class="surface-card rounded-2xl p-6 text-center"><p class="text-sm text-white mb-3">Sign in to use ${what}.</p><button data-go="studio" class="${GOLD}">Sign in</button></div>`;
  const tabs = (items, cur, attr) => `<div class="flex gap-1 rounded-full bg-white/5 p-0.5">${items.map(([k, l]) => `<button ${attr}="${k}" class="rounded-full px-3 py-1 text-xs font-semibold ${k === cur ? 'bg-primary-gold text-black' : 'text-text-muted'}">${l}</button>`).join('')}</div>`;

  async function reportIt(type, id, snap) {
    if (!me()) return toast('Sign in first (Studio page).');
    const reason = window.prompt('Why are you reporting this? (for example: spam, not theirs, abusive, broken link)');
    if (!reason || !reason.trim()) return;
    const { error } = await sb.from('reports').insert({ reporter_id: me().id, target_type: type, target_id: String(id), reason: reason.trim().slice(0, 200), snapshot: snap ? String(snap).slice(0, 1000) : null });
    toast(error ? error.message : 'Thanks. An admin will review this.');
  }

  // ───────── Chat page ─────────
  async function renderChat() {
    const v = $('#view-chat');
    if (!me()) { v.innerHTML = `<h2 class="font-display font-black text-2xl text-white mb-3">Chat</h2>` + gate('chat'); return bind(v); }
    v.innerHTML = `<div class="flex items-center justify-between mb-3"><h2 class="font-display font-black text-2xl text-white">Chat</h2>${tabs([['rooms', 'Rooms'], ['dm', 'Messages']], S.tab, 'data-ctab')}</div>
      <div class="grid md:grid-cols-[17rem_1fr] gap-3">
        <aside id="zc-list" class="surface-card rounded-2xl p-2 max-h-[70vh] overflow-y-auto"></aside>
        <div id="zc-thread" class="surface-card rounded-2xl flex flex-col h-[70vh]"><p class="m-auto text-xs text-text-muted">Pick a room or a conversation.</p></div>
      </div>`;
    bind(v);
    const L = $('#zc-list');
    if (S.tab === 'rooms') {
      const { data } = await sb.from('chat_rooms').select('id,kind,title').order('title');
      const groups = { genre: 'Genres', county: 'Counties', artist_club: 'Fan clubs' };
      L.innerHTML = Object.keys(groups).map((k) => {
        const rs = (data || []).filter((r) => r.kind === k);
        return rs.length ? `<p class="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wider text-text-muted">${groups[k]}</p>` + rs.map((r) => `<button data-room="${esc(r.id)}" data-title="${esc(r.title)}" class="w-full text-left rounded-xl px-3 py-1.5 text-xs text-white hover:bg-white/10">${esc(r.title)}</button>`).join('') : '';
      }).join('');
    } else {
      const { data } = await sb.from('conversations').select('id,user_a,user_b').order('created_at', { ascending: false });
      const rows = (data || []).map((c) => ({ id: c.id, other: c.user_a === me().id ? c.user_b : c.user_a }));
      await nm(rows.map((r) => r.other));
      L.innerHTML = rows.length ? rows.map((r) => `<button data-dm="${esc(r.id)}" data-title="${esc(names[r.other])}" class="w-full text-left rounded-xl px-3 py-1.5 text-xs text-white hover:bg-white/10">${esc(names[r.other])}</button>`).join('')
        : '<p class="p-3 text-xs text-text-muted">No messages yet. Open a track and tap 💬 to message its artist.</p>';
    }
    bind(L);
  }

  async function openThread(type, id, title) {
    S.cur = { type, id }; if (ch) { sb.removeChannel(ch); ch = null; }
    const T = $('#zc-thread');
    T.innerHTML = `<div class="flex items-center justify-between px-4 py-2 border-b border-white/10"><span class="font-bold text-sm text-white truncate">${esc(title)}</span>${type === 'dm' ? '<button id="zc-block" class="text-[11px] text-text-muted hover:text-white">Block</button>' : ''}</div>
      <div id="zc-msgs" class="flex-1 overflow-y-auto p-3 space-y-2"></div>
      <div class="flex gap-2 p-2 border-t border-white/10"><input id="zc-in" maxlength="1000" placeholder="Write a message" class="min-w-0 flex-1 ${IN}"/><button id="zc-send" class="${GOLD}">Send</button></div>`;
    $('#zc-msgs').onclick = (e) => { const b = e.target.closest('[data-rep]'); if (b) reportIt(S.cur.type === 'room' ? 'message' : 'dm_message', b.dataset.rep, b.dataset.body); };
    const t = type === 'room' ? 'chat_messages' : 'dm_messages', col = type === 'room' ? 'room_id' : 'conversation_id';
    const { data } = await sb.from(t).select('id,sender_id,body').eq(col, id).order('created_at', { ascending: false }).limit(50);
    const rows = (data || []).reverse(); await nm(rows.map((r) => r.sender_id)); rows.forEach(addMsg);
    ch = sb.channel('zc-' + t + '-' + id).on('postgres_changes', { event: 'INSERT', schema: 'public', table: t, filter: col + '=eq.' + id },
      async (p) => { await nm([p.new.sender_id]); addMsg(p.new); }).subscribe();
    const send = async () => {
      const body = $('#zc-in').value.trim(); if (!body) return;
      const { error } = await sb.from(t).insert({ [col]: id, sender_id: me().id, body });
      if (error) return toast('Message not sent.'); $('#zc-in').value = '';
    };
    $('#zc-send').onclick = send; $('#zc-in').onkeydown = (e) => { if (e.key === 'Enter') send(); };
    const b = $('#zc-block');
    if (b) b.onclick = async () => {
      const { data: c } = await sb.from('conversations').select('user_a,user_b').eq('id', id).single();
      const other = c.user_a === me().id ? c.user_b : c.user_a;
      const { error } = await sb.from('blocks').insert({ blocker_id: me().id, blocked_id: other });
      toast(error ? (error.code === '23505' ? 'Already blocked.' : error.message) : 'Blocked. They can no longer message you.');
    };
  }
  function addMsg(m) {
    const box = $('#zc-msgs'); if (!box || box.querySelector(`[data-mid="${m.id}"]`)) return;
    const mine = m.sender_id === me().id;
    box.insertAdjacentHTML('beforeend', `<div data-mid="${m.id}" class="flex ${mine ? 'justify-end' : ''}"><div class="max-w-[80%] rounded-2xl px-3 py-1.5 text-xs ${mine ? 'bg-primary-gold text-black' : 'bg-white/10 text-white'}">${mine ? '' : `<b class="block text-[10px] text-primary-gold">${esc(names[m.sender_id])}</b>`}${esc(m.body)}${mine ? '' : `<button data-rep="${m.id}" data-body="${esc(m.body)}" class="ml-2 text-[10px] opacity-60" title="Report">⚑</button>`}</div></div>`);
    box.scrollTop = box.scrollHeight;
  }
  async function startDm(other) {
    if (!me()) return toast('Sign in first (Studio page).');
    const [a, b] = [me().id, other].sort();
    let { data } = await sb.from('conversations').select('id').eq('user_a', a).eq('user_b', b).maybeSingle();
    if (!data) { const r = await sb.from('conversations').insert({ user_a: a, user_b: b }).select('id').single(); if (r.error) return toast(r.error.message); data = r.data; }
    await nm([other]); window.app.navigate('chat'); S.tab = 'dm'; await renderChat(); openThread('dm', data.id, names[other]);
  }

  // ───────── Following page ─────────
  async function renderFollowing() {
    const v = $('#view-following');
    if (!me()) { v.innerHTML = `<h2 class="font-display font-black text-2xl text-white mb-3">Following</h2>` + gate('follows and fan clubs'); return bind(v); }
    v.innerHTML = `<div class="flex items-center justify-between mb-3"><h2 class="font-display font-black text-2xl text-white">Following</h2>${tabs([['following', 'Following'], ['clubs', 'Fan clubs'], ['alerts', 'Alerts']], F.tab, 'data-ftab')}</div><div id="zf-body" class="space-y-2"></div>`;
    bind(v); const B = $('#zf-body'); const id = me().id;
    if (F.tab === 'following') {
      const { data } = await sb.from('follows').select('followee_id,notify').eq('follower_id', id);
      const rows = data || []; await nm(rows.map((r) => r.followee_id));
      B.innerHTML = rows.length ? rows.map((r) => `<div class="surface-card rounded-xl p-3 flex items-center gap-2"><span class="flex-1 text-sm text-white truncate">${esc(names[r.followee_id])}</span>
        <button data-bell="${r.followee_id}" data-on="${r.notify}" class="${PILL}">${r.notify ? '🔔 On' : '🔕 Off'}</button><button data-msg="${r.followee_id}" class="${PILL}">💬</button><button data-unf="${r.followee_id}" class="${PILL}">Unfollow</button></div>`).join('')
        : '<p class="text-xs text-text-muted">You are not following anyone yet. Play a track and tap Follow.</p>';
    } else if (F.tab === 'clubs') {
      const [{ data: subs }, { data: prof }, f, c] = await Promise.all([
        sb.from('artist_subscriptions').select('id,artist_id,price_kes,status,expires_at').eq('subscriber_id', id).order('created_at', { ascending: false }),
        sb.from('profiles').select('subscription_price_kes').eq('id', id).single(),
        sb.from('follows').select('*', { count: 'exact', head: true }).eq('followee_id', id),
        sb.from('artist_subscriptions').select('*', { count: 'exact', head: true }).eq('artist_id', id).eq('status', 'active')]);
      await nm((subs || []).map((s) => s.artist_id));
      B.innerHTML = `<div class="surface-card rounded-xl p-3"><p class="text-sm font-bold text-white mb-1">Your fan club</p><p class="text-[11px] text-text-muted mb-2">${f.count || 0} followers · ${c.count || 0} paying members. Set a monthly price in KES (0 turns it off). Needs at least one link added.</p>
        <div class="flex gap-2"><input id="zf-price" type="number" min="0" value="${prof && prof.subscription_price_kes || ''}" placeholder="Price KES / month" class="min-w-0 flex-1 ${IN}"/><button id="zf-save" class="${GOLD}">Save</button></div></div>
        <p class="pt-2 text-xs font-bold text-white">Clubs you joined</p>` +
        ((subs || []).length ? subs.map((s) => `<div class="surface-card rounded-xl p-3 flex justify-between text-xs text-white"><span>${esc(names[s.artist_id])} · KES ${s.price_kes}/mo</span><span class="${s.status === 'active' ? 'text-secondary-green' : 'text-text-muted'}">${s.status === 'pending' ? 'Pending payment' : esc(s.status)}</span></div>`).join('') : '<p class="text-xs text-text-muted">No fan clubs yet.</p>');
      $('#zf-save').onclick = async () => { const { error } = await sb.rpc('set_fan_club_price', { p_price: +$('#zf-price').value || 0 }); toast(error ? error.message : 'Fan club updated.'); renderFollowing(); };
    } else {
      const { data } = await sb.from('notifications').select('id,kind,payload,read,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(30);
      B.innerHTML = (data || []).length ? data.map((n) => `<div class="surface-card rounded-xl p-3 text-xs ${n.read ? 'text-text-muted' : 'text-white'}">🎵 New link: <b>${esc(n.payload && n.payload.title)}</b></div>`).join('') : '<p class="text-xs text-text-muted">No alerts yet. Turn on the bell for artists you follow.</p>';
      if ((data || []).some((n) => !n.read)) sb.from('notifications').update({ read: true }).eq('user_id', id).eq('read', false).then(() => {});
    }
    bind(B);
  }
  async function setFollow(artist, mode) {
    if (!me()) return toast('Sign in first (Studio page).');
    const k = { follower_id: me().id, followee_id: artist };
    if (mode === 'unfollow') await sb.from('follows').delete().match(k);
    else if (mode === 'bell') { const { data } = await sb.from('follows').select('notify').match(k).maybeSingle(); if (!data) await sb.from('follows').insert({ ...k, notify: true }); else await sb.from('follows').update({ notify: !data.notify }).match(k); }
    else { const { error } = await sb.from('follows').insert(k); if (error && error.code !== '23505') return toast(error.message); }
  }

  // ───────── Shared click wiring ─────────
  function bind(root) {
    root.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => window.app.navigate(b.dataset.go)));
    root.querySelectorAll('[data-ctab]').forEach((b) => (b.onclick = () => { S.tab = b.dataset.ctab; renderChat(); }));
    root.querySelectorAll('[data-ftab]').forEach((b) => (b.onclick = () => { F.tab = b.dataset.ftab; renderFollowing(); }));
    root.querySelectorAll('[data-room]').forEach((b) => (b.onclick = () => openThread('room', b.dataset.room, b.dataset.title)));
    root.querySelectorAll('[data-dm]').forEach((b) => (b.onclick = () => openThread('dm', b.dataset.dm, b.dataset.title)));
    root.querySelectorAll('[data-bell]').forEach((b) => (b.onclick = async () => { await setFollow(b.dataset.bell, 'bell'); renderFollowing(); }));
    root.querySelectorAll('[data-unf]').forEach((b) => (b.onclick = async () => { await setFollow(b.dataset.unf, 'unfollow'); renderFollowing(); }));
    root.querySelectorAll('[data-msg]').forEach((b) => (b.onclick = () => startDm(b.dataset.msg)));
  }

  // ───────── Artist bar in the player ─────────
  async function artistBar(m) {
    const P = $('#zr-player'); if (!P) return;
    let bar = $('#zr-artist');
    if (!bar) { P.querySelector('#zr-gifts').insertAdjacentHTML('beforebegin', '<div id="zr-artist" class="flex flex-wrap items-center gap-1.5 pt-2 text-[11px] text-white"></div>'); bar = $('#zr-artist'); }
    bar.innerHTML = '';
    const { data } = await sb.from('media_items').select('added_by,profiles:added_by(display_name,subscription_price_kes)').eq('id', m.id).maybeSingle();
    if (!data || !data.added_by || (me() && data.added_by === me().id)) return;
    const a = data.added_by, nmx = (data.profiles && data.profiles.display_name) || 'Artist', price = data.profiles && data.profiles.subscription_price_kes;
    let f = null; if (me()) { const r = await sb.from('follows').select('notify').match({ follower_id: me().id, followee_id: a }).maybeSingle(); f = r.data; }
    bar.innerHTML = `<span class="mr-1 max-w-[7rem] truncate text-text-muted">${esc(nmx)}</span><button data-a="follow" class="${PILL}">${f ? 'Following' : 'Follow'}</button><button data-a="bell" class="${PILL}">${f && f.notify ? '🔔' : '🔕'}</button><button data-a="dm" class="${PILL}">💬</button>${price ? `<button data-a="club" class="${PILL}">Fan club · KES ${price}</button>` : ''}<button data-a="report" class="${PILL}" title="Report this link">⚑</button>`;
    bar.querySelectorAll('[data-a]').forEach((b) => (b.onclick = async () => {
      const k = b.dataset.a;
      if (k === 'report') return reportIt('media', m.id, m.title);
      if (k === 'dm') return startDm(a);
      if (k === 'club') { if (!me()) return toast('Sign in first (Studio page).'); const { error } = await sb.rpc('start_artist_subscription', { p_artist: a }); return toast(error ? error.message : 'Fan club request created. Payment opens once M-Pesa is connected.'); }
      await setFollow(a, k === 'bell' ? 'bell' : f ? 'unfollow' : 'follow'); artistBar(m);
    }));
  }

  // ───────── Pages and navigation ─────────
  function pages() {
    const main = $('#view-home').parentElement;
    main.insertAdjacentHTML('beforeend', '<section id="view-chat" class="app-view hidden"></section><section id="view-following" class="app-view hidden"></section>');
  }
  function addNav() {
    [['chat', 'forum', 'Chat'], ['following', 'favorite', 'Following']].forEach(([view, icon, label]) => {
      document.querySelectorAll('a[onclick*="navigate(\'liked-songs\')"]').forEach((a) => {
        const c = a.cloneNode(true); c.setAttribute('onclick', a.getAttribute('onclick').replace('liked-songs', view)); if (c.dataset.view) c.dataset.view = view;
        const ic = c.querySelector('.material-symbols-outlined'); if (ic) ic.textContent = icon;
        [...c.childNodes].forEach((n) => { if (n !== ic) n.remove(); }); c.insertAdjacentHTML('beforeend', `<span>${label}</span>`);
        a.insertAdjacentElement('afterend', c);
      });
      const tn = $('.topnav-btn'); if (tn) { const c = tn.cloneNode(true); c.dataset.topnav = view; c.setAttribute('onclick', `app.navigate('${view}')`); c.title = label; c.querySelector('.material-symbols-outlined').textContent = icon; c.querySelector('span:last-child').textContent = label; c.classList.remove('active'); c.classList.add('topnav-icon'); tn.parentElement.appendChild(c); }
    });
  }
  function start() {
    Z = window.ZR; sb = Z.sb(); if (!$('#view-home')) return;
    pages(); addNav();
    const go = window.app.navigate.bind(window.app);
    window.app.navigate = function (v) { const r = go.apply(null, arguments); if (v === 'chat') renderChat(); if (v === 'following') renderFollowing(); return r; };
    document.addEventListener('zr:play', (e) => artistBar(e.detail));
    document.addEventListener('zr:auth', () => { names = {}; const v = (window.app && window.app.currentView); if (v === 'chat') renderChat(); if (v === 'following') renderFollowing(); });
  }
  if (window.ZR) start(); else document.addEventListener('zr:ready', start);
})();
