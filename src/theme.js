import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { BRAND_COLOR } from './Constants/Constants'
// To be able to use breakpoints helper
const theme = createMuiTheme()

export const themeObject = {
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: BRAND_COLOR,
        height: '0.3rem',
        borderRadius: '0.2rem'
      }
    },

    MuiTab: {
      root: {
        textTransform: 'capitalize',
        fontSize: '16px',
        width: 'auto !important',
        padding: '0 0.5rem',
        fontWeight: '400'
      }
    }
    // MuiDialog: {
    //   paper: { minWidth: "50rem" },
    // },
  }
}

const compiledTheme = createMuiTheme(themeObject)

export default compiledTheme
