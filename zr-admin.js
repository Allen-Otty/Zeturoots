/* ZetuRoots admin page: overview, payouts, reports. Server-side rules enforce admin-only access. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let Z, sb, tab = 'overview', names = {}, isAdmin = false;
  const me = () => Z.user(), toast = (m) => Z.toast(m);
  const PILL = 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white';
  const GOLD = 'bg-primary-gold text-black font-bold rounded-full px-3 py-1 text-xs';
  const num = (n) => Number(n || 0).toLocaleString('en-KE');
  const when = (d) => new Date(d).toLocaleString('en-KE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const stat = (l, v) => `<div class="surface-card rounded-2xl p-4"><p class="text-[11px] text-text-muted">${l}</p><p class="font-display font-black text-2xl text-white">${v}</p></div>`;

  async function nm(ids) {
    const need = [...new Set(ids)].filter((i) => i && !names[i]); if (!need.length) return;
    const { data } = await sb.from('profiles').select('id,display_name').in('id', need);
    (data || []).forEach((p) => (names[p.id] = p.display_name || 'User')); need.forEach((i) => (names[i] = names[i] || 'User'));
  }

  async function render() {
    const v = $('#view-admin');
    if (!isAdmin) { v.innerHTML = '<h2 class="font-display font-black text-2xl text-white mb-3">Admin</h2><div class="surface-card rounded-2xl p-6 text-center text-sm text-text-muted">This page is for ZetuRoots admins.</div>'; return; }
    v.innerHTML = `<div class="flex items-center justify-between mb-3"><h2 class="font-display font-black text-2xl text-white">Admin</h2><div class="flex gap-1 rounded-full bg-white/5 p-0.5">${[['overview', 'Overview'], ['payouts', 'Payouts'], ['reports', 'Reports']].map(([k, l]) => `<button data-atab="${k}" class="rounded-full px-3 py-1 text-xs font-semibold ${k === tab ? 'bg-primary-gold text-black' : 'text-text-muted'}">${l}</button>`).join('')}</div></div><div id="za-body" class="space-y-2 max-w-3xl"></div>`;
    v.querySelectorAll('[data-atab]').forEach((b) => (b.onclick = () => { tab = b.dataset.atab; render(); }));
    const B = $('#za-body');
    if (tab === 'overview') {
      const { data, error } = await sb.rpc('admin_overview'); if (error) return (B.textContent = error.message);
      B.className = 'grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl';
      B.innerHTML = stat('Users', num(data.users)) + stat('Links', num(data.links)) + stat('Plays', num(data.plays)) + stat('Open reports', num(data.open_reports)) +
        stat('Payouts waiting', num(data.pending_cashouts)) + stat('Waiting (KES)', num(data.pending_kes)) + stat('Coins in wallets', num(data.coins_in_wallets)) + stat('Earned, unpaid', num(data.earned_unpaid));
    } else if (tab === 'payouts') {
      const { data } = await sb.from('cashout_requests').select('id,user_id,coins,kes_amount,phone,status,note,created_at').order('created_at', { ascending: false }).limit(40);
      const rows = data || []; await nm(rows.map((r) => r.user_id));
      B.innerHTML = (rows.length ? '<p class="text-[11px] text-text-muted mb-1">Pay by M-Pesa yourself, then press Paid. Reject returns the coins to the artist.</p>' : '') + (rows.length ? rows.map((r) => `<div class="surface-card rounded-xl p-3"><div class="flex items-center justify-between gap-2"><div class="min-w-0"><p class="text-sm text-white truncate">${esc(names[r.user_id])} · KES ${num(r.kes_amount)}</p><p class="text-[10px] text-text-muted">${num(r.coins)} coins · ${esc(r.phone)} · ${when(r.created_at)}</p></div>
        ${r.status === 'pending' ? `<div class="flex gap-1.5 shrink-0"><button data-pay="${r.id}" class="${GOLD}">Paid</button><button data-rej="${r.id}" class="${PILL}">Reject</button></div>` : `<span class="text-xs ${r.status === 'paid' ? 'text-secondary-green' : 'text-red-400'}">${esc(r.status)}</span>`}</div>${r.note ? `<p class="mt-1 text-[10px] text-text-muted">${esc(r.note)}</p>` : ''}</div>`).join('') : '<p class="text-xs text-text-muted">No payout requests.</p>');
      const act = (attr, status, ask) => B.querySelectorAll(`[${attr}]`).forEach((b) => (b.onclick = async () => {
        const note = window.prompt(ask); if (note === null) return;
        const { error } = await sb.rpc('review_cashout', { p_id: b.getAttribute(attr), p_status: status, p_note: note.trim() || null });
        toast(error ? error.message : status === 'paid' ? 'Marked as paid.' : 'Rejected. Coins returned.'); render();
      }));
      act('data-pay', 'paid', 'M-Pesa receipt number (optional):'); act('data-rej', 'rejected', 'Reason for rejecting:');
    } else {
      const { data } = await sb.from('reports').select('id,reporter_id,target_type,target_id,reason,snapshot,status,note,created_at').order('created_at', { ascending: false }).limit(40);
      const rows = data || []; await nm(rows.map((r) => r.reporter_id));
      B.innerHTML = rows.length ? rows.map((r) => `<div class="surface-card rounded-xl p-3"><div class="flex items-start justify-between gap-2"><div class="min-w-0"><p class="text-sm text-white">${esc({ media: 'Link', message: 'Room message', dm_message: 'Direct message' }[r.target_type])} · <span class="text-text-muted">${esc(r.reason)}</span></p>
        <p class="text-[10px] text-text-muted">by ${esc(names[r.reporter_id])} · ${when(r.created_at)}</p>${r.snapshot ? `<p class="mt-1 rounded-lg bg-black/60 p-2 text-xs text-white">${esc(r.snapshot)}</p>` : ''}</div>
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
