import { axiosInstance } from "./axiosInstance";
import { USER_URLS } from "../../constants/urls";

export class UserApi {
    static getAllUsers = async () => {
        return await axiosInstance.get(USER_URLS.USERS);
    };

    static setNewUser = async (body) => {
        return await axiosInstance.post(USER_URLS.USERS, body);
    }
}
