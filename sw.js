const VERSION = 'v1.1.04';
const CACHE_NAME = `MyWordle-cache-${VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './words_data.js',
  './manifest.json',
  './Imgs/MyWordle.png',
  './Imgs/MyWordle_thumbnail.jpg',
  './Imgs/favicon.ico',
  './Imgs/Google-icon.png',
  './Flags/it.png',
  './Flags/gb.png',
  './Flags/fr.png',
  './Flags/es.png',
  './Music/background-music.mp3',
  './Avatar/1.png',
  './Avatar/2.png',
  './Avatar/3.png',
  './Avatar/4.png',
  './Avatar/5.png',
  './Avatar/6.png',
  './Avatar/7.png',
  './Avatar/8.png',
  './Avatar/9.png',
  './Avatar/10.png',
  './Avatar/11.png',
  './Avatar/12.png',
  './Avatar/13.png',
  './Avatar/14.png',
  './Avatar/15.png',
  './Avatar/16.png',
  './Avatar/17.png',
  './Avatar/18.png',
  './Avatar/19.png',
  './Avatar/20.png',
  './Avatar/21.png',
  './Avatar/22.png',
  './Avatar/23.png',
  './Avatar/24.png',
  './Avatar/25.png',
  './Avatar/26.png',
  './Avatar/27.png',
  './Avatar/28.png',
  './Avatar/29.png',
  './Avatar/30.png',
  './Avatar/31.png',
  './Avatar/32.png',
  './Avatar/33.png',
  './Avatar/34.png',
  './Avatar/35.png',
  './Avatar/36.png',
  './Avatar/40.png',
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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Forza il controllo immediato dei client
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // HTML → network first (evita versioni vecchie)
  if (e.request.url.includes('generate_204')) {
        return; 
    }
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
