import {
    CLOSE_CHAT_WIDGET,
    DELETE_IG_INTEGRATION,
    OPEN_CHAT_WIDGET,
    SET_CHAT_INIT,
    SET_IG_PROFILE,
    SET_IS_AUTO_CONNECT_TO_CHAT,
    SET_IS_IG_EXISTS,
    SET_IS_IG_INTEGRATED, SET_NEW_MESSAGE_TO_THREAD,
    SET_SOCKET,
    SET_SOCKET_ERROR,
    SET_THREADS
} from "./chatActionTypes";

const initialState = {
    isIgIntegrated: false,
    isIgExists: false,
    isAutoConnectToChat: false,
    chatInit: false,
    igProfile: null,
    isChatWidgetOpened: false,
    threads: [],
    error: null,
    socket: null,
};

export const refreshThreads = (action, threads) => {
    const messageEvent = action.payload;
    const threadIndex = threads.findIndex(item => item.thread_id === messageEvent.thread_id);
    /* TODO
    вот тут то и бага, если сообщение в треде, которого нет на клиенте, то оно вернёт инднкс
    -1, и splice вытащит последний тред из массива
     */
    const threadToMove = threads.splice(threadIndex, 1)[0];
    threadToMove.last_permanent_item = messageEvent;
    threadToMove.items.push(messageEvent);
    return [threadToMove, ...threads];
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET: {
            return {
                ...state,
                socket: action.socket
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
        case SET_NEW_MESSAGE_TO_THREAD: {
            const newThreads = refreshThreads(action, state.threads);
            return {
                ...state,
                threads: newThreads,
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
