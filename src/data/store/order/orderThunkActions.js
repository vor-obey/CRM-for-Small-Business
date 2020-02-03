import OrdersService from "../../../services/OrdersService";
import {getOrdersFailure, getOrdersSuccess} from "./orderActions";

export const getOrders = () => async (dispatch) => {
    try {
        const response = await OrdersService.getOrders();
        dispatch(getOrdersSuccess(response));
    } catch (e) {
        dispatch(getOrdersFailure(e.message));
    }
};