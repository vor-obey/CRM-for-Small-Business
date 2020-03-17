import {useEffect, useState} from 'react';
import {setIsLoading, setSnackBarStatus} from '../data/store/auxiliary/auxiliaryActions';
import {OrderService, ShippingMethodService} from '../services';
import {COMMON_ERROR_MESSAGE} from '../constants/statuses';
import {useDispatch} from 'react-redux';
import CustomerService from '../services/CustomerService';
import UserService from '../services/UserService';

export const useOrderDetailsById = (id) => {
    const [orderDetails, setOrderDetails] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrderById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await OrderService.findOneById(id);
                setOrderDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                dispatch(setIsLoading(false))
            }
        };
        fetchOrderById(id);
    }, [id, dispatch]);

    return orderDetails;
};

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                dispatch(setIsLoading(true));
                const customers = await CustomerService.list();
                setCustomers(customers);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchCustomers();
    }, [dispatch]);

    return [customers, setCustomers];
};

export const useManagers = () => {
    const [managers, setManagers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                dispatch(setIsLoading(true));
                const managers = await UserService.list();
                setManagers(managers);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchManagers();
    }, [dispatch]);

    return [managers, setManagers];
};

export const useShippingMethods = () => {
    const [methods, setMethods] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShippingMethods = async () => {
            try {
                dispatch(setIsLoading(true));
                const methods = await ShippingMethodService.list();
                setMethods(methods);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchShippingMethods();
    }, [dispatch]);

    return [methods, setMethods];
};