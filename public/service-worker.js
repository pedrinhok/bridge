const CACHE_VERSION = "cache-v1"

const CACHE_RESOURCES = ["index.html", "bundle.js"]

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CACHE_RESOURCES))
  )
})

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then((caches) => {
        return caches.filter((cache) => cache != CACHE_VERSION)
      })
      .then((caches) => {
        return Promise.all(caches.map((cache) => caches.delete(cache)))
      })
  )
})

self.addEventListener("fetch", event => {
  // return any request other than GET
  if (event.request.method !== "GET") {
    return
  }
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        const request = event.request.clone()
        const fetched = fetch(request)
          .then((response) => {
            // return bad response
            if (badResponse(response)) {
              return response
            }
            // cache and return response
            const cacheResponse = response.clone()
            caches.open(CACHE_VERSION)
              .then((cache) => cache.put(event.request, cacheResponse))
            return response
          })
          .catch(response => response)
        // return cached or fetched response
        return cached || fetched
      })
  )
})

function badResponse(response) {
  return !response || response.status !== 200
}
