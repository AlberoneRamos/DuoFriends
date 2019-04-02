import React, {Component} from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import {withStyles} from 'material-ui/styles';
import ClearIcon from 'material-ui-icons/Clear';
import Typography from 'material-ui/Typography';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {startRemoveDuoSchedule} from '../../actions';

export class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            open:false,
            deleteDialog:false
        }
        this.renderRemoveDialog = this.renderRemoveDialog.bind(this);
        this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this);
        this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleOpenDeleteDialog() {
        this.setState({
            deleteDialog: true
        });
    };

    handleCloseDeleteDialog() {
        this.setState({
            deleteDialog: false
        });
    };


    handleDelete() {
        this.props.removeDuoSchedule(this.props.id);
        this.setState({
            deleteDialog: false
        });
    }


    renderRemoveDialog(){
        return(
            <Dialog  open={this.state.deleteDialog} onRequestClose={this.handleCloseDeleteDialog}>
                <DialogTitle>Delete Schedule</DialogTitle>
                <DialogContent>
                    <Typography>
                        {`Are you sure that you want to delete your schedule on ${this.props.dayOfWeek}, ${this.props.startingTime} - ${this.props.endingTime}?`}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={this.handleDelete} color="accent">Delete</Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <ListItem>
                <ListItemText inset primary={`${this.props.dayOfWeek}, ${this.props.startingTime} - ${this.props.endingTime}`} />
                <ListItemSecondaryAction>
                    <IconButton className={classes.removeIcon} onClick={()=>{this.handleOpenDeleteDialog()}} color="primary"><ClearIcon/></IconButton>
                    {this.renderRemoveDialog()}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

const styles = theme => ({
    removeIcon: {
        color:'#ef5350'
    }
});

function mapDispatchToProps(dispatch,ownProps){
    return{
        removeDuoSchedule: (id) => {
            dispatch(startRemoveDuoSchedule(id,ownProps.duoId))
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Schedule));