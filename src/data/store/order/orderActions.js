import {ADD_TO_CART, DELETE_FROM_CART, EDIT_FROM_CART, SET_TO_CART} from "./orderActionTypes";

export const addProductToCart = (cart) => ({
    type: ADD_TO_CART,
    cart,
});

export const deleteProductFromCart = (cart) => ({
    type: DELETE_FROM_CART,
    cart,
});

export const editProductFromCart = (cart) => ({
    type: EDIT_FROM_CART,
    cart,
});

export const setProductsToCart = (cart) => ({
    type: SET_TO_CART,
    cart,
});
