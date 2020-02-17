import {USER_URLS} from "../constants/urls";
import CRUDService from "./CRUDService";

class RoleService extends CRUDService {
    constructor(){
        super(USER_URLS.ROLES)
    }
}

export default new RoleService();