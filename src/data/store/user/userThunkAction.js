import {
    getAllUserError,
    getAllUsersSuccess,
    getAllUsersLoading,
    setNewUserLoading,
    setNewUserSuccess,
    setNewUserError,
    getUserLoading,
    getUserSuccess,
    getUserError,
    // userLoginSuccess,
    userLoginFailure,
    getCurrentUserSuccess,
    getCurrentUserFailure,
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
        const response = await UserService.currentUser();
        if (!response.error && response) {
            dispatch(getCurrentUserSuccess(response));
        } else {
            dispatch(getCurrentUserFailure(response.error));
        }
    } catch (e) {
        dispatch(getCurrentUserFailure(e));
    }
};


export const loadUsers = () => async (dispatch) => {
    try {
        dispatch(getAllUsersLoading(true));
        const response = await UserService.list();
        dispatch(getAllUsersSuccess(response));
    } catch (error) {
        dispatch(getAllUserError(error.message));
    }
};

export const postUser = (user) => async (dispatch) => {
    try {
        dispatch(setNewUserLoading());
        const response = await UserService.create(user);
        dispatch(setNewUserSuccess(response));
    } catch (error) {
        dispatch(setNewUserError(error.message));
    }
};

export const loadUser = (id) => async (dispatch) => {
    try {
        dispatch(getUserLoading());
        const response = await UserService.findOneById(id);
        dispatch(getUserSuccess(response));
    } catch (error) {
        dispatch(getUserError(error.message));
    }
};
