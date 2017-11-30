import React, {Component} from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import EditIcon from 'material-ui-icons/Edit';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Clear';
import {withStyles} from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import ScheduleDialog from './ScheduleDialog';
import {getRoleInfo, getRankImage} from '../../riotApi/customApi';

class Schedule extends Component {   
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
        const {dayOfWeek,startingTime,endingTime,id,isFilled, classes, userInfo} = this.props;
        return (
                <ListItem button>
                    <ListItemSecondaryAction>
                        <Tooltip id="tooltip-icon" disableTriggerFocus={!isFilled} disableTriggerHover={!isFilled} disableTriggerTouch={!isFilled} title="You can't edit filled schedules!" placement="bottom">
                            <IconButton  color="primary" className={ isFilled ? classes.disabledButton : ''} onClick ={()=>{if(!isFilled){ return this.handleClickOpen()}}}><EditIcon/></IconButton>
                        </Tooltip>
                        <IconButton style={{color:"#ef5350"}}><DeleteIcon/></IconButton>
                    </ListItemSecondaryAction>
                    <ListItemText inset primary={`${dayOfWeek}, ${startingTime} - ${endingTime}`} secondary={isFilled ? `Duo: ${userInfo.nickName}` : ''}/>
                    <ScheduleDialog dayOfWeek={dayOfWeek} startingTime={startingTime} endingTime={endingTime}  title={"Edit Schedule"} handleRequestClose={this.handleRequestClose} open={this.state.open}/>
                </ListItem>

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
    },
    hideTooltip:{
        display:'none !important'
    },
    disabledButton:{
        color:'#58585d'
    }
});

export default withStyles(styles)(Schedule);