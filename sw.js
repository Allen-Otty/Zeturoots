// ZetuRoots PWA Service Worker v1.5.0
const CACHE_NAME = 'zeturoots-v1.5.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './zr-cloud.js',
  './manifest.webmanifest',
  './assets/logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install Event: Cache Core Static Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ZetuRoots SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clear Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ZetuRoots SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First for Shell, Network-First for API/Data
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  // Media / Audio files: Cache if available or stream and cache
  if (request.destination === 'audio' || url.pathname.endsWith('.mp3') || url.pathname.endsWith('.wav')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return new Response(null, { status: 404, statusText: 'Offline Audio Not Cached' });
          });
        });
      })
    );
    return;
  }

  // Static Assets & Shell: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Return offline fallback if network fails
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
