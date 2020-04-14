import {call, delay, put, race, take} from '@redux-saga/core/effects';
import {setIsLoading, setSnackBarStatus} from '../auxiliary/auxiliaryActions';
import {StorageService, UserService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import isEmpty from 'lodash/isEmpty';
import {
    addMessage,
    setCurrentUser,
    setIgProfile,
    setThreads,
    setIsConnected,
    setIsIntegrated
} from './userActions';
import socketIOClient from 'socket.io-client';
import {eventChannel} from 'redux-saga';
import {BASE_URL} from '../../../constants/urls';

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

export function createEventChannel(socket) {
    return eventChannel(emitter => {
        socket.emit('initChat');
        socket.on('getIgProfile', payload => emitter({event: 'ig_profile', payload}));
        socket.on('message', payload => emitter({event: 'message', payload}));
        socket.on('getThreads', payload => emitter({event: 'threads', payload}));
        socket.on('integrated', payload => emitter({event: 'integrated', payload}));
        return () => {
            socket.close();
        }
    });
}

export function sendMessage(action) {
    const socket = socketIOClient(`${BASE_URL}/`, {query: `roomId=${action.organizationId}`});
    socket.emit('sendMessage', action.payload);
}

export function* initializeConnection(action) {
    yield put(setIsConnected(true));
    const {socket, timeout} = yield race({
        socket: socketIOClient(`${BASE_URL}/`, {query: `roomId=${action.organizationId}`}),
        timeout: delay(2000),
    });
    if (timeout) {
        yield put(setIsConnected(false));
    }
    const channel = yield call(createEventChannel, socket);
    while (true) {
        const {event, payload} = yield take(channel);
        switch (event) {
            case 'ig_profile': {
                yield put(setIgProfile(payload));
                break;
            }
            case 'message': {
                yield put(addMessage(payload));
                break;
            }
            case 'threads': {
                yield put(setThreads(payload));
                break;
            }
            case 'integrated': {
                yield put(setIsIntegrated(payload));
                break;
            }
            default: {
                break;
            }
        }
    }
}