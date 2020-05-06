import {ADD_TO_CART, DELETE_FROM_CART, EDIT_FROM_CART, SET_TO_CART} from "./orderActionTypes";

const initialState = {
    cart: []
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.product],
            };
        }
        case DELETE_FROM_CART: {
            return {
                ...state,
                cart: [...(
                    state.cart.splice(
                        state.cart.findIndex((product) => product.productId === action.product.productId),
                        1
                    ) && state.cart
                )],
            }
        }
        case EDIT_FROM_CART: {
            return {
                ...state,
                cart: [...(
                    state.cart.splice(
                        state.cart.findIndex((product) => product.productId === action.product.productId),
                        1,
                        action.product
                    ) && state.cart
                )],
            };
        }
        case SET_TO_CART: {
            return {
                ...state,
                cart: action.products,
            }
        }
        default: {
            return state
        }
    }
};
