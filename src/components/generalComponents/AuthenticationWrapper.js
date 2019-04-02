import React,{Component} from 'react';
import {isAuthenticated} from '../../firebase/auth';
import {withRouter} from 'react-router-dom';

export default function AuthenticationWrapper(ComposedComponent){
    class AuthenticatedComponent extends Component{
        componentWillMount(){
            if(!isAuthenticated()){
                this.props.history.push('/');
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/');
            }
        }
        render(){
            return(
                <ComposedComponent {...this.props}/>
            );
        }
    }

    return withRouter(AuthenticatedComponent);
}