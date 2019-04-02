import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer";
import snackbarReducer from "./snackbarReducer";
import userInfoReducer from "./userInfoReducer";
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
    userInfo : userInfoReducer,
    availability : availabilityReducer,
    requests : requestsReducer,
});



export default state;