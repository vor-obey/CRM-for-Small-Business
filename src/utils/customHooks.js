import {useEffect, useState} from 'react';
import {setIsLoading, setSnackBarStatus} from '../data/store/auxiliary/auxiliaryActions';
import {OrderService} from '../services';
import {COMMON_ERROR_MESSAGE} from '../constants/statuses';
import {useDispatch} from 'react-redux';
import CustomerService from '../services/CustomerService';
import UserService from '../services/UserService';
import isEmpty from 'lodash/isEmpty';

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

export const useCustomersAndSelectCreated = (newCustomer) => {
    const [customers, setCustomers] = useState([]);
    const [createdCustomer, setCreatedCustomer] = useState({});
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
        if (!isEmpty(newCustomer)) {
            setCreatedCustomer(createdCustomer);
        }
    }, [createdCustomer, newCustomer, dispatch]);

    return [customers, createdCustomer];
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

    return managers;
};