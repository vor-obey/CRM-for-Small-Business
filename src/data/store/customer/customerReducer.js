import {
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ALL_CUSTOMERS_FAILURE,
} from "./customerActionTypes";

const initialState = {
    customerList: [],
    loading: false,
    createCustomerLoading: false,
    roles: [],
    error: "",
    setNewCustomerError: "",
    newCustomer: null
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
        default: {
            return state;
        }
    }
};
