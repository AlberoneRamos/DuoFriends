import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            50: '#e3e3e4',
            100: '#b9b9bb',
            200: '#8a8b8e',
            300: '#5b5c61',
            400: '#38393f',
            500: '#15161d',
            600: '#12131a',
            700: '#0f1015',
            800: '#0c0c11',
            900: '#06060a',
            A100: '#5050ff',
            A200: '#ef5350',
            A400: '#0000e9',
            A700: '#0000d0',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
              '50',
              '100',
              '200'
            ],
            'contrastLightColors': [
              '300',
              '400',
              '500',
              '600',
              '700',
              '800',
              '900',
              'A100',
              'A200',
              'A400',
              'A700'
            ]
        },
        primary: {
            50: '#e1f8f4',
            100: '#b4eee3',
            200: '#82e3d1',
            300: '#50d8bf',
            400: '#2bcfb1',
            500: '#05c7a3',
            600: '#04c19b',
            700: '#04ba91',
            800: '#03b388',
            900: '#01a677',
            A100: '#d0fff0',
            A200: '#9dffdf',
            A400: '#6affce',
            A700: '#51ffc6',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
              '50',
              '100',
              '200',
              '300',
              '400',
              '500',
              '600',
              'A100',
              'A200',
              'A400',
              'A700'
            ],
            'contrastLightColors': [
              '700',
              '800',
              '900'
            ]
        }
    }
});


export default theme;