import {
    SET_USER_LOADING,
    GET_ALL_USERS_LOADING,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR,
    SET_NEW_USER_LOADING,
    SET_NEW_USER_SUCCESS,
    SET_NEW_USER_ERROR,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_LOADING,
    GET_USER_DETAILS_ERROR,
    LOGIN_FAILURE,
    LOGIN_SUCCESS
} from "./userActionTypes";

const initialState = {
    currentUser: null,
    userList: [],
    loading: false,
    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAILURE: {
            return {
                ...state,
                loginError: action.loginError
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                currentUser: action.user
            }

        }
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
        case SET_NEW_USER_LOADING: {
            return {
                ...state,
                loading: action.loading,
            };
        }
        case SET_NEW_USER_SUCCESS: {
            return {
                ...state,
                userList: action.userList,
            };
        }
        case SET_NEW_USER_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case GET_USER_DETAILS_SUCCESS: {
            return {
                ...state,
                userDetails: action.userDetails,
            }
        }
        case GET_USER_DETAILS_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case GET_USER_DETAILS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        default: {
            return state;
        }
    }
};