import React from 'react'
import PropTypes from 'prop-types'

import {createGlobalStyle} from 'styled-components'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {theme} from '../helpers/theme'

const GlobalStyles = createGlobalStyle`
  html,
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    min-height: 100vh;
  }

  #app {
    flex-grow: 1;
    display: flex;
  }
`

const MainFrame = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <React.StrictMode>{children}</React.StrictMode>
    </ThemeProvider>
  )
}

MainFrame.propTypes = {
  children: PropTypes.object
}

export default MainFrame
