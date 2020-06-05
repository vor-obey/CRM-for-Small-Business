import {takeEvery, takeLatest} from '@redux-saga/core/effects';
import {
    GET_CURRENT_USER,
    INITIALIZE_SOCKET_CONNECTION,
    LOGIN,
    SEND_MESSAGE,
    INITIALIZE_IG_CHAT_CONNECTION,
    SET_CONNECTION_TO_CHAT_STORAGE, ADD_MESSAGE
} from './user/userActionTypes';

import * as userSaga from './user/userSaga';
import * as auxiliarySaga from './auxiliary/auxiliarySaga';

export function* rootSaga() {
    yield takeLatest(LOGIN, userSaga.login);
    yield takeLatest(GET_CURRENT_USER, userSaga.getCurrentUser);
    yield takeEvery(INITIALIZE_SOCKET_CONNECTION, userSaga.initializeSocketConnection);
    yield takeEvery(INITIALIZE_IG_CHAT_CONNECTION, userSaga.initializeInstagramChatConnection);
    yield takeEvery(SEND_MESSAGE, userSaga.sendMessage);
    yield takeEvery(SET_CONNECTION_TO_CHAT_STORAGE, userSaga.setConnectionToChatSaga);
    yield takeEvery(ADD_MESSAGE, auxiliarySaga.initializeMessages);
}
