import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/list';
import User from './user';

export class UserList extends Component {

    renderUserList() {
        return this
            .props
            .users
            .map((user) => {
                return <User key={user.id} {...user}/>
            })

    }

    render() {
        return (
            <div>
                <List>
                    {this.renderUserList()}
                </List>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {users: state.users};
}

export default connect(mapStateToProps)(UserList);
