import {
    getAllCustomersSuccess,
    getAllCustomersError,
    getCustomerDetailsLoading,
    getCustomerDetailsSuccess,
    getCustomerDetailsError,
    setNewCustomerLoading,
    setNewCustomerSuccess,
    setNewCustomerFailure,
    deleteCustomerSuccess,
    deleteCustomerFailure,
    patchCustomerSuccess,
    patchCustomerFailure,
    setNewCustomerCreated,
} from "./customerActions";
import {CustomerService, UserService} from "../../../services";

export const loadCustomers = () => async (dispatch) => {
    try {
        const response = await CustomerService.getCustomerList();
        dispatch(getAllCustomersSuccess(response));
    } catch (error) {
        dispatch(getAllCustomersError(error.message));
    }
};

export const loadCustomer = (id) => async (dispatch) => {
    try {
        dispatch(getCustomerDetailsLoading());
        const response = await CustomerService.findOneById(id);
        dispatch(getCustomerDetailsSuccess(response));
    } catch (error) {
        dispatch(getCustomerDetailsError(error.message));
    }
};

export const postCustomer = (body) => async (dispatch) => {
    try {
        dispatch(setNewCustomerLoading());
        const response = await UserService.createCustomer(body);
        if (response && !response.statusCode) {
            dispatch(setNewCustomerSuccess(response));
            dispatch(setNewCustomerCreated(true))
        } else {
            dispatch(setNewCustomerFailure(response.message));
        }
    } catch (error) {
        dispatch(setNewCustomerFailure(error.message));
    }
};

export const deleteCustomer = (id) => async (dispatch) => {
    try {
        const response = await UserService.delete(id);
        if (!response.error) {
            dispatch(deleteCustomerSuccess(response));
        } else {
            dispatch(deleteCustomerFailure(response.error));
        }
    }
    catch (e) {
        dispatch(deleteCustomerFailure(e));
    }
};

export const editCustomer = (body) => async (dispatch) => {
    try {
        const response = await UserService.patchCustomer(body);
        if (!response.error) {
            dispatch(patchCustomerSuccess(response));
        } else {
            dispatch(patchCustomerFailure(response.error));
        }
    }
    catch (e) {
        dispatch(patchCustomerFailure(e));
    }
};
