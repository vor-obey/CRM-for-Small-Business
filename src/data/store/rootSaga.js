import {takeLatest} from '@redux-saga/core/effects';
import {GET_CURRENT_USER, LOGIN} from './user/userActionTypes';

import * as userSaga from './user/userSaga';

export function* rootSaga() {
    yield takeLatest(LOGIN, userSaga.login);
    yield takeLatest(GET_CURRENT_USER, userSaga.getCurrentUser);
}