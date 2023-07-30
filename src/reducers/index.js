import sensorsReducer from "./sensors";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    sensors: sensorsReducer
});

export default allReducers;