import {handleFetch} from "../utils/fetch";
import {performResult} from "../utils/stateManipulator";
import {reset} from 'redux-form';
import transformError from "../utils/transformServerErrors";
import history from '../history';
import EtherUtil from "../utils/ethers";

const initialState = {
    wallet: null,

    transactions: [],
    userInfo: {
        fullName: "",
        phone: "",
        email: "",
        wallet: ""
    },
    userInfoLoaded: false,

    editUserInfoLoaded: false,
    editUserInfoSuccess: "",
    editUserInfoError: "",

    editPasswordLoaded: false,
    editPasswordSuccess: "",
    editPasswordError: "",
}

const GET_USER_INFO_SENT = "GET_USER_INFO_SENT";
const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";

const EDIT_USER_INFO_SENT = "EDIT_USER_INFO_SENT";
const EDIT_USER_INFO_SUCCESS = "EDIT_USER_INFO_SUCCESS";
const EDIT_USER_INFO_FAILED = "EDIT_USER_INFO_FAILED";

const EDIT_PASSWORD_SENT = "EDIT_PASSWORD_SENT";
const EDIT_PASSWORD_SUCCESS = "EDIT_PASSWORD_SUCCESS";
const EDIT_PASSWORD_FAILED = "EDIT_PASSWORD_FAILED";

const RESET_EDIT = "RESET_EDIT";

const LOGOUT = "LOGOUT";

export const getUserInfo = () => dispatch => {
    dispatch({type: GET_USER_INFO_SENT});
    return handleFetch("/profile", "GET")
        .then(res => performResult(res, () => {
            console.log(res)
            dispatch({type: GET_USER_INFO_SUCCESS, data: res.payload});
        }))
        .catch(err => dispatch({ type: GET_USER_INFO_FAILED, err: transformError(err)}));
}

export const editUserInfo = data => dispatch => {
    dispatch({type: EDIT_USER_INFO_SENT});
    return handleFetch("/profile", "PUT", data)
        .then(res => performResult(res, () => {
            dispatch({type: EDIT_USER_INFO_SUCCESS, data});
        }))
        .catch(err => dispatch({ type: EDIT_USER_INFO_FAILED, err: transformError(err)}));
}

export const editPassword = data => dispatch => {
    dispatch({type: EDIT_PASSWORD_SENT});
    return handleFetch("/password", "PUT", data)
        .then(res => performResult(res, () => {
            dispatch({type: EDIT_PASSWORD_SUCCESS, data});
            dispatch(reset('edit-password'));
        }))
        .catch(err => dispatch({ type: EDIT_PASSWORD_FAILED, err: transformError(err)}));
}

export const resetEdit = () => ({ type: RESET_EDIT });

export const dashboard = (state = initialState, action) => {
    let error;
    let newState;
    let transactions;

    switch (action.type) {
        case LOGOUT:
            return {...initialState, wallet: null};

        case GET_USER_INFO_SENT:
            return {...state, userInfoLoaded: true}

        case GET_USER_INFO_SUCCESS:
            return {...state, userInfo: action.data, userInfoLoaded: false}

        case EDIT_USER_INFO_SENT:
            return {...state, editUserInfoLoaded: true}
        
        case EDIT_USER_INFO_SUCCESS:
            return {...state, userInfo: {phone: action.data.phone, fullName: action.data.fullName}, editUserInfoLoaded: false, editUserInfoError: "", editUserInfoSuccess: "User info changed!"}

        case EDIT_USER_INFO_FAILED:
            return {...state, editUserInfoLoaded: false, editUserInfoError: action.err, editUserInfoSuccess: ""}

        case EDIT_PASSWORD_SENT:
            return {...state, editPasswordLoaded: true}
                
        case EDIT_PASSWORD_SUCCESS:
            return {...state, editPasswordLoaded: false, editPasswordError: "", editPasswordSuccess: "Your password changed!"}
        
        case EDIT_PASSWORD_FAILED:
            return {...state, editPasswordLoaded: false, editPasswordError: action.err, editPasswordSuccess: ""}

        case RESET_EDIT:
            return {...state, editUserInfoError: "", editUserInfoSuccess: "", editPasswordError: "", editPasswordSuccess: ""}

        default:
            return state;
    }
};