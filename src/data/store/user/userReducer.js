import {
    SET_USER_LOADING,
    GET_ALL_USERS_LOADING,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR } from "./userActionTypes";

const initialState = {
    currentUser: null,
    userList: [],
    loading: false,
    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOADING: {
            return {
                ...state,
                loading: action.loading,
            };
        }
        case GET_ALL_USERS_LOADING: {
            return {
                ...state,
                loading: action.loading,
                error:''
            };
        }
        case GET_ALL_USERS_SUCCESS: {
            return {
                ...state,
                userList: action.userList,
            };
        }
        case GET_ALL_USERS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
};
