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
import React from "react";
import {store} from "react-notifications-component";
import {Notification} from "../../../view/components/Notification/Notification";
import {addNotification} from "../auxiliary/auxiliaryActions";

const initialState = {
    currentUser: {},
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

//const navigationClick = () => {
//  useHistory.push({
//    pathname: '/chat',
//})
//};

const displayNotification = (notification) => {
    store.addNotification({
        content: <Notification notification={notification}/>,
        container: 'bottom-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 5000
        }
    });
      addNotification(notification)
};

const functionNotification = (action, state) => {
    const messageEvent = action.message;
    const threads = [...state.threads];
    const igProfile = state.igProfile;
    const threadIndex = threads.findIndex(item => item.thread_id === messageEvent.thread_id);
    const threadToMove = threads.splice(threadIndex, 1)[0];
    threadToMove.last_permanent_item = messageEvent.message;
    threadToMove.items.push(messageEvent.message);
    const newThreads = [threadToMove];

    displayNotification({
        icon: threadToMove.inviter.profile_pic_url,
        text: messageEvent.item_type === 'text' ? messageEvent.text : 'Unsupported content',
        username: igProfile.username,
        date: new Date(),
        status: 'message',
    });

    return newThreads;
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
            const newThreads = functionNotification(action.message, state);
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
