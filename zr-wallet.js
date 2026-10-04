/* ZetuRoots wallet page: balance, coin packs, activity, gifts, cash-outs. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let Z, sb, tab = 'activity', names = {};
  const me = () => Z.user(), toast = (m) => Z.toast(m);
  const IN = 'rounded-full bg-black border border-white/10 px-3 py-1.5 text-xs text-white';
  const GOLD = 'bg-primary-gold text-black font-bold rounded-full px-4 py-1.5 text-xs';
  const when = (d) => new Date(d).toLocaleString('en-KE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const KIND = { topup: 'Top-up', gift_sent: 'Gift sent', gift_received: 'Gift received', refund: 'Refund', adjust: 'Adjustment', cashout: 'Cash-out' };
  const num = (n) => Number(n || 0).toLocaleString('en-KE');
  const row = (l, r, sub) => `<div class="surface-card rounded-xl p-3 flex items-center justify-between gap-3"><div class="min-w-0"><p class="text-xs text-white truncate">${l}</p><p class="text-[10px] text-text-muted">${sub}</p></div><div class="text-xs shrink-0">${r}</div></div>`;

  async function nm(ids) {
    const need = [...new Set(ids)].filter((i) => i && !names[i]); if (!need.length) return;
    const { data } = await sb.from('profiles').select('id,display_name').in('id', need);
    (data || []).forEach((p) => (names[p.id] = p.display_name || 'Fan')); need.forEach((i) => (names[i] = names[i] || 'Fan'));
  }

  async function render() {
    const v = $('#view-wallet');
    if (!me()) { v.innerHTML = '<h2 class="font-display font-black text-2xl text-white mb-3">Wallet</h2><div class="surface-card rounded-2xl p-6 text-center"><p class="text-sm text-white mb-3">Sign in to see your wallet.</p><button data-go class="' + GOLD + '">Sign in</button></div>'; $('[data-go]', v).onclick = () => window.app.navigate('studio'); return; }
    const id = me().id;
    const [{ data: w }, { data: packs }] = await Promise.all([sb.from('wallets').select('balance,earned').eq('user_id', id).maybeSingle(), sb.from('coin_packages').select('id,coins,price_kes').order('coins')]);
    const bal = (w && w.balance) || 0, earned = (w && w.earned) || 0;
    v.innerHTML = `<h2 class="font-display font-black text-2xl text-white mb-3">Wallet</h2>
      <div class="grid grid-cols-2 gap-3 mb-4 max-w-xl">
        <div class="surface-card rounded-2xl p-4"><p class="text-[11px] text-text-muted">Coins</p><p class="font-display font-black text-3xl text-primary-gold">${num(bal)}</p><p class="text-[10px] text-text-muted">Spend on gifts</p></div>
        <div class="surface-card rounded-2xl p-4"><p class="text-[11px] text-text-muted">Earned</p><p class="font-display font-black text-3xl text-secondary-green">${num(earned)}</p><p class="text-[10px] text-text-muted">Cash out from 1,000</p></div>
      </div>
      <p class="text-sm font-bold text-white mb-2">Buy coins</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mb-1">${(packs || []).map((p) => `<button data-pack="${esc(p.id)}" class="surface-card rounded-xl p-3 text-left border border-white/10 hover:border-primary-gold/50"><span class="block font-display font-black text-lg text-white">${num(p.coins)}</span><span class="block text-[11px] text-text-muted">KES ${num(p.price_kes)}</span></button>`).join('')}</div>
      <p class="text-[11px] text-text-muted mb-5">M-Pesa top-ups open once payments are connected.</p>
      <div class="flex mb-3"><div class="flex gap-1 rounded-full bg-white/5 p-0.5">${[['activity', 'Activity'], ['gifts', 'Gifts'], ['cashouts', 'Cash-outs']].map(([k, l]) => `<button data-wtab="${k}" class="rounded-full px-3 py-1 text-xs font-semibold ${k === tab ? 'bg-primary-gold text-black' : 'text-text-muted'}">${l}</button>`).join('')}</div></div>
      <div id="zw-body" class="space-y-2 max-w-2xl"></div>`;
    v.querySelectorAll('[data-pack]').forEach((b) => (b.onclick = () => toast('M-Pesa top-ups open soon. Your coins will appear here once payments are connected.')));
    v.querySelectorAll('[data-wtab]').forEach((b) => (b.onclick = () => { tab = b.dataset.wtab; render(); }));
    const B = $('#zw-body');
    if (tab === 'activity') {
      const { data } = await sb.from('coin_ledger').select('id,bucket,delta,kind,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(40);
      B.innerHTML = (data || []).length ? data.map((r) => row(KIND[r.kind] || esc(r.kind), `<b class="${r.delta > 0 ? 'text-secondary-green' : 'text-white'}">${r.delta > 0 ? '+' : ''}${num(r.delta)}</b>`, when(r.created_at) + (r.bucket === 'earned' ? ' · earned' : ''))).join('') : '<p class="text-xs text-text-muted">No activity yet.</p>';
    } else if (tab === 'gifts') {
      const { data } = await sb.from('gift_transactions').select('sender_id,recipient_id,coins,artist_share,created_at,gifts(name,icon),media_items(title)').or(`sender_id.eq.${id},recipient_id.eq.${id}`).order('created_at', { ascending: false }).limit(40);
      const rows = data || []; await nm(rows.flatMap((r) => [r.sender_id, r.recipient_id]));
      B.innerHTML = rows.length ? rows.map((r) => { const sent = r.sender_id === id; const g = r.gifts || {}; return row(`${esc(g.icon || '🎁')} ${esc(g.name || 'Gift')} ${sent ? 'to' : 'from'} ${esc(names[sent ? r.recipient_id : r.sender_id])}`, sent ? `<b class="text-white">-${num(r.coins)}</b>` : `<b class="text-secondary-green">+${num(r.artist_share)}</b>`, esc((r.media_items && r.media_items.title) || 'a track') + ' · ' + when(r.created_at)); }).join('') : '<p class="text-xs text-text-muted">No gifts yet. Open a track and tap a gift.</p>';
    } else {
      const { data } = await sb.from('cashout_requests').select('coins,kes_amount,phone,status,note,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(20);
      B.innerHTML = `<div class="surface-card rounded-xl p-3"><p class="text-xs font-bold text-white mb-2">Request a cash-out</p>${earned >= 1000 ? `<div class="flex flex-wrap gap-2"><input id="zw-co" type="number" min="1000" max="${earned}" placeholder="Coins (1,000+)" class="w-32 ${IN}"/><input id="zw-ph" placeholder="2547XXXXXXXX" class="min-w-0 flex-1 ${IN}"/><button id="zw-go" class="${GOLD}">Request</button></div><p class="mt-2 text-[10px] text-text-muted">Payouts are reviewed by hand before being sent.</p>` : '<p class="text-[11px] text-text-muted">Cash-out opens at 1,000 earned coins.</p>'}</div>` +
        ((data || []).length ? data.map((r) => row(`${num(r.coins)} coins · KES ${num(r.kes_amount)}`, `<b class="${r.status === 'paid' ? 'text-secondary-green' : r.status === 'rejected' ? 'text-red-400' : 'text-text-muted'}">${esc(r.status)}</b>`, esc(r.phone) + ' · ' + when(r.created_at) + (r.note ? ' · ' + esc(r.note) : ''))).join('') : '');
      const go = $('#zw-go');
      if (go) go.onclick = async () => { const { error } = await sb.rpc('request_cashout', { p_coins: +$('#zw-co').value, p_phone: $('#zw-ph').value.trim() }); toast(error ? error.message : 'Request sent for review.'); render(); };
    }
  }

  function start() {
    Z = window.ZR; sb = Z.sb(); if (!$('#view-home')) return;
    $('#view-home').parentElement.insertAdjacentHTML('beforeend', '<section id="view-wallet" class="app-view hidden"></section>');
    document.querySelectorAll('a[onclick*="navigate(\'liked-songs\')"]').forEach((a) => {
      const c = a.cloneNode(true); c.setAttribute('onclick', a.getAttribute('onclick').replace('liked-songs', 'wallet')); if (c.dataset.view) c.dataset.view = 'wallet';
      const ic = c.querySelector('.material-symbols-outlined'); if (ic) ic.textContent = 'account_balance_wallet';
      [...c.childNodes].forEach((n) => { if (n !== ic) n.remove(); }); c.insertAdjacentHTML('beforeend', '<span>Wallet</span>'); a.insertAdjacentElement('afterend', c);
    });
    const tn = $('.topnav-btn');
    if (tn) { const c = tn.cloneNode(true); c.dataset.topnav = 'wallet'; c.setAttribute('onclick', "app.navigate('wallet')"); c.title = 'Wallet'; c.classList.remove('active'); c.classList.add('topnav-icon'); c.querySelector('.material-symbols-outlined').textContent = 'account_balance_wallet'; tn.parentElement.appendChild(c); }
    const go = window.app.navigate.bind(window.app);
    window.app.navigate = function (v) { const r = go.apply(null, arguments); if (v === 'wallet') render(); return r; };
    document.addEventListener('zr:auth', () => { names = {}; if (window.app.currentView === 'wallet') render(); });
  }
  if (window.ZR) start(); else document.addEventListener('zr:ready', start);
})();
