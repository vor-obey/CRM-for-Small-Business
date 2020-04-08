import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS, LOGIN,
} from "./userActionTypes";

export const getCurrentUser = () => {
    return {
        type: GET_CURRENT_USER,
    }
};

export const login = (loginData) => {
    return {
        type: LOGIN,
        loginData
    }
};

export const setCurrentUser = (currentUser) => {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        currentUser
    }
};