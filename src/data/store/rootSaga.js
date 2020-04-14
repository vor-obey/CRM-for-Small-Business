import {takeEvery, takeLatest} from '@redux-saga/core/effects';
import {GET_CURRENT_USER, INIT_CONNECT, LOGIN, SEND_MESSAGE} from './user/userActionTypes';

import * as userSaga from './user/userSaga';

export function* rootSaga() {
    yield takeLatest(LOGIN, userSaga.login);
    yield takeLatest(GET_CURRENT_USER, userSaga.getCurrentUser);
    yield takeEvery(INIT_CONNECT, userSaga.initializeConnection);
    yield takeEvery(SEND_MESSAGE, userSaga.sendMessage);
}