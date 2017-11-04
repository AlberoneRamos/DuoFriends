import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './store';
import './styles/main.scss';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import * as actions from './actions';
import theme from './styles/theme.js';


Store.dispatch(actions.getUsers());
ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);