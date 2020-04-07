import {SET_SNACKBAR_STATUS, SET_IS_LOADING, ADD_NOTIFICATION} from "./auxiliaryActionTypes";

const initialState = {
    isLoading: false,
    snackBarStatus: {
        isOpen: false,
        message: '',
        success: true,
    },
    notificationsArr: []
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
        case ADD_NOTIFICATION: {
            return {
                ...state,
                notificationsArr: [...state.notificationsArr, action.notification]
            }
        }
        default: {
            return state
        }
    }
};
