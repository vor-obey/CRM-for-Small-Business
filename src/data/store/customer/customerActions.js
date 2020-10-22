import {
    ADD_CUSTOMER_DETAIL,
    CLEAN_CUSTOMER_DETAILS,
    CREATE_CUSTOMER,
    DELETE_CUSTOMER,
    GET_CUSTOMER_BY_ID,
    GET_CUSTOMERS,
    GET_SOURCES,
    UPDATE_CUSTOMER,
} from "./customerActionTypes";

export const getCustomers = () => ({type: GET_CUSTOMERS});

export const cleanCustomerDetail = () => ({type: CLEAN_CUSTOMER_DETAILS});

export const createCustomer = (details) => ({
    type: CREATE_CUSTOMER,
    payload: details
})

export const addCustomerDetail = (detail) => ({
    type: ADD_CUSTOMER_DETAIL,
    detail
});

export const deleteCustomer = (id) => ({
    type: DELETE_CUSTOMER,
    payload: id
});

export const getCustomerById = (id) => ({
    type: GET_CUSTOMER_BY_ID,
    payload: id
});


export const updateCustomer = (customerDetails) => ({
    type: UPDATE_CUSTOMER,
    payload: customerDetails
});

export const getSources = () => ({
    type: GET_SOURCES,
});


