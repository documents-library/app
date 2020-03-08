import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { withTheme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import LinearProgress from '@material-ui/core/LinearProgress'

import { capitalizeFirstLetter } from '../helpers/format'

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
  background
}) {
  const pageLoading = useLoadingRoute()

  return (
    <LayoutWrapper background={background}>
      <>
        <ElevationScroll elvateOnScroll={elvateOnScroll}>
          <AppBarWrapper position="fixed">
            <Toolbar>
              {onGoBack && (
                <IconButton
                  edge="start"
                  className="Layout-Appbar-MenuButton"
                  color="inherit"
                  aria-label="go back"
                  onClick={onGoBack}
                >
                  <Icon>arrow_back</Icon>
                </IconButton>
              )}
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
  background: PropTypes.string
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
