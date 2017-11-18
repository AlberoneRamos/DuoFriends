import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {Link, withRouter} from 'react-router-dom';
import CloseIcon from 'material-ui-icons/ArrowBack';
import SignOutIcon from 'material-ui-icons/ExitToApp';
import List,{ListItem, ListItemText} from 'material-ui/list';
import UserIcon from 'material-ui-icons/Person';
import {startLogout} from '../actions';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';

export class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      sidebar: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer(side, open){
    this.setState({sidebar: !this.state.sidebar});
  };

  sideList() {
    const {classes,username,availability} = this.props;
    var duosArray = [],id;
    for(id in availability){
        if(availability[id].userId)
          duosArray.push(availability[id].userId);
    }
    return (
      <div>
        <div className={classes.list}>
          <img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png" className={classes.avatarSide}/>
          <Typography type="title" className={classes.drawerTitle} gutterBottom>{username}</Typography>
          <Link to="/duos" onClick={() => {this.toggleDrawer()} }>
            <Typography className={classes.drawerText} gutterBottom><b style={{color:'#fafafa'}}>{duosArray.filter((item, pos)=>{return duosArray.indexOf(item) == pos}).length}</b> Duos</Typography>
            <Typography className={classes.drawerText} gutterBottom><b style={{color:'#fafafa'}}>{Object.keys(availability).length}</b> Horários</Typography>
          </Link>
        </div>
        <Divider style={{backgroundColor:"#0f1015",height:2}}/>
        <List>
          <ListItem disableRipple button>
            <UserIcon className={classes.sidebarIcons}/>
            <ListItemText primary="Perfil"/>
          </ListItem>
          <ListItem disableRipple button onClick={() =>{this.props.logout()}}>
            <SignOutIcon className={classes.sidebarIcons}/>
            <ListItemText primary="Sair"/>
          </ListItem>
        </List>
      </div>
    );
  }

  renderMainAction(){
          const {location,classes} = this.props;
          debugger;
          if(location.pathname.match(new RegExp("/", "g")).length <= 1){
              return (<Avatar onClick={() => {this.toggleDrawer()} } src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png"></Avatar>);
          }
          else{
            return (<IconButton onClick={this.props.history.goBack.bind(this)} className={classes.closeButton} aria-label="Close">
                <CloseIcon />
            </IconButton>);
          }
  }

  render(){
    const {classes,logout,location} = this.props;
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          {this.renderMainAction()}
          <Drawer open={this.state.sidebar} classes={{paper:classes.sidebar}} onRequestClose={() => {this.toggleDrawer()} }>
              {this.sideList()}
          </Drawer>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(state){
    return{
      availability: state.availability,
      username: state.userInfo.nickName
    };
}

function mapDispatchToProps(dispatch){
    return{
        logout: () => {dispatch(startLogout())}
    }
}

const styles = theme => ({
  root: {
    backgroundColor : theme.palette.secondary[500],
    width: '100%',
    color: '#fafafa',
  },
  closeButton:{
      color:"#fafafa",
  },
  avatarSide:{
    width:50,
    height:50,
    borderRadius:'50%'
  },
  sidebar:{
    backgroundColor: theme.palette.secondary[500],
  },
  sidebarIcons:{
    color: theme.palette.secondary[200],
  },
  list:{
    width: 200,
    padding:16
  },
  drawerText:{
    color: theme.palette.secondary[200],
    fontWeight: 'thin',
    marginTop:8,
    marginRight:16,
    display:'inline-block'
  },
  drawerTitle:{
    display:'block'
  },
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Header)));