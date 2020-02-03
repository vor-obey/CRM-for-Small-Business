import CRUDService from "./CRUDService";
import {USER_URLS} from "../constants/urls";

class NovaPoshtaService extends CRUDService {
    constructor() {
        super(USER_URLS.NOVA_POSHTA);
    }

    async getNovaPoshtaCities(value) {
        try {
            return await this.APIService.apiGet(`/np/cities?search=${value}`);
        } catch (e) {
            return e;
        }
    }

    async getNovaPoshtaWarehouses(value) {
        try {
            return await this.APIService.apiGet(`/np/warehouses?city=${value}`)
        } catch (e) {
            return e;
        }
    }
}

export default new NovaPoshtaService();