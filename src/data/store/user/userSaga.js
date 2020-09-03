import {put} from '@redux-saga/core/effects';
import {setIsLoading, setSnackBarStatus} from '../auxiliary/auxiliaryActions';
import {RoleService, StorageService, UserService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import isEmpty from 'lodash/isEmpty';
import {
    setCurrentUser,
} from './userActions';
import {GET_ROLES_FAIL, GET_ROLES_SUCCESS, GET_USERS_FAIL, GET_USERS_SUCCESS} from "./userActionTypes";
import {getListSaga} from "../helpers/sagaHelpers";
import {setConnectionToChatStorage, setIsAutoConnectToChat, setIsIgIntegrated} from "../chat/chatActions";


export function* login(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield UserService.login(action.loginData);
        if (response.accessToken) {
            StorageService.setJWTToken(response.accessToken);
            yield put(setConnectionToChatStorage(false));
            yield put(setIsAutoConnectToChat(false));
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

            const integration = !!response.organization.integrations
                .find(integration => integration.type === 'instagram');
            yield put(setIsIgIntegrated(integration));

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

export const getUsers = getListSaga(UserService, GET_USERS_SUCCESS, GET_USERS_FAIL);
export const getRoles = getListSaga(RoleService, GET_ROLES_SUCCESS, GET_ROLES_FAIL);
