import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/list';
import Notification from './Notification';

export class NotificationList extends Component {

    renderRequestList() {
        return this
            .props
            .requests
            .map((request, index) => {
                return <Notification key={index} {...request}/>
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
        requests: state.requests.map((request) => {
          return {
              ...state.availability[request.availabilityId],
              availabilityId:request.availabilityId,
              id:request.id,
              senderInfo: {
                  ...state.users.filter((user) => request.user)[0],
                  requests:null,
                  availability:null
              }
          }  
        })};
}


export default connect(mapStateToProps)(NotificationList);