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
    <section className="Layout-Container">
      <AppBarWrapper position="static">
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
            <div className="Layout-Appbar-Actions">
              {actions}
              {/* For furter use
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              */}
            </div>
          )}
        </Toolbar>
      </AppBarWrapper>

      <section className="Layout-Main">{children}</section>
    </section>
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
