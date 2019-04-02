import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Rating from '../generalComponents/Rating';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import {getRoleInfo, getRankImage, getProfileImage} from '../../riotApi/customApi';

export class MyProfile extends Component {
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
        const {classes, nickName, userRating,mainRole,id,rank,league} = this.props;
        const roleInfo = getRoleInfo(mainRole, "png");
        return (
            <div className={classes.root}>
                <div
                    style={{
                    position: 'relative',
                    height: 248,
                    margin: '5px'
                }}>
                    <div className={classes.MainCharacter}/>
                    <img
                        src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${getProfileImage(id)}.png`}
                        className={classes.ProfilePic} alt={"profile_pic"}/>
                </div>
                <Typography
                    align="center"
                    type="title"
                    style={{
                    fontWeight: 'bold'
                }}>{nickName}</Typography>
                <Rating value={userRating} readOnly className={classes.Rating}/>
                <Button color="primary" raised className={classes.Button}>Edit Profile</Button>
                <Grid style={{margin:"0px",width:"100%"}} container>
                    <Grid item xs><Avatar style={{display:'inline-block'}} alt={roleInfo[0]} src={roleInfo[1]}></Avatar><Typography type="body2" style={{fontWeight: 'bold'}}>{roleInfo[0]}</Typography></Grid>
                    <Grid item xs><Avatar style={{display:'inline-block'}} alt={rank} src={getRankImage(league)}></Avatar><Typography type="body2" style={{fontWeight: 'bold'}}>{`${league.charAt(0).toUpperCase() + league.slice(1).toLowerCase()} ${rank}`}</Typography></Grid>
                </Grid>
            </div>
        );
    }
}

function styles(theme) {
    return ({
        root:{
            textAlign: 'center',
        },
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
        ...state.userInfo
    };
}

export default connect(mapStateToProps)(withStyles(styles)(MyProfile));
