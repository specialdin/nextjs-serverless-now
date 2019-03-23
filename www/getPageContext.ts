import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/styles';
import { ThemeProviderProps } from '@material-ui/styles/ThemeProvider';
import { SheetsRegistry, GenerateId } from 'jss';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

// A theme with custom primary and secondary color.
// It's optional.
const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif'
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
        [breakpoints.down("xs")]: {
          fontSize: 25
        }
      }
    }
  }
});

export interface PageContext extends ThemeProviderProps<Theme> {
  generateClassName: GenerateId;
  sheetsRegistry: SheetsRegistry;
  sheetsManager?: {};
}

function createPageContext(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    children: undefined
  };
}

let pageContext: PageContext;
export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
