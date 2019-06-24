import {ValidationUtil} from "../utils/validationUtil";
import {ROUTE_DASHBOARD} from "../constants/routes";

import {RegExps} from "../constants/regExps";
import {handleFetch} from "../utils/fetch";
import {performResult} from "../utils/stateManipulator";
import EtherUtil from "../utils/ethers";
import history from '../history';

const initialState = {    
    loginMnemonic: {
        value: ["", "", "", "", "", "", "", "", "", "", "", ""],
        error: false,
        helperText: "",
    },
    walletPassword: localStorage.getItem("wallet-password"),

    activeStep: 1,

    failed: false,
    error: "",
};

const LOGIN_WALLET_SENT = "LOGIN_WALLET_SENT";
const LOGIN_WALLET_SUCCESS = "LOGIN_WALLET_SUCCESS";
const LOGIN_WALLET_FAILED = "LOGIN_WALLET_FAILED";

const LOGIN_EMAIL_SENT = "LOGIN_EMAIL_SENT";
const LOGIN_EMAIL_SUCCESS = "LOGIN_EMAIL_SUCCESS";
const LOGIN_EMAIL_FAILED = "LOGIN_EMAIL_FAILED";

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

export const loginWithWallet = (wallet, password) => dispatch => {
    dispatch({type: LOGIN_WALLET_SENT});
    return handleFetch("/sign-in/wallet", "POST", {
        wallet: wallet.address,
        password
    })
        .then(res => performResult(res, () => {
            dispatch({type: LOGIN_WALLET_SUCCESS});
            history.push(ROUTE_DASHBOARD);
        }))
        .catch(err => dispatch({ type: LOGIN_WALLET_FAILED, err}));
};

export const loginWithEmail = ({ email, password }) => dispatch => {
    dispatch({type: LOGIN_EMAIL_SENT});
    return handleFetch("/sign-in/email", "POST", {
        email,
        password
    })
        .then(res => performResult(res, () => {
            dispatch({type: LOGIN_EMAIL_SUCCESS}, res);
            return res
        }))
        .catch(err => dispatch({ type: LOGIN_EMAIL_FAILED, err}));
};


export const signin = (state = initialState, action) => {
    let error;
    let newState;

    switch (action.type) {

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

        case LOGIN_WALLET_SENT:
            return {...state, failed: false, submitLoading: true};
            
        case LOGIN_WALLET_SUCCESS:
            return {...state, submitLoading: false};
            
        case LOGIN_WALLET_FAILED:
            return {...state, failed: true, error: action.err, submitLoading: false};

        case LOGIN_EMAIL_SENT:
            return {...state, failed: false, submitLoading: true};
                
        case LOGIN_EMAIL_SUCCESS:
            return {...state, submitLoading: false, activeStep: 2};
                
        case LOGIN_EMAIL_FAILED:
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