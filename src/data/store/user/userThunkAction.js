import {
    getAllUserError,
    getAllUsersSuccess,
    getAllUsersLoading,
    setNewUserLoading,
    setNewUserSuccess,
    setNewUserError
} from "./userActions";

import { UserApi } from "../../api/user";

export const loadUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersLoading(true));
    const response = await UserApi.getAllUsers();
    dispatch(getAllUsersSuccess(response.data));
  } catch (error) {
    dispatch(getAllUserError(error.message));
  }
};


export const postUser = (user) => async (dispatch) => {
    try {
        dispatch(setNewUserLoading());
        const response = await UserApi.setNewUser(user);
        dispatch(setNewUserSuccess(response.data));
    } catch (error) {
        dispatch(setNewUserError(error.message));
    }
};
