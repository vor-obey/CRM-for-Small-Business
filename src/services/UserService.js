import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class UserService extends CRUDService {
    constructor(){
        super(USER_URLS.USERS)
    }

    async login(email, password) {
        try {
            return await this.APIService.fetch('POST', '/auth/login', {
                email,
                password,
            });
        } catch (e) {
            return e;
        }
    };

    async getCurrentUser() {
        try {
            return await this.APIService.apiGet('/users/me');
        } catch (e) {
            return e;
        }
    };
}

export default new UserService();
