import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import {startLogout} from '../actions';
import {connect} from 'react-redux';

const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    width: '100%',
    color: '#fafafa',
    boxShadow:'none',
  },
  flex: {
    flex: 1
  },
  button: {
    position: 'absolute',
    right: 0,
    marginRight: 16,
    fontWeight:'thick',
    color: '#fafafa'
  }
});

export class ButtonAppBar extends Component{
  constructor(props){
    super(props);
  }


  render(){
    const {classes,logout} = this.props;
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Button className={classes.button} onClick={() =>{logout()}}>Sign-Out</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return{};
}

function mapDispatchToProps(dispatch){
    return{
        logout: () => {dispatch(startLogout())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ButtonAppBar));