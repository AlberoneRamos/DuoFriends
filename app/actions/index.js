import firebase, {firebaseRef,facebookProvider} from '../firebase/';
import * as types from './types';

export function startSendRequest(userId,timeRange){
    return (dispatch,getState) => {
        var request = {
            userId,
            createdAt:moment().format('DD/MM/YYYY HH:mm:ss'),
            completed: false,
            completedAt: null
        }
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/2/requests`).push(todo);

        return todoRef.then(()=>{
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }));
        });
    }
}

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
