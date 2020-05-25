import {
    GET_CURRENT_USER_SUCCESS,
    SET_IG_PROFILE,
    ADD_MESSAGE,
    SET_THREADS,
    OPEN_CHAT_WIDGET,
    CLOSE_CHAT_WIDGET,
    SET_SOCKET_ERROR,
    SET_SOCKET,
    SET_IS_IG_INTEGRATED,
    SET_IS_IG_EXISTS,
    SET_IS_AUTO_CONNECT_TO_CHAT,
    SET_CHAT_INIT, DELETE_IG_INTEGRATION
} from "./userActionTypes";

const initialState = {
    currentUser: {},
    isIgIntegrated: false,
    isIgExists: false,
    isAutoConnectToChat: false,
    chatInit: false,
    igProfile: null,
    isChatWidgetOpened: false,
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
            const messageEvent = action.message;
            const threads = [...state.threads];
            const threadIndex = threads.findIndex(item => item.thread_id === messageEvent.message.thread_id);
            const threadToMove = threads.splice(threadIndex, 1)[0];
            threadToMove.last_permanent_item = messageEvent.message;
            threadToMove.items.push(messageEvent.message);
            const newThreads = [threadToMove, ...threads];
            return {
                ...state,
                threads: newThreads,
                messages: [...state.messages, messageEvent.message]
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
        case SET_IS_IG_INTEGRATED: {
            return {
                ...state,
                isIgIntegrated: action.value
            }
        }
        case SET_IS_IG_EXISTS: {
            return {
                ...state,
                isIgExists: action.value
            }
        }
        case SET_IS_AUTO_CONNECT_TO_CHAT: {
            return {
                ...state,
                isAutoConnectToChat: action.value
            }
        }
        case SET_CHAT_INIT: {
            return {
                ...state,
                chatInit: action.value
            }
        }
        case DELETE_IG_INTEGRATION: {
            return {
                ...state,
                isIgIntegrated: false,
                isIgExists: false,
                isAutoConnectToChat: false,
                chatInit: false,
                igProfile: null,
                messages: [],
                threads: [],
                error: null,
                socket: null
            }
        }
        default: {
            return state;
        }
    }
};
