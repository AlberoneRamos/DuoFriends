import React,{Component} from 'react';
import {isAuthenticated} from '../firebase';
import {withRouter} from 'react-router-dom';

export function AuthenticationWrapper(ComposedComponent){
    class AuthenticatedComponent extends Component{
        componentWillMount(){
            if(!isAuthenticated()){
                this.props.history.push('/');
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/');
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