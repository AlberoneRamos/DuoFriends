import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Route} from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import UserList from './UserList';
import SingleUser from './SingleUser';


export default class App extends React.Component {

  render() {

    return (
      <div>
        <Route exact path='/' component={UserList}/>
        <Route path='/player/:id' component={SingleUser}/>
        <BottomNavigation/>
      </div>
    );
  }
}