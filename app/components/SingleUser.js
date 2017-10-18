import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {startGetUser} from '../actions';
import Rating from './Rating';
import Typography from 'material-ui/Typography';
import FilledStarIcon from 'material-ui-icons/Star';
import UnfilledStarIcon from 'material-ui-icons/StarBorder';
import HalfStarIcon from 'material-ui-icons/StarHalf';

export class SingleUser extends Component{

    render(){
        const {classes,nickName,userRating} = this.props;
        return(
            <div>
                <div style={{position:'relative',height:250,margin:'5px'}}>
                    <div className={classes.MainCharacter}/>
                    <img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png" className={classes.ProfilePic}/>
                </div>
                <Typography align="center" type="title" style={{fontWeight:'bold'}}>{nickName}</Typography>
                <Rating value={userRating} readOnly/>
            </div>
        );
    }
}


function styles(theme){
    return({
        MainCharacter:{
            background:"url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Rakan_0.jpg')",
            width:'100%',
            height:'200px',
            backgroundRepeat:'no-repeat',
            backgroundSize: 'cover',
            filter: 'blur(5px)'
        },
        ProfilePic:{
            borderRadius: '50%',
            border: '5px solid rgb(250, 250, 250)',
            height: 100,
            left: 0,
            bottom: 0,
            position: 'absolute',
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    });
};

function mapStateToProps(state,ownProps){
    return {
       ...state.users.filter(user => user.id === ownProps.match.params.id)[0]
    };
}

export default connect(mapStateToProps)(withStyles(styles)(SingleUser));

