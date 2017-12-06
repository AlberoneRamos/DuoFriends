import React, {Component} from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import ClearIcon from 'material-ui-icons/Clear';
import CheckIcon from 'material-ui-icons/Check';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import {startAcceptRequest,startDeclineRequest} from '../../actions';
import {getRoleInfo, getRankImage, getProfileImage} from '../../riotApi/customApi';

class Notification extends Component {

    render() {
        const {id,senderInfo,startingTime,endingTime,dayOfWeek,classes,acceptRequest,declineRequest } = this.props;
        const roleInfo = getRoleInfo(senderInfo.mainRole);
        return (
            <div>
                <ListItem disableRipple button>
                    <Link to={`player/${senderInfo.id}`}>
                        <Avatar alt={senderInfo.rank} src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${getProfileImage(senderInfo.id)}.png`}></Avatar>
                    </Link>
                    <ListItemText
                        primary={`${dayOfWeek}, at ${startingTime} - ${endingTime}`}
                        secondary={`${senderInfo.nickName}, ${roleInfo[0]}`}/>
                    <ListItemSecondaryAction className={classes.secondaryAction}>
                        <Button raised classes={{root: classes.ButtonBase, raisedPrimary: classes.ButtonAccept}} onClick={()=>{acceptRequest()}} color="primary"><CheckIcon/></Button>
                        <Button raised classes={{root: classes.ButtonBase2, raisedPrimary: classes.ButtonRemove}}  onClick={()=>{declineRequest()}} color="primary"><ClearIcon/></Button>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    }
}

const styles = theme => ({
    icon: {
        height: 17,
        verticalAlign: 'top'
    },
    secondaryAction:{
        top:'50%',
        marginTop:'-16px',
        right:8
    },
    ButtonBase:{
        height:36,
        width:36,
        padding:0,
        marginRight:8,
        borderRadius:'100%',
        minWidth:0,
        color:'#fafafa'
    },
    ButtonBase2:{
        height:36,
        width:36,
        padding:0,
        marginRight:8,
        borderRadius:'100%',
        minWidth:0,
        color:'#fafafa'
    },
    ButtonAccept: {
        backgroundColor : '#05c7a3'
    },
    ButtonRemove: {
        backgroundColor: '#ef5350'
    }
});

function mapStateToProps(state){
    return {};
}

function mapDispatchToProps(dispatch, ownProps){
    return{
        acceptRequest: () => {dispatch(startAcceptRequest(ownProps.id,ownProps.availabilityId,ownProps.senderInfo.id))},
        declineRequest: () => {dispatch(startDeclineRequest(ownProps.id))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Notification));