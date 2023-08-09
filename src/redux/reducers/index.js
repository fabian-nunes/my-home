import sensorsReducer from "./sensors";
import authReducer from "./auth";
import { combineReducers } from 'redux';
import {configurePersist} from "../persistConfig";

const allReducers = combineReducers({
    sensors: sensorsReducer,
    auth: authReducer,
});

export default configurePersist(allReducers);