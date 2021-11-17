import { createTheme } from '@mui/material/styles'
import { orange, teal, brown, grey } from '@mui/material/colors'

//https://material-ui.com/customization/default-theme/#default-theme
//https://material-ui.com/customization/color/#color
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: orange[400],
    },
    secondary: {
      main: teal[900],
    },
    text: {
      primary: brown[900],
    },
    background: {
      default: '#eee6d2',
      paper: '#f8f4ef',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontSize: '4em',
      '@media (max-width:600px)': {
        fontSize: '3em',
      },
      fontFamily: '"Libre Caslon Text", serif',
    },
    h2: {
      fontSize: '3.5em',
      fontFamily: '"Libre Caslon Text", serif',
    },
    h3: {
      fontSize: '3em',
      fontFamily: '"Libre Caslon Text", serif',
    },
    h4: {
      fontFamily: '"Libre Caslon Text", serif',
    },
    h5: {
      fontFamily: '"Libre Caslon Text", serif',
    },
    h6: {
      fontSize: '1.25em',
      fontFamily: '"Libre Caslon Text", serif',
    },
    subtitle1: {
      fontSize: '1.25em',
      color: grey[700],
    },
  },
})

export default theme
