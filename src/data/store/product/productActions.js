import {SET_PRODUCT_DETAILS} from "./productActionTypes";

export const setProductDetailsToStore = (details) => ({
    type: SET_PRODUCT_DETAILS,
    details
});
