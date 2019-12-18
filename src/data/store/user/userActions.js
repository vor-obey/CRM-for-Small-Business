import { GET_ALL_USERS_SUCCESS, GET_ALL_USERS_ERROR, GET_ALL_USERS_LOADING} from "./userActionTypes";

export const getAllUsersLoading = (loading) => {
  return {
      type: GET_ALL_USERS_LOADING,
      loading,
  }
};

export const getAllUsersSuccess = (userList) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        userList,
    }
};

export const getAllUserError = (error) => {
    return {
        type: GET_ALL_USERS_ERROR,
        error
    }
};
