import sensorsReducer from "./sensors";
import authReducer from "./auth";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    sensors: sensorsReducer,
    auth: authReducer,
});

export default allReducers;