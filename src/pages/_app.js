import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = {
  colors: {
    primary: 'blue'
  }
}

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
        `}</style>
      </ThemeProvider>
    )
  }
}
