import {API_URLS} from "../constants/api_urls";
import CRUDService from "./CRUDService";

class CodeService extends CRUDService {
    constructor() {
        super(API_URLS.CODES)
    }
}

export default new CodeService();
