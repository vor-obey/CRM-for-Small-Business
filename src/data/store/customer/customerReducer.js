import {
    ADD_CUSTOMER_DETAIL,
    CLEAN_CUSTOMER_DETAILS, CREATE_CUSTOMER_FAIL,
    CREATE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS, GET_CUSTOMER_BY_ID_FAIL,
    GET_CUSTOMER_BY_ID_SUCCESS, GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS, GET_SOURCES_FAIL,
    GET_SOURCES_SUCCESS, UPDATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_SUCCESS,
} from "./customerActionTypes";
import {AsyncState} from "../helpers/reduxHelpers";

const initialState = {
    customers: [],
    sources: null,
    customerStatus:  new AsyncState(),
    details: {
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: '',
    },
    customerDetails: null
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER_DETAIL: {
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.detail
                }
            }
        }
        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                customerStatus:  new AsyncState(false, true, true),
            }
        case GET_CUSTOMERS_FAIL:
            return {
                ...state,
                customerStatus:  new AsyncState(false, false, true),
            }
        case GET_SOURCES_SUCCESS:
            return {
                ...state,
                sources: action.payload
            }
        case GET_SOURCES_FAIL:
            return {
                ...state,
                customerStatus:  new AsyncState(false, false, true),
            }
        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [...state.customers, action.payload]
            }
        case CREATE_CUSTOMER_FAIL:
            return {
                ...state,
                customerStatus:  new AsyncState(false, false, true),
            }
        case GET_CUSTOMER_BY_ID_SUCCESS:
            return {
                ...state,
                customerDetails: action.payload
            }
        case GET_CUSTOMER_BY_ID_FAIL:
            return {
                ...state,
                customerStatus:  new AsyncState(false, false, true),
            }
        case UPDATE_CUSTOMER_SUCCESS:
            let allCustomers = [...state.customers];
            const customerIndex = allCustomers.findIndex(el => el.customerId === action.payload.customerId);

            if (customerIndex !== -1) {
                allCustomers[customerIndex] = { ...action.payload };
            }
            return {
                ...state,
                customerDetails: action.payload,
                customers: allCustomers
            }
        case UPDATE_CUSTOMER_FAIL:
            return {
                ...state,
                customerStatus:  new AsyncState(false, false, true),
            }
        case DELETE_CUSTOMER_SUCCESS:
            const customers = state.customers.filter(person => person.customerId !== action.payload)
            return {
                ...state,
                customers
            }
        case DELETE_CUSTOMER_FAIL:
            return {
                ...state,
                customerStatus:  new AsyncState(false, false, true),
            }
        case CLEAN_CUSTOMER_DETAILS:
            return {
                ...state,
                customerDetails: null
            }
        default: {
            return state
        }
    }
};
