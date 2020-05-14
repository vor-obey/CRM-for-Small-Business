import {ADD_CUSTOMER_DETAILS} from "./customerActionTypes";

export const addCustomerDetails = (detail) => ({
    type: ADD_CUSTOMER_DETAILS,
    detail
});
