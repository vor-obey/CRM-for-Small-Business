import { getAllUsers } from "./userActions";
import { UserApi } from "../../api/user";


export const loadUsers = () => async (dispatch) => {
  const response = await UserApi.getAllUsers();
  dispatch(getAllUsers(response.data));
};
