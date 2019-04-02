import {firebaseRef} from '../firebase/';
import {authenticate, SignOut} from '../firebase/auth';
import moment from 'moment';
import * as types from './types';

export function addUsers(users) {
    return {type: types.ADD_USERS, users};
}

export function getUsers() {
    return (dispatch, getState) => {
        return firebaseRef
            .child(`users/`)
            .on('value',(snapshot) => {
                var uid = getState().auth.uid;
                var users = snapshot.val();
                var usersArray = users === null
                    ? []
                    : Object
                        .keys(users)
                        .map((id) => {
                            return {
                                id,
                                ...users[id]
                            }
                        });
                dispatch(addUsers(usersArray.filter((user) => user.id !== uid)));
                dispatch(addUserInfo(usersArray.filter((user) => user.id === uid)));
            });
    }
}

export function broadcastErrorMessage(message) {
    return {type: types.ERROR_MESSAGE, message}
}

export function broadcastSuccessMessage(message) {
    return {type: types.SUCCESS_MESSAGE, message}
}

export function login(uid) {
    return {type: types.LOGIN, uid}
}

export function logout() {
    return {type: types.LOGOUT}
}

export function startLogin(user, password) {
    return (dispatch, getState) => {
        return authenticate(user, password).then((result) => {
            return result;
        }, (error) => {
            dispatch(broadcastErrorMessage(error.message));
            return error;
        });
    }
}

export function startLogout() {
    return (dispatch, getState) => {
        return SignOut().then((result) => {
            dispatch(addAvailabilities([]));
            return result;
        }, (error) => {
            return error;
        });
    }
}

export function addRequests(requests) {
    var requestsArray = requests === null
        ? []
        : Object
            .keys(requests)
            .map((id) => {
                return {
                    ...requests[id],
                    id
                }
            });
    return {type: types.ADD_REQUESTS, requests: requestsArray};
}

export function getAvailabilities() {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        return firebaseRef
            .child(`users/${uid}/availability`)
            .on('value', (snapshot) => {
                var availabilities = snapshot.val();
                dispatch(addAvailabilities(availabilities));
            });
    }
}

export function addAvailabilities(availabilities) {
    return {type: types.ADD_AVAILABILITIES, availabilities};
}

export function addUserInfo(userInfo) {
    return {
        type: types.ADD_USER_INFO,
        payload: {
            ...userInfo[0],
            availability:undefined,
            requests:undefined
        }
    };
}

export function startAcceptRequest(requestId, availabilityId, senderId) {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        var availabilityRef = firebaseRef.child(`users/${uid}/availability/${availabilityId}`)
        availabilityRef.once("value").then((snapshot)=>{
            var updates ={
                ...snapshot.val(),
                userId: senderId,
                isFilled: true
            }
            firebaseRef.child(`users/${senderId}/availability`).push({...updates,userId: uid});
            return availabilityRef
            .update(updates)
            .then((result) => {
                return firebaseRef
                    .child(`users/${uid}/requests`)
                    .once("value")
                    .then((snapshot) => {
                        snapshot
                            .forEach(function (data) {
                                var record = data.val();
                                if (record["availabilityId"] === availabilityId) {
                                    firebaseRef
                                        .child(`users/${uid}/requests`)
                                        .child(data.key)
                                        .remove();
                                }
                            });
                    })
            }, (error) => {
                dispatch(broadcastErrorMessage(error.message));
                return error;
            })
        });
    }
}

export function startEditSchedule(dayOfWeek,startingTime,endingTime,id) {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var availabilities = getState().availability;
        for (var id in availabilities) {
            const startAv = moment().set({'hours': availabilities[id].startingTime.split(':')[0],'minutes': availabilities[id].startingTime.split(':')[1],'days': weekDays.indexOf(availabilities[id].dayOfWeek)});
            const endingAv = moment().set({'hours': availabilities[id].endingTime.split(':')[0],'minutes': availabilities[id].endingTime.split(':')[1],'days': weekDays.indexOf(availabilities[id].dayOfWeek)});
            const endingMoment = moment().set({'hours':endingTime.split(':')[0],'minutes':endingTime.split(':')[1],'days': weekDays.indexOf(dayOfWeek)});
            const startingMoment = moment().set({ 'hours':startingTime.split(':')[0],'minutes':startingTime.split(':')[1],'days': weekDays.indexOf(dayOfWeek)});
            if(endingMoment.isBetween(startAv,endingAv,null,"[]")){
                return dispatch(broadcastErrorMessage('Ending time is between another schedule!'));
            } else if(startingMoment.isBetween(startAv,endingAv,null,"[]")){
                return dispatch(broadcastErrorMessage('Starting time is between another schedule!'));
            }
        }
        return firebaseRef.child(`users/${uid}/availability/${id}`).update({dayOfWeek,startingTime,endingTime}).then((result)=>{
            dispatch(broadcastSuccessMessage("Schedule successfully edited!"));
        }, (error) => {
            dispatch(broadcastErrorMessage(error.message));
            return error;
        });
        
    }
}

