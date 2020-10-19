import {AsyncActions} from "../helpers/reduxHelpers";

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAIL = 'GET_USER_BY_ID_FAIL';
export const CLEAN_USER_DETAILS = 'CLEAN_USER_DETAILS';
export const LOGIN = 'LOGIN';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL= 'DELETE_USER_FAIL';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const [
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
] = AsyncActions('GET_USERS');

export const [
    GET_ROLES,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAIL
] = AsyncActions('GET_ROLES');
