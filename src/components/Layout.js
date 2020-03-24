import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Router, { useRouter } from 'next/router'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { withTheme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import LinearProgress from '@material-ui/core/LinearProgress'
import Head from 'next/head'

import { capitalizeFirstLetter } from '../helpers/format'
import { DOMAIN } from '../helpers/constants'

const AppBarWrapper = withTheme(styled(AppBar)`
  .Layout-Appbar-MenuButton {
    margin-right: ${({ theme }) => theme.spacing(2)};
  }

  .Layout-Appbar-Actions {
    display: flex;
  }

  .Layout-Appbar-Grow {
    flex-grow: 1;
  }
`)

const AppBarOffset = withTheme(styled.div`
  & {
    ${({ theme }) => theme.mixins.toolbar}
  }
`)

const LayoutWrapper = styled.section`
  &,
  .Layout-Main {
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-start;
    background: ${props => {
      return props.background ? props.background : 'transparent'
    }};
  }
`
const LinearProgressWrapper = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    width: 100%;
    position: fixed;
    z-index: 99999;
    top: 0px;
  }
`
export default function Layout({
  title,
  onGoBack,
  actions,
  children,
  elvateOnScroll = false,
  background,
  meta = {}
}) {
  const { asPath } = useRouter()
  const pageLoading = useLoadingRoute()
  const url = `${DOMAIN}${asPath}`
  const defaultTitle = 'Documents Librería'
  const description = 'Librería de documentos'
  const siteName = 'documents.li'
  const image = 'https://documents.li/img/favicon/documentsLi-ogImage.png'
  const ogType = 'website'
  const twitterCard = 'summary'

  return (
    <>
      <Head>
        <meta name="twitter:card" content={meta.twitterCard || twitterCard} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={meta.title || defaultTitle} />
        <meta
          name="twitter:description"
          content={meta.description || description}
        />
        <meta name="twitter:image" content={meta.image || image} />
        <meta name="twitter:creator" content="@ggsalas" />
        <meta property="og:type" content={meta.ogType || ogType} />
        <meta property="og:title" content={meta.title || defaultTitle} />
        <meta
          property="og:description"
          content={meta.description || description}
        />
        <meta property="og:site_name" content={meta.siteName || siteName} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={meta.image || image} />
        <meta property="og:image:type" content="image/png" />

        {!meta.image && (
          <>
            <meta property="og:image:width" content="1080" />
            <meta property="og:image:height" content="1382" />
          </>
        )}
      </Head>

      <LayoutWrapper background={background}>
        <>
          <ElevationScroll elvateOnScroll={elvateOnScroll}>
            <AppBarWrapper position="fixed">
              <Toolbar>
                <BackButton onGoBack={onGoBack} />
                <Typography variant="h6" noWrap>
                  {capitalizeFirstLetter(title)}
                </Typography>

                <div className="Layout-Appbar-Grow" />

                {actions && (
                  <div className="Layout-Appbar-Actions">{actions}</div>
                )}
              </Toolbar>
            </AppBarWrapper>
          </ElevationScroll>
          <AppBarOffset />
          {pageLoading ? <LinearProgressWrapper color="primary" /> : null}
        </>

        <section className="Layout-Main">{children}</section>
      </LayoutWrapper>
    </>
  )
}

function ElevationScroll({ children, elvateOnScroll }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  function elevation() {
    if (!elvateOnScroll) return 4
    else if (trigger) return 4
    else return 0
  }

  return React.cloneElement(children, {
    elevation: elevation()
  })
}

function BackButton({ onGoBack }) {
  const [prevPage, setPrevPage] = useState()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(process.env.API_URL)
      // TODO: replace env var
      const domain =
        process.env.API_URL === 'http://localhost:8080'
          ? 'localhost:3010'
          : 'documents.li'
      const match = new RegExp(domain, 'g')
      console.log(match, document.referrer.match(match))
      const prevPage =
        document.referrer !== document.location.href &&
        document.referrer.match(match)
          ? document.referrer
          : null
      console.log(document.referrer)
      console.log(document.location.href)
      console.log('prevPage: ', prevPage)

      setPrevPage(prevPage)
    }
  }, [])

  if (onGoBack) {
    return (
      <IconButton
        edge="start"
        className="Layout-Appbar-MenuButton"
        color="inherit"
        aria-label="go back"
        onClick={prevPage ? router.back : onGoBack}
      >
        <Icon>arrow_back</Icon>
      </IconButton>
    )
  }

  return null
}

BackButton.propTypes = {
  onGoBack: PropTypes.func
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  elvateOnScroll: PropTypes.bool
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  onGoBack: PropTypes.func,
  actions: PropTypes.node,
  children: PropTypes.node,
  elvateOnScroll: PropTypes.bool,
  background: PropTypes.string,
  meta: PropTypes.shape({
    ogType: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    image: PropTypes.string
  })
}

function useLoadingRoute() {
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setPageLoading(true))
    Router.events.on('routeChangeComplete', () => setPageLoading(false))
    Router.events.on('routeChangeError', () => setPageLoading(false))
  }, [])

  return pageLoading
}
