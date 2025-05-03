self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('khadbill-cache').then(cache => {
      return cache.addAll([
        'khadbill.html',
        'style.css',     // Agar CSS file use ki gayi ho
        'script.js',     // Agar external JS use ho
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
