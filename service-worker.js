const CACHE_NAME = "khadbill-cache-v1";
const urlsToCache = [
  "/khadbill/khadbill.html",
  "/khadbill/style.css",
  "/khadbill/script.js",
  "/khadbill/icon-192.png",
  "/khadbill/icon-512.png"
];

// Install event: Cache necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve files from cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;  // Return from cache
      }
      return fetch(event.request);  // Else fetch from network
    })
  );
});
