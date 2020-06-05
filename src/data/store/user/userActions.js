import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS, INITIALIZE_SOCKET_CONNECTION, LOGIN, SET_IG_PROFILE, ADD_MESSAGE,
    SET_THREADS, OPEN_CHAT_WIDGET, CLOSE_CHAT_WIDGET, SEND_MESSAGE, SET_SOCKET_ERROR, SET_SOCKET,
    INITIALIZE_IG_CHAT_CONNECTION, SET_IS_AUTO_CONNECT_TO_CHAT, SET_CONNECTION_TO_CHAT_STORAGE, SET_IS_IG_INTEGRATED,
    SET_IS_IG_EXISTS, SET_CHAT_INIT, DELETE_IG_INTEGRATION, SET_NEW_MESSAGE_TO_THREAD
} from "./userActionTypes";

export const getCurrentUser = () => ({type: GET_CURRENT_USER});
export const login = (loginData) => ({type: LOGIN, loginData});
export const setCurrentUser = (currentUser) => ({type: GET_CURRENT_USER_SUCCESS, currentUser});
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
