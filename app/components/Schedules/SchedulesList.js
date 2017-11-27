import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import Schedule from './Schedule';

export class ScheduleList extends Component {

    renderRequestList() {
        return this
            .props
            .requests
            .map((request, index) => {
                return <Schedule key={index} {...request}/>
            })

    }

    render() {
        return (
            <div>
                <List>
                    {this.renderRequestList()}
                </List>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        availability: Object.keys(state
            .availability)
            .map((id) => {
                return {
                    ...state.availability[id]
                    }
                }
            )
    };
}

export default connect(mapStateToProps)(ScheduleList);
