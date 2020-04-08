import {put} from '@redux-saga/core/effects';
import {setIsLoading, setSnackBarStatus} from '../auxiliary/auxiliaryActions';
import {StorageService, UserService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import isEmpty from 'lodash/isEmpty';
import {setCurrentUser} from './userActions';

export function* login(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield UserService.login(action.loginData);
        if (response.accessToken) {
            StorageService.setJWTToken(response.accessToken);
            yield put(setIsLoading(false));
            yield* getCurrentUser();
        } else {
            yield put(setIsLoading(false));
            yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    } catch (e) {
        yield put(setIsLoading(false));
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    }
}

export function* getCurrentUser() {
    try {
        yield put(setIsLoading(true));
        const response = yield UserService.getCurrentUser();
        if (!isEmpty(response)) {
            yield put(setCurrentUser(response));
            yield put(setIsLoading(false));
        } else {
            yield put(setIsLoading(false));
            yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    } catch (e) {
        yield put(setIsLoading(false));
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    }
}