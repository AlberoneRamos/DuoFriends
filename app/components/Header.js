// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SearchIcon from 'material-ui-icons/Search';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.A700,
    width: '100%',
    color: '#fafafa'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    position: 'absolute',
    right: 0,
    paddingRight: 10,
    color: '#fafafa'
  }
});

function ButtonAppBar(props) {
  const {classes} = props;
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          DuoFriends
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);