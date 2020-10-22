import {takeEvery, takeLatest} from '@redux-saga/core/effects';

import * as chatSaga from './chat/chatSaga';
import * as userSaga from './user/userSaga';
import * as productsSaga from './product/productsSaga';
import * as customerSaga from './customer/customerSaga';

import {
    CREATE_USER,
    DELETE_USER,
    GET_CURRENT_USER,
    GET_ROLES,
    GET_USER_BY_ID,
    GET_USERS,
    LOGIN, UPDATE_USER,
} from './user/userActionTypes';

import {
    INITIALIZE_SOCKET_CONNECTION,
    SEND_MESSAGE,
    INITIALIZE_IG_CHAT_CONNECTION,
    SET_CONNECTION_TO_CHAT_STORAGE,
    ADD_MESSAGE
} from './chat/chatActionTypes'

import {GET_PRODUCTS} from "./product/productActionTypes";
import {
    CREATE_CUSTOMER,
    DELETE_CUSTOMER,
    GET_CUSTOMER_BY_ID,
    GET_CUSTOMERS, GET_SOURCES,
    UPDATE_CUSTOMER
} from "./customer/customerActionTypes";

export function* rootSaga() {
    yield takeLatest(LOGIN, userSaga.login);
    yield takeLatest(GET_CURRENT_USER, userSaga.getCurrentUser);

    yield takeLatest(GET_USERS, userSaga.getUsers);
    yield takeLatest(GET_ROLES, userSaga.getRoles);
    yield takeLatest(GET_USER_BY_ID, userSaga.getUserById);
    yield takeLatest(UPDATE_USER, userSaga.updateUser);
    yield takeLatest(DELETE_USER, userSaga.deleteUser);
    yield takeLatest(CREATE_USER, userSaga.createUser);

    yield takeLatest(CREATE_CUSTOMER, customerSaga.createCustomer);
    yield takeLatest(GET_CUSTOMERS, customerSaga.getCustomers);
    yield takeLatest(DELETE_CUSTOMER, customerSaga.deleteCustomer);
    yield takeLatest(GET_CUSTOMER_BY_ID, customerSaga.getCustomerById);
    yield takeLatest(UPDATE_CUSTOMER, customerSaga.updateCustomer);
    yield takeLatest(GET_SOURCES, customerSaga.getSources);

    yield takeEvery(INITIALIZE_SOCKET_CONNECTION, chatSaga.initializeSocketConnection);
    yield takeEvery(INITIALIZE_IG_CHAT_CONNECTION, chatSaga.initializeInstagramChatConnection);
    yield takeEvery(SEND_MESSAGE, chatSaga.sendMessage);
    yield takeEvery(SET_CONNECTION_TO_CHAT_STORAGE, chatSaga.setConnectionToChatSaga);
    yield takeEvery(ADD_MESSAGE, chatSaga.addAndDisplayMessage);

    yield takeLatest(GET_PRODUCTS, productsSaga.getProducts);
}
