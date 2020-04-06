import {useEffect, useState} from 'react';
import {setIsLoading, setSnackBarStatus} from '../data/store/auxiliary/auxiliaryActions';
import {OrderService, RoleService, ShippingMethodService} from '../services';
import {COMMON_ERROR_MESSAGE} from '../constants/statuses';
import {useDispatch} from 'react-redux';
import CustomerService from '../services/CustomerService';
import UserService from '../services/UserService';
import SourcesService from '../services/SourcesService';

export const useSources = () => {
    const [sources, setSources] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSources = async () => {
            try {
                dispatch(setIsLoading(true));
                const sources = await SourcesService.list();
                setSources(sources);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchSources();
    }, [dispatch]);

    return sources;
};

export const useRoles = () => {
    const [roles, setRoles] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                dispatch(setIsLoading(true));
                const roles = await RoleService.list();
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchRoles();
    }, [dispatch]);

    return roles;
};

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await OrderService.list();
                setOrders(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchOrders();
    }, [dispatch]);

    return orders;
};

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
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                dispatch(setIsLoading(true));
                const customers = await CustomerService.list();
                setCustomers(customers);
                dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchCustomers();
    }, [dispatch]);

    return [customers, setCustomers, loading];
};

export const useCustomerById = (id) => {
    const [customer, setCustomer] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomerById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await CustomerService.findOneById(id);
                setCustomer(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}));
            }
        };

        fetchCustomerById(id);
    }, [dispatch, id]);

    return customer;
};

export const useManagers = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                setLoading(true);
                dispatch(setIsLoading(true));
                const managers = await UserService.list();
                setManagers(managers);
                dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchManagers();
    }, [dispatch]);

    return [managers, setManagers, loading];
};

export const useManagerById = (id) => {
    const [manager, setManager] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await UserService.findOneById(id);
                setManager(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
            }
        };
        fetchUserById();
    }, [id, dispatch]);

    return manager;
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
