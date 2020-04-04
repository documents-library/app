import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import {withTheme} from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Head from '@s-ui/react-head'
import Skeleton from '@material-ui/lab/Skeleton'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'

import {capitalizeFirstLetter} from '../helpers/format'
import {DOMAIN} from '../helpers/constants'
import {theme} from '../helpers/theme'
import Link from './Link'

const AppBarWrapper = withTheme(styled(AppBar)`
  .Layout-Appbar-MenuButton {
    margin-right: ${({theme}) => theme.spacing(2)};
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
    ${({theme}) => theme.mixins.toolbar}
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

  a {
    text-decoration: none;
    color: ${theme.palette.text.primary};
  }
`

const H6 = styled(Skeleton)`
  ${theme.typography.h6}
`

const BackButton = styled(IconButton)`
  &.Layout-Appbar-MenuButton {
    ${props => (props.disabled ? 'opacity: .5;' : '')}
    color: white;
  }
`

export default function Layout({
  title,
  goBackTo,
  actions,
  children,
  elvateOnScroll = false,
  background,
  meta = {}
}) {
  const {router} = useContext(RRContext)
  const asPath = router.location.pathname
  const url = `${DOMAIN} ${asPath} `
  const defaultTitle = 'Documents Librería'
  const description = 'Librería de documentos'
  const siteName = 'documents.li'
  const image = 'https://documents.li/img/favicon/documentsLi-ogImage.png'
  const ogType = 'website'
  const twitterCard = 'summary'

  return (
    <>
      <Head>
        <meta name="application-name" content="documents.li" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="documents.li" />
        <meta name="description" content={meta.description || description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#455a64" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#546e7a" />
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
                {goBackTo && (
                  <Link to={{pathname: goBackTo}}>
                    <BackButton
                      edge="start"
                      className="Layout-Appbar-MenuButton"
                      color="inherit"
                      aria-label="go back"
                    >
                      <Icon>arrow_back</Icon>
                    </BackButton>
                  </Link>
                )}
                {title ? (
                  <Typography variant="h6" noWrap>
                    {capitalizeFirstLetter(title)}
                  </Typography>
                ) : (
                  <H6 animation="wave" width={200} />
                )}

                <div className="Layout-Appbar-Grow" />

                {actions && (
                  <div className="Layout-Appbar-Actions">{actions}</div>
                )}
              </Toolbar>
            </AppBarWrapper>
          </ElevationScroll>
          <AppBarOffset />
        </>

        <section className="Layout-Main">{children}</section>
      </LayoutWrapper>
    </>
  )
}

function ElevationScroll({children, elvateOnScroll}) {
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

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  elvateOnScroll: PropTypes.bool
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  goBackTo: PropTypes.func,
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
