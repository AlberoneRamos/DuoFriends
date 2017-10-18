import usersReducer from "./usersReducer";
import {
    combineReducers
} from 'redux';


const state = combineReducers({
    users: usersReducer
});



export default state;