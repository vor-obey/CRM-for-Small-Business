import {USER_URLS} from "../constants/urls";
import CRUDService from "./CRUDService";

class CodeService extends CRUDService {
    constructor() {
        super(USER_URLS.CODES)
    }
}

export default new CodeService();