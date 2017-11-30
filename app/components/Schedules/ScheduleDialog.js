import React, {Component} from 'react';
import Select from 'material-ui/Select';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import TimeInput from 'material-ui-time-picker';
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {startEditSchedule,broadcastErrorMessage, broadcastSuccessMessage} from '../../actions';
import {getRoleInfo, getRankImage} from '../../riotApi/customApi';

class ScheduleDialog extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.requestEditSchedule = this.requestEditSchedule.bind(this);
        const startingTime = props.startingTime.split(':');
        const endingTime = props.endingTime.split(':');
        this.state ={
            weekDay: props.dayOfWeek,
            startingTime: moment().set({'hours':startingTime[0],'minutes':startingTime[1]}).toDate(),
            endingTime: moment().set({'hours':endingTime[0],'minutes':endingTime[1]}).toDate(),

        }
    }

    handleChange(stateValue,e){
        this.setState({
            [stateValue]:e.target.value
        });
    }

    handleTimeChange(stateValue,time){
        this.setState({
            [stateValue]:time
        });
    }

    requestEditSchedule(){
        const {startingTime, endingTime} = this.state;
        console.log(startingTime, endingTime);
        if(startingTime >= endingTime){
            this.props.errorMessage("Time traveling isn't supported yet!");
            this.setState({
                open:true
            })
        }
    }

    render() {
        const {dayOfWeek,startingTime,endingTime, classes,title,handleRequestClose} = this.props; 
        const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return (
                <Dialog classes={{paper: classes.root}}  open={this.props.open | this.state.open} onRequestClose={handleRequestClose}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent className={classes.content}>
                    <Grid container justify="center" >
                        <Grid item xs>
                            <TextField select fullWidth InputLabelProps={{FormControlClasses:{focused:classes.inputLabel}}} label="Week day" InputClassName={classes.inputInkbar} value={this.state.weekDay} onChange={(e) => {this.handleChange('weekDay',e)}}>
                                {weekDay.map((day,index) => <MenuItem value={day} key={index}>{day}</MenuItem>)}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" >
                        <Grid item xs>
                            <TimeInput mode='24h' className={classes.inputInkbar} value={this.state.startingTime} onChange={(time) => this.handleTimeChange('startingTime',time)}/>
                        </Grid>
                        <Grid item xs>
                            <TimeInput mode='24h' className={classes.inputInkbar} value={this.state.endingTime} onChange={(time) => this.handleTimeChange('endingTime',time)}/>
                        </Grid>
                    </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRequestClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.requestEditSchedule} color="primary">
                        Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.secondary[500]
    },
    formControl:{
        display: 'flex',
        justifyContent: 'center'
    },
    inputLabel:{
        color: theme.palette.primary[500]
    },
    inputInkbar: {
        '&:after': {
            backgroundColor:  `${theme.palette.primary[500]} !important`
        },
    },
});

function mapDispatchToProps(dispatch, ownProps){
    return{
        editSchedule: (startingTime,endingTime) => dispatch(startEditSchedule(ownProps.dayOfWeek,startingTime,endingTime,ownProps.id)),
        errorMessage: (message) => dispatch(broadcastErrorMessage(message)),
        successMessage: (message) => dispatch(broadcastSuccessMessage(message)),
    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(ScheduleDialog));