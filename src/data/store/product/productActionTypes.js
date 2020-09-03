import {AsyncActions} from "../helpers/reduxHelpers";

export const SET_PRODUCT_DETAILS = 'SET_PRODUCT_DETAILS';

export const GET_PRODUCTS_ACTIONS = AsyncActions('GET_PRODUCTS');
export const [
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL
] = GET_PRODUCTS_ACTIONS;

