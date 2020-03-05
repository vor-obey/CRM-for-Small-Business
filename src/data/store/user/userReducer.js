import {
    GET_CURRENT_USER_SUCCESS,
} from "./userActionTypes";

const initialState = {
    currentUser: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_SUCCESS:{
             return {
                 ...state,
                 currentUser: action.currentUser
             };
        }
        default: {
            return state;
        }
    }
};
