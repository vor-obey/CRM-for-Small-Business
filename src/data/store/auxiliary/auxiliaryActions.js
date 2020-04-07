import {SET_SNACKBAR_STATUS, SET_IS_LOADING, ADD_NOTIFICATION} from "./auxiliaryActionTypes";

export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
};

export const setSnackBarStatus = ({isOpen, message, success}) => {
    return {
        type: SET_SNACKBAR_STATUS,
        snackBarStatus: {isOpen, message, success}
    }
};

export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
        notification
    }
};
