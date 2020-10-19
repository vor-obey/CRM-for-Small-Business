import {
    CLEAN_USER_DETAILS, CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS,
    GET_CURRENT_USER_SUCCESS,
    GET_ROLES,
    GET_ROLES_FAIL,
    GET_ROLES_SUCCESS,
    GET_USER_BY_ID,
    GET_USER_BY_ID_FAIL,
    GET_USER_BY_ID_SUCCESS,
    GET_USERS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS,
} from "./userActionTypes";
import {AsyncState} from "../helpers/reduxHelpers";

const initialState = {
    currentUser: {},
    users: [],
    usersStatus: new AsyncState(),
    userDetails: null,
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
        case GET_USER_BY_ID:
            return {
                ...state,
                usersStatus: new AsyncState(true, false, false)
            }
        case GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                userDetails: action.payload,
                usersStatus: new AsyncState(false, false, false)
            }
        case GET_USER_BY_ID_FAIL:
            return {
                ...state,
                usersStatus: new AsyncState(false, false, true)
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case CREATE_USER_FAIL:
            return {
                ...state,
                usersStatus: new AsyncState(false, false, false)
            }
        case DELETE_USER_SUCCESS:
            let allUsers = [...state.users];
            return {
                ...state,
                users: allUsers.filter(person => person.userId !== action.payload)
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                usersStatus: new AsyncState(false, false, true)
            }
        case UPDATE_USER_SUCCESS:
            let users = [...state.users];
            const userIndex = users.findIndex(el => el.userId === action.payload.id);

            if (userIndex !== -1) {
                users[userIndex] = { ...action.payload.userInput };
            }
            return {
                ...state,
                users
            }
        case UPDATE_USER_FAIL:
            return {
                ...state,
                usersStatus: new AsyncState(false, false, true)
            }
        case CLEAN_USER_DETAILS:
            return {
                ...state,
                userDetails: null,
            }
        default: {
            return state;
        }
    }
};
