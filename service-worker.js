// Cache version
const CACHE_NAME = "khadbill-cache-v1";

// Cache me jo URLs humein store karne hain
const urlsToCache = [
  "/khadbill/khadbill.html",
  "/khadbill/style.css",
  "/khadbill/script.js",
  "/khadbill/icon-192.png",
  "/khadbill/icon-512.png"
];

// Service Worker install hone par cache karenge
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Service Worker activate hone par cache clear karenge (agar version badle)
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch request ke liye cache se file serve karenge agar available ho
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Agar cached response milta hai to wo return karenge
      if (cachedResponse) {
        console.log("Serving from cache: ", event.request.url);
        return cachedResponse;
      }

      // Agar cache me nahi hai to normal network request karenge
      return fetch(event.request);
    })
  );
});
