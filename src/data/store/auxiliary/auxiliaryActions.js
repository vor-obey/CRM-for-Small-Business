import {
    SET_SNACKBAR_STATUS,
    SET_IS_LOADING,
    RENDER_MODAL,
    CLOSE_MODAL,
    RENDER_DIALOG,
    CLOSE_DIALOG,
    ADD_NOTIFICATION,
} from "./auxiliaryActionTypes";

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

export const renderModal = ({isOpen, children, onCloseHandler, allowBackDropClick}) => {
    return {
        type: RENDER_MODAL,
        modal: {isOpen, children, onCloseHandler, allowBackDropClick}
    }
};

export const renderDialog = ({title, isShow, onCloseHandler, closeText, actionText, onActionHandler, children}) => {
    return {
        type: RENDER_DIALOG,
        dialog: {title, isShow, onCloseHandler, closeText, actionText, onActionHandler, children}
    }
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    }
};

export const closeDialog = () => {
    return {
        type: CLOSE_DIALOG,
    }
};

export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
        notification
    }
};


