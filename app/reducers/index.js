import usersReducer from "./usersReducer";
import {
    combineReducers
} from 'redux';
import {reducer as formReducer} from 'redux-form';

const state = combineReducers({
    users: usersReducer,
    form: formReducer
});



export default state;