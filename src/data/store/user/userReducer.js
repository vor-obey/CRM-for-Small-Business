import {
    GET_CURRENT_USER_SUCCESS,
    SET_IG_PROFILE,
    SET_IS_CONNECTED,
    ADD_MESSAGE,
    SET_THREADS,
    SET_IS_INTEGRATED,
    OPEN_CHAT_WIDGET, CLOSE_CHAT_WIDGET
} from "./userActionTypes";

const initialState = {
    currentUser: null,
    igProfile: null,
    isConnected: false,
    isIntegrated: false,
    isChatWidgetOpened: true,
    messages: [],
    threads: []
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                currentUser: action.currentUser
            };
        }
        case SET_IS_CONNECTED: {
            return {
                ...state,
                isConnected: action.isConnected
            }
        }
        case SET_IS_INTEGRATED: {
            return {
                ...state,
                isIntegrated: action.isIntegrated
            }
        }
        case SET_IG_PROFILE: {
            return {
                ...state,
                igProfile: action.igProfile
            }
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        }
        case SET_THREADS: {
            return {
                ...state,
                threads: action.threads
            }
        }
        case OPEN_CHAT_WIDGET: {
            return {
                ...state,
                isChatWidgetOpened: true
            }
        }
        case CLOSE_CHAT_WIDGET: {
            return {
                ...state,
                isChatWidgetOpened: false
            }
        }
        default: {
            return state;
        }
    }
};
