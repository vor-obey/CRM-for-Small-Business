import {getAllUserError, getAllUsersSuccess, getAllUsersLoading} from "./userActions";
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
