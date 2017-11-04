import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Route} from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import UserList from './UserList';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SingleUser from './SingleUser';
import { AnimatedSwitch } from 'react-router-transition';
import {withRouter} from 'react-router-dom';
import firebase from '../firebase';

export class App extends React.Component {
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.props.history.push('/home');
        } else{
            // Store.dispatch(actions.logOut());
            this.props.history.push('/');
        }
    });
  }

  render() {
    const currentPath = this.props.location.pathname;
    return (
      <div>
          <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }} 
          className="switch-wrapper" >
            <Route exact path='/' component={LogIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route path='/home' component={UserList}/>
            <Route path='/player/:id' component={SingleUser}/>
          </AnimatedSwitch>
          {currentPath == '/' || currentPath == '/signup' ? null : <BottomNavigation /> }
      </div>
        );
  }
}

export default withRouter(App);