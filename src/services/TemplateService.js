import CRUDService from "./CRUDService";
import {USER_URLS} from "../constants/urls";

class TemplateService extends CRUDService {
    constructor() {
        super(USER_URLS.TEMPLATE)
    }
}

export default new TemplateService();
