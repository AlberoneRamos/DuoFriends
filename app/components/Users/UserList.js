import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import User from './User';
import {getUsers} from '../../actions';

export class UserList extends Component {

    renderUserList() {
        return this.props.users.map((user,index) => {
                return <User key={index} {...user}/>
            })

    }

    componentWillMount(){
        this.props.getUsers();
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

function mapDispatchToProps(dispatch){
    return{
        getUsers: () => {
            dispatch(getUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
