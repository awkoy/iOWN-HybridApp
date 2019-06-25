import {handleFetch} from "../utils/fetch";
import {performResult} from "../utils/stateManipulator";
import {reset} from 'redux-form';
import transformError from "../utils/transformServerErrors";
import history from '../history';
import EtherUtil from "../utils/ethers";

const initialState = {
    wallet: null,
    transactions: [],
    userInfo: {}
}

const USER_INFO_SENT = "USER_INFO_SENT";
const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
const USER_INFO_FAILED = "USER_INFO_FAILED";

const LOGOUT = "LOGOUT";

export const getUserInfo = () => dispatch => {
    dispatch({type: REGISTER_WALLET_SENT});
    return handleFetch("/profile/save-wallet", "POST", {wallet: wallet.address})
        .then(res => performResult(res, () => {
            dispatch({type: REGISTER_WALLET_SUCCESS});
            dispatch({type: CREATE_WALLET, wallet});
        }))
        .catch(err => dispatch({ type: REGISTER_WALLET_FAILED, err: transformError(err)}));
}