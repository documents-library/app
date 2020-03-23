import '@s-ui/polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import Context from '@s-ui/react-context'

import Router from '@s-ui/react-router/lib/Router'
import match from '@s-ui/react-router/lib/match'
import browserHistory from '@s-ui/react-router/lib/browserHistory'
import routes from './routes'

import contextFactory from './contextFactory'
import {HeadProvider} from '@s-ui/react-head'

async function run() {
  const context = await contextFactory()

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

document.addEventListener('DOMContentLoaded', run)

function onMessage(msg) {
  const {type, payload} = msg.data
  switch (type) {
    case 'cache_version': {
      window.console.log('Current cache version', payload.cacheName)
      break
    }
  }
}

function onConnectivity() {
  navigator.serviceWorker.controller.postMessage({
    type: 'connectivity',
    payload: {online: navigator.onLine}
  })
}

if ('serviceWorker' in window.navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  navigator.serviceWorker.ready.then(() => {
    navigator.serviceWorker.addEventListener('message', onMessage)

    navigator.serviceWorker.controller?.postMessage({type: 'cache_version'}) // eslint-disable-line

    window.addEventListener('online', onConnectivity)
    window.addEventListener('offline', onConnectivity)
  })
}
