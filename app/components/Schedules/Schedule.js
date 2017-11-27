import React, {Component} from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import StarIcon from 'material-ui-icons/Star';
import {withStyles} from 'material-ui/styles';
import {getRoleInfo, getRankImage} from '../../riotApi/customApi';

class User extends Component {
    
    render() {
        const {dayOfWeek,startingTime,endingTime} = this.props;
        const roleInfo = getRoleInfo(mainRole);
        var imageCode = ((id.match(/\d/g).join("") * 9301 + 49297) % 233280) / 233280;
        imageCode = Math.round(588 + imageCode * (620 - 588));
        return (
            <Link to={`players/${id}`}>
                <ListItem button>
                    <Avatar alt={rank} 
                    src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${imageCode}.png`}></Avatar>
                    <ListItemSecondaryAction>
                        <Avatar className={classes.Avatar} alt={roleInfo[0]} src={roleInfo[1]}></Avatar>

                    </ListItemSecondaryAction>
                    <ListItemText inset primary={`${schedule.dayOfWeek}, ${schedule.startingTime} - ${schedule.endingTime}`} />
                </ListItem>
            </Link>

        );
    }
}

const styles = theme => ({
    icon: {
        height: 17,
        verticalAlign: 'top'
    },
    Avatar:{
        borderRadius:0,
    }
});

export default withStyles(styles)(User);