import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // You can use other middleware like redux-saga if needed
import allReducers from "./reducers";

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;