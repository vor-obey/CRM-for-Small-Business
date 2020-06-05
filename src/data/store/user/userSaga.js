import {call, put, take} from '@redux-saga/core/effects';
import {setIsLoading, setSnackBarStatus} from '../auxiliary/auxiliaryActions';
import {StorageService, UserService} from '../../../services';
import {COMMON_ERROR_MESSAGE} from '../../../constants/statuses';
import isEmpty from 'lodash/isEmpty';
import {
    addMessage,
    setCurrentUser,
    setSocketError,
    setSocket,
    setIsIgIntegrated,
    setConnectionToChatStorage, setIsAutoConnectToChat
} from './userActions';
import socketIOClient from 'socket.io-client';
import {eventChannel} from 'redux-saga';
import {BASE_URL} from '../../../constants/urls';

export function connect(organizationId) {
    const socket = socketIOClient(`${BASE_URL}/`, {query: `roomId=${organizationId}`});
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
            console.log("Socket connected");
        });
    });
}

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

export function createEventChannel(socket) {
    return eventChannel(emitter => {
        socket.on('getIgProfile', payload => emitter({event: 'ig_profile', payload}));
        socket.on('message', payload => emitter({event: 'message', payload}));
        socket.on('getThreads', payload => emitter({event: 'threads', payload}));
        socket.on('igError', payload => emitter({event: 'igError', payload}));
        socket.on('initStatus', payload => emitter({event: 'initStatus', payload}));
        return () => {
            socket.close();
        }
    });
}

export function sendMessage({payload, socket}) {
    socket.emit('sendMessage', payload);
}

export function initializeInstagramChatConnection({socket}) {
    socket.emit('initChat');
}

export function setConnectionToChatSaga({value}) {
    StorageService.setChatConnection(value);
}

export function* initializeSocketConnection(action) {
    const socket = yield call(connect, action.organizationId);
    yield put(setSocket(socket));
    const channel = yield call(createEventChannel, socket);
    while (true) {
        const {event, payload} = yield take(channel);
        switch (event) {
            case 'message': {
                yield put(addMessage(payload));
                break;
            }
            case 'igError': {
                yield put(setSocketError(payload));
                break;
            }
            default: {
                break;
            }
        }
    }
}
