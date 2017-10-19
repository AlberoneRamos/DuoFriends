import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import SearchIcon from 'material-ui-icons/Search';
import NotificationIcon from 'material-ui-icons/Notifications';
import UserIcon from 'material-ui-icons/Person';
import GroupIcon from 'material-ui-icons/Group';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary[500],
    width: '100%',
    color: '#fafafa',
    bottom: 0,
    position: 'fixed'
  },
  buttonNav: {
    padding:'0',
    width:'20vw'
  }
});

class SimpleBottomNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange(event, value) {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this
        .handleChange
        .bind(this)}
        
        className={classes.root}>
        <BottomNavigationButton className={classes.buttonNav} disableRipple icon={< HomeIcon />}/>
        <BottomNavigationButton className={classes.buttonNav} disableRipple icon={< SearchIcon />}/>
        <BottomNavigationButton className={classes.buttonNav}
          disableRipple
          
          icon={< NotificationIcon />}/>
        <BottomNavigationButton className={classes.buttonNav}
          disableRipple
          icon={< GroupIcon />}/>
        <BottomNavigationButton className={classes.buttonNav}
          disableRipple
          icon={< UserIcon />}/>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);