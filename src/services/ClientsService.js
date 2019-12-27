import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class ClientsService extends CRUDService {
    constructor(){
        super(USER_URLS.CLIENTS)
    }
}

export default new ClientsService();
