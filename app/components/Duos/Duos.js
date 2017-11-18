import React, {Component} from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/list';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import {getRoleInfo, getRankImage} from '../../riotApi/customApi';

export class Duo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
        this.renderDuos = this.renderDuos.bind(this);
        this.renderSchedules = this.renderSchedules.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    
	toggle(){
         this.setState({
             open:!this.state.open
        });
    }

    renderDuos(){
        const { id,rank,league,nickName,mainRole,schedules,classes } = this.props;
        const roleInfo = getRoleInfo(mainRole);
        return(
            <div>
                <ListItem disableRipple button onClick={() => {this.toggle()}}>
                    <Link to={`player/${id}`}>
                        <Avatar alt={rank} src={getRankImage(league)}></Avatar>
                    </Link>
                    <ListItemText primary={nickName}/>
                    {this.state.open ? <ExpandLess className={classes.Expand}/> : <ExpandMore className={classes.Expand}/>}
                </ListItem>
                <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                    {this.renderSchedules(schedules)}
                </Collapse>
            </div>
        );
    }

    renderSchedules(schedules){
        return schedules.map((schedule,index)=>{
            return(
                <ListItem key={index}>
                    <ListItemText inset primary={`${schedule.dayOfWeek},${schedule.startingTime} - ${schedule.endingTime}`} />
                </ListItem>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderDuos()}
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
    Expand:{
        color:"#fafafa"
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
    ButtonAccept: {
        backgroundColor : '#05c7a3'
    },
    ButtonRemove: {
        backgroundColor: '#ef5350'
    },
    Avatar:{
        borderRadius:0,
    }

});

export default withStyles(styles)(Duo);