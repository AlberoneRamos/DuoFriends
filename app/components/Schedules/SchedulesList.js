import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Schedule from './Schedule';
import {withStyles} from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import ScheduleDialog from './ScheduleDialog';
import Button from 'material-ui/Button';


export class ScheduleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClickOpen = this
            .handleClickOpen
            .bind(this);
        this.handleRequestClose = this
            .handleRequestClose
            .bind(this);
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleRequestClose() {
        this.setState({open: false});
    };

    renderScheduleList() {
        return this
            .props
            .schedules
            .map((schedule, index) => {
                return <Schedule key={index} {...schedule}/>
            })

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <List>
                    {this.renderScheduleList()}
                </List>
                <Button fab className={classes.floatingActionButton} raised style={{backgroundColor:"#05c7a3"}} onClick={() => {this.handleClickOpen()}}><AddIcon /></Button>
                <ScheduleDialog title={"Add Schedule"} handleRequestClose={this.handleRequestClose} open={this.state.open}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        schedules: Object.keys(state
            .availability)
            .map((id) => {
                return {
                    ...state.availability[id],
                    id,
                    userInfo: {...state.users.filter((user) => {return state.availability[id].userId == user.id})[0],availability:undefined}
                    }
                }
            )
    };
}

function styles(styles){
    return {
        floatingActionButton:{
            right: '24px',
            bottom: '64px',
            position: 'fixed',
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ScheduleList));
