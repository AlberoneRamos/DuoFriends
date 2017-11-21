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
import List,{ListItem, ListItemText} from 'material-ui/List';
import UserIcon from 'material-ui-icons/Person';
import SchedulesIcon from 'material-ui-icons/AccessTime';
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
    const {classes,username,availability,id} = this.props;
    var duosArray = [],index;
    for(index in availability){
        if(availability[index].userId)
          duosArray.push(availability[index].userId);
    }
    var imageCode = id ? Math.round(588 + ((id.match(/\d/g).join("") * 9301 + 49297) % 233280) / 233280  * (620 - 588)) : '' ;
    return (
      <div>
        <div className={classes.list}>
          <img src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${imageCode}.png`} className={classes.avatarSide}/>
          <Typography type="title" className={classes.drawerTitle} gutterBottom>{username}</Typography>
          <Link to="/duos" onClick={() => {this.toggleDrawer()} }>
            <Typography className={classes.drawerText} gutterBottom><b style={{color:'#fafafa'}}>{duosArray.filter((item, pos)=>{return duosArray.indexOf(item) == pos}).length}</b> Duos</Typography>
            <Typography className={classes.drawerText} gutterBottom><b style={{color:'#fafafa'}}>{Object.keys(availability).length}</b> schedules</Typography>
          </Link>
        </div>
        <Divider style={{backgroundColor:"#0f1015",height:2}}/>
        <List>
          <ListItem button>
            <UserIcon className={classes.sidebarIcons}/>
            <ListItemText primary="My profile"/>
          </ListItem>
          <ListItem button>
            <SchedulesIcon className={classes.sidebarIcons}/>
            <ListItemText primary="My schedules"/>
          </ListItem>
          <ListItem button onClick={() =>{this.props.logout()}}>
            <SignOutIcon className={classes.sidebarIcons}/>
            <ListItemText primary="Sign-out"/>
          </ListItem>
        </List>
      </div>
    );
  }

  renderMainAction(){
          const {location,classes,id} = this.props;
          var imageCode = id ?  Math.round(588 + ((id.match(/\d/g).join("") * 9301 + 49297) % 233280) / 233280  * (620 - 588)) : '' ;
          if(location.pathname.match(new RegExp("/", "g")).length <= 1){
              return (<Avatar onClick={() => {this.toggleDrawer()} } src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${imageCode}.png`}></Avatar>);
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
      username: state.userInfo.nickName,
      id:state.userInfo.id ?  state.userInfo.id : undefined
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