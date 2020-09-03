import {AsyncActions} from "../helpers/reduxHelpers";

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const LOGIN = 'LOGIN';

export const [
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL
] = AsyncActions('GET_USERS');

export const [
    GET_ROLES,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAIL
] = AsyncActions('GET_ROLES');
