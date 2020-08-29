import {API_URLS} from "../constants/api_urls";
import CRUDService from "./CRUDService";

class OrganizationService extends CRUDService {
    constructor() {
        super(API_URLS.ORGANIZATIONS)
    }
}

export default new OrganizationService();
