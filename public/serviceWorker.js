const cacheName = 'Vue3-PWA'
const cacheFiles = [
  '/',
  '/index.html',
  '/manifest.json'
]

self.addEventListener('install', e => {
  console.log('[SW] install!')
  e.waitUntil(
    caches.open(cacheName)
      // .then(cache => {
      //   cache.delete()
      // })
      .then(cache => {
        return cache.addAll(cacheFiles)
      })
      .then(cache => {
        cache.keys().then(keys => {
          keys.forEach((request, index, array) => {
            cache.delete(request)
          })
        })
      })
  )
})

self.addEventListener('activate', event => {
  // caches.open(cacheName)
  //   .then(cache => {
  //     cache.keys().then(keys => {
  //       keys.forEach((request, index, array) => {
  //         cache.delete(request)
  //       })
  //     })
  //   })
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        console.log(0)
        // 抓不到會拿到 null
        if (response) {
          console.log(1, response)
          return response
        } else {
          console.log(2)
          return fetch(event.request)
            .then(function (res) {
              caches.open('dynamic')
                .then(function (cache) {
                  cache.put(event.request.url, res.clone())
                  return res
                })
            })
        }
      })
  )
  // event.respondWith(
  //   fetch('http://httpbin.org/ip')
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .then(function (data) {
  //       console.log(data)
  //     })
  // )
  // event.respondWith(
  //   caches
  //     .open(cacheName)
  //     .then(cache => cache.match(event.request, { ignoreSearch: true }))
  //     .then(response => {
  //       return response || fetch(event.request)
  //     })
  // )
})
