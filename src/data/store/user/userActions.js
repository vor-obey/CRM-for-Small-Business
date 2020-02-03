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
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE, PATCH_USER_LOADING, PATCH_USER_SUCCESS, PATCH_USER_FAILURE,
    SET_NEW_USER_CREATED,
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

export const setNewUserLoading = (createUserLoading) => {
    return {
        type: SET_NEW_USER_LOADING,
        createUserLoading,
    }
};

export const setNewUserSuccess = (newUser) => {
    return {
        type: SET_NEW_USER_SUCCESS,
        newUser,
    }
};

export const setNewUserError = (newUserError) => {
    return {
        type: SET_NEW_USER_ERROR,
        newUserError
    }
};

export const setNewUserCreated = (isNewUserCreated) => {
    return {
        type: SET_NEW_USER_CREATED,
        isNewUserCreated
    }
};

export const getUserDetailsSuccess = (userDetails) => {
    return {
        type: GET_USER_DETAILS_SUCCESS,
        userDetails
    }
};


export const getUserDetailsError = (error) => {
    return {
        type: GET_USER_DETAILS_ERROR,
        error
    }
};

export const getUserDetailsLoading = (loading) => {
    return {
        type: GET_USER_DETAILS_LOADING,
        loading,
    }
};

export const deleteUserSuccess = (deleteUserSuccess) => {
    return {
        type: DELETE_USER_SUCCESS,
        deleteUserSuccess,
    }
};

export const deleteUserFailure = (deleteUserError) => {
    return {
        type: DELETE_USER_FAILURE,
        deleteUserError,
    }
};

export  const patchUserLoading = (loading) => {
    return {
        type: PATCH_USER_LOADING,
        loading,
    }
};

export const patchUserSuccess = (patchUser) => {
    return {
        type: PATCH_USER_SUCCESS,
        patchUser,
    }
};

export const patchUserFailure = (patchUserError) => {
    return {
        type: PATCH_USER_FAILURE,
        patchUserError,
    }
};
