import {
    getAllCustomersSuccess,
    getAllCustomersError
} from "./customerActions";
import {ClientsService } from "../../../services";



export const loadCustomers = () => async (dispatch) => {
    try {
        const response = await ClientsService.getCustomerList();
        dispatch(getAllCustomersSuccess(response));
    } catch (error) {
        dispatch(getAllCustomersError(error.message));
    }
};
