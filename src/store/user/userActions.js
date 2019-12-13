import { SET_USER_LOADING } from "./userActionTypes";

export const setUserLoading = (loading) => {
  return {
      type: SET_USER_LOADING,
      loading,
  }
};
