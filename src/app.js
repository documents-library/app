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
        return console.error(err)
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
  window.console.log('Client', type, payload)
}

function onConnectivity() {
  navigator.serviceWorker.controller.postMessage({
    type: 'connectivity',
    payload: {online: navigator.onLine}
  })
}

if ('serviceWorker' in window.navigator) {
  navigator.serviceWorker.register('service-worker.js')
  navigator.serviceWorker.ready.then(worker => {
    navigator.serviceWorker.addEventListener('message', onMessage)

    window.addEventListener('online', onConnectivity)
    window.addEventListener('offline', onConnectivity)
  })
}
