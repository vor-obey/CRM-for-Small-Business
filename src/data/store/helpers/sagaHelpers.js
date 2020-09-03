import {put} from "@redux-saga/core/effects";
import {setIsLoading, setSnackBarStatus} from "../auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const getListSaga = (service, successType, errorType) => {
    return function* (action) {
        try {
            yield put(setIsLoading(true));
            const response = yield service.list(action.loginData);
            yield put({ type: successType, payload: response });
            yield put(setIsLoading(false))
        } catch (e) {
            yield put(setIsLoading(false));
            yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            yield put({ type: errorType })
        }
    }
}
