import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS,
    LOGIN,
    GET_USERS,
    GET_ROLES,
    GET_USER_BY_ID,
    CLEAN_USER_DETAILS,
    UPDATE_USER, DELETE_USER, CREATE_USER
} from "./userActionTypes";
import {createAction} from "../helpers/reduxHelpers";

export const getCurrentUser = () => ({type: GET_CURRENT_USER});

//TODO action данные отправляет всегда в ключе payload!
export const login = (loginData) => ({type: LOGIN, loginData});
export const setCurrentUser = (currentUser) => ({type: GET_CURRENT_USER_SUCCESS, currentUser});
export const getUserById = (userId) => ({type: GET_USER_BY_ID, payload: userId});
export const cleanUserDetails = () => ({type: CLEAN_USER_DETAILS});
export const updateUser = (userInput, id) => ({type: UPDATE_USER, payload: { userInput, id }});
export const deleteUser = (id) => ({type: DELETE_USER, payload: id});
export const createUser = (userInput) => ({type: CREATE_USER, payload: userInput});

export const getUsers = createAction(GET_USERS);
export const getRoles = createAction(GET_ROLES);
