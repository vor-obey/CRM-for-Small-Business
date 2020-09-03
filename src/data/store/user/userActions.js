import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS,
    LOGIN,
    GET_USERS, GET_ROLES
} from "./userActionTypes";
import {createAction} from "../helpers/reduxHelpers";

export const getCurrentUser = () => ({type: GET_CURRENT_USER});

//TODO action данные отправляет всегда в ключе payload!
export const login = (loginData) => ({type: LOGIN, loginData});
export const setCurrentUser = (currentUser) => ({type: GET_CURRENT_USER_SUCCESS, currentUser});

export const getUsers = createAction(GET_USERS);
export const getRoles = createAction(GET_ROLES);
