import { axiosInstance } from "./axiosInstance";
import { USER_URLS } from "../../constants/urls";

export class UserApi {
    static getAllUsers = async () => {
        return await axiosInstance.get(USER_URLS.GET_ALL_USERS);
    };
}
