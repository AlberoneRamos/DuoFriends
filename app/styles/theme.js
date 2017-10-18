import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            contrastDefaultColor:'light',
            50: '#e4e4e4',
            100: '#bbbbbb',
            200: '#8e8e8e',
            300: '#606060',
            400: '#3e3e3e',
            500: '#1c1c1c',
            600: '#191919',
            700: '#141414',
            800: '#111111',
            900: '#090909',
            A100: '#e07171',
            A200: '#d74747',
            A400: '#eb0000',
            A700: '#212121'
        },
        MuiButton:{
            root: {
                color: '#2ec4b6'
              }
        },
        primary: {
            50: '#e6f8f6',
            100: '#c0ede9',
            200: '#97e2db',
            300: '#6dd6cc',
            400: '#4dcdc1',
            500: '#2ec4b6',
            600: '#29beaf',
            700: '#23b6a6',
            800: '#1daf9e',
            900: '#12a28e',
            A100: '#d3fff8',
            A200: '#a0fff1',
            A400: '#6dffe9',
            A700: '#53ffe6',
            contrastDefaultColor: 'light',
        },
        background: {
            default: "#1c1c1c"
          }
    }
});


export default theme;