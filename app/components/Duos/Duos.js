import React, {Component} from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ClearIcon from 'material-ui-icons/Clear';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import {startRemoveDuoSchedule} from '../../actions';
import {getRoleInfo, getRankImage, getProfileImage} from '../../riotApi/customApi';

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
                <ListItem button onClick={() => {this.toggle()}}>
                    <Link to={`players/${id}`}>
                        <Avatar alt={rank} src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${getProfileImage(id)}.png`}></Avatar>
                    </Link>
                    <ListItemText primary={nickName}/>
                    {this.state.open ? <ExpandLess className={classes.Expand}/> : <ExpandMore className={classes.Expand}/>}
                </ListItem>
                <Collapse className={classes.collapseText} in={this.state.open} transitionDuration="auto" unmountOnExit>
                    {this.renderSchedules(schedules)}
                </Collapse>
            </div>
        );
    }

    renderSchedules(schedules){
        const {classes} = this.props;
        return schedules.map((schedule,index)=>{
            return(
                    <ListItem key={index}>
                        <ListItemText inset primary={`${schedule.dayOfWeek}, ${schedule.startingTime} - ${schedule.endingTime}`} />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.removeIcon} onClick={()=>{this.removeSchedule(schedule.id)}} color="primary"><ClearIcon/></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
            );
        });
    }

    removeSchedule(id){
        this.props.removeDuoSchedule(id)
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
    removeIcon: {
        color:'#ef5350'
    },
    secondaryAction:{
        top:'50%',
        marginTop:'-16px',
        right:8
    },
    Expand:{
        color:theme.palette.primary[500]
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

function mapStateToProps(state){
    return{}
}

function mapDispatchToProps(dispatch,ownProps){
    return{
        removeDuoSchedule: (id) => {
            dispatch(startRemoveDuoSchedule(id,ownProps.id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Duo));