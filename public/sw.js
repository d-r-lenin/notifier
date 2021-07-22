const cacheName = 'catch-v1';
const resourcesToPrecache = [
   '/',
   'index.html',
   'script.js',
   'img.png'
]

self.addEventListener('install', e => {
   e.waitUntil(
      caches.open(cacheName).then(cache =>{
         return cache.addAll(resourcesToPrecache);
      })
   );
})

self.addEventListener('fetch',event =>{
   event.respondWith(caches.match(event.request)
      .then(cachedResponse => {
         return cachedResponse || fetch(event.request);
      })
   );
})


self.addEventListener('push', event =>{
   const data=event.data.json();
   event.waitUntil(
      self.registration.showNotification(data.title,data)
   );
})
