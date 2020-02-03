import {GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS} from "./userActionTypes";

export const getOrdersSuccess = (orders) => {
    return {
        type: GET_ORDERS_SUCCESS,
        orders
    }
};

export const getOrdersFailure = (errorMessage) => {
    return {
        type: GET_ORDERS_FAILURE,
        errorMessage
    }
};