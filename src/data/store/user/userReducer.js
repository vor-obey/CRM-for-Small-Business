import {
    GET_CURRENT_USER_SUCCESS,
    SET_IG_PROFILE,
    ADD_MESSAGE,
    SET_THREADS,
    OPEN_CHAT_WIDGET, CLOSE_CHAT_WIDGET,
    SET_SOCKET_ERROR,
    SET_SOCKET
} from "./userActionTypes";

const initialState = {
    currentUser: {},
    igProfile: null,
    isChatWidgetOpened: true,
    messages: [],
    threads: [],
    error: null,
    socket: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET: {
            return {
                ...state,
                socket: action.socket
            };
        }
        case GET_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                currentUser: action.currentUser
            };
        }
        case SET_SOCKET_ERROR: {
            return {
                ...state,
                error: action.payload
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
