import {API_URLS} from "../constants/api_urls";
import CRUDService from "./CRUDService";

class RoleService extends CRUDService {
    constructor(){
        super(API_URLS.ROLES)
    }
}

export default new RoleService();
