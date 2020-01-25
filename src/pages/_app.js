import App from 'next/app'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from '../helpers/theme'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />

        <style global jsx>{`
          html,
          body,
          #__next {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          @import url('https://fonts.googleapis.com/css?family=Domine:400,700&display=swap');
        `}</style>
      </ThemeProvider>
    )
  }
}
