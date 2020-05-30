/* eslint-disable no-console */
/* global fetch self caches clients MessageChannel */

const pipe = (...fns) => arg =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

let isOnline = true
const CACHE_NAME = 'DEV'
const getFetchOptions = {
  method: 'GET',
  cache: 'no-cache',
  credentials: 'omit'
}

async function fromCache(request) {
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(request)

  return response
}

async function updateCacheAndReturn(request) {
  const cache = await caches.open(CACHE_NAME)
  const res = await fetch(request, getFetchOptions)

  await cache.put(request, res.clone())
  return res
}

const STRATEGIES = {
  use: (pattern, strategy) => evt => {
    if (evt.request.url.match(pattern)) return strategy(evt)
    return evt
  },
  networkOnly: () => async evt => {
    const response = await fetch(evt.request, getFetchOptions)
    return response
  },
  cacheAndUpdate: async evt => {
    const cachedResponse = await fromCache(evt.request)

    if (cachedResponse) {
      evt.waitUntil(updateCacheAndReturn(evt.request))
      return cachedResponse
    } else {
      return updateCacheAndReturn(evt.request)
    }
  }
}

async function sendMessage(msg) {
  var allClients = await clients.matchAll({includeUncontrolled: true})
  await Promise.all(
    allClients.map(function sendTo(client) {
      var chan = new MessageChannel()
      chan.port1.onmessage = onMessage
      return client.postMessage(msg, [chan.port2])
    })
  )
}

function onInstall(evt) {
  console.log('SW onInstall')
  self.skipWaiting()
  evt.waitUntil(
    fetch('/asset-manifest.json', getFetchOptions)
      .then(resp => resp.json())
      .then(manifest => {
        caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(Object.values(manifest))
        })
      })
      .then(() => {
        console.log('SW installed!!!')
      })
  )
}

async function onActivate() {
  console.log('SW onActivate')
  const cacheNames = await caches.keys()
  const oldCacheNames = cacheNames.filter(name => CACHE_NAME !== name)
  await Promise.all(
    oldCacheNames.map(cacheName => {
      return caches.delete(cacheName)
    })
  )
  await clients.claim()
}

function onMessage(evt) {
  const {type, payload} = evt.data

  switch (type) {
    case 'connectivity': {
      isOnline = payload.isOnline
      break
    }
    case 'cache_version': {
      sendMessage({type: 'cache_version', payload: {cacheName: CACHE_NAME}})
      break
    }
  }
  console.log('ahora estamos', isOnline)
}

function onFetch(evt) {
  // To allow use different strategies for different paths
  async function doRequest(evt) {
    const {use, cacheAndUpdate} = STRATEGIES
    return pipe(use(self.location.hostname, cacheAndUpdate))(evt)
  }

  evt.respondWith(doRequest(evt))
}

self.addEventListener('install', onInstall)
self.addEventListener('activate', onActivate)
self.addEventListener('message', onMessage)
self.addEventListener('fetch', onFetch)

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
// self.addEventListener('fetch', async event => {
//   // Skip cross-origin requests, like those for Google Analytics.
//   if (event.request.url.match(self.location.hostname)) {
//     event.respondWith(
//       caches.match(event.request).then(cachedResponse => {
//         if (cachedResponse) {
//           if (isOnline) event.waitUntil(updateCacheAndReturn(event.request))
//           return cachedResponse
//         }
//
//         return caches.open(CACHE_NAME).then(cache => {
//           return fetch(event.request).then(response => {
//             // Put a copy of the response in the runtime cache.
//             return cache.put(event.request, response.clone()).then(() => {
//               return response
//             })
//           })
//         })
//       })
//     )
//   }
// })
