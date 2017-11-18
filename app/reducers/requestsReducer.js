import {ADD_REQUESTS} from "../actions/types";

export default function authReducer(state = [], action) {
    switch (action.type) {
        case ADD_REQUESTS:
            return action.requests
        default:
            return state;
    }
}