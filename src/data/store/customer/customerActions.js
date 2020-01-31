import {
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ALL_CUSTOMERS_FAILURE,
    GET_CUSTOMER_DETAILS_SUCCESS,
    GET_CUSTOMER_DETAILS_FAILURE,
    GET_CUSTOMER_DETAILS_LOADING,
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

export const getCustomerDetailsLoading = (loading) => {
    return {
        type: GET_CUSTOMER_DETAILS_LOADING,
        loading
    }
};


export const getCustomerDetailsSuccess = (customerDetails) => {
    return {
        type: GET_CUSTOMER_DETAILS_SUCCESS,
        customerDetails,
    }
};

export const getCustomerDetailsError = (error) => {
    return {
        type: GET_CUSTOMER_DETAILS_FAILURE,
        error
    }
};
