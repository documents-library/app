/* eslint-disable no-console */
/* global fetch self caches Response clients MessageChannel */

const pipe = (...fns) => arg =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

let isOnline = true
const TTL_CACHE = new Map()
const CACHE_NAME = 'DEV'

const getFetchOptions = {
  method: 'GET',
  cache: 'no-cache',
  credentials: 'omit'
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
  TTL_CACHE.clear()
}

const STRATEGIES = {
  identity: () => async evt => evt,
  use: (pattern, strategy) => evt => {
    if (evt instanceof Response) return evt
    if (evt.request.url.match(pattern)) return strategy(evt)
    return evt
  },
  networkOnly: () => async evt => {
    return fetch(evt.request, getFetchOptions)
  },
  cacheFirst: ({ttl} = {ttl: 0}) => async evt => {
    const now = Date.now()
    const cache = await caches.open(CACHE_NAME)
    const response = await cache.match(evt.request)
    const timestamp = TTL_CACHE.get(evt.request.url) || now
    const index = await cache.match('index.html')

    // TTL no ha exprirado
    if (response !== undefined && now - timestamp < ttl) {
      return response
    }

    try {
      const res = await fetch(evt.request, getFetchOptions)
      const resCloned = res.clone()

      if (resCloned.ok) {
        TTL_CACHE.set(evt.request.url, Date.now())
        cache.put(evt.request, resCloned)
      }

      return res
    } catch (e) {
      if (!isOnline && response) return response
      if (
        !isOnline &&
        !response &&
        index &&
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        !evt.request.url.match(new RegExp('/[^/?]+\\.[^/]+$'))
      )
        return index

      return new Response(`Ooops, service worker is failing here!! ${e}`, {
        status: 404
      })
    }
  }
}

function onFetch(evt) {
  async function doRequest(evt) {
    const {use, cacheFirst, networkOnly} = STRATEGIES

    const response = pipe(
      use(/chrome-extension/, networkOnly()),
      use(/\/sites/, networkOnly()),
      use(/\/folders/, networkOnly()),
      use(/\/files/, networkOnly()),
      use(/.*/, cacheFirst({ttl: Infinity}))
    )(evt)

    return response
  }
  evt.respondWith(doRequest(evt))
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

self.addEventListener('install', onInstall)
self.addEventListener('activate', onActivate)
self.addEventListener('message', onMessage)
self.addEventListener('fetch', onFetch)
