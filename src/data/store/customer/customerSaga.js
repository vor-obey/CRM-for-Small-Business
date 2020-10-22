import {setIsLoading, setSnackBarStatus} from "../auxiliary/auxiliaryActions";
import {put} from "@redux-saga/core/effects";
import {CustomerService} from "../../../services";
import {history} from "../../../utils/history";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {
    CREATE_CUSTOMER_FAIL,
    CREATE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS, GET_CUSTOMER_BY_ID_FAIL,
    GET_CUSTOMER_BY_ID_SUCCESS, GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS, GET_SOURCES_FAIL,
    GET_SOURCES_SUCCESS, UPDATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_SUCCESS
} from "./customerActionTypes";
import SourcesService from "../../../services/SourcesService";


export function* createCustomer(action) {
    try {
        yield put(setIsLoading(true));

        const { onSubmitted, customerDetails } = action.payload;
        const response = yield CustomerService.create(customerDetails);

        yield put({type: CREATE_CUSTOMER_SUCCESS, payload: response});
        onSubmitted(response);
    } catch (e) {
        yield put({type: CREATE_CUSTOMER_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* getCustomers() {
    try {
        yield put(setIsLoading(true));
        const customers = yield CustomerService.list();
        yield put({type: GET_CUSTOMERS_SUCCESS, payload: customers})
    } catch (e) {
        yield put({type: GET_CUSTOMERS_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}))
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* deleteCustomer(action) {
    const id = action.payload
    try {
        yield put(setIsLoading( true));
        yield CustomerService.delete(id);
        yield put({type: DELETE_CUSTOMER_SUCCESS, payload: id})
        history.goBack()
    } catch (e) {
        yield put({type: DELETE_CUSTOMER_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}))
    } finally {
        yield put(setIsLoading( false));
    }
}

export function* getCustomerById(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield CustomerService.findOneById(action.payload);
        const {source: {sourceId}, ...details} = response;
        yield put({type: GET_CUSTOMER_BY_ID_SUCCESS, payload: {sourceId, ...details}})
    } catch (e) {
        yield put({type: GET_CUSTOMER_BY_ID_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}))
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* updateCustomer(action) {
    const {orders, sourceId, ...details} = action.payload;
    try {
        yield put(setIsLoading(true));
        yield CustomerService.update(details);
        yield put({type: UPDATE_CUSTOMER_SUCCESS, payload: details})
        history.goBack();
    } catch (e) {
        yield put({type: UPDATE_CUSTOMER_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* getSources() {
    try {
        yield put(setIsLoading(true));
        const sources = yield SourcesService.list();
        yield put({type: GET_SOURCES_SUCCESS, payload: sources})
    } catch (e) {
        yield put({type: GET_SOURCES_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
    } finally {
        yield put(setIsLoading(false));
    }
}
