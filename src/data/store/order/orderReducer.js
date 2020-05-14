import {ADD_TO_CART, DELETE_FROM_CART, EDIT_FROM_CART, SET_TO_CART} from "./orderActionTypes";

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
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
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
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
