import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'

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
        <Component {...pageProps} />

        <style global jsx>{`
          body {
            margin: 0;
          }
        `}</style>
      </ThemeProvider>
    )
  }
}
