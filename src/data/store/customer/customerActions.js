import {
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ALL_CUSTOMERS_FAILURE,
    GET_CUSTOMER_DETAILS_SUCCESS,
    GET_CUSTOMER_DETAILS_FAILURE,
    GET_CUSTOMER_DETAILS_LOADING,
    SET_CUSTOMER_DETAILS_LOADING,
    SET_CUSTOMER_DETAILS_SUCCESS,
    SET_CUSTOMER_DETAILS_FAILURE,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
    PATCH_CUSTOMER_LOADING,
    PATCH_CUSTOMER_SUCCESS,
    PATCH_CUSTOMER_FAILURE,
    SET_CUSTOMER_DETAILS_CREATED,
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

export const setNewCustomerLoading = (loading) => {
    return {
        type: SET_CUSTOMER_DETAILS_LOADING,
        loading
    }
};

export const setNewCustomerSuccess = (newCustomer) => {
    return {
        type: SET_CUSTOMER_DETAILS_SUCCESS,
        newCustomer
    }
};

export const setNewCustomerFailure = (error) => {
    return {
        type: SET_CUSTOMER_DETAILS_FAILURE,
        error
    }
};

export const setNewCustomerCreated = (isNewCustomerCreated) => {
    return{
        type: SET_CUSTOMER_DETAILS_CREATED,
        isNewCustomerCreated
    }
};

export const deleteCustomerSuccess = (deleteCustomerSuccess) => {
    return {
        type: DELETE_CUSTOMER_SUCCESS,
        deleteCustomerSuccess,
    }
};

export const deleteCustomerFailure = (deleteCustomerFailure) => {
    return {
        type: DELETE_CUSTOMER_FAILURE,
        deleteCustomerFailure,
    }
};

export  const patchCustomerLoading = (loading) => {
    return {
        type: PATCH_CUSTOMER_LOADING,
        loading,
    }
};

export const patchCustomerSuccess = (patchCustomer) => {
    return {
        type: PATCH_CUSTOMER_SUCCESS,
        patchCustomer,
    }
};

export const patchCustomerFailure = (patchCustomerFailure) => {
    return {
        type: PATCH_CUSTOMER_FAILURE,
        patchCustomerFailure,
    }
};
