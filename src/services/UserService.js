import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class UserService extends CRUDService{
    constructor(){
        super(USER_URLS.USERS)
    }

    async login(email, password) {
        try {
            const user = await this.APIService.fetch('POST', '/login', {
                email,
                password,
            });

            console.log(user);

            return user;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}

export default new UserService();


