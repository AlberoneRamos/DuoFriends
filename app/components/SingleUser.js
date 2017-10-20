import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Rating from './Rating';
import MatchingRequestForm from './MatchingRequestForm';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import { BottomSheet } from 'material-ui-bottom-sheet'
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/ArrowBack';
import Slide from 'material-ui/transitions/Slide';
import HalfStarIcon from 'material-ui-icons/StarHalf';

export class SingleUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            snackbarOpen: false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    
    getRoleInfo(roleNumber) {
        var path = "../../../assets/images/";
        var roles = [
            "Top",
            "Mid",
            "Jungle",
            "Bot",
            "Support",
            "Fill"
        ];
        return [
            roles[roleNumber - 1],
            path + roles[roleNumber - 1] + "_icon.svg"
        ];
    }


    handleClickOpen(){
        this.setState({ open: true });
      };
    
      handleRequestClose(){
        this.setState({ open: false });
      };
    
      handleSnackbarOpen(){
        this.setState({ snackbarOpen: true });
      }

      handleCloseSnackbar(){
        this.setState({ snackbarOpen: false });
      }
    
    render() {
        const {classes, nickName, userRating,availability,mainRole} = this.props;
        return (
            <div style={{textAlign:'center'}}>
                <IconButton onClick={this.props.history.goBack.bind(this)} className={classes.closeButton} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <img src={this.getRoleInfo(mainRole)} className={classes.roleImage}/>
                <Snackbar
                        anchorOrigin={{ vertical:'top', horizontal:'center' }}
                        open={this.state.snackbarOpen}
                        onRequestClose={this.handleCloseSnackbar}
                        autoHideDuration={4000}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                            classes: {
                                root: classes.Snackbar
                            }
                        }}
                        message={<Typography type="subheading" id="message-id">Request Sent!</Typography >}
                        />
                <div
                    style={{
                    position: 'relative',
                    height: 248,
                    margin: '5px'
                }}>
                    <div className={classes.MainCharacter}/>
                    <img
                        src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png"
                        className={classes.ProfilePic}/>
                </div>
                <Typography
                    align="center"
                    type="title"
                    style={{
                    fontWeight: 'bold'
                }}>{nickName}</Typography>
                <Rating value={userRating} readOnly className={classes.Rating}/>
                <Button color="primary" raised className={classes.Button} onClick={this.handleClickOpen}>Bora Duo!</Button>
                <BottomSheet classes={{root:classes.BottomSheet}} onRequestClose={this.handleRequestClose} open={this.state.open} snackbarFunction={this.handleSnackbarOpen}>
                        <MatchingRequestForm dispatch={this.props.dispatch.bind(this)} availability={availability} closeFunction={this.handleRequestClose} snackbarFunction={this.handleSnackbarOpen}/>
                </BottomSheet>
            </div>
        );
    }
}

function styles(theme) {
    return ({
        MainCharacter: {
            background: "url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Rakan_0.jpg')",
            width: '100%',
            height: '200px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            filter: 'blur(5px)'
        },
        closeButton:{
            color:"#fafafa",
            position:"absolute",
            top:8,
            left:16,
            zIndex:2,
        },
        ProfilePic: {
            borderRadius: '50%',
            border: '4px solid #fafafa',
            height: 96,
            left: 0,
            bottom: 0,
            position: 'absolute',
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        roleImage:{
            position:'absolute',
            top:16,
            right:16,
            zIndex:2,
            width:36
        },
        Snackbar:{
            backgroundColor:"#05c7a3"
        },
        BottomSheet:{
            backgroundColor:'#fff !important'
        },
        Rating:{
            textAlign:'center',
            marginTop:8
        },
        AppBar:{
            backgroundColor:'transparent',
            boxShadow:'none'
        },
        Button:{
            fontWeight:'600',
            marginTop:8,
            borderRadius:50,
            color:"#fafafa",
            padding:"16px 24px"
        }
    });
};

function mapStateToProps(state, ownProps) {
    return {
        ...state
            .users
            .filter(user => user.id === ownProps.match.params.id)[0]
    };
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(SingleUser)));
