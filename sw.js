const VERSION = 'v1.0.1'; // <--- Cambia questo numero per forzare l'aggiornamento!
const CACHE_NAME = `MyWordle-cache-${VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './words_data.js',
  './manifest.json',
  './MyWordle.png'
  // Aggiungi qui anche i tuoi file CSS o immagini se ne hai
];

// Installazione: scarica i nuovi file
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Forza il nuovo SW a diventare attivo subito
});

// Attivazione: pulisce le vecchie versioni della cache (ma non tocca i punti!)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  // Prende il controllo delle pagine aperte immediatamente
  self.clients.claim();
});

// Gestione richieste (funzionamento offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