export function startAddSchedule(dayOfWeek,startingTime,endingTime) {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var availabilities = getState().availability;
        for (var id in availabilities) {
            const startAv = moment().set({'hours': availabilities[id].startingTime.split(':')[0],'minutes': availabilities[id].startingTime.split(':')[1],'days': weekDays.indexOf(availabilities[id].dayOfWeek)});
            const endingAv = moment().set({'hours': availabilities[id].endingTime.split(':')[0],'minutes': availabilities[id].endingTime.split(':')[1],'days': weekDays.indexOf(availabilities[id].dayOfWeek)});
            const endingMoment = moment().set({'hours':endingTime.split(':')[0],'minutes':endingTime.split(':')[1],'days': weekDays.indexOf(dayOfWeek)});
            const startingMoment = moment().set({ 'hours':startingTime.split(':')[0],'minutes':startingTime.split(':')[1],'days': weekDays.indexOf(dayOfWeek)});
            if(endingMoment.isBetween(startAv,endingAv,null,"[]")){
                return dispatch(broadcastErrorMessage('Ending time is between another schedule!'));
            } else if(startingMoment.isBetween(startAv,endingAv,null,"[]")){
                return dispatch(broadcastErrorMessage('Starting time is between another schedule!'));
            }
        }
        return firebaseRef.child(`users/${uid}/availability`).push({dayOfWeek,startingTime,endingTime}).then((result)=>{
            dispatch(broadcastSuccessMessage("Schedule successfully added!"));
        }, (error) => {
            dispatch(broadcastErrorMessage(error.message));
            return error;
        });
        
    }
}

export function startRemoveSchedule(scheduleId, duoId) {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        if(duoId){
            var availabilityRef = firebaseRef.child(`users/${uid}/availability/${scheduleId}`)
            availabilityRef
                .once("value")
                .then((snapshot) => {
                    const snapshotValue = snapshot.val();
                    var updates = {
                        userId: null,
                        isFilled: false
                    }
                    firebaseRef
                        .child(`users/${duoId}/availability`).orderByChild('userId').equalTo(uid).once("value")
                        .then((snapshot) => {
                            const value = snapshot.val();
                            for (var id in value) {
                                if (JSON.stringify(value[id]) === JSON.stringify({
                                    ...snapshotValue,
                                    userId: uid,
                                    isFilled: true
                                })) {
                                    firebaseRef.child(`users/${duoId}/availability/${id}`).update(updates);
                                }
                            };
                        })
                });
        } 
        return firebaseRef.child(`users/${uid}/availability/${scheduleId}`).remove().then((result)=>{
            dispatch(broadcastSuccessMessage('Schedule successfully deleted!'));
        },(error)=>{
            dispatch(broadcastErrorMessage(error.message));
        });
    }
        
}

export function startRemoveDuoSchedule(scheduleId, duoId) {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        var availabilityRef = firebaseRef.child(`users/${uid}/availability/${scheduleId}`)
        availabilityRef
            .once("value")
            .then((snapshot) => {
                const snapshotValue = snapshot.val();
                var updates = {
                    userId: null,
                    isFilled: false
                }
                firebaseRef.child(`users/${duoId}/availability`).orderByChild('userId').equalTo(uid).once("value").then((snapshot)=>{
                    const value = snapshot.val();
                    for(var id in value){
                        if(JSON.stringify(value[id]) === JSON.stringify({...snapshotValue,userId:uid,isFilled:true})){ 
                            return availabilityRef.update(updates).then((result) => {
                                return firebaseRef.child(`users/${duoId}/availability/${id}`).update(updates);
                            });
                        }
                    };
                })
                });
    }
}

export function startDeclineRequest(requestId) {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        firebaseRef
            .child(`users/${uid}/requests/${requestId}`)
            .remove();
    }
}

export function startSendRequest(requestInfo, id) {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        requestInfo.map(request => {
            return {user: uid, availabilityId: request.id};
        }).forEach((request) => {
            firebaseRef
                .child(`users/${id}/requests`)
                .push(request);
        });
    }
}
