import {ValidationUtil} from "../utils/validationUtil";
import {ROUTE_CREATE_WALLET} from "../constants/routes";

import {handleFetch} from "../utils/fetch";
import {performResult} from "../utils/stateManipulator";
import EtherUtil from "../utils/ethers";
import history from '../history';
import {reset} from 'redux-form';

const initialState = {    
    fullName: {
        value: "",
        error: false,
        helperText: "",
    },
    phone: {
        value: "",
        error: false,
        helperText: "",
    },
    email: {
        value: "",
        error: false,
        helperText: "",
    },
    password: {
        value: "",
        error: false,
        helperText: "",
    },
    confirm: {
        value: "",
        error: false,
        helperText: "",
    },
    activeStep: 0,

    submitEnabled: false,
    submitLoading: false,
    serverError: "",

    mnemonicRaw: "",
    mnemonic: ["", "", "", "", "", "", "", "", "", "", "", ""],
    mnemonicConfirm: [],
    enabledIndexes: [],
    mnemonicNext: false,
    walletAddress: ""
};

const CHANGE_CURRENT_STEP = "CHANGE_CURRENT_STEP";
const CHANGE_START_INFO = "CHANGE_START_INFO";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const CHANGE_CONFIRM = "CHANGE_CONFIRM";

const REGISTER_SENT = "REGISTER_SENT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILED = "REGISTER_FAILED";

const REGISTER_WALLET_SENT = "REGISTER_WALLET_SENT";
const REGISTER_WALLET_SUCCESS = "REGISTER_WALLET_SUCCESS";
const REGISTER_WALLET_FAILED = "REGISTER_WALLET_FAILED";

const GENERATE_MNEMONIC = "GENERATE_MNEMONIC";
const NEXT_STEP_MNEMONIC = "NEXT_STEP_MNEMONIC";
const CHANGE_MNEMONIC_CONFIRM = "CHANGE_MNEMONIC_CONFIRM";

const CREATE_WALLET = "CREATE_WALLET";

export const changeCurrentStep = activeStep => ({ type: CHANGE_CURRENT_STEP, activeStep });
export const changeStartInfo = data => ({ type: CHANGE_START_INFO, data });
export const changePassword = password => ({type: CHANGE_PASSWORD, password });
export const changeConfirm = confirm => ({type: CHANGE_CONFIRM, confirm });


export const generateMnemonic = () => {
    const mnemonicRaw = EtherUtil.generateMnemonic();

    return {
        type: GENERATE_MNEMONIC,
        mnemonicRaw,
    }
};
export const enableNextMnemonicStep = (mnemonicConfirm, enabledIndexes) => ({ type: NEXT_STEP_MNEMONIC, mnemonicConfirm, enabledIndexes });
export const changeMnemonicConfirm = (value, index) => ({
    type: CHANGE_MNEMONIC_CONFIRM,
    index,
    value
});

export const handleCreateWallet = wallet => dispatch => {
    dispatch({type: REGISTER_WALLET_SENT});
    return handleFetch("/profile/save-wallet", "POST", {wallet: wallet.address})
        .then(res => performResult(res, () => {
            dispatch({type: REGISTER_WALLET_SUCCESS});
            dispatch({type: CREATE_WALLET, wallet});
        }))
        .catch(err => dispatch({ type: REGISTER_WALLET_FAILED, err}));
}

export const registerAccount = data => dispatch => {
    dispatch({type: REGISTER_SENT});
    
    return handleFetch("/sign-up", "POST", data)
        .then(res => performResult(res, () => {
            dispatch({type: REGISTER_SUCCESS});
            dispatch(reset('signup-start'));
            dispatch(reset('signup-end'));
            history.push(ROUTE_CREATE_WALLET);
        }))
        .catch(err => dispatch({ type: REGISTER_FAILED, err}));
};

export const signup = (state = initialState, action) => {
    let error;
    let newState;

    switch (action.type) {
        case CHANGE_CURRENT_STEP:
            return {...state, activeStep: action.activeStep};

        case CHANGE_START_INFO:
            error = !ValidationUtil.isValid(action.data.value);
            newState = {...state, [action.data.name]: {value: action.data.value, error}};

            return {
                ...newState,
                submitEnabled: isReadyToSubmit(newState),
            };

        case CHANGE_PASSWORD:
            error = ValidationUtil.isWeakPassword(action.password);
            newState = {...state, password: { value: action.password, error, helperText: error ? "Password is weak" : ""}};

            return {
                ...newState,
                submitEnabled: isReadyToSubmit(newState),
            };

        case CHANGE_CONFIRM:
            error = !(state.password.value.toLowerCase() === action.confirm.toLowerCase());
            newState = {...state, confirm: { value: action.confirm, error, helperText: error ? 'Password not confirmed' : ''}};

            return {
                ...newState,
                submitEnabled: isReadyToSubmit(newState),
            };

        case REGISTER_SENT:
            return {...state, submitLoading: true}

        case REGISTER_SUCCESS:
            return {...state, submitLoading: false, serverError: ""}

        case REGISTER_FAILED:
            return {...state, submitLoading: false, serverError: action.err}

        case REGISTER_WALLET_SENT:
            return {...state, submitLoading: true}
        
        case REGISTER_WALLET_SUCCESS:
            return {
                ...state, 
                submitLoading: false, 
                serverError: "",
                activeStep: 0,
                fullName: {
                    value: "",
                    error: false,
                    helperText: "",
                },
                phone: {
                    value: "",
                    error: false,
                    helperText: "",
                },
                email: {
                    value: "",
                    error: false,
                    helperText: "",
                },
                password: {
                    value: "",
                    error: false,
                    helperText: "",
                },
                confirm: {
                    value: "",
                    error: false,
                    helperText: "",
                },
            }
        
        case REGISTER_WALLET_FAILED:
            return {    
                ...state, 
                submitLoading: false, 
                serverError: action.err,
            }

        case GENERATE_MNEMONIC:
            return {
                ...state,
                mnemonicRaw: action.mnemonicRaw,
                mnemonic: action.mnemonicRaw.split(" "),
                mnemonicConfirm: action.mnemonicRaw.split(" "),
            };

        case NEXT_STEP_MNEMONIC: 
            return {
                ...state,
                mnemonicNext: true,
                mnemonicConfirm: action.mnemonicConfirm,
                enabledIndexes: action.enabledIndexes,
            }

        case CHANGE_MNEMONIC_CONFIRM:
            const {mnemonicConfirm} = state;
            mnemonicConfirm[action.index] = action.value;

            return {
                ...state,
                mnemonicConfirm,
            };

        case CREATE_WALLET:
            return {
                ...state,
                walletAddress: action.wallet.address,
            };

        default:
            return state;
    }
};

function isReadyToSubmit (state) {
    let options = {
        notEmpty: ["fullName", "email", "phone", "password", "confirm"], isValid: ["fullName", "email", "phone", "password", "confirm"]
    };

    return ValidationUtil.isReadyToSubmit(state, options);
}