import {SET_SNACKBAR_STATUS, SET_IS_LOADING} from "./auxiliaryActionTypes";

const initialState = {
    isLoading: false,
    snackBarStatus: {
        isOpen: false,
        errorMessage: ''
    }
};

export const auxiliaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_SNACKBAR_STATUS: {
            return {
                ...state,
                snackBarStatus: action.snackBarStatus
            }
        }
        default: {
            return state
        }
    }
};
