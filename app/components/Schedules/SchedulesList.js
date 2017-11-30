import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import Schedule from './Schedule';

export class ScheduleList extends Component {

    renderScheduleList() {
        return this
            .props
            .schedules
            .map((schedule, index) => {
                return <Schedule key={index} {...schedule}/>
            })

    }

    render() {
        return (
            <div>
                <List>
                    {this.renderScheduleList()}
                </List>
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
                    userInfo: {...state.users.filter((user) => {return state.availability[id].userId == user.id})[0],availability:undefined}
                    }
                }
            )
    };
}

export default connect(mapStateToProps)(ScheduleList);
