import {ADD_AVAILABILITIES} from "../actions/types";

export default function availabilityReducer(state = {}, action) {
    switch (action.type) {
        case ADD_AVAILABILITIES:
            return action.availabilities;
        default:
            return state;
    }
}