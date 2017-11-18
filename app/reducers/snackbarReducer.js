import {SUCCESS_MESSAGE, ERROR_MESSAGE} from "../actions/types";

export default function snackbarReducer(state = {}, action) {
    switch (action.type) {
        case SUCCESS_MESSAGE:
            return {
                message: action.message,
                type: 'success'
            };
        case ERROR_MESSAGE:
            return {
                message: action.message,
                type: 'error'
            }
        case 'REMOVE_MESSAGE':
            return {
            }
        default:
            return state;
    }
}