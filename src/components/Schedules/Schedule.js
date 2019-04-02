import React, {Component} from 'react';
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import EditIcon from 'material-ui-icons/Edit';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Clear';
import {withStyles} from 'material-ui/styles';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import ScheduleDialog from './ScheduleDialog';
import {connect} from 'react-redux';
import {startRemoveSchedule} from '../../actions';

class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            deleteDialog:false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this);
        this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this);
    }

    handleClickOpen(){
        this.setState({ open: true });
    };


    handleOpenDeleteDialog(){
        this.setState({ deleteDialog: true });
    };
    
    handleRequestClose(){
        this.setState({ open: false });
    };

    handleCloseDeleteDialog(){
        this.setState({ deleteDialog: false });
    };

    handleDelete(){
        this.props.deleteSchedule();
        this.setState({ deleteDialog: false });
    }

    render() {
        const {dayOfWeek,startingTime,endingTime,id,isFilled, classes, userInfo} = this.props;
        return (
                <ListItem button>
                    <ListItemSecondaryAction>
                        <Tooltip id="tooltip-icon" disableTriggerFocus={!isFilled} disableTriggerHover={!isFilled} disableTriggerTouch={!isFilled} title="You can't edit filled schedules!" placement="bottom">
                            <IconButton className={ isFilled ? classes.disabledButton : ''} onClick ={()=>{if(!isFilled){ return this.handleClickOpen()}}}><EditIcon/></IconButton>
                        </Tooltip>
                        <IconButton onClick={this.handleOpenDeleteDialog} style={{color:"#ef5350"}}><DeleteIcon/></IconButton>
                    </ListItemSecondaryAction>
                    <ListItemText inset primary={`${dayOfWeek}, ${startingTime} - ${endingTime}`} secondary={isFilled ? `Duo: ${userInfo.nickName}` : ''}/>
                    <ScheduleDialog edit dayOfWeek={dayOfWeek} startingTime={startingTime} endingTime={endingTime} id={id} title={"Edit Schedule"} handleRequestClose={this.handleRequestClose} open={this.state.open}/>
                    <Dialog  open={this.state.deleteDialog} onRequestClose={this.handleCloseDeleteDialog}>
                    <DialogTitle>Deletar</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {`Are you sure that you want to delete your schedule on ${dayOfWeek}, ${startingTime} - ${endingTime}?`}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteDialog} color="primary">Cancel</Button>
                        <Button onClick={this.handleDelete} color="accent">Delete</Button>
                    </DialogActions>
                </Dialog>
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

function mapDispatchToProps(dispatch,ownProps){
    return{
        deleteSchedule: () => {dispatch(startRemoveSchedule(ownProps.id,ownProps.userId))}
    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(Schedule));