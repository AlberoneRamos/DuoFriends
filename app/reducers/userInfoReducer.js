import {ADD_USER_INFO} from "../actions/types";

export default function userInfoReducer(state = {}, action) {
    switch (action.type) {
        case ADD_USER_INFO:
            return action.payload;
        default:
            return state;
    }
}