import {eventChannel} from "redux-saga";
import {StorageService} from "../../../services";
import {call, put, take} from "@redux-saga/core/effects";
import {addMessage, setNewMessageToThread, setSocket, setSocketError} from "./chatActions";
import {history} from "../../../utils/history";
import {CHAT} from "../../../constants/routes";
import {select} from "redux-saga/effects";
import {addNotification} from "../auxiliary/auxiliaryActions";
import GroupIcon from "@material-ui/icons/Group";
import React from "react";
import socketIOClient from "socket.io-client";
import {BASE_URL} from "../../../constants/api_urls";

export function connect(organizationId) {
    const socket = socketIOClient(`${BASE_URL}/`, {query: `roomId=${organizationId}`});
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
            console.log("Socket connected");
        });
    });
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

const navigateToThread = (thread) => {
    history.push({
        pathname: CHAT,
        thread: thread
    })
};

export function* addAndDisplayMessage(payload) {
    const message = payload.message.message;

    yield put(setNewMessageToThread(message));

    const {threads, igProfile} = yield select(state => state.chatReducer);
    const selectedThread = threads.find(item => item.thread_id === message.thread_id);

    if (message.user_id !== igProfile.pk && selectedThread.users) {
        yield put(addNotification({
            icon: selectedThread.users.length > 1 ? <GroupIcon/> : selectedThread.users[0].profile_pic_url,
            text: message.text,
            username: selectedThread.thread_title,
            date: new Date(),
            status: 'message',
            onClick: () => navigateToThread(selectedThread)
        }));
    }
}
