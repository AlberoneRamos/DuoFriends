import firebase, {firebaseRef,facebookProvider} from '../firebase/';
import * as types from './types';

export function addUsers(users){
    return {
        type: 'ADD_USERS',
        users
    };
}

export function getUsers(){
    return (dispatch, getState)=>{
        return firebaseRef.child(`Users/`).once('value').then((snapshot)=>{
            var users = snapshot.val();
            var usersArray = users == null  ? [] : Object.keys(users).map((id)=>{
                return {
                    id,
                    ...users[id]
                }
            });
           dispatch(addUsers(usersArray));
        });
    }
}

export function startSendRequest(requestInfo,id){
    console.log('potato');
    debugger;
    return (dispatch,getState) => {
        var requests = requestInfo.map(request => {
            return {
                ...request,
                user:'Henrique',
                isFilled:null,
                toggled:null
            };
        }).forEach((request)=>{
            firebaseRef.child(`Users/${id}/requests`).push(request);
        });
    }
}