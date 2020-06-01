import {SET_PRODUCT_DETAILS} from "./productActionTypes";

const initialState = {
   details: {
       name: '',
       price: ''
   }
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_DETAILS: {
           return {
               ...state,
               details: action.details
           }
        }
        default: {
            return state
        }
    }
};
