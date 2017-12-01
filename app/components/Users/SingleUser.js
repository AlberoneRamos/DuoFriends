import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Rating from '../generalComponents/Rating';
import MatchingRequestForm from './MatchingRequestForm';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import { BottomSheet } from 'material-ui-bottom-sheet'
import {getRoleInfo, getRankImage, getProfileImage} from '../../riotApi/customApi';

export class SingleUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleClickOpen(){
        this.setState({ open: true });
      };
    
    handleRequestClose(){
    this.setState({ open: false });
    };
    
    render() {
        const {classes, nickName, userRating,availability, mainRole, id, rank, league, playStyle} = this.props;
        return (
            <div style={{textAlign:'center'}}>
                <img src={getRoleInfo(mainRole,"svg")[1]} className={classes.roleImage}/>
                <div
                    style={{
                    position: 'relative',
                    height: 248,
                    margin: '5px'
                }}>
                    <div className={classes.MainCharacter}/>
                    <img
                        src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${getProfileImage(id)}.png`}
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
                <Grid style={{margin:"0px",width:"100%"}} container>
                    <Grid item xs><Avatar style={{display:'inline-block'}} alt={rank} src={getRankImage(league)}></Avatar><Typography type="body2" style={{fontWeight: 'bold'}}>{`${league.charAt(0).toUpperCase() + league.slice(1).toLowerCase()} ${rank}`}</Typography></Grid>
                    <Grid item xs><Avatar style={{display:'inline-block'}} alt={rank} src={`/images/playstyle${playStyle}.png`}></Avatar><Typography type="body2" style={{fontWeight: 'bold'}}>{playStyle == 1 ? "Casual" : "Competitive"}</Typography></Grid>
                </Grid>
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
