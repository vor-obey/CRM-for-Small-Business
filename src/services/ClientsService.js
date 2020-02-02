import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";
import {addParamsToUrl} from "../utils/helpers";

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

    async postCustomer() {
        try {
            return await this.APIService.apiPost('/customers');
        } catch (e) {
            return e;
        }
    }

    async patchCustomer(body) {
        try {
            return await this.APIService.apiPatch(`${this.pathname}`, { body });
        } catch (e) {
            return e;
        }
    }

    async deleteCustomer(id) {
        try {
            return await this.APIService.apiDelete(addParamsToUrl(`${USER_URLS.CUSTOMERS}/${id}`));
        } catch (e) {
            return e;
        }
    };
}

export default new ClientsService();
