import {ADD_AVAILABILITIES} from "../actions/types";

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case ADD_AVAILABILITIES:
            return action.availabilities;
        default:
            return state;
    }
}