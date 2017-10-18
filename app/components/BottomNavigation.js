import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import SearchIcon from 'material-ui-icons/Search';
import NotificationIcon from 'material-ui-icons/Notifications';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.A700,
    width: '100%',
    color: '#fafafa',
    bottom: 0,
    position: 'fixed'
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
        showLabels
        className={classes.root}>
        <Link></Link><BottomNavigationButton disableRipple label="Home" icon={< HomeIcon />}/>
        <Link></Link><BottomNavigationButton disableRipple label="Search" icon={< SearchIcon />}/>
        <Link></Link><BottomNavigationButton
          disableRipple
          label="Notifications"
          icon={< NotificationIcon />}/>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);