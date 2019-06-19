import EtherUtil from "../utils/ethers";
import {ValidationUtil} from "../utils/validationUtil";

import {handleFetch} from "../utils/fetch";
import {performResult} from "../utils/stateManipulator";

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
};

const CHANGE_CURRENT_STEP = "CHANGE_CURRENT_STEP";
const CHANGE_START_INFO = "CHANGE_START_INFO";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const CHANGE_CONFIRM = "CHANGE_CONFIRM";

const REGISTER_SENT = "REGISTER_SENT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILED = "REGISTER_FAILED";

export const changeCurrentStep = activeStep => ({ type: CHANGE_CURRENT_STEP, activeStep });
export const changeStartInfo = data => ({ type: CHANGE_START_INFO, data });
export const changePassword = password => ({type: CHANGE_PASSWORD, password });
export const changeConfirm = confirm => ({type: CHANGE_CONFIRM, confirm });

export const registerAccount = data => dispatch => {
    dispatch({type: REGISTER_SENT});
    return handleFetch("/sign-up", "POST", data)
        .then(res => performResult(res, () => {
            dispatch({type: REGISTER_SUCCESS});
        }))
        .catch(err => dispatch({ type: REGISTER_FAILED, err}));
};

// GENERATE MNEM
// export const generateMnemonic = () => {
//     const mnemonicRaw = EtherUtil.generateMnemonic();

//     return {
//         type: GENERATE_MNEMONIC,
//         mnemonicRaw,
//     }
// };

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