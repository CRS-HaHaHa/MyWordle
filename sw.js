const VERSION = 'v1.0.6';
const CACHE_NAME = `MyWordle-cache-${VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './words_data.js',
  './manifest.json',
  './MyWordle.png',
  './Flags/it.png',
  './Flags/en.png',
  './Flags/fr.png',
  './Flags/es.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // HTML → network first (evita versioni vecchie)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // altri file → cache first
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});



