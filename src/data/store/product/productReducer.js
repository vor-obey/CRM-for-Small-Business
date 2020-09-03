import {GET_PRODUCTS, GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS, SET_PRODUCT_DETAILS} from "./productActionTypes";
import {AsyncState} from "../helpers/reduxHelpers";

const initialState = {
   details: {
       name: '',
       price: ''
   },
   productsStatus: new AsyncState(),
   products: []
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_DETAILS: {
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.details
                }
            }
        }
        case GET_PRODUCTS:
            return {
                ...state,
                productsStatus: new AsyncState(true, false, false)
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                productsStatus: new AsyncState(false, true, false)
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        default: {
            return state
        }
    }
};
