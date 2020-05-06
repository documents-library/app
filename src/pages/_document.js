import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets as ServerStyleSheetsMaterialUI } from '@material-ui/core/styles'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const sheetUI = new ServerStyleSheetsMaterialUI()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => {
            sheet.collectStyles(<App {...props} />)
            return sheetUI.collect(<App {...props} />)
          }
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheetUI.getStyleElement()}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/img/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/img/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/img/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/img/favicon/safari-pinned-tab.svg"
            color="#546e7a"
          />
          <meta name="msapplication-TileColor" content="#ECEFF1" />
          <meta name="theme-color" content="#546e7a" />

          {/* For PWA */}
          <meta name="application-name" content="documents.li" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="documents.li" />
          <meta name="description" content="Documents Library" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* <meta name='msapplication-config' content='/static/icons/browserconfig.xml' /> */}
          <meta name="msapplication-TileColor" content="#455a64" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#546e7a" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <link rel="shortcut icon" href="/img/favicon/favicon.ico" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}