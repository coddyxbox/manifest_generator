const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/manifest_generator/',
  '/manifest_generator/index.html',
  '/manifest_generator/index.css',
  '/manifest_generator/index.js',
  '/manifest_generator/manifest.json',
  '/manifest_generator/icon-192.png',
  '/manifest_generator/icon-512.png'
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
