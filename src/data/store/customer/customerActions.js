import {
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ALL_CUSTOMERS_FAILURE,
} from "./customerActionTypes";


export const getAllCustomersSuccess = (customerList) => {
    return {
        type: GET_ALL_CUSTOMERS_SUCCESS,
        customerList,
    }
};

export const getAllCustomersError = (error) => {
    return {
        type: GET_ALL_CUSTOMERS_FAILURE,
        error
    }
};
