import {
    GET_CURRENT_USER_SUCCESS,
    GET_ROLES,
    GET_ROLES_FAIL,
    GET_ROLES_SUCCESS,
    GET_USERS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
} from "./userActionTypes";
import {AsyncState} from "../helpers/reduxHelpers";

const initialState = {
    currentUser: {},
    users: [],
    usersStatus: new AsyncState(),
    roles: [],
    rolesStatus: new AsyncState(),
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                currentUser: action.currentUser
            };
        }
        case GET_USERS:
            return {
                ...state,
                usersStatus: new AsyncState(true, false, false)
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                usersStatus: new AsyncState(false, true, false)
            }
        case GET_USERS_FAIL:
            return {
                ...state,
                usersStatus: new AsyncState(false, false, true)
            }
        case GET_ROLES:
            return {
                ...state,
                rolesStatus: new AsyncState(true, false, false)
            }
        case GET_ROLES_SUCCESS:
            return  {
                ...state,
                roles: action.payload
            }
        case GET_ROLES_FAIL:
            return  {
                ...state,
                rolesStatus: new AsyncState(false, false, true)
            }
        default: {
            return state;
        }
    }
};
