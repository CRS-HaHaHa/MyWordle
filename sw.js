const VERSION = 'v1.1.184';
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
    caches.open(CACHE_NAME).then(async (newCache) => {
      // 1. Apriamo la vecchia cache (se esiste)
      const allCacheNames = await caches.keys();
      const oldCacheName = allCacheNames.find(name => name !== CACHE_NAME);
      let oldCache = null;
      if (oldCacheName) oldCache = await caches.open(oldCacheName);

      // 2. Processiamo ogni asset in modo intelligente
      const promises = ASSETS.map(async (url) => {
        try {
          // Controlliamo se abbiamo già il file nella vecchia cache
          const cachedResponse = oldCache ? await oldCache.match(url) : null;

          if (cachedResponse) {
            // --- LOGICA INTELLIGENTE ---
            // Facciamo una richiesta "condizionale" al server.
            // Il browser userà l'header "If-Modified-Since" o "ETag" automaticamente
            // grazie all'opzione cache: 'no-cache'
            const networkResponse = await fetch(new Request(url, { cache: 'no-cache' }));

            if (networkResponse.ok) {
              // Se il server manda un file nuovo (200 OK), lo salviamo
              return newCache.put(url, networkResponse);
            } else {
              // Se il server dice "non è cambiato" (304), ricicliamo la vecchia cache
              return newCache.put(url, cachedResponse);
            }
          } else {
            // Se non è in cache (nuovo file in assoluto), scarichiamo normalmente
            const response = await fetch(new Request(url, { cache: 'reload' }));
            if (response.ok) return newCache.put(url, response);
          }
        } catch (err) {
          console.warn("Impossibile aggiornare l'asset, uso cache precedente se disponibile:", url);
          // In caso di errore (es: offline), proviamo a recuperare comunque dalla vecchia cache
          const fallback = oldCache ? await oldCache.match(url) : null;
          if (fallback) return newCache.put(url, fallback);
        }
      });

      return Promise.all(promises);
    })
  );
});

// --- ATTIVAZIONE E PULIZIA ---
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// --- GESTIONE FETCH ---
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  
  // Escludi Firebase/Google
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('firebase')) return;

  // Strategia per HTML: Network-first per essere sicuri di avere l'ultima versione
  if (e.request.url.includes('generate_204')) {
        return; 
    }
  if (e.request.mode === 'navigate') {
    e.respondWith(
      // Prova prima la cache: avvio istantaneo!
      caches.match('./index.html').then((cachedResponse) => {
        // Se è in cache, la diamo subito al browser
        if (cachedResponse) {
          return cachedResponse;
        }
        // Se non è in cache (prima volta assoluta), vai in rete
        return fetch(e.request);
      })
    );
    return;
  }

  // Per gli altri asset (immagini, js), usiamo la logica standard
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});