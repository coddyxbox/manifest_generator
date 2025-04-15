const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/com_project/',
  '/com_project/index.html',
  '/com_project/index.css',
  '/com_project/index.js',
  '/com_project/manifest.json',
  '/com_project/icon-192.png',
  '/com_project/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
