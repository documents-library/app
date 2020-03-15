import App from 'next/app'
import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {theme} from '../helpers/theme'

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />

        <style global jsx>{`
          html,
          body,
          #__next {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            min-height: 100vh;
          }

          @import url('https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700,700i&display=swap');
          @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        `}</style>
      </ThemeProvider>
    )
  }
}
