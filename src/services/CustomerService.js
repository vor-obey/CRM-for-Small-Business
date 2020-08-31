import { API_URLS } from "../constants/api_urls";
import CRUDService from "./CRUDService";

class CustomerService extends CRUDService {
    constructor(){
        super(API_URLS.CUSTOMERS)
    }
}

export default new CustomerService();
