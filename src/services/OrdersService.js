import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class OrdersService extends CRUDService{
    constructor(){
        super(USER_URLS.ORDERS)
    }
}

export default new OrdersService();


