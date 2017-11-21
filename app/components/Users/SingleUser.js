import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Rating from '../generalComponents/Rating';
import MatchingRequestForm from './MatchingRequestForm';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { BottomSheet } from 'material-ui-bottom-sheet'
import HalfStarIcon from 'material-ui-icons/StarHalf';

export class SingleUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            snackbarOpen: false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    
    getRoleInfo(roleNumber) {
        var path = "/images/";
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
    
    render() {
        const {classes, nickName, userRating,availability,mainRole,id} = this.props;
        var imageCode = ((id.match(/\d/g).join("") * 9301 + 49297) % 233280) / 233280;
        imageCode = Math.round(588 + imageCode * (620 - 588));
        return (
            <div style={{textAlign:'center'}}>
                <img src={this.getRoleInfo(mainRole)[1]} className={classes.roleImage}/>
                <div
                    style={{
                    position: 'relative',
                    height: 248,
                    margin: '5px'
                }}>
                    <div className={classes.MainCharacter}/>
                    <img
                        src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${imageCode}.png`}
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
                <BottomSheet classes={{paper:classes.BottomSheet}} onRequestClose={this.handleRequestClose} open={this.state.open} snackbarFunction={this.handleSnackbarOpen}>
                        <MatchingRequestForm dispatch={this.props.dispatch.bind(this)} availability={availability} userId={this.props.match.params.id} closeFunction={this.handleRequestClose}/>
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
            top:8,
            right:16,
            zIndex:2,
            height:40
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

export default connect(mapStateToProps)(withStyles(styles)(SingleUser));
