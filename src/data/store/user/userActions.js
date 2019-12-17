import { SET_USER_LOADING, GET_ALL_USERS_SUCCESS } from "./userActionTypes";

export const setUserLoading = (loading) => {
  return {
      type: SET_USER_LOADING,
      loading,
  }
};

export const getAllUsers = (userList) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        userList,
    }
};
