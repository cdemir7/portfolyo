const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `portfolio-static-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './other/profile.webp',
    './other/profile.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key.startsWith('portfolio-static-') && key !== STATIC_CACHE)
                .map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                const url = new URL(request.url);
                if (url.origin === self.location.origin) {
                    const responseToCache = networkResponse.clone();
                    caches.open(STATIC_CACHE).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                }

                return networkResponse;
            });
        })
    );
});
