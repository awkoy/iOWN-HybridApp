import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {createStore, applyMiddleware, combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form'
;
import {signup} from "./signup";
import {signin} from "./signin";

const reducer = combineReducers({
    signup,
    signin,
    form: formReducer
});

export function initializeStore(initialState = {}, options = {}) {
    const middleware = [thunkMiddleware];
    if (!options.isServer) {
        middleware.push(createLogger());
    }
    return createStore(reducer, initialState, applyMiddleware(...middleware));
}