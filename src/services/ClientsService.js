import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class ClientsService extends CRUDService {
    constructor(){
        super(USER_URLS.CUSTOMERS)

    }

    async getCustomerList() {
        try {
            return await this.APIService.apiGet('/customers');
        } catch (e) {
            return e;
        }
    };
}

export default new ClientsService();
