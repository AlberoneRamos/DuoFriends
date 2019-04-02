import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import {Route} from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import UserList from './Users/UserList';
import NotificationList from './Notifications/NotificationList';
import SchedulesList from './Schedules/SchedulesList';
import DuosList from './Duos/DuosList';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Header from './Header';
import SingleUser from './Users/SingleUser';
import MyProfile from './Users/MyProfile';
import AuthenticationWrapper from './generalComponents/AuthenticationWrapper';
import {withRouter} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleSnackbarOpen() {
    this.setState({snackbarOpen: true});
  }

  handleCloseSnackbar() {
    this.setState({snackbarOpen: false});
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.snackbar.message === 'string' && nextProps.snackbar.message !== ''){
      this.setState({
        snackbarOpen: true
      });
    }
  }

  componentDidUpdate(){
      if(this.state.snackbarOpen === false){
        this.props.removeSnackbarMessage();
        this.setState({
          snackbarOpen: undefined
        });
      }
  }

  render() {
    const currentPath = this.props.location.pathname;
    const {classes} = this.props;
    const {message, type} = this.props.snackbar;
    return (
      <div>
          <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={this.state.snackbarOpen} onRequestClose={this.handleCloseSnackbar}
          autoHideDuration={4000}  SnackbarContentProps={{
              'aria-describedby': 'message-id',
              classes: {
                  root: type === 'error' ? classes.snackbarError : classes.snackbarSuccess
              }
          }}
          message={<Typography type="subheading" id="message-id">{message}</Typography >}
          />
          {currentPath === '/' || currentPath === '/signup' || currentPath === '/player/:id' ? null : <Header /> }
            <Route name="login" exact path='/' component={LogIn}/>
            <Route name="signup" exact path='/signup' component={SignUp}/>
            <Route name="players" exact path='/players' component={AuthenticationWrapper(UserList)}/>
            <Route name="notifications" path='/notifications' component={AuthenticationWrapper(NotificationList)}/>
            <Route name="duos" path='/duos' component={AuthenticationWrapper(DuosList)}/>
            <Route name="schedules" path='/schedules' component={AuthenticationWrapper(SchedulesList)}/>
            <Route name="singleUser" path='/players/:id' component={AuthenticationWrapper(SingleUser)}/>
            <Route name="myProfile" path='/profile' component={AuthenticationWrapper(MyProfile)}/>
          {currentPath === '/' || currentPath === '/signup' ? null : <BottomNavigation /> }
      </div>
        );
  }
}

function mapStateToProps(state){
  return {
    snackbar: state.snackbar
  }
}

function mapDispatchToProps(dispatch){
  return {
    removeSnackbarMessage:()  => dispatch({type:'REMOVE_MESSAGE'})
  }
}

function styles(theme) {
  return ({
    snackbarSuccess : {
      backgroundColor: "#05c7a3"
    },
    snackbarError : {
      backgroundColor : "#ef5350"
    },
  });
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(App)));