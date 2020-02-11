import {
    userLoginFailure,
    getCurrentUserSuccess,
    getCurrentUserFailure
} from "./userActions";
import { UserService, StorageService } from "../../../services";

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await UserService.login(email, password);
        if(!response.error && response.accessToken) {
            StorageService.setJWTToken(response.accessToken);
            dispatch(getCurrentUser())
        } else {
            dispatch(userLoginFailure(response.error));
        }
    } catch (e) {
        dispatch(userLoginFailure(e));
    }
};

export const getCurrentUser = () => async (dispatch) => {
    try {
        const response = await UserService.getCurrentUser();
        if (!response.error && response) {
            dispatch(getCurrentUserSuccess(response));
        } else {
            dispatch(getCurrentUserFailure(response.error));
        }
    } catch (e) {
        dispatch(getCurrentUserFailure(e));
    }
};
