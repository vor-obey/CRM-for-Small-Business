import {
    LOGIN_FAILURE,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
} from "./userActionTypes";

export const userLoginFailure = (loginError) => {
    return {
        type: LOGIN_FAILURE,
        loginError
    }
};

export const setCurrentUser = (currentUser) => {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        currentUser
    }
};

export const getCurrentUserFailure = (currentUser) => {
    return {
        type: GET_CURRENT_USER_FAILURE,
        currentUser
    }
};