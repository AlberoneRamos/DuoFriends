import React,{Component} from 'react';
import {ListItem, ListItemSecondaryAction,ListItemText} from 'material-ui/list';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import StarIcon from 'material-ui-icons/Star';
import {withStyles} from 'material-ui/styles';

class User extends Component{

    getRoleInfo(roleNumber){
        var path = "../../assets/images/";
        var roles = ["Top","Mid","Jungle","Bot","Support","Fill"];
        return [roles[roleNumber-1],path+roles[roleNumber-1]+"_icon.png"];
    }

    getRankImage(rankName){
        return `../../assets/images/${rankName}_SUMMONER.jpg`;
    }

    render(){
        const {id,mainRole,nickName,rank,league,userRating,classes} = this.props;
        const roleInfo = this.getRoleInfo(mainRole);
        return(
            <Link to={`player/${id}`}>
                <ListItem disableRipple button>
                    <Avatar alt={rank} src={this.getRankImage(league)}>
                    </Avatar>
                    <ListItemSecondaryAction>
                        <Avatar alt={roleInfo[0]} src={roleInfo[1]}>
                        </Avatar>

                    </ListItemSecondaryAction>
                    <ListItemText  primary={nickName} secondary={<span><StarIcon className={classes.icon} style={{color:'#2ec4b6'}}/><span style={{verticalAlign:'top'}}>{userRating}</span></span>} />
                </ListItem>
            </Link>
           
        );
    }
}

const styles = theme => ({
    icon:{
        height: 17,
        verticalAlign:'top'
    }
});

export default withStyles(styles)(User);