import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // You can use other middleware like redux-saga if needed
import allReducers from "./reducers";
import { persistStore } from "redux-persist";
import { fetchSensors } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(fetchSensors());
const persistor = persistStore(store);

export { store, persistor };