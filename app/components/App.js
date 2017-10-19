import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Route} from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import UserList from './UserList';
import LogIn from './LogIn';
import SingleUser from './SingleUser';
import {withRouter} from 'react-router-dom';

export class App extends React.Component {

  render() {
    const currentPath = this.props.location.pathname;
    return (
      <div>
        <Route exact path='/' component={LogIn}/>
        <Route path='/home' component={UserList}/>
        <Route path='/player/:id' component={SingleUser}/>
        {currentPath == '/' ? null : <BottomNavigation /> }
      </div>
    );
  }
}

export default withRouter(App);