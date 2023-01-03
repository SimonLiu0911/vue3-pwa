// const cacheName = 'Vue3-PWA'

self.addEventListener('install', e => {
  console.log('[SW] install!', e)
  // e.waitUntil(
  //   caches.open(cacheName).then(cache => {
  //     return cache.addAll(['/', '/index.html', '/manifest.json'])
  //   })
  // )
})

self.addEventListener('fetch', event => {
  console.log('[SW] 抓資料(Fetch)!', event)
  // event.respondWith(
  //   caches
  //     .open(cacheName)
  //     .then(cache => cache.match(event.request, { ignoreSearch: true }))
  //     .then(response => {
  //       return response || fetch(event.request)
  //     })
  // )
})
