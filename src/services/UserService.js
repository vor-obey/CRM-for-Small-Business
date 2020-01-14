import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class UserService extends CRUDService{
    constructor(){
        super(USER_URLS.USERS)
    }

    async login(email, password) {
        try {
            const response = await this.APIService.fetch('POST', '/auth/login', {
                email,
                password,
            });

            return response;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}

export default new UserService();
