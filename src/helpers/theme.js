import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// const createTheme = createMuiTheme({
//   primary: { main: '#546E7A' },
//   themeName: 'DocumentsLi'
// })
// export const theme = responsiveFontSizes(createTheme)
// console.log(theme)

// src/ui/theme/index.js

// import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#546e7a' },
  background: {
    default: '#ECEFF1'
  }
}
const themeName = 'Cutty Sark Razzmatazz Antelope'

export const theme = responsiveFontSizes(createMuiTheme({ palette, themeName }))
