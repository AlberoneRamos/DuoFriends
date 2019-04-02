import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './store';
import './styles/main.scss';
import { MuiThemeProvider } from 'material-ui/styles';
import * as actions from './actions';
import {firebaseAuth, firebaseRef, storageKey} from './firebase';
import theme from './styles/theme.js';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();   

firebaseAuth.onAuthStateChanged((user)=>{
    if(user){
        localStorage.setItem(storageKey, user.uid);
        firebaseRef.child(`users/${user.uid}/requests`).on('value', data => {
            Store.dispatch(actions.addRequests(data.val()));
        });
        Store.dispatch(actions.login(user.uid));
        Store.dispatch(actions.getAvailabilities());
        history.push('/players');
    } else{
        localStorage.removeItem(storageKey);
        Store.dispatch(actions.logout());
        Store.dispatch(actions.addRequests([]));
        if(history.location.pathname !== '/signup')
            history.push('/');
    }
});


ReactDOM.render(
    <Provider store={Store}>
        <Router history={history} basename={process.env.PUBLIC_URL}>
            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('app')
);