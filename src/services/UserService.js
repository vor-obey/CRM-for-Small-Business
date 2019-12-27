import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class UserService extends CRUDService{
    constructor(){
        super(USER_URLS.USERS)
    }
}

export default new UserService();


