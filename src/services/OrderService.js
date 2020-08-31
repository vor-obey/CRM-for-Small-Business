import {API_URLS} from "../constants/api_urls";
import CRUDService from "./CRUDService";

class OrderService extends CRUDService {
    constructor() {
        super(API_URLS.ORDERS)
    }
}

export default new OrderService();
