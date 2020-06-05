import {ADD_TO_CART, DELETE_FROM_CART, EDIT_FROM_CART, SET_DESCRIPTION_TO_CART, SET_TO_CART} from "./orderActionTypes";

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const saveDescriptionToLocalStorage = (description) => {
    localStorage.setItem('description', JSON.stringify(description));
};

export const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');

    if (!savedCart) {
        return [];
    }

    try {
        return JSON.parse(savedCart);
    } catch {
        return [];
    }
};

export const loadDescriptionFromLocalStorage = () => {
    const savedDescription = localStorage.getItem('description');

    if (!savedDescription) {
        return '';
    }

    try {
        return JSON.parse(savedDescription);
    } catch {
        return '';
    }
};

const initialState = {
    /*
     cart: {
         productId: string,
         amount: string,
         currency: string,
         totalPrice: number,
     }[];

     */
    cart: loadCartFromLocalStorage(),
    description: loadDescriptionFromLocalStorage()
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DESCRIPTION_TO_CART: {
            saveDescriptionToLocalStorage(action.description);
            return {
                ...state,
                description: action.description
            }
        }
        case ADD_TO_CART:
        case EDIT_FROM_CART:
        case SET_TO_CART:
        case DELETE_FROM_CART: {
            saveCartToLocalStorage(action.cart);
            return {
                ...state,
                cart: action.cart,
            }
        }
        default: {
            return state
        }
    }
};
