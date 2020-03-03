import {USER_URLS} from "../constants/urls";
import CRUDService from "./CRUDService";

class OrganizationService extends CRUDService {
    constructor() {
        super(USER_URLS.ORGANIZATION)
    }

}

export default new OrganizationService();