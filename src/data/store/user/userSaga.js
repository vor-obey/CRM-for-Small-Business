import {put, select} from '@redux-saga/core/effects';
import {setIsLoading, setSnackBarStatus} from '../auxiliary/auxiliaryActions';
import {RoleService, StorageService, UserService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import isEmpty from 'lodash/isEmpty';
import {
    setCurrentUser,
} from './userActions';
import {
    CREATE_USER_FAIL,
    CREATE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    GET_ROLES_FAIL,
    GET_ROLES_SUCCESS,
    GET_USER_BY_ID_FAIL,
    GET_USER_BY_ID_SUCCESS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS
} from "./userActionTypes";
import {getListSaga} from "../helpers/sagaHelpers";
import {setConnectionToChatStorage, setIsAutoConnectToChat, setIsIgIntegrated} from "../chat/chatActions";
import {history} from "../../../utils/history";

export function* login(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield UserService.login(action.loginData);
        if (response.accessToken) {
            StorageService.setJWTToken(response.accessToken);
            yield put(setConnectionToChatStorage(false));
            yield put(setIsAutoConnectToChat(false));
            yield* getCurrentUser();
        } else {
            yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    } catch (e) {
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    }
    finally {
        yield put(setIsLoading(false));
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

        } else {
            yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    } catch (e) {
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    }
    finally {
        yield put(setIsLoading(false));
    }
}

export function* getUserById(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield UserService.findOneById(action.payload);
        yield put({type: GET_USER_BY_ID_SUCCESS, payload: response})
    }
    catch (e) {
        yield put({type: GET_USER_BY_ID_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* updateUser(action) {
    const userDetails = action.payload.userInput;
    try {
        const roles = yield select(state => state.userReducer.roles);
        const newRole = roles.find(role => role.roleId === userDetails.roleId);

        yield put(setIsLoading(true));
        yield UserService.update(userDetails);
        yield put({type: UPDATE_USER_SUCCESS, payload: { ...action.payload, userInput: { ...userDetails, role: newRole } }});
        history.goBack();
        }
    catch (e) {
        yield put({type: UPDATE_USER_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    }
    finally {
        yield put(setIsLoading(false));
    }
}

export function* deleteUser(action){
    try {
        yield put(setIsLoading(true));
        yield UserService.delete(action.payload);
        yield put({type: DELETE_USER_SUCCESS, payload: action.payload});
        history.goBack();
    } catch (e) {
        yield put({type: DELETE_USER_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    }
    finally {
        yield put(setIsLoading(false));
    }
}

export function* createUser(action){
    const {confirmPassword, ...user} = action.payload;
    try {
        yield put(setIsLoading(true));
        const response =  yield UserService.create(user);
        yield put({type: CREATE_USER_SUCCESS, payload: response})
        history.goBack()
    } catch (e) {
        yield put({type: CREATE_USER_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
    } finally {
        yield put(setIsLoading(false));
    }
}

export const getUsers = getListSaga(UserService, GET_USERS_SUCCESS, GET_USERS_FAIL);
export const getRoles = getListSaga(RoleService, GET_ROLES_SUCCESS, GET_ROLES_FAIL);
