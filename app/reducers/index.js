import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer";
import snackbarReducer from "./snackbarReducer";
import availabilityReducer from "./availabilityReducer";
import {
    combineReducers
} from 'redux';
import {reducer as formReducer} from 'redux-form';

const state = combineReducers({
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
    snackbar : snackbarReducer,
    availability : availabilityReducer,
    requests : requestsReducer,
});



export default state;