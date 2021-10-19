import {combineReducers} from 'redux';
import ReloadReducer from '../Component/Admin/ReloadCityUtil/ReloadReducer';
import LoginReducer from "../Component/Admin/LoginUtil/LoginReducer";

const rootReducer = combineReducers({
    reloadCity: ReloadReducer,
    loginChecking: LoginReducer
});

export default rootReducer;