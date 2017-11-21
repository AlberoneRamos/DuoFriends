import React, {Component} from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import StarIcon from 'material-ui-icons/Star';
import {withStyles} from 'material-ui/styles';
import {getRoleInfo, getRankImage} from '../../riotApi/customApi';

class User extends Component {
    
    render() {
        const {
            id,
            mainRole,
            nickName,
            rank,
            league,
            userRating,
            classes
        } = this.props;
        const roleInfo = getRoleInfo(mainRole);
        return (
            <Link to={`players/${id}`}>
                <ListItem button>
                    <Avatar alt={rank} src={getRankImage(league)}></Avatar>
                    <ListItemSecondaryAction>
                        <Avatar className={classes.Avatar} alt={roleInfo[0]} src={roleInfo[1]}></Avatar>

                    </ListItemSecondaryAction>
                    <ListItemText
                        primary={nickName}
                        secondary={< span > <StarIcon
                        className={classes.icon}
                        style={{
                        color: '#2ec4b6'
                    }}/> < span style = {{verticalAlign:'top'}} > {
                        userRating
                    } < /span></span >}/>
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