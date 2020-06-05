import {put} from '@redux-saga/core/effects';
import {select} from 'redux-saga/effects';
import {setNewMessageToThread} from '../user/userActions';
import {addNotification} from "./auxiliaryActions";
import {history} from '../../../utils/history';

const handleClick = () => {
    history.push('/chat')
};

export function* initializeMessages(payload) {
    const message = payload.message.message;
    const state = yield select(state => state.userReducer);
    const threads = [...state.threads];
    const threadToMove = threads.find(item => item.thread_id === message.thread_id);

    yield put(setNewMessageToThread(message));

    yield put(addNotification({
        icon: threadToMove.users[0].profile_pic_url,
        text: message.text,
        username: threadToMove.thread_title,
        date: new Date(),
        status: 'message',
        onClick: handleClick
    }));
}
