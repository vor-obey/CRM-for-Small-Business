import CRUDService from "./CRUDService";
import {API_URLS} from "../constants/api_urls";

class TemplateService extends CRUDService {
    constructor() {
        super(API_URLS.TEMPLATE)
    }
}

export default new TemplateService();
