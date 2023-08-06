import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // You can use other middleware like redux-saga if needed
import allReducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;