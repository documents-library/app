import '@s-ui/polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import Context from '@s-ui/react-context'
import {HeadProvider} from '@s-ui/react-head'

import Router from '@s-ui/react-router/lib/Router'
import match from '@s-ui/react-router/lib/match'
import browserHistory from '@s-ui/react-router/lib/browserHistory'
import routes from './routes'

import {createGlobalStyle} from 'styled-components'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import contextFactory from './contextFactory'

import {theme} from './helpers/theme'

const GlobalStyles = createGlobalStyle`
  html,
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    min-height: 100vh;
  }

  #app {
    flex-grow: 1;
    display: flex;
  }

  @import url('https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700,700i&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Context.Provider value={context}>
            <HeadProvider>
              <React.StrictMode>
                <Router {...renderProps} />
              </React.StrictMode>
            </HeadProvider>
          </Context.Provider>
        </ThemeProvider>,
        document.getElementById('app')
      )
    }
  )
}

document.addEventListener('DOMContentLoaded', run)
