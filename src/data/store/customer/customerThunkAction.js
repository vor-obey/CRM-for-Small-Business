import {
    getAllCustomersSuccess,
    getAllCustomersError,
    getCustomerDetailsLoading,
    getCustomerDetailsSuccess,
    getCustomerDetailsError,
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

export const loadCustomer = (id) => async (dispatch) => {
    try {
        dispatch(getCustomerDetailsLoading());
        const response = await ClientsService.findOneById(id);
        dispatch(getCustomerDetailsSuccess(response));
    } catch (error) {
        dispatch(getCustomerDetailsError(error.message));
    }
};
