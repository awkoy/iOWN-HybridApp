import {ValidationUtil} from "../utils/validationUtil";
import {ROUTE_CREATE_WALLET} from "../constants/routes";

import {RegExps} from "../constants/regExps";
import {handleFetch} from "../utils/fetch";
import {performResult} from "../utils/stateManipulator";
import EtherUtil from "../utils/ethers";
import history from '../history';

const initialState = {    
    password: {
        value: "",
        error: false,
        helperText: "",
    },
    mnemonic: {
        value: ["", "", "", "", "", "", "", "", "", "", "", ""],
        error: false,
        helperText: "",
    },
    submitEnabled: false,
    submitLoading: false,

    walletPassword: localStorage.getItem("wallet-password"),
    walletJson: localStorage.getItem("wallet-json")
    
};

const LOGIN_SENT = "LOGIN_SENT";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const CHANGE_LOGIN_PASSWORD = "CHANGE_LOGIN_PASSWORD";
const CHANGE_MNEMONIC = "CHANGE_MNEMONIC";


export const changeLoginPassword = password => ({type: CHANGE_LOGIN_PASSWORD, password });

export const changeMnemonic = mnemonic => ({ type: CHANGE_MNEMONIC, mnemonic });

// export const registerAccount = data => dispatch => {
//     dispatch({type: REGISTER_SENT});
    
//     return handleFetch("/sign-up", "POST", data)
//         .then(res => performResult(res, () => {
//             dispatch({type: REGISTER_SUCCESS});
//             history.push(ROUTE_CREATE_WALLET);
//         }))
//         .catch(err => dispatch({ type: REGISTER_FAILED, err}));
// };

export const signin = (state = initialState, action) => {
    let error;
    let newState;

    switch (action.type) {
        case CHANGE_LOGIN_PASSWORD:
            error = ValidationUtil.isWeakPassword(action.password);
            newState = {...state, password: { value: action.password, error, helperText: error ? "Password is weak" : ""}}
            return {
                ...newState,
                submitEnabled: isReadyToSubmit(newState),
            };

            case CHANGE_MNEMONIC:
                const value = action.mnemonic ? action.mnemonic.toLowerCase() : action.mnemonic;
                const error = !ValidationUtil.isValid(action.mnemonic, RegExps.mnemonic);
                const newState = {
                    ...state,
                    mnemonic: {value, error, helperText: error ? "Mnemonic should be phrase of 12 words divided with a space" : ""},
                };
                return {...newState,  submitEnabled: isReadyToSubmit(newState)};

        default:
            return state;
    }
};

function isReadyToSubmit (state) {
    let options = {
        notEmpty: ["password"], isValid: ["password"]
    };

    return ValidationUtil.isReadyToSubmit(state, options);
}