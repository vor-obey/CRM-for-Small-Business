import {takeEvery, takeLatest} from '@redux-saga/core/effects';

import * as chatSaga from './chat/chatSaga';
import * as userSaga from './user/userSaga';
import * as productsSaga from './product/productsSaga';

import {
    GET_CURRENT_USER,
    GET_ROLES,
    GET_USERS,
    LOGIN,
} from './user/userActionTypes';

import {
    INITIALIZE_SOCKET_CONNECTION,
    SEND_MESSAGE,
    INITIALIZE_IG_CHAT_CONNECTION,
    SET_CONNECTION_TO_CHAT_STORAGE,
    ADD_MESSAGE
} from './chat/chatActionTypes'

import {GET_PRODUCTS} from "./product/productActionTypes";

export function* rootSaga() {
    yield takeLatest(LOGIN, userSaga.login);
    yield takeLatest(GET_CURRENT_USER, userSaga.getCurrentUser);

    yield takeLatest(GET_USERS, userSaga.getUsers);
    yield takeLatest(GET_ROLES, userSaga.getRoles);


    yield takeEvery(INITIALIZE_SOCKET_CONNECTION, chatSaga.initializeSocketConnection);
    yield takeEvery(INITIALIZE_IG_CHAT_CONNECTION, chatSaga.initializeInstagramChatConnection);
    yield takeEvery(SEND_MESSAGE, chatSaga.sendMessage);
    yield takeEvery(SET_CONNECTION_TO_CHAT_STORAGE, chatSaga.setConnectionToChatSaga);
    yield takeEvery(ADD_MESSAGE, chatSaga.addAndDisplayMessage);

    yield takeLatest(GET_PRODUCTS, productsSaga.getProducts);
}
