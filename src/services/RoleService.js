import {USER_URLS} from "../constants/urls";
import CRUDService from "./CRUDService";

class RoleService extends CRUDService {
    constructor(){
        super(USER_URLS.ROLES)
    }

    async getRoles() {
        try {
            return await this.APIService.apiGet('/roles');
        } catch (e) {
            return e;
        }
    }

}

export default new RoleService();