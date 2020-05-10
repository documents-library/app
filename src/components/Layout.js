import React from 'react'
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

import {capitalizeFirstLetter} from '../helpers/format'
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
  const defaultTitle = 'Documents Library'
  const defaultDescription = 'Librería de documentos'

  return (
    <>
      <Head>
        <title>{meta.title || defaultTitle}</title>
        <meta
          name="description"
          content={meta.description || defaultDescription}
        />
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
