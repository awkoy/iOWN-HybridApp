import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {createStore, applyMiddleware, combineReducers} from "redux";

import {signup} from "./signup";

const reducer = combineReducers({
    signup,
});

export function initializeStore(initialState = {}, options = {}) {
    const middleware = [thunkMiddleware];
    if (!options.isServer) {
        middleware.push(createLogger());
    }
    return createStore(reducer, initialState, applyMiddleware(...middleware));
}