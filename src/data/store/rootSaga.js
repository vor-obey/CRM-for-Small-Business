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

import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    GET_PRODUCT_DETAILS_BY_ID,
    GET_PRODUCTS,
    GET_PRODUCTS_TYPES,
    DELETE_PRODUCT_TYPE,
    CREATE_TEMPLATE_PRODUCT,
    GET_TEMPLATES_PRODUCTS,
    DELETE_TEMPLATE_PRODUCT,
    SET_PRODUCT_TYPE_DETAILS,
    SET_TEMPLATE_PRODUCT_DETAILS,
    EDIT_TEMPLATE_PRODUCT,
    CREATE_PRODUCT_TYPE,
    EDIT_PRODUCT_TYPE, SET_ATTRIBUTES_TO_STATE, DELETE_ATTRIBUTE, EDIT_ATTRIBUTE, CREATE_ATTRIBUTE
} from "./product/productActionTypes";
import {
    CREATE_CUSTOMER,
    DELETE_CUSTOMER,
    GET_CUSTOMER_BY_ID,
    GET_CUSTOMERS,
    GET_SOURCES,
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

    yield takeLatest(CREATE_PRODUCT, productsSaga.createProduct);
    yield takeLatest(GET_PRODUCTS_TYPES, productsSaga.getProductsTypes);
    yield takeLatest(EDIT_PRODUCT, productsSaga.editProduct);
    yield takeLatest(GET_PRODUCT_DETAILS_BY_ID, productsSaga.getProductDetailById);
    yield takeLatest(DELETE_PRODUCT, productsSaga.deleteProduct);
    yield takeLatest(DELETE_PRODUCT_TYPE,productsSaga.deleteProductType);
    yield takeLatest(CREATE_TEMPLATE_PRODUCT, productsSaga.createTemplateProduct);
    yield takeLatest(GET_TEMPLATES_PRODUCTS, productsSaga.getTemplatesProducts);
    yield takeLatest(DELETE_TEMPLATE_PRODUCT, productsSaga.deleteTemplateProduct);
    yield takeLatest(SET_PRODUCT_TYPE_DETAILS, productsSaga.setProductTypesDetails);
    yield takeLatest(SET_TEMPLATE_PRODUCT_DETAILS, productsSaga.setTemplateProductDetails);
    yield takeLatest(EDIT_TEMPLATE_PRODUCT, productsSaga.editTemplateProduct);
    yield takeLatest(CREATE_PRODUCT_TYPE, productsSaga.createProductType);
    yield takeLatest(EDIT_PRODUCT_TYPE, productsSaga.editProductType);
    yield takeLatest(SET_ATTRIBUTES_TO_STATE, productsSaga.setAttributeToState);
    yield takeLatest(DELETE_ATTRIBUTE, productsSaga.deleteAttribute);
    yield takeLatest(EDIT_ATTRIBUTE, productsSaga.editAttribute);
    yield takeLatest(CREATE_ATTRIBUTE, productsSaga.createAttribute);

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
