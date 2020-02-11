import {SET_ERROR_MESSAGE, SET_IS_LOADING, SET_IS_OPEN} from "./auxiliaryActionTypes";

export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
};

export const setIsOpen = (isOpen) => {
    return {
        type: SET_IS_OPEN,
        isOpen
    }
};

export const setErrorMessage = (errorMessage) => {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage
    }
};