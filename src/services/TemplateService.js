import CRUDService from "./CRUDService";
import {USER_URLS} from "../constants/urls";

class TemplateService extends CRUDService {
    constructor() {
        super(USER_URLS.TEMPLATES)
    }
}

export default new TemplateService();
