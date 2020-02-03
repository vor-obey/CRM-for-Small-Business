import {GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS} from "./userActionTypes";

const initialState = {
  orders: [],
  errorMessage: ''
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ORDERS_SUCCESS: {
          return {
              ...state,
              orders: action.orders
          }
      }
      case GET_ORDERS_FAILURE: {
          return {
              ...state,
              orders: [],
              errorMessage: action.errorMessage
          }
      }
      default: {
          return state;
      }
  }
};