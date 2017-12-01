import React, {Component} from 'react';
import Select from 'material-ui/Select';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import TimeInput from 'material-ui-time-picker';
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {startEditSchedule, broadcastErrorMessage, broadcastSuccessMessage, startAddSchedule} from '../../actions';
import {getRoleInfo, getRankImage} from '../../riotApi/customApi';

class ScheduleDialog extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.requestEditSchedule = this.requestEditSchedule.bind(this);
        const startingTime = props.startingTime ? moment().set({'hours':props.startingTime.split(':')[0],'minutes':props.startingTime.split(':')[1]}).toDate() : new Date();
        const endingTime = props.endingTime ? moment().set({'hours':props.endingTime.split(':')[0],'minutes':props.endingTime.split(':')[1]}).toDate() : moment().add(1,'hours').toDate();
        this.state ={
            weekDay: props.dayOfWeek ? props.dayOfWeek : 'Sunday',
            startingTime,
            endingTime,

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
        const {startingTime, endingTime,weekDay} = this.state;
        if(startingTime >= endingTime){
            this.props.errorMessage("Time traveling isn't supported yet!");
        } else{
            if(this.props.edit)
                this.props.editSchedule(weekDay,moment(startingTime).format('HH:mm'),moment(endingTime).format('HH:mm'));
            else
                this.props.addSchedule(weekDay,moment(startingTime).format('HH:mm'),moment(endingTime).format('HH:mm'));
        }
    }

    render() {
        const {dayOfWeek,startingTime,endingTime, classes,title,handleRequestClose,edit} = this.props; 
        const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return (
                <Dialog open={this.props.open} onRequestClose={handleRequestClose}>
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
                        <Button onClick={this.requestEditSchedule} color="primary">{edit ? "Save":"Add"}</Button>
                        
                    </DialogActions>
                </Dialog>
        );
    }
}

const styles = theme => ({
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
        editSchedule: (dayOfWeek,startingTime,endingTime) => dispatch(startEditSchedule(dayOfWeek,startingTime,endingTime,ownProps.id)),
        addSchedule: (dayOfWeek,startingTime,endingTime) => dispatch(startAddSchedule(dayOfWeek,startingTime,endingTime,ownProps.id)),
        errorMessage: (message) => dispatch(broadcastErrorMessage(message)),
        successMessage: (message) => dispatch(broadcastSuccessMessage(message)),
    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(ScheduleDialog));