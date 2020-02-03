import {
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ALL_CUSTOMERS_FAILURE,
    GET_CUSTOMER_DETAILS_SUCCESS,
    GET_CUSTOMER_DETAILS_FAILURE,
    SET_CUSTOMER_DETAILS_LOADING,
    SET_CUSTOMER_DETAILS_SUCCESS,
    SET_CUSTOMER_DETAILS_FAILURE,
    DELETE_CUSTOMER_LOADING,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
    PATCH_CUSTOMER_LOADING,
    PATCH_CUSTOMER_SUCCESS,
    PATCH_CUSTOMER_FAILURE,
    SET_CUSTOMER_DETAILS_CREATED,
} from "./customerActionTypes";

const initialState = {
    customerList: [],
    loading: false,
    roles: [],
    error: "",
    setNewCustomerError: "",
    newCustomer: null,
    isNewCustomerCreated: false,
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                customerList: action.customerList,
            };
        }
        case GET_ALL_CUSTOMERS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case GET_CUSTOMER_DETAILS_SUCCESS: {
            return {
                ...state,
                customerDetails: action.customerDetails,
            }
        }
        case GET_CUSTOMER_DETAILS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case SET_CUSTOMER_DETAILS_LOADING: {
            return  {
                ...state,
                newCustomer: null,
                loading: true
            };
        }
        case SET_CUSTOMER_DETAILS_SUCCESS: {
            return {
                ...state,
                newCustomer: action.newCustomer,
                loading: false
            };
        }
        case SET_CUSTOMER_DETAILS_FAILURE: {
            return {
                ...state,
                loading: false,
                setNewCustomerError: action.setNewCustomerError,
            };
        }
        case SET_CUSTOMER_DETAILS_CREATED: {
            return {
                ...state,
                isNewCustomerCreated: action.isNewCustomerCreated
            }
        }

        case DELETE_CUSTOMER_LOADING:
        case DELETE_CUSTOMER_SUCCESS: {
            return {
                ...state,
                deleteCustomerSuccess: action.deleteCustomerSuccess
            }
        }
        case DELETE_CUSTOMER_FAILURE: {
            return {
                ...state,
                deleteCustomerError: action.deleteCustomerError
            }
        }
        case PATCH_CUSTOMER_LOADING:
        case PATCH_CUSTOMER_SUCCESS: {
            return {
                ...state,
                patchCustomer: action.patchCustomer
            }
        }
        case PATCH_CUSTOMER_FAILURE: {
            return {
                ...state,
                patchCustomerFailure: action.patchCustomerFailure
            }
        }
        default: {
            return state;
        }
    }
};
