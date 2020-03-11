import {
    setCurrentUser,
} from "./userActions";
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

            return true;
        }

        dispatch(setIsLoading(false));
        dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}));

        return false;
    } catch (e) {
        dispatch(setIsLoading(false));
        dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}));

        return false;
    }
};

export const getCurrentUser = () => async (dispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await UserService.getCurrentUser();
        if (!response.error && response) {
            dispatch(setCurrentUser(response));
            dispatch(setIsLoading(false));
        } else {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}));
        }
    } catch (e) {
        dispatch(setIsLoading(false));
        dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}));
    }
};
