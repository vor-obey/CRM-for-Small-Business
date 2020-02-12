import {SET_SNACKBAR_STATUS, SET_IS_LOADING} from "./auxiliaryActionTypes";

export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
};

export const setSnackBarStatus = ({isOpen, errorMessage}) => {
    return {
        type: SET_SNACKBAR_STATUS,
        snackBarStatus: {isOpen, errorMessage}
    }
};
