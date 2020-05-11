import '@s-ui/polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import Context from '@s-ui/react-context'

import Router from '@s-ui/react-router/lib/Router'
import match from '@s-ui/react-router/lib/match'
import browserHistory from '@s-ui/react-router/lib/browserHistory'
import routes from './routes'

import contextFactory from './contextFactory'
import createClientContextFactoryParams from '@s-ui/react-initial-props/lib/createClientContextFactoryParams'
import {HeadProvider} from '@s-ui/react-head'

async function run() {
  const context = await contextFactory(createClientContextFactoryParams())

  match(
    {routes, history: browserHistory},
    (err, redirectLocation, renderProps) => {
      if (err) {
        return console.error(err) // eslint-disable-line no-console
      }

      if (redirectLocation) {
        return (window.location.href = redirectLocation.pathname)
      }

      ReactDOM.render(
        <Context.Provider value={context}>
          <HeadProvider>
            <Router {...renderProps} />
          </HeadProvider>
        </Context.Provider>,
        document.getElementById('app')
      )
    }
  )
}

// let svcWorker

// document.addEventListener('DOMContentLoaded', run)
//
// function onMessage(msg) {
//   const {type, payload} = msg.data
//   switch (type) {
//     case 'cache_version': {
//       window.documentsLi = {cacheName: payload.cacheName}
//       run()
//       window.console.log('Current cache version', payload.cacheName)
//       break
//     }
//   }
// }
//
// function onConnectivity() {
//   svcWorker.postMessage({
//     type: 'connectivity',
//     payload: {online: navigator.onLine}
//   })
//   run()
// }
//
// async function initSW() {
//   await navigator.serviceWorker.register('/service-worker.js')
//
//   navigator.serviceWorker.addEventListener('controllerchange', async () => {
//     svcWorker = navigator.serviceWorker.controller
//
//     navigator.serviceWorker.addEventListener('message', onMessage)
//     svcWorker.postMessage({type: 'cache_version'})
//     window.addEventListener('online', onConnectivity)
//     window.addEventListener('offline', onConnectivity)
//   })
// }
//
// // Init SW
// 'serviceWorker' in window.navigator && initSW()

// --------------------------------------------------------------------------------------

let isOnline = 'onLine' in navigator && navigator.onLine
const usingSW = 'serviceWorker' in navigator
let swRegistration
let svcworker

if (usingSW) {
  initServiceWorker().catch(console.error) // eslint-disable-line
}

document.addEventListener('DOMContentLoaded', ready, false)

function ready() {
  run()

  window.addEventListener(
    'online',
    function online() {
      isOnline = true
      sendStatusUpdate()
      run()
    },
    false
  )
  window.addEventListener(
    'offline',
    function offline() {
      isOnline = false
      sendStatusUpdate()
      run()
    },
    false
  )
}

async function initServiceWorker() {
  swRegistration = await navigator.serviceWorker.register(
    '/service-worker.js',
    {updateViaCache: 'none'}
  )

  svcworker =
    swRegistration.installing || swRegistration.waiting || swRegistration.active
  sendStatusUpdate(svcworker, 'cache_version')

  // listen for new service worker to take over
  navigator.serviceWorker.addEventListener('controllerchange', async () => {
    svcworker = navigator.serviceWorker.controller
    sendStatusUpdate(svcworker)
  })

  navigator.serviceWorker.addEventListener('message', onSWMessage, false)
}

function onSWMessage(evt) {
  var {data} = evt
  if (data.statusUpdateRequest) {
    console.log('Status update requested from service worker, responding...') // eslint-disable-line
    sendStatusUpdate(evt.ports && evt.ports[0])
  } else if (data === 'force-logout') {
    sendStatusUpdate()
  }

  switch (data.type) {
    case 'cache_version': {
      // share cacheName with app
      window.documentsLi = {cacheName: data.payload.cacheName}
      window.console.log('Current cache version', data.payload.cacheName)
      break
    }
  }
}

function sendStatusUpdate(target, type = 'connectivity') {
  sendSWMessage({type, payload: {isOnline}}, target)
}

function sendSWMessage(msg, target) {
  if (target) {
    target.postMessage(msg)
  } else if (svcworker) {
    svcworker.postMessage(msg)
  } else if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(msg)
  }
}
