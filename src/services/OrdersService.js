import {USER_URLS} from "../constants/urls";
import CRUDService from "./CRUDService";

class OrdersService extends CRUDService {
    constructor() {
        super(USER_URLS.ORDERS)
    }

    getOrders = async () => {
        return await this.list();
    };

    getOrderById = async (orderId) => {
      return await this.findOneById(orderId);
    };
}

export default new OrdersService();


