import {
    ADD_MESSAGE,
    CLOSE_CHAT_WIDGET,
    DELETE_IG_INTEGRATION,
    INITIALIZE_IG_CHAT_CONNECTION,
    INITIALIZE_SOCKET_CONNECTION,
    OPEN_CHAT_WIDGET,
    SEND_MESSAGE,
    SET_CHAT_INIT,
    SET_CONNECTION_TO_CHAT_STORAGE,
    SET_IG_PROFILE,
    SET_IS_AUTO_CONNECT_TO_CHAT,
    SET_IS_IG_EXISTS,
    SET_IS_IG_INTEGRATED,
    SET_NEW_MESSAGE_TO_THREAD,
    SET_SOCKET,
    SET_SOCKET_ERROR,
    SET_THREADS
} from "./chatActionTypes";

export const setSocketError = (payload) => ({type: SET_SOCKET_ERROR, payload});
export const setIgProfile = (igProfile) => ({type: SET_IG_PROFILE, igProfile});
export const addMessage = (message) => ({type: ADD_MESSAGE, message});
export const setThreads = (threads) => ({type: SET_THREADS, threads});
export const openChatWidget = () => ({type: OPEN_CHAT_WIDGET});
export const closeChatWidget = () => ({type: CLOSE_CHAT_WIDGET});
export const sendMessage = (payload, socket) => ({type: SEND_MESSAGE, payload, socket});
export const setSocket = (socket) => ({type: SET_SOCKET, socket});
export const initSocketConnection = (organizationId) => ({type: INITIALIZE_SOCKET_CONNECTION, organizationId});
export const initIgChatConnection = (socket) => ({type: INITIALIZE_IG_CHAT_CONNECTION, socket});
export const setConnectionToChatStorage = (value) => ({type: SET_CONNECTION_TO_CHAT_STORAGE, value});
export const setIsAutoConnectToChat = (value) => ({type: SET_IS_AUTO_CONNECT_TO_CHAT, value});
export const setIsIgIntegrated = (value) => ({type: SET_IS_IG_INTEGRATED, value});
export const setIsIgExists = (value) => ({type: SET_IS_IG_EXISTS, value});
export const setChatInit = (value) => ({type: SET_CHAT_INIT, value});
export const deleteIgIntegration = () => ({type: DELETE_IG_INTEGRATION});
export const setNewMessageToThread = (payload) => ({type: SET_NEW_MESSAGE_TO_THREAD, payload});
