import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  palette: {
    primary: {
      light: '#E1987B',
      main: '#FF5764',
      dark: '#cf3240'
    },
    secondary: {
      light: '#FFEAAA',
      main: '#DCC072',
      dark: '#5E4500'
    },
    background: {
      default: '#F3F3F3'
    }
  },
  overrides: {
    MuiTypography: {
      h3: {
        fontWeight: 300,
        [breakpoints.down('xs')]: {
          fontSize: 25
        }
      }
    }
  }
});

export default theme;
