import {SET_USER_LOADING} from "./userActionTypes";

const initialState = {
    currentUser: null,
    userList: [],
    loading: false,
    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOADING: {
            return {
                ...state,
                loading: action.loading,
            };
        }
        default: {
            return state;
        }
    }
};
