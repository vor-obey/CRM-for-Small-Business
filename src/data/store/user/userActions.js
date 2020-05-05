import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS, INIT_CONNECT, LOGIN, SET_IS_CONNECTED, SET_IG_PROFILE, ADD_MESSAGE,
    SET_THREADS, SET_IS_INTEGRATED, OPEN_CHAT_WIDGET, CLOSE_CHAT_WIDGET, SEND_MESSAGE, SET_SOCKET_ERROR
} from "./userActionTypes";

export const getCurrentUser = () => ({type: GET_CURRENT_USER});
export const login = (loginData) => ({type: LOGIN, loginData});
export const setCurrentUser = (currentUser) => ({type: GET_CURRENT_USER_SUCCESS, currentUser});
export const initConnect = (organizationId) => ({type: INIT_CONNECT, organizationId});
export const deleteIntegration = (organizationId) => ({type: INIT_CONNECT, organizationId});
export const setIsConnected = (isConnected) => ({type: SET_IS_CONNECTED, isConnected});
export const setIsIntegrated = (isIntegrated) => ({type: SET_IS_INTEGRATED, isIntegrated});
export const setSocketError = (payload) => ({type: SET_SOCKET_ERROR, payload});
export const setIgProfile = (igProfile) => ({type: SET_IG_PROFILE, igProfile});
export const addMessage = (message) => ({type: ADD_MESSAGE, message});
export const setThreads = (threads) => ({type: SET_THREADS, threads});
export const openChatWidget = () => ({type: OPEN_CHAT_WIDGET});
export const closeChatWidget = () => ({type: CLOSE_CHAT_WIDGET});
export const sendMessage = (payload) => ({type: SEND_MESSAGE, payload});