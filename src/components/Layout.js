import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withTheme } from '@material-ui/core/styles'

export default function Layout({ title, onGoBack, actions, children }) {
  return (
    <LayoutWrapper>
      <>
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

            {actions && <div className="Layout-Appbar-Actions">{actions}</div>}
          </Toolbar>
        </AppBarWrapper>
        <AppBarOffset />
      </>

      <section className="Layout-Main">{children}</section>
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  onGoBack: PropTypes.func,
  actions: PropTypes.node,
  children: PropTypes.node
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
