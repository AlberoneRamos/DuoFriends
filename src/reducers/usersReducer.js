import {ADD_USERS} from "../actions/types";

export default function usersReducer(state=[],action){
    switch(action.type){
        case ADD_USERS:
            return action.users;
        default:
            return state;
    }
}