import {SET_SNACKBAR_STATUS, SET_IS_LOADING, SET_NOTIFICATION_STATUS} from "./auxiliaryActionTypes";

const initialState = {
    isLoading: false,
    snackBarStatus: {
        isOpen: false,
        message: '',
        success: true,
    },
    notificationStatus: {
        notification: ''
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
        case SET_NOTIFICATION_STATUS: {
            return {
                ...state,
                notificationStatus: action.notificationStatus
            }
        }
        default: {
            return state
        }
    }
};
