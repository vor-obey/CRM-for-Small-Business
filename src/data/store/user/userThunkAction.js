import {
    setCurrentUser,
} from "./userActions";
import isEmpty from "lodash/isEmpty"
import { UserService, StorageService } from "../../../services";
import {setIsLoading, setSnackBarStatus} from "../auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await UserService.login(email, password);
        if (response.accessToken) {
            StorageService.setJWTToken(response.accessToken);
            dispatch(setIsLoading(false));
        } else {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    } catch (e) {
        dispatch(setIsLoading(false));
        dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
    }
};

export const getCurrentUser = () => async (dispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await UserService.getCurrentUser();
        if (!response.error && !isEmpty(response)) {
            dispatch(setCurrentUser(response));
            dispatch(setIsLoading(false));
        } else {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
        }
    } catch (e) {
        dispatch(setIsLoading(false));
        dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
    }
};
