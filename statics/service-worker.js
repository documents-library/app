/* eslint-disable no-console */
/* global fetch self caches Response */

const CACHE_NAME = 'v1'

function onInstall(evt) {
  console.log('SW onInstall')
  self.skipWaiting()
  evt.waitUntil(
    fetch('/asset-manifest.json')
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
function onActivate() {
  console.log('SW onActivate')
}
function onMessage() {}

function onFetch(evt) {
  async function doResponse(evt) {
    const response = await caches.match(evt.request)

    if (response !== undefined) {
      return response
    }

    try {
      const res = await fetch(evt.request)

      const clonedResponse = res.clone()

      const cache = await caches.open(CACHE_NAME)
      cache.put(evt.request, clonedResponse)

      return res
    } catch (e) {
      return new Response('Ooops, algo salió mal!!', {status: 404})
    }
  }
  evt.respondWith(doResponse(evt))
}

self.addEventListener('install', onInstall)
self.addEventListener('activate', onActivate)
self.addEventListener('message', onMessage)
self.addEventListener('fetch', onFetch)
