import {ValidationUtil} from "../utils/validationUtil";
import {ROUTE_DASHBOARD} from "../constants/routes";

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
    loginMnemonic: {
        value: ["", "", "", "", "", "", "", "", "", "", "", ""],
        error: false,
        helperText: "",
    },
    submitEnabled: false,
    submitLoading: false,

    walletPassword: localStorage.getItem("wallet-password"),
    walletJson: localStorage.getItem("wallet-json"),

    failed: false,
    error: "",
    
};

const LOGIN_SENT = "LOGIN_SENT";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const WALLET_NOT_FOUND = "WALLET_NOT_FOUND";

const CHANGE_LOGIN_PASSWORD = "CHANGE_LOGIN_PASSWORD";
const CHANGE_LOGIN_MNEMONIC = "CHANGE_LOGIN_MNEMONIC";


export const changeLoginPassword = password => ({type: CHANGE_LOGIN_PASSWORD, password });

export const walletNotFound = () => ({ type: WALLET_NOT_FOUND });

export const changeLoginMnemonic = (value, index) => ({
    type: CHANGE_LOGIN_MNEMONIC,
    index,
    value
});

export const login = (wallet, password) => dispatch => {
    dispatch({type: LOGIN_SENT, wallet});
    return handleFetch("/sign-in/wallet", "POST", {
        wallet: wallet.address,
        password
    })
        .then(res => performResult(res, () => {
            dispatch({type: LOGIN_SUCCESS});
            history.push(ROUTE_DASHBOARD);
        }))
        .catch(err => dispatch({ type: LOGIN_FAILED, err}));
};


export const signin = (state = initialState, action) => {
    let error;
    let newState;

    switch (action.type) {
        case CHANGE_LOGIN_PASSWORD:
            error = !(action.password === state.walletPassword);
            newState = {...state, password: { value: action.password, error, helperText: error ? "Password incorrect" : ""}}
            return {
                ...newState,
                submitEnabled: isReadyToSubmit(newState),
            };

            case CHANGE_LOGIN_MNEMONIC:
                const mnemonicArray = state.loginMnemonic.value;
                mnemonicArray[action.index] = action.value;

                const mnemonicString = mnemonicArray.join(' ').toString();
                error = !ValidationUtil.isValid(mnemonicString, RegExps.mnemonic);
                newState = {
                    ...state,
                    loginMnemonic: {value: mnemonicArray, error, helperText: error ? "Mnemonic should be phrase of 12 words divided with a space" : ""},
                };
                return {...newState,  submitEnabled: isReadyToSubmit(newState)};
            
            case WALLET_NOT_FOUND:
                return {...state, failed: true, error: "WALLET_NOT_FOUND"};

            case LOGIN_SENT:
                return {...state, failed: false, submitLoading: true};
            
            case LOGIN_SUCCESS:
                return {...state, submitLoading: false, mnemonic: {value: "", error: false, helperText: ""}, 
                    password: {
                        value: "",
                        error: false,
                        helperText: "",
                    }
                };
            
            case LOGIN_FAILED:
                return {...state, failed: true, error: action.err, submitLoading: false};

        default:
            return state;
    }
};

function isReadyToSubmit (state) {

    let fields = state.walletPassword ? "password" : "loginMnemonic";
    let options = {
        notEmpty: [fields], isValid: [fields]
    };

    return ValidationUtil.isReadyToSubmit(state, options);
}