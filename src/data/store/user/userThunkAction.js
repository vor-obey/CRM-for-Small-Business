import {
    getAllUserError,
    getAllUsersSuccess,
    // getAllUsersLoading,
    setNewUserLoading,
    setNewUserSuccess,
    setNewUserError,
    getUserDetailsLoading,
    getUserDetailsSuccess,
    getUserDetailsError,
    userLoginFailure,
    getCurrentUserSuccess,
    getCurrentUserFailure,
    getRoleFailure,
    getRolesSuccess,
    deleteUserFailure,
    deleteUserSuccess,
    patchUserSuccess,
    patchUserFailure,
} from "./userActions";
import { UserService, StorageService } from "../../../services";
// import {history} from "../../../utils/history";

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

export const getRoles = () => async (dispatch) => {
    try {
        const response = await UserService.getRoles();
        if (!response.error) {
            dispatch(getRolesSuccess(response));
        } else {
            dispatch(getRoleFailure(response.error));
        }
    }
    catch (e) {
        dispatch(getRoleFailure(e));
    }
};

export const loadUsers = () => async (dispatch) => {
    try {
        // dispatch(getAllUsersLoading(true));
        const response = await UserService.list();
        // dispatch(getAllUsersLoading(false));
        dispatch(getAllUsersSuccess(response));
    } catch (error) {
        dispatch(getAllUserError(error.message));
    }
};

// export const clearEditUser = async () => {
//
// }
export const postUser = (user) => async (dispatch) => {
    try {
        dispatch(setNewUserLoading());
        const response = await UserService.create(user);
        if (response && !response.statusCode) {
            dispatch(setNewUserSuccess(response));
        }
        // history.push('/users')
        dispatch(setNewUserError(response.message));
    } catch (error) {
        await dispatch(setNewUserError(error.message));
    }
};

export const loadUser = (id) => async (dispatch) => {
    try {
        dispatch(getUserDetailsLoading());
        const response = await UserService.findOneById(id);
        dispatch(getUserDetailsSuccess(response));
    } catch (error) {
        dispatch(getUserDetailsError(error.message));
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await UserService.deleteUser(id);
        if (!response.error) {
            dispatch(deleteUserSuccess(response));
        } else {
            dispatch(deleteUserFailure(response.error));
        }
    }
    catch (e) {
        dispatch(deleteUserFailure(e));
    }
};

export const editUser = (body) => async (dispatch) => {
    try {
        const response = await UserService.patchUser(body);
        if (!response.error) {
            dispatch(patchUserSuccess(response));
        } else {
            dispatch(patchUserFailure(response.error));
        }
    }
    catch (e) {
        dispatch(patchUserFailure(e));
    }
};
