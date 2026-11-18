/* ZetuRoots UI safety net: loaded in <head> so it is listening before any image starts loading.
   - Broken or blocked images become a soft gold music tile instead of showing alt text.
   - Pages that fail to load show a retry bar instead of staying blank. */
(function () {
  var TILE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4E08A"/><stop offset="1" stop-color="#DEB74C"/></linearGradient></defs>' +
    '<rect width="120" height="120" fill="url(#g)"/>' +
    '<path d="M74 28v44.5a14 14 0 1 1-8-12.6V40l-22 5v32.5a14 14 0 1 1-8-12.6V36z" fill="#7A5A08" fill-opacity=".55"/></svg>'
  );

  function fallback(img) {
    if (!img || img.dataset.zrFb) return;
    img.dataset.zrFb = '1';
    img.alt = '';
    img.classList.add('zr-img-fallback');
    img.removeAttribute('srcset');
    img.src = TILE;
  }

  // Errors do not bubble, so listen in the capture phase.
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') fallback(e.target);
  }, true);

  // Images that already failed before this ran, and images added later.
  function sweep() {
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.complete && im.naturalWidth === 0 && im.getAttribute('src') && !im.dataset.zrFb) fallback(im);
    }
  }
  window.addEventListener('load', sweep);
  setTimeout(sweep, 4000);

  // Used by the page modules when a load fails.
  window.zrLoadError = function (viewId, retry) {
    var sec = document.getElementById('view-' + viewId);
    if (!sec) return;
    var old = sec.querySelector(':scope > .zr-load-error');
    if (old) old.remove();
    var bar = document.createElement('div');
    bar.className = 'zr-load-error';
    bar.setAttribute('role', 'alert');
    bar.innerHTML = '<span>Could not load this page. Check your connection.</span><button type="button">Retry</button>';
    bar.querySelector('button').onclick = function () { bar.remove(); retry(); };
    sec.insertBefore(bar, sec.firstChild);
  };
  window.zrLoadOk = function (viewId) {
    var sec = document.getElementById('view-' + viewId);
    var old = sec && sec.querySelector(':scope > .zr-load-error');
    if (old) old.remove();
  };
})();
