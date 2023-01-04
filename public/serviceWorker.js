const CACHE_STATIC_NAME = 'static-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const cacheFiles = [
  '/',
  '/index.html',
  '/manifest.json',
  'offline.html'
]

self.addEventListener('install', e => {
  console.log('[SW] install!')

  e.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(cache => {
        cache.addAll(cacheFiles)
      })
  )
})

self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(keyList.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key)
          }
          return caches.delete(key)
        })
        )
      })
  )
})

self.addEventListener('fetch', event => {
  // 解決: Failed to execute 'put' on 'Cache': Request scheme 'chrome-extension' is unsupported(https://github.com/iamshaunjp/pwa-tutorial/issues/1)
  if (!(event.request.url.indexOf('http') === 0)) return

  console.log('[SW] fetch!')

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        } else {
          return fetch(event.request)
            .then(res => {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(cache => {
                  cache.put(event.request.url, res.clone())
                  return res
                })
            })
            .catch(err => {
              console.log(err)

              return caches.open(CACHE_DYNAMIC_NAME)
                .then(cache => {
                  return cache.match('/offline.html')
                })
            })
        }
      })
  )
})
