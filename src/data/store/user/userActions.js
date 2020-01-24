import {
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR,
    GET_ALL_USERS_LOADING,
    SET_NEW_USER_LOADING,
    SET_NEW_USER_SUCCESS,
    SET_NEW_USER_ERROR,
    GET_USER_DETAILS_ERROR,
    GET_USER_DETAILS_LOADING,
    GET_USER_DETAILS_SUCCESS,
    LOGIN_FAILURE,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE,
    GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE
} from "./userActionTypes";

export const userLoginFailure = (loginError) => {
    return {
        type: LOGIN_FAILURE,
        loginError
    }
};

export const getCurrentUserSuccess = (currentUser) => {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        currentUser
    }
};

export const getCurrentUserFailure = (currentUser) => {
    return {
        type: GET_CURRENT_USER_FAILURE,
        currentUser
    }
};

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

export const getRolesSuccess = (roles) => {
    return {
        type: GET_ROLES_SUCCESS,
        roles
    }
};

export const getRoleFailure = (error) => {
    return {
        type: GET_ROLES_FAILURE,
        error
    }
};

export const setNewUserLoading = (loading) => {
    return {
        type: SET_NEW_USER_LOADING,
        loading,
    }
};

export const setNewUserSuccess = (userList) => {
    return {
        type: SET_NEW_USER_SUCCESS,
        userList,
    }
};

export const setNewUserError = (error) => {
    return {
        type: SET_NEW_USER_ERROR,
        error
    }
};

export const getUserSuccess = (userDetails) => {
    return {
        type: GET_USER_DETAILS_SUCCESS,
        userDetails
    }
};


export const getUserError = (error) => {
    return {
        type: GET_USER_DETAILS_ERROR,
        error
    }
};

export const getUserLoading = (loading) => {
    return {
        type: GET_USER_DETAILS_LOADING,
        loading,
    }
};
