const CACHE_NAME = 'MyWordle-v1';
const ASSETS = [
  './',
  './index.html',
  './words_data.js',
  './manifest.json'
];

// Installa il service worker e salva i file in cache
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// Risponde anche se sei offline
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});