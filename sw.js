/* Remove caches and registrations left by the previous Chirpy PWA. */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      await self.clients.claim();

      const windows = await self.clients.matchAll({ type: "window" });
      await self.registration.unregister();
      await Promise.all(windows.map((windowClient) => windowClient.navigate(windowClient.url)));
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
