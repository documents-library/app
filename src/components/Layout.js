import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withTheme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

export default function Layout({
  title,
  onGoBack,
  actions,
  children,
  elvateOnScroll = false,
  background
}) {
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
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Typography variant="h6" noWrap>
                {title}
              </Typography>

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
      console.log(props)
      return props.background ? props.background : 'transparent'
    }};
  }
`
