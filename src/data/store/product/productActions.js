import {GET_PRODUCTS, SET_PRODUCT_DETAILS} from "./productActionTypes";
import {createAction} from "../helpers/reduxHelpers";

export const setProductDetailsToStore = (details) => ({
    type: SET_PRODUCT_DETAILS,
    details
});

export const getProducts = createAction(GET_PRODUCTS)
