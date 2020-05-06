import {ADD_TO_CART, DELETE_FROM_CART, EDIT_FROM_CART, SET_TO_CART} from "./orderActionTypes";

export const addProductToCart = (product) => ({
    type: ADD_TO_CART,
    product,
});

export const deleteProductFromCart = (product) => ({
    type: DELETE_FROM_CART,
    product,
});

export const editProductFromCart = (product) => ({
    type: EDIT_FROM_CART,
    product,
});

export const setProductsToCart = (products) => ({
    type: SET_TO_CART,
    products: products,
});
