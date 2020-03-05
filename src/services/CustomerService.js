import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class CustomerService extends CRUDService {
    constructor(){
        super(USER_URLS.CUSTOMERS)
    }
}

export default new CustomerService();
