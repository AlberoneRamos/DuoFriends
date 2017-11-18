import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import Badge from 'material-ui/Badge';
import SearchIcon from 'material-ui-icons/Search';
import NotificationIcon from 'material-ui-icons/Notifications';
import GroupIcon from 'material-ui-icons/Group';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
  },
  badge:{
    top: '-8px',
    width: '20px',
    right: '-8px',
    height: '20px'
  },
  badgeHidden:{
    display:'none'
  },
  Icon:{
    color : '#b8b9bb'
  },
  SelectedIcon:{
    color: theme.palette.primary[500]
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
    const {classes,numberOfRequests} = this.props;
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
       <BottomNavigationButton classes={{root:classes.buttonNav, selected:classes.SelectedIcon}}
          disableRipple icon={<Link to="/notifications"><Badge badgeContent={numberOfRequests} classes={{badge: numberOfRequests > 0 ? classes.badge:classes.badgeHidden}} color="accent">< NotificationIcon /></Badge></Link>}/>
        <BottomNavigationButton className={classes.buttonNav}
          disableRipple
          icon={<Link to="/duos">< GroupIcon /></Link>}/>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    numberOfRequests: state.requests.length
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleBottomNavigation));