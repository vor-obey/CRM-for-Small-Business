import {
    SET_SNACKBAR_STATUS,
    SET_IS_LOADING,
    RENDER_MODAL,
    CLOSE_MODAL,
    RENDER_DIALOG,
    CLOSE_DIALOG,
    ADD_NOTIFICATION
} from "./auxiliaryActionTypes";

const initialState = {
    isLoading: false,
    snackBarStatus: {
        isOpen: false,
        message: '',
        success: true,
    },
    modal: {
        isOpen: false,
        classes: {},
        children: null,
        onCloseHandler: null
    },
    dialog: {
        isShow: false,
        onCloseHandler: null,
        closeText: '',
        actionText: '',
        onAction: null,
        children: null,
    },
    notificationsArr: [],
    info: {
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: '',
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
