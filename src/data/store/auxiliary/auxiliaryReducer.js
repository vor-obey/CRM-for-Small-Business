import React from "react";
import {
    SET_SNACKBAR_STATUS,
    SET_IS_LOADING,
    RENDER_MODAL,
    CLOSE_MODAL,
    RENDER_DIALOG,
    CLOSE_DIALOG,
    ADD_NOTIFICATION
} from "./auxiliaryActionTypes";
import {store} from "react-notifications-component";
import {Notification} from "../../../view/components/Notification/Notification";

const initialState = {
    isLoading: false,
    snackBarStatus: {
        isOpen: false,
        message: '',
        success: true,
    },
    modal: {
        isOpen: false,
        children: null,
        onCloseHandler: null,
        allowBackDropClick: true,
    },
    dialog: {
        isShow: false,
        onCloseHandler: null,
        closeText: '',
        actionText: '',
        onAction: null,
        children: null,
    },
    notificationsArr: []
};

const displayNotification = (details) => {
    const location = window.location.pathname;
    if (location !== '/notifications' && location !== '/dashboard' && location !== '/chat') {
        store.addNotification({
            content: <Notification details={details}/>,
            container: 'bottom-right',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000
            }
        });
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
        case RENDER_MODAL: {
            return {
                ...state,
                modal: action.modal
            }
        }
        case RENDER_DIALOG: {
            return {
                ...state,
                dialog: action.dialog
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modal: {
                    ...initialState.modal
                }
            }
        }
        case CLOSE_DIALOG: {
            return {
                ...state,
                dialog: {
                    ...initialState.dialog
                }
            }
        }
        case ADD_NOTIFICATION: {
            displayNotification(action.notification);
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
